import { css } from '@emotion/react';
import { from, neutral, space, textSans } from '@guardian/source/foundations';
import { Button } from '@guardian/source/react-components';
import { Link, useNavigate } from 'react-router-dom';
import { trackEvent } from '../../utilities/analytics';
import { getHelpSectionIcon } from '../mma/shared/assets/HelpSectionIcons';
import type { HelpCentreTopic } from './HelpCentreConfig';
import {
	linkAnchorStyle,
	linkArrowStyle,
	linkListItemStyle,
	linksListStyle,
} from './HelpCentreStyles';

interface HelpTopicBoxProps {
	topic: HelpCentreTopic;
}

const boxHolderStyle = css`
	border: 1px solid ${neutral['86']};
	flex-basis: 100%;
	display: flex;
	flex-direction: column;
	margin-bottom: ${space[5]}px;
	${from.tablet} {
		flex-basis: 48%;
		flex-basis: calc(50% - (${space[5]}px * 0.5));
	}
	${from.desktop} {
		flex-basis: 30%;
		flex-basis: calc(33.3% - (${space[5]}px * 0.666));
	}
`;

const boxTitleStyle = css`
	${textSans.medium({ fontWeight: 'bold' })};
	color: #333333;
	position: relative;
	margin: 0;
	padding: 18px 0 18px 60px;
	border-bottom: 1px solid ${neutral['86']};
	width: 100%;
`;

const iconStyle = css`
	position: absolute;
	top: 11px;
	left: 11px;
`;

const linksLisWithMargintStyle = css`
	${linksListStyle};
	padding: 0 ${space[3]}px;
`;

export const HelpTopicBox = (props: HelpTopicBoxProps) => {
	const navigate = useNavigate();
	return (
		<div css={boxHolderStyle}>
			<h2 css={boxTitleStyle}>
				<i css={iconStyle}>{getHelpSectionIcon(props.topic.id)}</i>
				{props.topic.title}
			</h2>
			<ul css={linksLisWithMargintStyle}>
				{props.topic.links.map((question, questionIndex) => (
					<li
						key={`${props.topic.id}Question-${questionIndex}`}
						css={linkListItemStyle}
					>
						<Link
							to={question.link}
							css={linkAnchorStyle}
							onClick={() => {
								trackEvent({
									eventCategory: 'help-centre',
									eventAction: 'popular-topic-q-click',
									eventLabel: `${props.topic.id}-${question.id}`,
								});
							}}
						>
							{question.title}
						</Link>
						<span css={linkArrowStyle} />
					</li>
				))}
			</ul>
			<div
				css={css`
					margin: auto 11px 20px 11px;
				`}
			>
				<Button
					priority="secondary"
					onClick={() => {
						trackEvent({
							eventCategory: 'help-centre',
							eventAction: 'popular-topic-see-all-click',
							eventLabel: props.topic.id,
						});
						navigate(props.topic.seeAllLink);
					}}
				>
					See all
				</Button>
			</div>
		</div>
	);
};
