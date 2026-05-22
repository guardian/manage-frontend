import * as Sentry from '@sentry/browser';
import * as React from 'react';
import { trackEvent } from '../../../utilities/analytics';
import { GenericErrorScreen } from '../../shared/GenericErrorScreen';
import type { LoadingProps } from '../../shared/Spinner';
import { Spinner } from '../../shared/Spinner';
import { WithStandardTopMargin } from '../../shared/WithStandardTopMargin';

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
	Initial, // Ready to fetch
	Fetching, // Currently fetching
	Loaded,
	Error,
}

interface AsyncLoaderState<T> {
	readonly data?: T;
	readonly loadingState: LoadingState;
}

export class AsyncLoader<
	T extends NonNullable<unknown>,
> extends React.Component<AsyncLoaderProps<T>, AsyncLoaderState<T>> {
	public state: AsyncLoaderState<T> = { loadingState: LoadingState.Initial };
	private readerOnOK =
		this.props.readerOnOK || ((resp: Response) => resp.json());

	public componentDidMount(): void {
		if (this.state.loadingState !== LoadingState.Initial) {
			return;
		}

		this.setState({ loadingState: LoadingState.Fetching }, () => {
			this.props
				.fetch()
				.then((resp) =>
					Array.isArray(resp)
						? Promise.all(resp.map(this.processResponse))
						: this.processResponse(resp),
				)
				.then((data) => {
					if (
						!(
							this.props.shouldPreventRender &&
							this.props.shouldPreventRender(data)
						) &&
						data !== null
					) {
						this.setState({
							data,
							loadingState: LoadingState.Loaded,
						});
					}
				})
				.catch((exception) => this.handleError(exception));
		});
	}

	public render(): React.ReactNode {
		if (
			this.state.loadingState === LoadingState.Initial ||
			this.state.loadingState === LoadingState.Fetching
		) {
			return this.props.inline ? (
				<Spinner
					loadingMessage={this.props.loadingMessage}
					inline={this.props.inline}
					scale={this.props.spinnerScale}
				/>
			) : (
				<WithStandardTopMargin>
					<Spinner loadingMessage={this.props.loadingMessage} />
				</WithStandardTopMargin>
			);
		} else if (
			this.state.loadingState === LoadingState.Loaded &&
			this.state.data !== undefined
		) {
			return this.props.render(this.state.data, () =>
				this.setState(
					{ loadingState: LoadingState.Initial },
					// eslint-disable-next-line -- supress @typescript-eslint/unbound-method on this line
					this.componentDidMount,
				),
			);
		} else if (this.props.errorRender) {
			return this.props.errorRender();
		}
		return <GenericErrorScreen />;
	}

	private processResponse = (
		resp: Response,
		_?: number, // index
		allResponses?: Response[],
	) => {
		const locationHeader = resp.headers.get('Location');
		const allResponsesAreOK =
			(allResponses || [resp]).filter((res) => !res.ok).length === 0;
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
			this.setState({ loadingState: LoadingState.Error });
		}
		trackEvent({
			eventCategory: 'asyncLoader',
			eventAction: 'error',
			// eslint-disable-next-line @typescript-eslint/no-base-to-string -- Error.toString will output a string
			eventLabel: error ? error.toString() : undefined,
		});
		Sentry.captureException(error);
	}
}
