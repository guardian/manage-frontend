import { css } from '@emotion/react';
import { neutral, space, textSans, until } from '@guardian/source/foundations';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../../utilities/analytics';
import {
	h2Css,
	innerSectionCss,
	innerSectionDivCss,
	linkAnchorStyle,
	linkArrowStyle,
	sectionTitleCss,
} from './HelpCentreStyles';
import type { MoreTopics } from './HelpCentreTypes';

const moreTopicsStyles = css`
	margin-bottom: '10px';
	display: 'flex';
	flex-wrap: 'wrap';
	text-align: 'left';
	font-weight: 'normal';
`;

const showHideCss = css`
	${textSans.xsmall()};
	margin-left: ${space[3]}px;
	${until.mobileMedium} {
		display: none;
	}
`;

const liStyles = (index: number, length: number) => css`
	${innerSectionDivCss};
	${index < length - 1 && `border-bottom: 1px solid ${neutral[86]}`};
`;

interface HelpCentreMoreTopicsProps {
	id: string;
	moreTopics: MoreTopics;
}

export const HelpCentreMoreTopics = (props: HelpCentreMoreTopicsProps) => {
	const [openSection, setOpenSection] = useState<number>();
	const moreTopicContainterCss = css`
		width: 100%;
		border-top: 1px solid ${neutral['86']};
		border-bottom: 1px solid ${neutral['86']};
	`;
	return (
		<>
			<h2 css={h2Css}>{props.moreTopics.title}</h2>
			<div css={moreTopicsStyles}>
				<div css={moreTopicContainterCss}>
					{props.moreTopics.topics.map((topic, topicIndex) => {
						const isOpen = topicIndex === openSection;
						const isNotFirstOption = topicIndex > 0;
						const moreTopicSectionTitleCss = css`
							${sectionTitleCss(isOpen, isNotFirstOption)};
							padding-left: 0;
						`;

						return (
							<div key={topic.path}>
								<h2
									css={moreTopicSectionTitleCss}
									onClick={() =>
										setOpenSection(
											openSection === topicIndex
												? -1
												: topicIndex,
										)
									}
								>
									{topic.title}
									<span css={showHideCss}>
										{isOpen ? 'Hide' : 'Show'}
									</span>
								</h2>
								<ul css={innerSectionCss(isOpen)}>
									{topic.articles.map(
										(article, articleIndex) => (
											<li
												key={article.path}
												css={liStyles(
													articleIndex,
													topic.articles.length,
												)}
											>
												<Link
													css={linkAnchorStyle}
													to={`/help-centre/article/${article.path}`}
													replace={false}
													onClick={() => {
														trackEvent({
															eventCategory:
																'help-centre',
															eventAction:
																'article-click',
															eventLabel: `${topic.path}:${article.path}`,
														});
													}}
												>
													{article.title}
												</Link>
												<span css={linkArrowStyle} />
											</li>
										),
									)}
								</ul>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};
