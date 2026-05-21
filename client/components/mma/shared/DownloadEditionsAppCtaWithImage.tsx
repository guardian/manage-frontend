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
	background-color: #f3e6e9;
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

export const DownloadEditionsAppCtaWithImage = (
	props: DownloadAppCtaVariation1Props,
) => {
	return (
		<div css={[containerCss, props.additionalCss]}>
			<div css={inlineContentsCss}>
				<div css={copyContainerCss}>
					<h4>The Guardian Editions app</h4>
					<p>
						Enjoy unlimited access to our full range of e-paper and
						magazines, including the Guardian Weekly and Long Read,
						available for mobile and tablet.
					</p>
					<div css={appStoreBtnsContainerCss}>
						<AppleAppStoreButton
							linkKey={StoreLinksMapKey.IosEditions}
							overrideButtonHeight="36px"
							additionalCss={css`
								margin-right: ${space[3]}px;
							`}
						/>
						<AndroidPlayStoreButton
							linkKey={StoreLinksMapKey.AndroidEditions}
							overrideButtonHeight="36px"
						/>
					</div>
				</div>
				<div css={heroImageContainerCss}>
					<img
						css={heroImageCss}
						src="https://i.guim.co.uk/img/media/8b032a274becf6b3a46e6938a3fd774c70b25bfe/0_0_1360_740/1360.png?width=800&quality=75&s=198b5aa5471c0bf4ea49feda278535aa"
					/>
				</div>
			</div>
		</div>
	);
};
