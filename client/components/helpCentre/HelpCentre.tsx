import { css } from '@emotion/react';
import { from, headline, neutral, space } from '@guardian/source/foundations';
import { helpCentreConfig } from './HelpCentreConfig';
import { HelpCentreContactOptions } from './HelpCentreContactOptions';
import { HelpCentreLandingMoreTopics } from './HelpCentreLandingMoreTopics';
import { HelpTopicBox } from './HelpTopicBox';

const subtitleStyles = css`
	margin-top: 30px;
	margin-bottom: ${space[6]}px;
	${headline.small({ fontWeight: 'bold' })};
	border-top: 1px solid ${neutral['86']};
	${from.tablet} {
		margin-bottom: ${space[6]}px;
		margin-top: 40px;
	}
`;

export const HelpCentre = () => {
	return (
		<>
			<div>
				<h2 css={subtitleStyles}>Most popular topics</h2>
				<div
					css={css`
						display: flex;
						flex-wrap: wrap;
						align-items: stretch;
						justify-content: space-between;
					`}
				>
					{helpCentreConfig.map((topic) => (
						<HelpTopicBox key={topic.id} topic={topic} />
					))}
				</div>
				<h2 css={subtitleStyles}>More Topics</h2>
				{/* HelpCentreMoreTopics will replace HelpCentreLandingMoreTopics
				once we convert the landing page to loading dynamic content */}
				<HelpCentreLandingMoreTopics />
				<HelpCentreContactOptions />
			</div>
		</>
	);
};
