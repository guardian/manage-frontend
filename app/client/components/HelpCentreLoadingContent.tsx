import { css } from '@emotion/react';
import { space } from '@guardian/src-foundations';
import React from 'react';
import { Spinner } from './spinner';
import { WithStandardTopMargin } from './WithStandardTopMargin';

const HelpCentreLoadingContent = () => (
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

export default HelpCentreLoadingContent;
