import { css } from '@emotion/react';
import { from, neutral, space, textSans } from '@guardian/source-foundations';
import { getHelpSectionIcon } from '../mma/shared/assets/HelpSectionIcons';
import { CallCentreEmailAndNumbers } from '../shared/CallCenterEmailAndNumbers';

const containerCss = css`
	border-top: 1px solid ${neutral['86']};
	border-left: 1px solid ${neutral['86']};
	border-right: 1px solid ${neutral['86']};
`;

const headingCss = css`
	${textSans.large({ fontWeight: 'bold' })};
	color: ${neutral[20]};
	position: relative;
	margin: 0;
	padding: 18px 0 18px 60px;
`;

const headingWideCss = css`
	${from.desktop} {
		padding: 22px 0 22px 64px;
	}
`;

const headingIconCss = css`
	position: absolute;
	top: ${space[3]}px;
	left: ${space[3]}px;
`;

const headingIconWideCss = css`
	${from.desktop} {
		top: ${space[4]}px;
		left: ${space[4]}px;
	}
`;

const subtitleCss = css`
	display: none;
	${textSans.medium()};
	padding: 0 ${space[4]}px ${space[4]}px ${space[4]}px;
	margin: 0;
`;

const subtitleWideCss = css`
	${from.wide} {
		display: block;
	}
`;

export interface HelpCentrePhoneNumbersProps {
	compactLayout?: boolean;
}
export const HelpCentrePhoneNumbers = (props: HelpCentrePhoneNumbersProps) => (
	<>
		<div css={containerCss} id={'call-us'}>
			<h2 css={[headingCss, !props.compactLayout && headingWideCss]}>
				<i
					css={[
						headingIconCss,
						!props.compactLayout && headingIconWideCss,
					]}
				>
					{getHelpSectionIcon('call-us')}
				</i>
				Call us
			</h2>
			<p css={[subtitleCss, !props.compactLayout && subtitleWideCss]}>
				Speak with one of our customer service agents.
			</p>
		</div>
		<CallCentreEmailAndNumbers
			hideEmailAddress={true}
			compactLayout={props.compactLayout}
		/>
	</>
);
