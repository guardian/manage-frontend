import { css } from '@emotion/react';
import {
	from,
	palette,
	space,
	textSans17,
	textSansBold17,
	textSansItalic15,
} from '@guardian/source/foundations';
import { Button, Radio, RadioGroup } from '@guardian/source/react-components';
import { capitalize } from 'lodash';
import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import type { DeliveryProblemType } from '../../../../../shared/productTypes';
import { ErrorIcon } from '../../shared/assets/ErrorIcon';

interface DeliveryRecordProblemFormProps {
	showNextStepButton: boolean;
	onResetDeliveryRecordsPage?: () => void;
	onFormSubmit?: (selectedValue?: string, selectedMessage?: string) => void;
	inValidationState: boolean;
	updateValidationStatusCallback: (
		isValid: boolean,
		message?: string,
	) => void;
	updateRadioSelectionCallback: (value: string) => void;
	problemTypes: DeliveryProblemType[];
}

interface SelectedDeliveryProblem {
	value: string;
	message?: string;
}

interface ValidateDetails {
	isValid: boolean;
	message?: string;
}

export const DeliveryRecordProblemForm = (
	props: DeliveryRecordProblemFormProps,
) => {
	const [selectedDeliveryProblem, setSelectedDeliveryProblem] =
		useState<SelectedDeliveryProblem | null>(null);
	useEffect(() => {
		const validateDetails: ValidateDetails = validateForm();
		props.updateValidationStatusCallback(
			validateDetails.isValid,
			validateDetails.message,
		);
	}, [selectedDeliveryProblem]);
	const validateForm = () => {
		if (!selectedDeliveryProblem) {
			return {
				isValid: false,
				message: 'Please select the type of problem',
			};
		} else {
			const deliveryProblem = props.problemTypes.find(
				(issue) => issue.label === selectedDeliveryProblem?.value,
			);
			const isValid = !(
				deliveryProblem?.messageIsMandatory &&
				!selectedDeliveryProblem?.message
			);
			return {
				isValid,
				...(!isValid && {
					message: 'Step 1: Please complete the required field.',
				}),
			};
		}
	};
	return (
		<form
			onSubmit={(event: FormEvent) => {
				event.preventDefault();
				props.onFormSubmit?.(
					selectedDeliveryProblem?.value,
					selectedDeliveryProblem?.message,
				);
			}}
		>
			<fieldset
				onChange={(event: FormEvent<HTMLFieldSetElement>) => {
					const target: HTMLInputElement =
						event.target as HTMLInputElement;
					if (target.type === 'radio') {
						const deliveryProblemObj = {
							value: target.value,
						};
						setSelectedDeliveryProblem(deliveryProblemObj);
						props.updateRadioSelectionCallback(target.value);
					} else if (
						target.type === 'textarea' &&
						selectedDeliveryProblem
					) {
						setSelectedDeliveryProblem({
							...selectedDeliveryProblem,
							message: target.value,
						});
					}
				}}
				css={css`
					border: 1px solid ${palette.neutral[86]};
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
						background-color: ${palette.neutral[97]};
						border-bottom: 1px solid ${palette.neutral[86]};
						${textSansBold17};
						${from.tablet} {
							padding: ${space[3]}px ${space[5]}px;
						}
					`}
				>
					Step 1. What type of problem are you experiencing?
				</legend>
				<RadioGroup
					name="issue_type"
					orientation="vertical"
					cssOverrides={css`
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
						{props.problemTypes.map(
							(deliveryProblemRadioOption, index) => (
								<li
									key={`deliveryProblemRadio-${index}`}
									css={css`
										${textSans17}
									`}
								>
									<Radio
										name="delivery-problem"
										value={deliveryProblemRadioOption.label}
										label={capitalize(
											deliveryProblemRadioOption.label,
										)}
										cssOverrides={css`
											vertical-align: top;
											text-transform: lowercase;
											:checked + div label:first-of-type {
												font-weight: bold;
											}
										`}
									/>
									{selectedDeliveryProblem?.value ===
										deliveryProblemRadioOption.label && (
										<div
											css={css`
												display: inline-block;
												margin-left: 32px;
												width: calc(100% - 32px);
												${from.tablet} {
													width: auto;
													display: block;
												}
											`}
										>
											<>
												<label
													htmlFor="issue1Message"
													css={css`
														display: block;
														color: ${palette
															.neutral[46]};
													`}
												>
													Please specify
													<span
														css={css`
															${textSansItalic15}
														`}
													>
														{!deliveryProblemRadioOption.messageIsMandatory &&
															` (Optional)`}
													</span>
													{props.inValidationState &&
														deliveryProblemRadioOption.messageIsMandatory &&
														!selectedDeliveryProblem.message && (
															<span
																css={css`
																	display: block;
																	color: ${palette
																		.error[400]};
																`}
															>
																<i
																	css={css`
																		margin-right: 4px;
																	`}
																>
																	<ErrorIcon />
																</i>
																This detail is
																required
															</span>
														)}
												</label>
												<textarea
													id="issue1Message"
													name="message"
													rows={2}
													css={css`
														border: ${props.inValidationState &&
															deliveryProblemRadioOption.messageIsMandatory &&
															!selectedDeliveryProblem.message
																? '4'
																: '2'}px
															solid
															${props.inValidationState &&
															deliveryProblemRadioOption.messageIsMandatory &&
															!selectedDeliveryProblem.message
																? palette
																		.error[400]
																: palette
																		.neutral[60]};
														width: 100%;
														padding: 12px;
														${textSans17}
														${from.tablet} {
															max-width: 460px;
														}
													`}
												/>
											</>
										</div>
									)}
								</li>
							),
						)}
					</ul>
				</RadioGroup>
			</fieldset>
			{props.inValidationState && !selectedDeliveryProblem && (
				<span
					css={css`
						display: block;
						position: relative;
						padding: ${space[5]}px ${space[5]}px ${space[5]}px 50px;
						border: 4px solid ${palette.error[400]};
						margin-bottom: ${space[5]}px;
					`}
				>
					<i
						css={css`
							position: absolute;
							top: ${space[5]}px;
							left: ${space[5]}px;
						`}
					>
						<ErrorIcon />
					</i>
					Please select the type of problem
				</span>
			)}
			{props.showNextStepButton && (
				<>
					<Button type="submit">Continue to Step 2 &amp; 3</Button>
					<Button
						cssOverrides={css`
							${textSans17}
							background-color: transparent;
							font-weight: bold;
							margin-left: 22px;
							padding: 0;
							color: ${palette.brand[400]};
							:hover {
								background-color: transparent;
							}
						`}
						onClick={() => {
							props.onResetDeliveryRecordsPage?.();
						}}
					>
						Cancel
					</Button>
				</>
			)}
		</form>
	);
};
