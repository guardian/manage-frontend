import { css } from '@emotion/core';
import { space } from '@guardian/src-foundations';
import { Link } from '@reach/router';
import { trackEvent } from '../../services/analytics';
import {
	h2Css,
	linkAnchorStyle,
	linkArrowStyle,
	linkListItemStyle,
	linksListStyle,
} from './helpCentreStyles';
import { SingleTopic } from './HelpCentreTypes';

interface HelpCentreSingleTopicProps {
	id: string;
	topic: SingleTopic;
}

const ulCss = css`
	${linksListStyle};
	margin: ${space[9]}px 0 60px;
`;

const liCss = (index: number) => css`
	${linkListItemStyle};
	padding: 15px ${space[5]}px 15px 0;
	border-top: ${index === 0 ? '1px solid #DCDCDC' : 'none'};
`;

export const HelpCentreSingleTopic = (props: HelpCentreSingleTopicProps) => {
	return (
		<>
			<h2 css={h2Css}>{props.topic.title}</h2>
			<ul css={ulCss}>
				{props.topic.articles.map((article, articleIndex) => (
					<li
						key={`${props.id}Article-${articleIndex}`}
						css={liCss(articleIndex)}
					>
						<Link
							css={linkAnchorStyle}
							to={`/help-centre/article/${article.path}`}
							replace={false}
							onClick={() => {
								trackEvent({
									eventCategory: 'help-centre',
									eventAction: 'article-click',
									eventLabel: `${props.id}:${article.path}`,
								});
							}}
						>
							{article.title}
						</Link>
						<span css={linkArrowStyle} />
					</li>
				))}
			</ul>
		</>
	);
};
