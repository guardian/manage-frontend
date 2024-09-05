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
import { androidFeastAppUrl, iosFeastAppUrl } from '@/shared/externalLinks';
import { AndroidPlayStoreButton } from './assets/AndroidPlayStoreButton';
import { AppleAppStoreButton } from './assets/AppleAppStoreButton';

interface DownloadFeastAppCtaWithImageProps {
	additionalCss?: SerializedStyles;
}

const containerCss = css`
	background-color: #e1e5d5;
	h4 {
		${textSansBold17};
		margin: 0 ${space[5]}px 0 0;
	}
	p {
		${textSans15};
		margin: ${space[1]}px ${space[5]}px 0 0;
	}
	${from.tablet} {
		padding: ${space[6]}px 0 0 ${space[6]}px;
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
	background: linear-gradient(transparent, rgba(0, 0, 0, 0.1));
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

export const DownloadFeastAppCtaWithImage = (
	props: DownloadFeastAppCtaWithImageProps,
) => {
	return (
		<div css={[containerCss, props.additionalCss]}>
			<div css={inlineContentsCss}>
				<div css={copyContainerCss}>
					<h4>The Guardian Feast app</h4>
					<p>
						Discover thousands of recipes from the Guardian and
						Observer in our ultimate cooking companion app.
					</p>
					<div css={appStoreBtnsContainerCss}>
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
				<div css={heroImageContainerCss}>
					<img
						css={heroImageCss}
						src="https://i.guim.co.uk/img/media/a3400ec516a9b46348cc6d898441b6c4e20a52af/0_0_1172_728/500.png?width=400&quality=75&s=79a92c6634c653e25047589a1832a343"
					/>
				</div>
			</div>
		</div>
	);
};
