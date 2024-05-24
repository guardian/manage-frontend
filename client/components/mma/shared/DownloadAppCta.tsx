import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { palette, space, textSansBold17 } from '@guardian/source/foundations';
import { SvgRoundelDefault } from '@guardian/source/react-components';
import { androidAppUrl, iosAppUrl } from '@/shared/externalLinks';
import { AndroidPlayStoreButton } from './assets/AndroidPlayStoreButton';
import { AppleAppStoreButton } from './assets/AppleAppStoreButton';

interface DownloadAppCtaProps {
	additionalCss?: SerializedStyles;
}

const appAdCss = css`
	background-color: ${palette.neutral[97]};
	padding: ${space[6]}px ${space[3]}px;
	h4 {
		${textSansBold17};
		margin: 0;
	}
`;

const appAddContentContainerCss = css`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-top: ${space[5]}px;
`;

const appIconContainerCss = css`
	width: 55px;
	height: 55px;
	border-radius: 10px;
	background-color: ${palette.neutral[7]};
`;

export const DownloadAppCta = (props: DownloadAppCtaProps) => {
	return (
		<div css={[appAdCss, props.additionalCss]}>
			<h4>If you haven't already, download your subscriber's app</h4>
			<div css={appAddContentContainerCss}>
				<div>
					<h4>The Guardian News app</h4>
					<p>
						Unlock limitless Guardian journalism in our quality news
						app today.
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
					<SvgRoundelDefault />
				</i>
			</div>
		</div>
	);
};
