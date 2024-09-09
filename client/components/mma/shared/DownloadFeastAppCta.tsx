import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { from, space, textSansBold17 } from '@guardian/source/foundations';
import { androidFeastAppUrl, iosFeastAppUrl } from '@/shared/externalLinks';
import { AndroidPlayStoreButton } from './assets/AndroidPlayStoreButton';
import { AppleAppStoreButton } from './assets/AppleAppStoreButton';
import { FeastAppIcon } from './assets/FeastAppIcon';

interface DownloadFeastAppCtaProps {
	additionalCss?: SerializedStyles;
}

const appAdCss = css`
	background-color: #e1e5d5;
	padding: ${space[3]}px ${space[3]}px ${space[5]}px;
	h4 {
		${textSansBold17};
		margin: 0 ${space[5]}px 0 0;
	}
	p {
		margin: ${space[1]}px ${space[5]}px 0 0;
	}

	${from.tablet} {
		padding: ${space[6]}px ${space[12]}px ${space[6]}px ${space[6]}px;
	}
`;

const inlineContentsCss = css`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: ${space[4]}px;
`;

const appIconContainerCss = css`
	width: 55px;
	min-width: 55px;
	height: 55px;
	border-radius: 10px;
	${from.tablet} {
		width: 70px;
		min-width: 70px;
		height: 70px;
	}
`;

export const DownloadFeastAppCta = (props: DownloadFeastAppCtaProps) => {
	return (
		<div css={[appAdCss, props.additionalCss]}>
			<div css={inlineContentsCss}>
				<div>
					<h4>If you haven't already, download the Feast App</h4>
					<p>
						Make a feast out of anything with the Guardian's new
						recipe app - Feast.
					</p>
				</div>
				<i css={appIconContainerCss}>
					<FeastAppIcon />
				</i>
			</div>
			<div>
				<AppleAppStoreButton
					link={iosFeastAppUrl}
					overrideButtonHeight="36px"
					additionalCss={css`
						margin-right: ${space[3]}px;
					`}
				/>
				<AndroidPlayStoreButton
					link={androidFeastAppUrl}
					overrideButtonHeight="36px"
				/>
			</div>
		</div>
	);
};
