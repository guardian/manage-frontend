import { css } from '@emotion/react';
import { space, textSans14 } from '@guardian/source/foundations';
import type { HolidayStopFlowProperties } from '../../../../shared/productTypes';
import { CallCentreNumbers } from '../../shared/CallCentreNumbers';
import { InfoIcon } from '../shared/assets/InfoIcon';
import { Modal } from './Modal';

export const creditExplainerSentence = (issueKeyword: string) =>
	`You will be credited for each suspended ${issueKeyword} on your next bill after the ${issueKeyword} date.`;

interface HolidayQuestionsModalProps {
	annualIssueLimit: number;
	holidayStopFlowProperties: HolidayStopFlowProperties;
}

export const HolidayQuestionsModal = (props: HolidayQuestionsModalProps) => (
	<Modal
		title="We are here to help"
		instigator={
			<a
				css={css`
					cursor: pointer;
					${textSans14};
					textdecoration: underline;
					margin: 10px;
				`}
			>
				<InfoIcon />
				Questions? Check here
			</a>
		}
	>
		<h3>Things to remember</h3>
		<ul>
			<li>
				You can suspend up to {props.annualIssueLimit}{' '}
				{props.holidayStopFlowProperties.issueKeyword}s in one year.
			</li>
			<li>
				A new suspension cannot begin from today as there is a notice
				period.
			</li>
			{props.holidayStopFlowProperties.alternateNoticeString ? (
				<li>
					Please provide{' '}
					<strong>
						{props.holidayStopFlowProperties.alternateNoticeString}
					</strong>
					.
				</li>
			) : (
				<li>
					Notice period is for our printing and delivery schedule.
				</li>
			)}
			<li>
				{creditExplainerSentence(
					props.holidayStopFlowProperties.issueKeyword,
				)}
			</li>
		</ul>
		<h3>You will need to contact us by phone or email if you...</h3>
		<ul>
			{!props.holidayStopFlowProperties
				.hideDeliveryRedirectionHelpBullet && (
				<li>
					You want to have your delivery redirected to a temporary
					address within the same country.
				</li>
			)}
			<li>
				You want to suspend more than {props.annualIssueLimit}{' '}
				{props.holidayStopFlowProperties.issueKeyword}s in one year.
			</li>
		</ul>
		<h3>How to contact us</h3>
		<div
			css={css`
				margin-left: ${space[5]}px;
			`}
		>
			{/*TODO add email address*/}
			<CallCentreNumbers />
		</div>
	</Modal>
);
