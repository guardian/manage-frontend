import type { ReactElement, ReactNode } from 'react';
import { Component } from 'react';

interface Props {
	children: ReactNode;
	fallback: ReactElement | ((error: string) => ReactElement);
}

interface State {
	hasError: boolean;
	error: string;
}

export class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false,
		error: '',
	};

	public static getDerivedStateFromError(error: Error): State {
		return {
			hasError: true,
			error: `${error.name}: ${error.message}`,
		};
	}

	public render(): ReactNode {
		if (this.state.hasError) {
			const fallback = this.props.fallback;
			if (typeof fallback === 'function') {
				return fallback(this.state.error);
			}
			return fallback;
		}

		return this.props.children;
	}
}
