import * as Sentry from "@sentry/browser";
import React from "react";
import { trackEvent } from "./analytics";
import { GenericErrorScreen } from "./genericErrorScreen";
import { PageContainer } from "./page";
import { LoadingProps, Spinner } from "./spinner";

type ReaderOnOK<T> = (resp: Response) => Promise<T>;

export type ReFetch = () => void;

interface AsyncLoaderProps<T> extends LoadingProps {
  readonly fetch: () => Promise<Response | Response[]>;
  readonly readerOnOK?: ReaderOnOK<T>; // json reader by default
  readonly shouldPreventRender?: (data: T) => boolean;
  readonly render: (data: T, reFetch: ReFetch) => React.ReactNode;
  readonly loadingMessage: string;
  readonly shouldPreventErrorRender?: () => boolean;
  readonly errorRender?: () => React.ReactNode;
  readonly inline?: true;
  readonly spinnerScale?: number;
}

enum LoadingState {
  loading,
  loaded,
  error
}

interface AsyncLoaderState<T> {
  readonly data?: T;
  readonly loadingState: LoadingState;
}

export default class AsyncLoader<
  T extends NonNullable<any>
> extends React.Component<AsyncLoaderProps<T>, AsyncLoaderState<T>> {
  public state: AsyncLoaderState<T> = { loadingState: LoadingState.loading };
  private readerOnOK =
    this.props.readerOnOK || ((resp: Response) => resp.json());

  public componentDidMount(): void {
    this.props
      .fetch()
      .then(resp =>
        Array.isArray(resp)
          ? Promise.all(resp.map(this.processResponse))
          : this.processResponse(resp)
      )
      .then(data => {
        if (
          !(
            this.props.shouldPreventRender &&
            this.props.shouldPreventRender(data)
          ) &&
          data !== null
        ) {
          this.setState({ data, loadingState: LoadingState.loaded });
        }
      })
      .catch(exception => this.handleError(exception));
  }

  public render(): React.ReactNode {
    if (this.state.loadingState === LoadingState.loading) {
      return this.props.inline ? (
        <Spinner
          loadingMessage={this.props.loadingMessage}
          inline={this.props.inline}
          scale={this.props.spinnerScale}
        />
      ) : (
        <PageContainer>
          <Spinner loadingMessage={this.props.loadingMessage} />
        </PageContainer>
      );
    } else if (
      this.state.loadingState === LoadingState.loaded &&
      this.state.data !== undefined
    ) {
      return this.props.render(this.state.data, () =>
        this.setState(
          { loadingState: LoadingState.loading },
          this.componentDidMount
        )
      );
    } else if (this.props.errorRender) {
      return this.props.errorRender();
    }
    return <GenericErrorScreen loggingMessage={false} />;
  }

  private processResponse = (
    resp: Response,
    index?: number,
    allResponses?: Response[]
  ) => {
    const locationHeader = resp.headers.get("Location");
    const allResponsesAreOK =
      (allResponses || [resp]).filter(_ => !_.ok).length === 0;
    if (resp.status === 401 && locationHeader && window !== undefined) {
      window.location.replace(locationHeader);
      return Promise.resolve(null);
    } else if (allResponsesAreOK) {
      return this.readerOnOK(resp);
    }
    throw new Error(`${resp.status} (${resp.statusText})`);
  };

  private handleError(error: Error | ErrorEvent | string): void {
    if (
      !(
        this.props.shouldPreventErrorRender &&
        this.props.shouldPreventErrorRender()
      )
    ) {
      this.setState({ loadingState: LoadingState.error });
    }
    trackEvent({
      eventCategory: "asyncLoader",
      eventAction: "error",
      eventLabel: error ? error.toString() : undefined
    });
    Sentry.captureException(error);
  }
}
