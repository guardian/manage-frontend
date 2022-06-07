import { css } from '@emotion/react';
import { space } from '@guardian/src-foundations';
import { neutral } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { useState } from 'react';
import { maxWidth, minWidth } from '../../styles/breakpoints';
import { helpCentreNavConfig } from './helpCentreConfig';
import {
	innerSectionCss,
	innerSectionDivCss,
	linkAnchorStyle,
	linkArrowStyle,
	sectionTitleCss,
} from './helpCentreStyles';
import { Link } from 'react-router-dom';

interface HelpCentreNavProps {
	selectedTopicId?: string;
}

const desktopUlCss = css`
	list-style: none;
	margin: 0 0 ${space[6]}px 0;
	padding: 0;
	position: sticky;
	top: 1rem;
	${maxWidth.desktop} {
		display: none;
	}
`;

const desktopLiCss = (isSelectedTopic: boolean, isFirstTopic: boolean) => css`
	${textSans.medium()};
	color: ${neutral['7']};
	border-left: ${isSelectedTopic
		? `${space[2]}px solid #121212`
		: `${space[2]}px solid #dcdcdc`};
	font-weight: ${isSelectedTopic ? '700' : 'normal'};
	cursor: pointer;
	:hover {
		background-color: ${isSelectedTopic ? 'transparent' : neutral['93']};
	}
	::after {
		content: '';
		display: block;
		border-bottom: 1px solid ${neutral['86']};
	}
	::before {
		content: '';
		display: ${isFirstTopic ? 'block' : 'none'};
		border-top: 1px solid ${neutral['86']};
	}
`;

const mobileLiCss = (topicIndex: number) => css`
	${innerSectionDivCss};
	border-bottom: ${topicIndex < helpCentreNavConfig.length - 1
		? '1px solid #dcdcdc'
		: ''};
	cursor: pointer;
	${minWidth.tablet} {
		padding-left: ${space[3]}px;
	}
`;

const divCss = css`
	width: 100%;
	border: 1px solid ${neutral['86']};
	${minWidth.desktop} {
		display: none;
	}
	margin-bottom: ${space[6]}px;
`;

const pCss = css`
	padding: ${space[4]}px ${space[3]}px;
	margin: 0;
`;

const HelpCentreNav = (props: HelpCentreNavProps) => {
	const [open, setOpen] = useState<boolean>(false);

	const handleSectionClick = () => {
		setOpen(!open);
	};

	const h2Css = css`
		${sectionTitleCss(open, false)};
		${textSans.large({ fontWeight: 'bold' })};
		${minWidth.tablet} {
			padding: ${space[3]}px ${space[3] * 2 + 15}px ${space[3]}px
				${space[5]}px;
		}
	`;

	const spanCss = (topicId: string) => css`
		${linkAnchorStyle};
		font-weight: ${topicId === props.selectedTopicId ? 'bold' : 'normal'};
	`;

	return (
		<>
			<ul css={desktopUlCss}>
				{helpCentreNavConfig.map((topic, topicIndex) => (
					<Link to={`/help-centre/topic/${topic.id}`} key={topic.id}>
						<li
							css={desktopLiCss(
								props.selectedTopicId === topic.id,
								topicIndex === 0,
							)}
						>
							<p css={pCss}>{topic.title}</p>
						</li>
					</Link>
				))}
			</ul>

			<div css={divCss}>
				<h2 css={h2Css} onClick={handleSectionClick}>
					Topics
				</h2>
				<ul css={innerSectionCss(open)}>
					{helpCentreNavConfig.map((topic, topicIndex) => {
						return (
							<Link
								to={`/help-centre/topic/${topic.id}`}
								key={topic.id}
								onClick={() => setOpen(false)}
							>
								<li
									key={topic.id}
									css={mobileLiCss(topicIndex)}
								>
									<span css={spanCss(topic.id)}>
										{topic.title}
									</span>
									<span css={linkArrowStyle} />
								</li>
							</Link>
						);
					})}
				</ul>
			</div>
		</>
	);
};

export default HelpCentreNav;
