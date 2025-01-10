import { css } from '@emotion/react';
import {
	from,
	neutral,
	palette,
	space,
	textSans15,
	textSans17,
} from '@guardian/source/foundations';
import { Button, TextInput } from '@guardian/source/react-components';
import { useState } from 'react';
import * as React from 'react';
import { InfoIconDark } from '../../shared/assets/InfoIconDark';
import type {
	ContactPhoneNumbers,
	ContactPhoneNumbersType,
} from './deliveryRecordsApi';

interface UserPhoneNumberProps {
	existingPhoneNumbers?: ContactPhoneNumbers;
	callback: (phoneNumber: ContactPhoneNumbers) => void;
}

type EditPhoneNumber = Record<ContactPhoneNumbersType, boolean>;

export const UserPhoneNumber = (props: UserPhoneNumberProps) => {
	const [showPhoneInput, setShowPhoneInput] = useState(false);
	const [newPhoneNumber, setNewPhoneNumber] = useState<
		ContactPhoneNumbers | undefined
	>(props.existingPhoneNumbers);

	function isValidEntry(
		existingNumberEntry: [string, string | null],
	): existingNumberEntry is [ContactPhoneNumbersType, string] {
		const [phoneType, phoneNumber] = existingNumberEntry;
		return !!(phoneType.toLowerCase() !== 'id' && phoneNumber);
	}

	const currentPhoneNumbers =
		props.existingPhoneNumbers &&
		Object.entries(props.existingPhoneNumbers).filter(isValidEntry);

	const initNumbersEditState = {};
	Object.keys(props.existingPhoneNumbers || {}).map((phoneType) =>
		Object.defineProperty(initNumbersEditState, phoneType, {
			value: false,
		}),
	);

	const [isPhoneInEditState, setPhoneEditState] =
		useState<EditPhoneNumber | null>(
			initNumbersEditState as EditPhoneNumber,
		);

	const handleInputChange =
		(whichPhoneNumber: string) =>
		(evt: React.ChangeEvent<HTMLInputElement>) => {
			if (newPhoneNumber) {
				const newState = {
					...newPhoneNumber,
					[whichPhoneNumber]: evt.target.value,
				};
				setNewPhoneNumber(newState);
				props.callback(newState);
			}
		};

	const putNumberInEditState = (phoneType: ContactPhoneNumbersType) => () => {
		setPhoneEditState({
			...isPhoneInEditState,
			[phoneType]: true,
		} as EditPhoneNumber);
	};

	const cancelNumberUpdate = (phoneType: ContactPhoneNumbersType) => () => {
		if (newPhoneNumber) {
			const newState = {
				...newPhoneNumber,
				[phoneType]: null,
			};
			setNewPhoneNumber(newState);
			props.callback(newState);
		}
		setPhoneEditState({
			...isPhoneInEditState,
			[phoneType]: false,
		} as EditPhoneNumber);
	};

	let titleCopy = currentPhoneNumbers?.length
		? 'Do we have the right number to contact you?'
		: "It looks like we don't have a phone number to contact you on.";
	if (showPhoneInput) {
		titleCopy = 'Please provide your current phone number.';
	}
	return (
		<div
			css={css`
				background-color: ${neutral['97']};
				padding: ${space[3]}px;
				margin: ${space[3]}px;
				${from.tablet} {
					padding: ${space[5]}px;
					margin: ${space[5]}px;
				}
			`}
		>
			<>
				<p
					css={css`
						${textSans17};
						margin-bottom: ${space[5]}px;
					`}
				>
					{`${titleCopy} We will use this to get in touch with you about your subscription.`}
				</p>
				{currentPhoneNumbers?.length ? (
					<form
						css={css`
							display: block;
							margin-bottom: ${space[5]}px;
						`}
					>
						{currentPhoneNumbers.map(
							([phoneType, phoneNumber], index) => (
								<React.Fragment key={`phone-number-${index}`}>
									{isPhoneInEditState?.[phoneType] ? (
										<div
											css={css`
												${index > 0 &&
												`margin-top: ${space[3]}px;`}
											`}
										>
											<TextInput
												key={`phonenumberinput-${index}`}
												pattern="[0-9]{1,11}"
												label={phoneType}
												supporting="Enter your phone number"
												width={30}
												cssOverrides={css`
													max-width: 100%;
												`}
												value={
													newPhoneNumber?.[
														phoneType
													] || ''
												}
												onChange={handleInputChange(
													phoneType,
												)}
											/>
											<span
												css={css`
													${textSans17};
													text-decoration: underline;
													cursor: pointer;
													color: ${palette
														.brand[500]};
													margin-left: ${space[3]}px;
												`}
												onClick={cancelNumberUpdate(
													phoneType,
												)}
											>
												Cancel
											</span>
										</div>
									) : (
										<div
											css={css`
												display: block;
												${textSans17};
												${index > 0 &&
												`margin-top:${space[3]}px;`}
											`}
										>
											<span
												css={css`
													display: inline-block;
													min-width: 15ch;
												`}
											>
												{phoneType}:
											</span>
											<span
												css={css`
													color: ${neutral[46]};
												`}
											>
												{phoneNumber}
											</span>
											<span
												css={css`
													text-decoration: underline;
													cursor: pointer;
													color: ${palette
														.brand[500]};
													margin-left: ${space[3]}px;
												`}
												onClick={putNumberInEditState(
													phoneType,
												)}
											>
												Update
											</span>
										</div>
									)}
								</React.Fragment>
							),
						)}
					</form>
				) : (
					<>
						{showPhoneInput ? (
							<>
								<TextInput
									label="Phone number"
									supporting="Enter your phone number"
									width={30}
									cssOverrides={css`
										max-width: 100%;
										margin-bottom: ${space[5]}px;
									`}
									value={newPhoneNumber?.Phone || ''}
									onChange={handleInputChange('Phone')}
								/>
								<span
									css={css`
										${textSans17};
										text-decoration: underline;
										cursor: pointer;
										color: ${palette.brand[500]};
										margin-left: ${space[3]}px;
									`}
									onClick={() => {
										if (newPhoneNumber?.Phone) {
											setNewPhoneNumber({
												...newPhoneNumber,
												Phone: props
													.existingPhoneNumbers
													?.Phone,
											});
										}
										setShowPhoneInput(false);
									}}
								>
									Cancel
								</span>
							</>
						) : (
							<Button
								priority="secondary"
								onClick={() => {
									setShowPhoneInput(true);
								}}
							>
								Add phone number
							</Button>
						)}
					</>
				)}
				{(showPhoneInput ||
					(isPhoneInEditState &&
						Object.values(isPhoneInEditState).some(
							(numberInEditState) => numberInEditState,
						))) && (
					<span
						css={css`
							position: relative;
							display: block;
							padding: 0 ${space[5]}px 0 ${space[5] + space[1]}px;
							${textSans15};
						`}
					>
						<i
							css={css`
								position: absolute;
								top: 2px;
								left: 0;
							`}
						>
							<InfoIconDark fillColor={palette.brand[500]} />
						</i>
						Your number will be updated when you submit your report.
					</span>
				)}
			</>
		</div>
	);
};
