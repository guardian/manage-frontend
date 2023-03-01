import { Spinner } from '../../../shared/Spinner';
import { WithStandardTopMargin } from '../../../shared/WithStandardTopMargin';

export function DefaultLoadingView(props?: { loadingMessage?: string }) {
	return (
		<WithStandardTopMargin>
			<Spinner loadingMessage={props?.loadingMessage ?? 'Loading'} />
		</WithStandardTopMargin>
	);
}
