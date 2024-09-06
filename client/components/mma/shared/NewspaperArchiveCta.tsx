import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	culture,
	from,
	space,
	textSans15,
	textSans17,
	textSansBold17,
	textSansBold20,
	until,
} from '@guardian/source/foundations';
import { LinkButton } from '@guardian/source/react-components';
import { trackEvent } from '@/client/utilities/analytics';

interface NewspaperArchiveCtaProps {
	additionalCss?: SerializedStyles;
}

const containerCss = css`
	background-color: ${culture[700]};
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
						href={'/newspaperArchive/auth'}
						cssOverrides={css`
							margin-top: ${space[5]}px;
						`}
						onClick={onExploreBtnClick}
						size="small"
						target="_blank"
						rel="noopener noreferrer"
					>
						Explore the website
					</LinkButton>
				</div>
				<div css={heroImageContainerCss}>
					<img
						css={heroImageCss}
						src="https://i.guim.co.uk/img/media/336f4eb3feac3317de5d92f7df9f0c2564afe28f/0_0_1360_740/1000.png?width=1000&quality=75&s=f9c061523ac93e79d187415a8702a9cb"
					/>
				</div>
			</div>
		</div>
	);
};
