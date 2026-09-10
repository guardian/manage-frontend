import { css } from '@emotion/react';
import {
	from,
	headlineBold24,
	headlineBold28,
	palette,
	space,
	textSans15,
	textSans17,
	textSansBold17,
	textSansBold20,
} from '@guardian/source/foundations';
import { SvgChevronDownSingle } from '@guardian/source/react-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export type FaqItem = {
	id: string;
	title: string;
	content: string[];
};

export type FaqsProps = {
	items: FaqItem[];
	viewMoreHref: string;
	heading?: string;
	viewMoreLabel?: string;
};

const headerCss = css`
	display: flex;
	align-items: baseline;
	justify-content: space-between;
	gap: ${space[3]}px;
	margin-bottom: ${space[5]}px;
`;

const headingCss = css`
	margin: 0;
	${headlineBold24};

	${from.desktop} {
		${headlineBold28};
	}
`;

const viewMoreCss = css`
	${textSans15};
	color: ${palette.brand[500]};
	text-decoration: underline;
	white-space: nowrap;
	flex-shrink: 0;

	&:hover {
		color: ${palette.brand[400]};
	}
`;

const listCss = css`
	list-style: none;
	margin: 0;
	padding: 0 ${space[4]}px;
	border: 1px solid ${palette.neutral[86]};
	border-radius: ${space[2]}px;
`;

const itemCss = css`
	border-top: 1px solid ${palette.neutral[86]};

	&:first-of-type {
		border-top: none;
	}
`;

const toggleCss = css`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: ${space[3]}px;
	width: 100%;
	min-height: ${space[16]}px;
	padding: ${space[4]}px 0;
	border: none;
	background: transparent;
	cursor: pointer;
	text-align: left;
	color: ${palette.neutral[7]};
`;

const titleCss = css`
	${textSansBold17};

	${from.desktop} {
		${textSansBold20};
	}
`;

const chevronCss = (isOpen: boolean) => css`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	transform: ${isOpen ? 'rotate(180deg)' : 'none'};
	transition: transform 0.2s ease;

	/* Source's chevron has 3px of padding on each side of its viewBox, so it is
	   rendered at 30px and inset by the difference to keep a 24px footprint. */
	svg {
		width: 30px;
		height: 30px;
		margin: -3px;
		fill: ${palette.neutral[7]};
	}
`;

const panelCss = css`
	display: flex;
	flex-direction: column;
	gap: ${space[3]}px;
	${textSans17};
	color: ${palette.neutral[7]};
	padding: 0 0 ${space[4]}px 0;
	margin: 0;
`;

const paragraphCss = css`
	margin: 0;
`;

export const Faqs = ({
	items,
	viewMoreHref,
	heading = 'FAQs',
	viewMoreLabel = 'view more FAQs',
}: FaqsProps) => {
	const [openIds, setOpenIds] = useState<string[]>([]);

	const toggleItem = (id: string) => {
		setOpenIds((current) =>
			current.includes(id)
				? current.filter((openId) => openId !== id)
				: [...current, id],
		);
	};

	return (
		<section>
			<div css={headerCss}>
				<h2 css={headingCss}>{heading}</h2>
				<Link to={viewMoreHref} css={viewMoreCss}>
					{viewMoreLabel}
				</Link>
			</div>

			<ul css={listCss}>
				{items.map((item) => {
					const isOpen = openIds.includes(item.id);
					const panelId = `faq-panel-${item.id}`;

					return (
						<li key={item.id} css={itemCss}>
							<button
								type="button"
								css={toggleCss}
								aria-expanded={isOpen}
								aria-controls={panelId}
								onClick={() => toggleItem(item.id)}
							>
								<span css={titleCss}>{item.title}</span>
								<span css={chevronCss(isOpen)} aria-hidden>
									<SvgChevronDownSingle />
								</span>
							</button>
							{isOpen && (
								<div css={panelCss} id={panelId} role="region">
									{item.content.map((paragraph) => (
										<p key={paragraph} css={paragraphCss}>
											{paragraph}
										</p>
									))}
								</div>
							)}
						</li>
					);
				})}
			</ul>
		</section>
	);
};
