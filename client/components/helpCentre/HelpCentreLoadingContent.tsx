import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import { Spinner } from '../shared/Spinner';
import { WithStandardTopMargin } from '../shared/WithStandardTopMargin';

export const HelpCentreLoadingContent = () => (
	<div
		css={css`
			margin-bottom: ${space[24]}px;
		`}
	>
		<WithStandardTopMargin>
			<Spinner />
		</WithStandardTopMargin>
		<div style={{ height: '50vh' }} />
	</div>
);
