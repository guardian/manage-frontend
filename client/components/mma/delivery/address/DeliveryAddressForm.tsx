import { css } from '@emotion/react';
import {
	from,
	headlineBold28,
	palette,
	space,
	textSans15,
	textSans17,
	textSansBold17,
	until,
} from '@guardian/source/foundations';
import {
	Button,
	Checkbox,
	CheckboxGroup,
	Stack,
} from '@guardian/source/react-components';
import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';
import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { addressChangeAffectedInfo } from '@/client/utilities/deliveryAddress';
import { flattenEquivalent } from '@/client/utilities/utils';
import type { DeliveryAddress } from '@/shared/productResponse';
import { getSpecificProductTypeFromTier } from '@/shared/productResponse';
import type { ProductType, WithProductType } from '@/shared/productTypes';
import { CallCentreEmailAndNumbers } from '../../../shared/CallCenterEmailAndNumbers';
import { CallCentreNumbers } from '../../../shared/CallCentreNumbers';
import { Input } from '../../../shared/Input';
import { NAV_LINKS } from '../../../shared/nav/NavConfig';
import { COUNTRIES } from '../../identity/models';
import { InfoIconDark } from '../../shared/assets/InfoIconDark';
import { CallCentrePrompt } from '../../shared/CallCentrePrompt';
import { InfoSection } from '../../shared/InfoSection';
import type { ProductDescriptionListKeyValue } from '../../shared/ProductDescriptionListTable';
import { ProductDescriptionListTable } from '../../shared/ProductDescriptionListTable';
import { ProgressIndicator } from '../../shared/ProgressIndicator';
import type { AddressSetStateObject } from './DeliveryAddressFormContext';
import {
	ContactIdContext,
	convertToDescriptionListData,
	NewDeliveryAddressContext,
} from './DeliveryAddressFormContext';
import type { FormValidationResponse } from './formValidation';
import { isFormValid } from './formValidation';
import { Select } from './Select';

interface FormStates {
	INIT: string;
	PENDING: string;
	VALIDATION_ERROR: string;
	VALIDATION_SUCCESS: string;
	SUCCESS: string;
	POST_ERROR: string;
}

const formStates: FormStates = {
	INIT: 'init',
	PENDING: 'pending',
	VALIDATION_ERROR: 'validationError',
	VALIDATION_SUCCESS: 'validationSuccess',
	SUCCESS: 'success',
	POST_ERROR: 'postError',
};

interface FormProps {
	formStatus: string;
	setFormStatus: Dispatch<SetStateAction<string>>;
	formErrors: FormValidationResponse;
	setFormErrors: Dispatch<SetStateAction<FormValidationResponse>>;
	warning?: ProductDescriptionListKeyValue[];
	productType: ProductType;
}

const Form = (props: FormProps) => {
	const location = useLocation();
	const navigate = useNavigate();

	const addressStateContext = useContext(NewDeliveryAddressContext);
	const contactIdToArrayOfProductDetailAndProductType =
		useContext(ContactIdContext);

	const addressStateObject =
		addressStateContext.addressStateObject as DeliveryAddress;
	const addressSetStateObject =
		addressStateContext.addressSetStateObject as AddressSetStateObject;

	const [showTopCallCentreNumbers, setTopCallCentreNumbersVisibility] =
		useState<boolean>(false);

	const [
		instructionsRemainingCharacters,
		setInstructionsRemainingCharacters,
	] = useState<number>(250 - (addressStateObject.instructions?.length || 0));

	const [acknowledgementChecked, setAcknowledgementState] =
		useState<boolean>(false);

	const subscriptionsNames = Object.values(
		contactIdToArrayOfProductDetailAndProductType,
	)
		.flatMap(flattenEquivalent)
		.map(({ productDetail }) => {
			const specificProductType = getSpecificProductTypeFromTier(
				productDetail.tier,
			);
			const friendlyProductName = specificProductType.friendlyName;
			return `${friendlyProductName}`;
		});

	const handleFormSubmit = (e: FormEvent) => {
		e.preventDefault();

		props.setFormStatus(formStates.PENDING);

		const formData: DeliveryAddress = {
			addressLine1: addressStateObject.addressLine1,
			addressLine2: addressStateObject.addressLine2,
			town: addressStateObject.town,
			region: addressStateObject.region,
			postcode: addressStateObject.postcode,
			country: addressStateObject.country,
		};

		const isFormValidResponse = isFormValid(formData, subscriptionsNames);

		props.setFormErrors({
			addressLine1: isFormValidResponse.addressLine1,
			town: isFormValidResponse.town,
			postcode: isFormValidResponse.postcode,
			country: isFormValidResponse.country,
		} as FormValidationResponse);

		if (isFormValidResponse.isValid && acknowledgementChecked) {
			navigate('review', { state: location.state });
		} else {
			props.setFormStatus(formStates.VALIDATION_ERROR);
		}
	};

	return (
		<>
			<form action="#" onSubmit={handleFormSubmit}>
				<fieldset
					css={{
						border: `1px solid ${palette.neutral['86']}`,
						padding: '48px 14px 14px',
						position: 'relative',
						marginBottom: `${space[5]}px`,
						label: {
							marginTop: `${space[3]}px`,
						},
					}}
				>
					<legend
						css={css`
							width: 100%;
							position: absolute;
							top: 0;
							left: 0;
							padding: 0 14px;
							${textSans17};
							font-weight: bold;
							line-height: 48px;
							background-color: ${palette.neutral['97']};
							border-bottom: 1px solid ${palette.neutral['86']};
						`}
					>
						Delivery address
						{props.productType.delivery
							?.enableDeliveryInstructionsUpdate &&
							' and instructions'}
					</legend>
					<Input
						label={'Address line 1'}
						width={30}
						value={addressStateObject.addressLine1}
						changeSetState={addressSetStateObject.setAddressLine1}
						inErrorState={
							props.formStatus === formStates.VALIDATION_ERROR &&
							!props.formErrors.addressLine1?.isValid
						}
						errorMessage={props.formErrors.addressLine1?.message}
					/>
					<Input
						label="Address line 2"
						width={30}
						value={addressStateObject.addressLine2 || ''}
						changeSetState={addressSetStateObject.setAddressLine2}
						optional={true}
					/>
					<Input
						label="Town or City"
						width={30}
						value={addressStateObject.town || ''}
						changeSetState={addressSetStateObject.setTown}
						inErrorState={
							props.formStatus === formStates.VALIDATION_ERROR &&
							!props.formErrors.town?.isValid
						}
						errorMessage={props.formErrors.town?.message}
					/>
					<Input
						label="County or State"
						width={30}
						value={addressStateObject.region || ''}
						optional={true}
						changeSetState={addressSetStateObject.setRegion}
					/>
					<Input
						label="Postcode/Zipcode"
						width={11}
						value={addressStateObject.postcode}
						changeSetState={addressSetStateObject.setPostcode}
						inErrorState={
							props.formStatus === formStates.VALIDATION_ERROR &&
							!props.formErrors.postcode?.isValid
						}
						errorMessage={props.formErrors.postcode?.message}
					/>
					<Select
						label={'Country'}
						options={COUNTRIES.map((country) => {
							return {
								name: country.name,
								value: country.name,
							};
						})}
						width={30}
						additionalCSS={css`
							margin-top: 14px;
						`}
						value={addressStateObject.country}
						changeSetState={addressSetStateObject.setCountry}
						inErrorState={
							props.formStatus === formStates.VALIDATION_ERROR &&
							!props.formErrors.country?.isValid
						}
						errorMessage={props.formErrors.country?.message}
					/>
					{props.productType.delivery
						?.enableDeliveryInstructionsUpdate && (
						<label
							css={css`
								display: block;
								color: ${palette.neutral['7']};
								${textSans17};
								font-weight: bold;
							`}
						>
							Instructions
							<div>
								<div
									css={css`
										display: inline-block;
										vertical-align: top;
										margin-top: 4px;
										width: 100%;
										max-width: 30ch;
									`}
								>
									<textarea
										id="delivery-instructions"
										name="instructions"
										rows={2}
										maxLength={250}
										value={addressStateObject.instructions}
										onChange={(
											e: ChangeEvent<HTMLTextAreaElement>,
										) => {
											addressSetStateObject.setInstructions(
												e.target.value,
											);
											setInstructionsRemainingCharacters(
												250 - e.target.value.length,
											);
										}}
										css={css`
											width: 100%;
											border: 2px solid
												${palette.neutral['60']};
											padding: 12px;
											resize: vertical;
											${textSans17};
										`}
									/>
									<span
										css={css`
											display: block;
											text-align: right;
											${textSans15};
											color: ${palette.neutral[46]};
										`}
									>
										{instructionsRemainingCharacters}{' '}
										characters remaining
									</span>
								</div>
								<p
									css={css`
										display: block;
										${textSans17};
										border: 4px solid ${palette.brand[500]};
										padding: ${space[5]}px ${space[5]}px
											${space[5]}px 49px;
										margin: ${space[3]}px 0;
										position: relative;
										${from.tablet} {
											display: inline-block;
											vertical-align: top;
											margin: 2px 0 ${space[3]}px
												${space[3]}px;
											width: calc(
												100% -
													(30ch + ${space[3]}px + 2px)
											);
										}
									`}
								>
									<i
										css={css`
											width: 17px;
											height: 17px;
											position: absolute;
											top: ${space[5]}px;
											left: ${space[5]}px;
										`}
									>
										<InfoIconDark
											fillColor={palette.brand[500]}
										/>
									</i>
									Delivery instructions are only applicable
									for newspaper deliveries. They do not apply
									to Guardian Weekly.
								</p>
							</div>
						</label>
					)}
				</fieldset>
				<CheckboxGroup
					name="instructions-checkbox"
					error={
						props.formStatus === formStates.VALIDATION_ERROR &&
						!acknowledgementChecked
							? 'Please indicate that you understand which subscriptions this change will affect.'
							: undefined
					}
				>
					<Checkbox
						value="acknowledged"
						label="I understand that this address change will affect the following subscriptions"
						checked={acknowledgementChecked}
						onChange={(e: ChangeEvent<HTMLInputElement>) => {
							setAcknowledgementState(e.target.checked);
						}}
					/>
				</CheckboxGroup>
				{props.warning && (
					<ProductDescriptionListTable
						content={props.warning}
						seperateEachRow
					/>
				)}
				<div
					css={css`
						margin-top: ${space[5]}px;
						* {
							display: inline-block;
						}
						${from.tablet} {
							margin-top: ${space[6]}px;
						}
					`}
				>
					<Button type="submit">Review details</Button>
					<Link
						to={NAV_LINKS.accountOverview.link}
						css={css`
							${textSansBold17};
							margin-left: 22px;
							color: ${palette.brand[400]};
						`}
					>
						Cancel
					</Link>
				</div>
			</form>

			<Stack space={5}>
				<p
					css={css`
						${textSans17};
						margin: ${space[12]}px 0 0;
						color: ${palette.neutral[46]};
					`}
				>
					If you need separate delivery addresses for each of your
					subscriptions, please{' '}
					<span
						css={css`
							cursor: pointer;
							color: ${palette.brand[500]};
							text-decoration: underline;
						`}
						onClick={() =>
							setTopCallCentreNumbersVisibility(
								!showTopCallCentreNumbers,
							)
						}
					>
						contact us
					</span>
					.
				</p>
				{showTopCallCentreNumbers && <CallCentreEmailAndNumbers />}
			</Stack>
		</>
	);
};

export const DeliveryAddressUpdate = (props: WithProductType<ProductType>) => {
	const [formStatus, setFormStatus] = useState<string>(formStates.INIT);
	const [formErrors, setFormErrors] = useState({ isValid: false });
	const contactIdToArrayOfProductDetailAndProductType =
		useContext(ContactIdContext);

	const subHeadingCss = `
		border-top: 1px solid ${palette.neutral['86']};
		${headlineBold28};
		margin-top: 50px;
		${until.tablet} {
			font-size: 1.25rem;
			line-height: 1.6;
		};
	`;

	const hasNationalDelivery = Object.values(
		contactIdToArrayOfProductDetailAndProductType,
	)
		.flatMap(flattenEquivalent)
		.some(({ productType }) => {
			return productType.productType === 'nationaldelivery';
		});

	if (hasNationalDelivery) {
		return (
			<div
				css={css`
					margin-top: ${space[3]}px;
				`}
			>
				<CallCentrePrompt />
			</div>
		);
	}

	return (
		<>
			<ProgressIndicator
				steps={[
					{ title: 'Update', isCurrentStep: true },
					{ title: 'Review' },
					{ title: 'Confirmation' },
				]}
				additionalCSS={css`
					margin-top: ${space[5]}px;
				`}
			/>
			<h2
				css={css`
					${subHeadingCss}
				`}
			>
				Update address details
			</h2>
			{Object.keys(contactIdToArrayOfProductDetailAndProductType)
				.length === 0 && (
				<div>
					<p>
						No addresses available for update. If this doesn't seem
						right please contact us
					</p>
					<CallCentreNumbers />
				</div>
			)}
			{Object.keys(contactIdToArrayOfProductDetailAndProductType).length >
				1 && (
				<div>
					<p>You will need to contact us to update your addresses</p>
					<CallCentreNumbers />
				</div>
			)}
			{Object.keys(contactIdToArrayOfProductDetailAndProductType)
				.length === 1 && (
				<div>
					{Object.values(
						contactIdToArrayOfProductDetailAndProductType,
					).flatMap(flattenEquivalent).length > 1 && (
						<InfoSection>
							Please note that changing your address here will
							update the delivery address for all of your
							subscriptions.
						</InfoSection>
					)}
					{(formStatus === formStates.INIT ||
						formStatus === formStates.PENDING ||
						formStatus === formStates.VALIDATION_ERROR) && (
						<Form
							formStatus={formStatus}
							setFormStatus={setFormStatus}
							formErrors={formErrors}
							setFormErrors={setFormErrors}
							productType={props.productType}
							warning={convertToDescriptionListData(
								addressChangeAffectedInfo(
									contactIdToArrayOfProductDetailAndProductType,
								),
							)}
						/>
					)}
				</div>
			)}
		</>
	);
};
