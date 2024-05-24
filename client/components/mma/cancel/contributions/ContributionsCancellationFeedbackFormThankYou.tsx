import { css } from '@emotion/react';
import { neutral, space } from '@guardian/source/foundations';
import type * as React from 'react';

const containerStyles = css`
	margin-left: ${space[4]}px;
	padding-left: ${space[4]}px;
	border-left: 1px solid ${neutral[7]};
`;

export const ContributionsCancellationFeedbackFormThankYou: React.FC = () => {
	return (
		<div css={containerStyles}>
			<p
				css={{
					fontSize: '1rem',
					fontWeight: 500,
				}}
			>
				Thank you for your feedback.
			</p>
			<span>
				The Guardian is dedicated to keeping our independent,
				investigative journalism open to all. We report on the facts,
				challenging the powerful and holding them to account. Support
				from our readers makes what we do possible and we appreciate
				hearing from you to help improve our service.
			</span>
		</div>
	);
};
