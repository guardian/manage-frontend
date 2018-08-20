import Raven from "raven-js";
import React from "react";
import { trackEvent } from "./analytics";
import { GenericErrorScreen } from "./genericErrorScreen";
import { LoadingProps, Spinner } from "./spinner";

export type ReaderOnOK<T> = (resp: Response) => Promise<T>;

export interface AsyncLoaderProps<T> extends LoadingProps {
  readonly fetch: () => Promise<Response>;
  readonly readerOnOK?: ReaderOnOK<T>; // json reader by default
  readonly render: (data: T) => React.ReactNode;
  readonly loadingMessage: string;
  readonly errorRender?: () => React.ReactNode;
  readonly inline?: true;
  readonly spinnerScale?: number;
}

export enum LoadingState {
  loading,
  loaded,
  error
}

export interface AsyncLoaderState<T> {
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
      .then(
        resp =>
          resp.ok
            ? this.readerOnOK(resp)
            : this.handleError(`${resp.status} (${resp.statusText})`)
      )
      .then(data => this.setState({ data, loadingState: LoadingState.loaded }))
      .catch(exception => this.handleError(exception));
  }

  public render(): React.ReactNode {
    if (this.state.loadingState === LoadingState.loading) {
      return (
        <Spinner
          loadingMessage={this.props.loadingMessage}
          inline={this.props.inline}
          scale={this.props.spinnerScale}
        />
      );
    } else if (
      this.state.loadingState === LoadingState.loaded &&
      this.state.data !== undefined
    ) {
      return this.props.render(this.state.data);
    } else if (this.props.errorRender) {
      return this.props.errorRender();
    }
    return <GenericErrorScreen />;
  }

  private handleError(error: Error | ErrorEvent | string): void {
    this.setState({ loadingState: LoadingState.error });
    trackEvent({
      eventCategory: "asyncLoader",
      eventAction: "error",
      eventLabel: error ? error.toString() : undefined
    });
    Raven.captureException(error);
  }
}
