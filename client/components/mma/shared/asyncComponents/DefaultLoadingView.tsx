import { Spinner } from '../../../shared/Spinner';
import { WithStandardTopMargin } from '../../../shared/WithStandardTopMargin';

export function DefaultLoadingView() {
	return (
		<WithStandardTopMargin>
			<Spinner loadingMessage="Loading" />
		</WithStandardTopMargin>
	);
}
