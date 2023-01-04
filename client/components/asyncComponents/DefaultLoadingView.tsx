import { Spinner } from '../spinner';
import { WithStandardTopMargin } from '../WithStandardTopMargin';

export function DefaultLoadingView() {
	return (
		<WithStandardTopMargin>
			<Spinner loadingMessage="Loading" />
		</WithStandardTopMargin>
	);
}
