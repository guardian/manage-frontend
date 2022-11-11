import { css } from '@emotion/react';
import { headline, space } from '@guardian/source-foundations';

export const WelcomeMessage = () => {
	return (
		<hgroup
			css={css`
				margin-top: ${space[12]}px;
			`}
		>
			<h2
				css={css`
					${headline.large({ fontWeight: 'bold' })};
					margin-bottom: 0;
				`}
			>
				Hello James
			</h2>
			<p
				css={css`
					${headline.xxxsmall()};
				`}
			>
				Thanks for supporting the Guardian since 2016
			</p>
		</hgroup>
	);
};
