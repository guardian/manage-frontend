import React from "react";
import { LoadingProps, Spinner } from "./spinner";

export interface AsyncLoaderProps<T> extends LoadingProps {
  readonly fetch: () => Promise<T>;
  readonly render: (data: T) => React.ReactNode;
  readonly loadingMessage: string;
  readonly errorRender?: () => React.ReactNode;
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

  public componentDidMount(): void {
    this.props
      .fetch()
      .then(data => {
        this.setState({ data, loadingState: LoadingState.loaded });
      })
      .catch(_ => this.setState({ loadingState: LoadingState.error }));
  }

  public render(): React.ReactNode {
    if (this.state.loadingState === LoadingState.loading) {
      return <Spinner loadingMessage={this.props.loadingMessage} />;
    } else if (
      this.state.loadingState === LoadingState.loaded &&
      this.state.data !== undefined
    ) {
      return this.props.render(this.state.data);
    } else if (this.props.errorRender) {
      return this.props.errorRender();
    }
    return <h1>Error</h1>;
  }
}
