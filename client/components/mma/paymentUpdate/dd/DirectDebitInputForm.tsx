import { css } from '@emotion/react';
import { from, space, until } from '@guardian/source-foundations';
import {
	Button,
	Checkbox,
	SvgArrowRightStraight,
} from '@guardian/source-react-components';
import { ErrorSummary } from '@guardian/source-react-components-development-kitchen';
import { useState } from 'react';
import type * as React from 'react';
import { sans } from '@/client/styles/fonts';
import { processResponse } from '@/client/utilities/utils';
import { cleanSortCode } from '../../shared/DirectDebitDisplay';
import { FieldWrapper } from '../FieldWrapper';
import type { NewPaymentMethodDetail } from '../NewPaymentMethodDetail';
import { DirectDebitLegal } from './DirectDebitLegal';
import { NewDirectDebitPaymentMethodDetail } from './NewDirectDebitPaymentMethodDetail';

const inputBoxBaseStyle = {
	width: '100%',
	height: '100%',
	fontFamily: sans,
	fontSize: '17px',
	border: 'none',
	outline: 'none',
	'::placeholder': {
		color: '#c4c4c4',
	},
	':-ms-input-placeholder': {
		color: '#c4c4c4',
	},
};

const bulletsStyling = {
	'::placeholder': {
		fontSize: '14px',
	},
	':-ms-input-placeholder': {
		fontSize: '14px',
	},
};

interface DirectDebitValidationResponse {
	data: {
		accountValid: boolean;
		goCardlessStatusCode: null | number;
	};
}
interface DirectDebitUpdateFormProps {
	newPaymentMethodDetailUpdater: (ddDetails: NewPaymentMethodDetail) => void;
	testUser: boolean;
	executePaymentUpdate: (
		newPaymentMethodDetail: NewPaymentMethodDetail,
	) => Promise<unknown>;
}

export const DirectDebitInputForm = (props: DirectDebitUpdateFormProps) => {
	const [isValidating, setIsValidating] = useState<boolean>(false);

	const [soleAccountHolderConfirmed, setSoleAccountHolderConfirmed] =
		useState<boolean>(false);
	const [accountName, setAccountName] = useState<string>('');
	const [accountNumber, setAccountNumber] = useState<string>('');
	const [sortCode, setSortCode] = useState<string>('');
	const [error, setError] = useState<string | undefined>();

	async function validateDirectDebitDetails(
		newPaymentMethod: NewPaymentMethodDetail,
	) {
		try {
			const validateDirectDebitDetailsFetch = await fetch(
				`/api/validate/payment/dd?mode=${
					props.testUser ? 'test' : 'live'
				}`,
				{
					credentials: 'include',
					method: 'POST',
					body: JSON.stringify({
						accountNumber,
						sortCode: cleanSortCode(sortCode),
					}),
					headers: { 'Content-Type': 'application/json' },
				},
			);
			const response =
				await processResponse<DirectDebitValidationResponse>(
					validateDirectDebitDetailsFetch,
				);

			if (response && response.data.accountValid) {
				setIsValidating(false);
				props.executePaymentUpdate(newPaymentMethod);
			} else if (response && response.data.goCardlessStatusCode === 429) {
				setIsValidating(false);
				setError(
					'We cannot currently validate your bank details. Please try again later.',
				);
			} else {
				setIsValidating(false);
				setError(
					'Your bank details are invalid. Please check them and try again.',
				);
			}
		} catch {
			setIsValidating(false);
			setError(
				'Could not validate your bank details, please check them and try again.',
			);
		}
	}

	const startDirectDebitUpdate = async () => {
		const newPaymentMethod = new NewDirectDebitPaymentMethodDetail({
			accountName,
			accountNumber,
			sortCode,
		});

		props.newPaymentMethodDetailUpdater(newPaymentMethod);

		setError(undefined);
		if (accountName.length < 3) {
			setError('Please enter a valid account name'); // TODO add field highlighting
			return;
		} else if (soleAccountHolderConfirmed) {
			setIsValidating(true);
		} else {
			setError('You need to confirm that you are the account holder'); // TODO highlight checkbox
			return;
		}

		validateDirectDebitDetails(newPaymentMethod);
	};

	return (
		<div
			css={css`
				margin-top: ${space[9]}px;
				margin-bottom: ${space[9]}px;
			`}
		>
			<FieldWrapper
				width="100%"
				label="Account holder name"
				onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
					setAccountName(event.target.value)
				}
			>
				<input
					data-qm-masking="blocklist"
					type="text"
					css={inputBoxBaseStyle}
					placeholder="First Name Surname"
					name="Account holder name"
					pattern="[A-Za-z\s]{3,}"
					title="The name of the account holder must have at least 3 letters."
					required
				/>
			</FieldWrapper>
			<div
				css={css`
					display: flex;
					justify-content: flex-start;

					${from.tablet} {
						margin-top: ${space[4]}px;
					}
				`}
			>
				<FieldWrapper
					width="220px"
					label="Sort Code"
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						setSortCode(cleanSortCode(event.target.value))
					}
				>
					<input
						data-qm-masking="blocklist"
						type="text"
						pattern="[0-9]{2}[\-\s]?[0-9]{2}[\-\s]?[0-9]{2}"
						title="Sort Code must contain 6 numbers (optionally separated by a - or space)"
						css={{ ...bulletsStyling, ...inputBoxBaseStyle }}
						placeholder="•• •• ••"
						name="Sort Code"
						required
					/>
				</FieldWrapper>
				<FieldWrapper
					width="100%"
					label="Account Number"
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						setAccountNumber(event.target.value)
					}
				>
					<input
						data-qm-masking="blocklist"
						type="text"
						pattern="[0-9]{7,}"
						css={{ ...bulletsStyling, ...inputBoxBaseStyle }}
						placeholder="•••• ••••"
						name="Account Number"
						title="Account Number should typically be 8 digits"
						required
					/>
				</FieldWrapper>{' '}
			</div>

			<div
				css={css`
					margin: 14px 0;

					${from.tablet} {
						margin: 4px 0;
					}
				`}
			>
				<Checkbox
					onChange={(e) =>
						setSoleAccountHolderConfirmed(e.target.checked)
					}
					checked={soleAccountHolderConfirmed}
					label="I confirm that I am the account holder and I am solely able to authorise debit from the account"
					required
					name="accountHolderConfirmation"
					value="I confirm that I am the account holder and I am solely able to authorise debit from the account"
					cssOverrides={css`
						& + span {
							top: calc(50% - 8px);
						}
					`}
				/>
			</div>

			<DirectDebitLegal />

			<div
				css={css`
					margin-top: ${space[9]}px;
					margin-bottom: ${space[9]}px;

					${until.desktop} {
						width: 100%;
					}
				`}
			>
				<Button
					disabled={isValidating}
					priority="primary"
					onClick={startDirectDebitUpdate}
					icon={<SvgArrowRightStraight />}
					iconSide="right"
				>
					Update payment method
				</Button>

				{error ? (
					<div
						css={{
							marginTop: `${space[9]}px`,
							marginBottom: `${space[9]}px`,
						}}
					>
						<ErrorSummary message={error} />
					</div>
				) : undefined}
			</div>
		</div>
	);
};
