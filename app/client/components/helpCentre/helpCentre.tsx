import { css } from '@emotion/react';
import { space } from '@guardian/src-foundations';
import { neutral } from '@guardian/src-foundations/palette';
import { headline } from '@guardian/src-foundations/typography';
import { RouteComponentProps } from '@reach/router';
import { minWidth } from '../../styles/breakpoints';
import { helpCentreConfig } from './helpCentreConfig';
import HelpCentreContactOptions from './helpCentreContactOptions';
import { HelpCentreLandingMoreTopics } from './helpCentreLandingMoreTopics';
import { HelpTopicBox } from './HelpTopicBox';

const subtitleStyles = css`
	margin-top: 30px;
	margin-bottom: ${space[6]}px;
	${headline.small({ fontWeight: 'bold' })};
	border-top: 1px solid ${neutral['86']};
	${minWidth.tablet} {
		margin-bottom: ${space[6]}px;
		margin-top: 40px;
	}
`;

const HelpCentre = (_: RouteComponentProps) => {
	return (
		<>
			<div
				css={css`
					margin-bottom: ${space[24]}px;
				`}
			>
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

export default HelpCentre;
