import { css } from '@emotion/react';
import { from, headline, neutral, space } from '@guardian/source/foundations';
import { Button } from '@guardian/source/react-components';
import { useState } from 'react';
import type { Topic } from '../../../../shared/contactUsTypes';
import { TopicButton } from './TopicButton';

interface TopicFormProps {
	submitCallback: (topicId: string) => void;
	data: Topic[];
	preSelectedId?: string;
}

export const TopicForm = (props: TopicFormProps) => {
	const [selectedId, setSelectedId] = useState<string>(
		props.preSelectedId || props.data[0].id,
	);

	const [requiresSubmitButton, setRequiresSubmitButton] = useState<boolean>(
		props.preSelectedId ? false : true,
	);

	return (
		<>
			<h2
				css={css`
					${headline.xxsmall({ fontWeight: 'bold' })};
					border-top: 1px solid ${neutral[86]};
					margin-top: ${space[6]}px;
					padding: ${space[1]}px 0;
					${from.desktop} {
						margin-top: ${space[9]}px;
					}
				`}
			>
				Choose a topic you would like to discuss
			</h2>
			<div
				css={css`
					display: flex;
					flex-wrap: wrap;
					align-items: stretch;
					justify-content: space-between;
				`}
			>
				{props.data.map((topic) => (
					<TopicButton
						key={topic.id}
						{...topic}
						id={topic.id}
						updateCallback={(newId: string) => {
							setSelectedId(newId);
							if (!requiresSubmitButton) {
								props.submitCallback(newId);
							}
						}}
						isSelected={topic.id === selectedId}
					/>
				))}
			</div>
			{requiresSubmitButton && (
				<Button
					css={css`
						margin-top: ${space[6]}px;
					`}
					onClick={() => {
						setRequiresSubmitButton(false);
						props.submitCallback(selectedId);
					}}
				>
					Begin form
				</Button>
			)}
		</>
	);
};
