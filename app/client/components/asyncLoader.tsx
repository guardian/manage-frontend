import React from "react";
import Spinner from "./spinner";

export interface AsyncLoaderProps<T> {
    fetch: () => Promise<T>;
    render: (data: T) => React.ReactNode;
}

export enum LoadingState {
    loading,
    loaded,
    error
}

export interface AsyncLoaderState<T> {
    data?: T
    loadingState: LoadingState
};

export default class AsyncLoader<T> extends React.Component<
    AsyncLoaderProps<T>,
    AsyncLoaderState<T>
    > {

    state: AsyncLoaderState<T> = {loadingState: LoadingState.loading}

    public componentDidMount(): void {
        this.props.fetch().then(data => {
            this.setState({data, loadingState: LoadingState.loaded});
        }).catch(_ => this.setState({loadingState: LoadingState.error}))
    }


    public render() {

        switch (this.state.loadingState){
            case LoadingState.loading : return <Spinner />;
            case LoadingState.loaded : return this.state.data ? this.props.render(this.state.data) : <h1>Super Boom</h1>;
            case LoadingState.error : return <h1>Boom</h1>;
        }

    }
}
