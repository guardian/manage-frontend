import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	from,
	space,
	textSansBold17,
	until,
} from '@guardian/source/foundations';
import { LinkButton } from '@guardian/source/react-components';
import { trackEvent } from '@/client/utilities/analytics';

interface NewspaperArchiveCtaProps {
	additionalCss?: SerializedStyles;
}

const containerCss = css`
	background-color: #f8f5f7;
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

export const NewspaperArchiveCta = (props: NewspaperArchiveCtaProps) => {
	const onExploreBtnClick = () =>
		trackEvent({
			eventCategory: 'DigitalPlusPrintCta',
			eventAction: 'digital_plus_print_cta_click',
			eventLabel: 'newspaper_archive',
		});

	return (
		<div css={[containerCss, props.additionalCss]}>
			<div css={inlineContentsCss}>
				<div css={copyContainerCss}>
					<h4>The Guardian Newspaper archive</h4>
					<p>
						Journey through more than 200 years of the Guardian and
						Observer and search through every page printed in our
						newspapers.
					</p>
					<LinkButton
						href={'dobedo'}
						cssOverrides={css`
							margin-top: ${space[5]}px;
						`}
						onClick={onExploreBtnClick}
					>
						Explore the website
					</LinkButton>
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
