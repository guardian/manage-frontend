import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import { LinkButton, Stack } from '@guardian/source-react-components';
import { linkCss } from '@/client/components/mma/upgrade/UpgradeSupportStyles';
import {
	buttonCentredCss,
	stackedButtonLayoutCss,
} from '../../../../../styles/ButtonStyles';
import {
	headingCss,
	sectionSpacing,
} from '../../../../../styles/GenericStyles';
import { paragraphListCss } from '../SaveStyles';

export const ConfirmDigisubDiscount = () => {
	return (
		<>
			<Stack
				cssOverrides={css`
					margin: ${space[5]}px 0 ${space[12]}px;
				`}
			>
				<h2 css={headingCss}>3-month discount confirmed</h2>
				<p css={paragraphListCss}>
					Thank you for continuing to fund our journalism.
				</p>
			</Stack>
			<section css={sectionSpacing}>
				<div css={stackedButtonLayoutCss}>
					<LinkButton
						href="https://theguardian.com"
						cssOverrides={buttonCentredCss}
					>
						Continue to the Guardian
					</LinkButton>
					<div css={linkCss}>
						<a href="/">Back to account overview </a>
					</div>
				</div>
			</section>
		</>
	);
};
