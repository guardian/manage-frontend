import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	from,
	palette,
	space,
	textSansBold17,
} from '@guardian/source/foundations';
import { SvgRoundelBrand } from '@guardian/source/react-components';
import { androidAppUrl, iosAppUrl } from '@/shared/externalLinks';
import { AndroidPlayStoreButton } from './assets/AndroidPlayStoreButton';
import { AppleAppStoreButton } from './assets/AppleAppStoreButton';

interface DownloadAppCtaProps {
	additionalCss?: SerializedStyles;
}

const appAdCss = css`
	background-color: ${palette.sport[800]};
	padding: ${space[3]}px ${space[3]}px ${space[5]}px;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	h4 {
		${textSansBold17};
		margin: 0 ${space[5]}px 0 0;
	}
	p {
		margin: ${space[1]}px ${space[5]}px ${space[4]}px 0;
	}
	${from.tablet} {
		padding: ${space[6]}px;
	}
`;

const appIconContainerCss = css`
	width: 55px;
	min-width: 55px;
	height: 55px;
	border-radius: 10px;
	background-color: ${palette.brand[400]};
`;

export const DownloadAppCta = (props: DownloadAppCtaProps) => {
	return (
		<div css={[appAdCss, props.additionalCss]}>
			<div>
				<h4>If you haven't already, download the Guardian App</h4>
				<p>
					Unlock limitless Guardian journalism in our quality news app
					today.
				</p>
				<AppleAppStoreButton
					link={iosAppUrl}
					additionalCss={css`
						margin-right: ${space[3]}px;
					`}
				/>
				<AndroidPlayStoreButton link={androidAppUrl} />
			</div>
			<i css={appIconContainerCss}>
				<SvgRoundelBrand />
			</i>
		</div>
	);
};
