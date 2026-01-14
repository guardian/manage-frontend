import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	from,
	space,
	textSans15,
	textSans17,
	textSansBold17,
	textSansBold20,
	until,
} from '@guardian/source/foundations';
import { StoreLinksMapKey } from '@/shared/externalLinks';
import { AndroidPlayStoreButton } from './assets/AndroidPlayStoreButton';
import { AppleAppStoreButton } from './assets/AppleAppStoreButton';

interface DownloadAppCtaVariation1Props {
	additionalCss?: SerializedStyles;
}

const containerCss = css`
	border-radius: ${space[2]}px;
	background-color: #e1eaf7;
	h4 {
		${textSansBold17};
		margin: 0 ${space[5]}px 0 0;
	}
	p {
		${textSans15};
		margin: ${space[1]}px ${space[5]}px 0 0;
	}
	${from.tablet} {
		padding: ${space[3]}px 0 0 ${space[3]}px;
		h4 {
			${textSansBold20};
		}
		p {
			${textSans17};
		}
	}
`;

const inlineContentsCss = css`
	display: flex;
	flex-direction: column;
	column-gap: ${space[3]}px;
	${from.tablet} {
		flex-direction: row;
	}
`;

const copyContainerCss = css`
	order: 2;
	margin-top: ${space[4]}px;
	padding: 0 ${space[3]}px ${space[5]}px;
	${from.tablet} {
		order: 1;
		margin: 0 0 ${space[6]}px;
		padding: 0;
	}
`;

const appStoreBtnsContainerCss = css`
	margin-top: ${space[4]}px;
`;

const heroImageContainerCss = css`
	align-items: flex-end;
	background: linear-gradient(transparent, rgba(0, 0, 0, 0.1));
	display: flex;
	flex-grow: 1;
	order: 1;
	${from.tablet} {
		background: none;
		order: 2;
	}
`;

const heroImageCss = css`
	margin: 0 auto;
	max-width: 450px;
	${until.tablet} {
		width: 100%;
	}
	${from.tablet} {
		max-width: 340px;
	}
`;

export const DownloadAppCtaVariation1 = (
	props: DownloadAppCtaVariation1Props,
) => {
	return (
		<div css={[containerCss, props.additionalCss]}>
			<div css={inlineContentsCss}>
				<div css={copyContainerCss}>
					<h4>The Guardian News app</h4>
					<p>
						Never miss a story with unlimited access to our quality
						news app, plus enjoy personalised recommendations and
						offline reading.
					</p>
					<div css={appStoreBtnsContainerCss}>
						<AppleAppStoreButton
							linkKey={StoreLinksMapKey.Ios}
							overrideButtonHeight="36px"
							additionalCss={css`
								margin-right: ${space[3]}px;
							`}
						/>
						<AndroidPlayStoreButton
							linkKey={StoreLinksMapKey.Android}
							overrideButtonHeight="36px"
						/>
					</div>
				</div>
				<div css={heroImageContainerCss}>
					<img
						css={heroImageCss}
						src="https://i.guim.co.uk/img/media/791a0ae1bad0623ee0f1d17fa0a96e2a5ea0f2fc/0_0_1360_740/1360.png?width=800&quality=75&s=662372d6dc60554a7970446351376715"
					/>
				</div>
			</div>
		</div>
	);
};
