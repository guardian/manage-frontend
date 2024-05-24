import { css } from '@emotion/react';
import { from, neutral, space, textSans } from '@guardian/source/foundations';
import { Button, Radio, RadioGroup } from '@guardian/source/react-components';
import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import type { SubTopic } from '../../../../shared/contactUsTypes';

interface SubTopicFormProps {
	title: string;
	submitButonText: string;
	data: SubTopic[];
	preSelectedId?: string;
	submitCallback: (subTopicId: string) => void;
}

export const SubTopicForm = (props: SubTopicFormProps) => {
	const [selectedId, setSelectedId] = useState<string>(
		props.preSelectedId || props.data[0].id,
	);

	const [requiresSubmitButton, setRequiresSubmitButton] = useState<boolean>(
		props.preSelectedId ? false : true,
	);

	return (
		<form
			onSubmit={(event: FormEvent) => {
				event.preventDefault();
				setRequiresSubmitButton(false);
				props.submitCallback(selectedId);
			}}
			css={css`
				margin-top: ${space[9]}px;
			`}
		>
			<fieldset
				css={css`
					border: 1px solid ${neutral['86']};
					margin: 0 0 ${space[5]}px;
					padding: 0;
				`}
			>
				<legend
					css={css`
						display: block;
						width: 100%;
						margin: 0;
						padding: ${space[3]}px;
						float: left;
						background-color: ${neutral['97']};
						border-bottom: 1px solid ${neutral['86']};
						${textSans.medium({ fontWeight: 'bold' })};
						${from.tablet} {
							padding: ${space[3]}px ${space[5]}px;
						}
					`}
				>
					{props.title}
				</legend>
				<RadioGroup
					name="issue_type"
					orientation="vertical"
					css={css`
						display: block;
					`}
				>
					<ul
						css={css`
							list-style: none;
							padding: ${space[3]}px;
							margin: 0;
							clear: left;
							${from.tablet} {
								padding: ${space[5]}px;
							}
						`}
					>
						{props.data.map((subTopic) => (
							<li
								key={subTopic.id}
								css={css`
									${textSans.medium()};
								`}
							>
								<Radio
									value={subTopic.id}
									label={subTopic.name}
									checked={subTopic.id === selectedId}
									css={css`
										vertical-align: top;
										text-transform: lowercase;
										:checked + div label:first-of-type {
											font-weight: bold;
										}
									`}
									onChange={(
										event: ChangeEvent<HTMLInputElement>,
									) => {
										setSelectedId(event.target.value);
										if (!requiresSubmitButton) {
											props.submitCallback(
												event.target.value,
											);
										}
									}}
								/>
							</li>
						))}
					</ul>
				</RadioGroup>
			</fieldset>
			{requiresSubmitButton && (
				<Button type="submit">{props.submitButonText}</Button>
			)}
		</form>
	);
};
