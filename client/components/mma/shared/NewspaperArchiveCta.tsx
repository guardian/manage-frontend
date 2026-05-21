import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	breakpoints,
	from,
	palette,
	space,
	textSans15,
	textSans17,
	textSansBold17,
	textSansBold20,
	until,
} from '@guardian/source/foundations';
import {
	LinkButton,
	SvgArrowRightStraight,
} from '@guardian/source/react-components';
import { trackEvent } from '@/client/utilities/analytics';

interface NewspaperArchiveCtaProps {
	additionalCss?: SerializedStyles;
}

const containerCss = css`
	border-radius: ${space[2]}px;
	background-color: #1e3e72;
	color: ${palette.neutral[100]};
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

const heroImageContainerCss = css`
	background: linear-gradient(transparent, rgba(0, 0, 0, 0.1));
	display: flex;
	align-items: flex-end;
	justify-content: center;
	flex-grow: 1;
	order: 1;
	${from.tablet} {
		background: none;
		justify-content: flex-end;
		order: 2;
	}
`;

const heroImageCss = css`
	border-radius: 0 0 ${space[2]}px 0;
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
						search through every page printed in our newspapers.
					</p>
					<LinkButton
						href={'/newspaperArchive/auth'}
						priority="tertiary"
						theme={{
							backgroundTertiary: palette.neutral[100],
						}}
						cssOverrides={css`
							margin-top: ${space[5]}px;
						`}
						icon={<SvgArrowRightStraight />}
						iconSide="right"
						onClick={onExploreBtnClick}
						size="small"
						target="_blank"
						rel="noopener noreferrer"
					>
						Explore the archive
					</LinkButton>
				</div>
				<div css={heroImageContainerCss}>
					<picture>
						<source
							srcSet="https://i.guim.co.uk/img/media/f7dfa19a4902203e3bc0e61268c822c01a341b51/0_0_1357_740/1000.png?width=1000&quality=75&s=887d21d6bddd50218ce2c5746e4af519"
							media={`(min-width: ${breakpoints.tablet}px)`}
						/>
						<img
							css={heroImageCss}
							src="https://i.guim.co.uk/img/media/f7dfa19a4902203e3bc0e61268c822c01a341b51/0_0_1357_740/1000.png?width=700&quality=75&s=bc4fb813a0d89c5e2e590b0569543985"
						/>
					</picture>
				</div>
			</div>
		</div>
	);
};
