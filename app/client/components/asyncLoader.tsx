import React from "react";
import Spinner from "./spinner";

export interface AsyncLoaderProps<T> {
  readonly fetch: () => Promise<T>;
  readonly render: (data: T) => React.ReactNode;
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

export default class AsyncLoader<T> extends React.Component<
  AsyncLoaderProps<T>,
  AsyncLoaderState<T>
> {
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
    switch (this.state.loadingState) {
      case LoadingState.loading:
        return <Spinner />;
      case LoadingState.loaded:
        return this.state.data ? (
          this.props.render(this.state.data)
        ) : (
          <h1>Impossible Error</h1>
        );
      case LoadingState.error:
        return this.props.errorRender ? (
          this.props.errorRender()
        ) : (
          <h1>Error</h1>
        );
    }
  }
}
