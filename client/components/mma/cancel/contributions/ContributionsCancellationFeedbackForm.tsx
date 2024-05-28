import { css } from '@emotion/react';
import { Button } from '@guardian/source/react-components';
import { useState } from 'react';
import type * as React from 'react';
import { CaseUpdateAsyncLoader, getUpdateCasePromise } from '../caseUpdate';
import { ContributionsCancellationFeedbackFormThankYou } from './ContributionsCancellationFeedbackFormThankYou';

const textAreaStyles = css`
	width: 100%;
	font-size: inherit;
	font-family: inherit;
	border: 1px solid black;
`;

const buttonContainerStyles = css`
	margin-top: 18px;
`;

interface ContributionsFeedbackFormProps {
	isTestUser: boolean;
	caseId: string;
}

type Status = 'EDITING' | 'SUBMITTED';

const CHARACTER_LIMIT = 2500;
const NUM_ROWS = 8;

const getPatchUpdateCaseFunc =
	(isTestUser: boolean, caseId: string, feedback: string) => async () =>
		await getUpdateCasePromise(isTestUser, '_FEEDBACK', caseId, {
			Description: feedback,
			Subject: 'Online Cancellation Query',
		});

export const ContributionsFeedbackForm: React.FC<
	ContributionsFeedbackFormProps
> = ({ isTestUser, caseId }: ContributionsFeedbackFormProps) => {
	const [feedback, setFeedback] = useState('');
	const [status, setStatus] = useState<Status>('EDITING');

	const updateFeedback = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
		setFeedback(event.target.value);

	const submit = () => {
		setStatus('SUBMITTED');
	};

	return status === 'SUBMITTED' ? (
		<div>
			<CaseUpdateAsyncLoader
				loadingMessage="Storing your feedback..."
				fetch={getPatchUpdateCaseFunc(isTestUser, caseId, feedback)}
				render={() => <ContributionsCancellationFeedbackFormThankYou />}
			/>
		</div>
	) : (
		<div>
			<p>
				Please share any further thoughts you have about cancelling –
				you can help us improve. Thank you.
			</p>
			<textarea
				css={textAreaStyles}
				maxLength={CHARACTER_LIMIT}
				rows={NUM_ROWS}
				value={feedback}
				onChange={updateFeedback}
			/>
			<div css={buttonContainerStyles}>
				<Button priority="secondary" onClick={submit}>
					Submit the form
				</Button>
			</div>
		</div>
	);
};
