import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	from,
	palette,
	space,
	textSansBold17,
} from '@guardian/source/foundations';
import { androidFeastAppUrl, iosFeastAppUrl } from '@/shared/externalLinks';
import { AndroidPlayStoreButton } from './assets/AndroidPlayStoreButton';
import { AppleAppStoreButton } from './assets/AppleAppStoreButton';

interface DownloadFeastAppCtaWithImageProps {
	additionalCss?: SerializedStyles;
}

const containerCss = css`
	background-color: ${palette.culture[800]};
	padding: ${space[3]}px ${space[3]}px ${space[5]}px;
	h4 {
		${textSansBold17};
		margin: 0 ${space[5]}px 0 0;
	}
	p {
		margin: ${space[1]}px ${space[5]}px 0 0;
	}
	${from.tablet} {
		padding: ${space[6]}px 0 0 ${space[6]}px;
	}
`;

const inlineContentsCss = css`
	display: flex;
	flex-direction: column;
	${from.tablet} {
		flex-direction: row;
	}
`;

const copyContainerCss = css`
	order: 2;
	margin-top: ${space[4]}px;
	${from.tablet} {
		order: 1;
		margin: 0 0 ${space[6]}px;
	}
`;

const appStoreBtnsContainerCss = css`
	margin-top: ${space[4]}px;
`;

const heroImageCss = css`
	margin: 0 auto;
	width: 100%;
	max-width: 450px;
	order: 1;
	${from.tablet} {
		order: 2;
		max-width: 293px;
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
						Make a feast out of anything with the Guardian’s new
						recipe app.
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
				<img
					css={heroImageCss}
					src="https://i.guim.co.uk/img/media/a3400ec516a9b46348cc6d898441b6c4e20a52af/0_0_1172_728/500.png?width=400&quality=75&s=79a92c6634c653e25047589a1832a343"
				/>
			</div>
		</div>
	);
};
