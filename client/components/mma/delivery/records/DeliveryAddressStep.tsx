import { css } from '@emotion/react';
import {
	from,
	palette,
	space,
	textSans15,
	textSans17,
} from '@guardian/source/foundations';
import {
	Button,
	Checkbox,
	CheckboxGroup,
} from '@guardian/source/react-components';
import Color from 'color';
import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';
import { useContext, useState } from 'react';
import { dateString } from '../../../../../shared/dates';
import type {
	DeliveryAddress,
	MembersDataApiResponse,
	ProductDetail,
} from '../../../../../shared/productResponse';
import {
	getSpecificProductType,
	isProduct,
	MembersDataApiAsyncLoader,
} from '../../../../../shared/productResponse';
import {
	GROUPED_PRODUCT_TYPES,
	PRODUCT_TYPES,
} from '../../../../../shared/productTypes';
import {
	addressChangeAffectedInfo,
	getValidDeliveryAddressChangeEffectiveDates,
} from '../../../../utilities/deliveryAddress';
import { createProductDetailFetcher } from '../../../../utilities/productUtils';
import { flattenEquivalent } from '../../../../utilities/utils';
import { CallCentreEmailAndNumbers } from '../../../shared/CallCenterEmailAndNumbers';
import { Input } from '../../../shared/Input';
import { COUNTRIES } from '../../identity/models';
import { InfoIconDark } from '../../shared/assets/InfoIconDark';
import { AsyncLoader } from '../../shared/AsyncLoader';
import { CallCentrePrompt } from '../../shared/CallCentrePrompt';
import { InfoSection } from '../../shared/InfoSection';
import { ProductDescriptionListTable } from '../../shared/ProductDescriptionListTable';
import type { ProductDescriptionListKeyValue } from '../../shared/ProductDescriptionListTable';
import { updateAddressFetcher } from '../address/deliveryAddressApi';
import { SuccessMessage } from '../address/DeliveryAddressConfirmation';
import type { SubscriptionEffectiveData } from '../address/DeliveryAddressFormContext';
import { convertToDescriptionListData } from '../address/DeliveryAddressFormContext';
import type { FormValidationResponse } from '../address/formValidation';
import { isFormValid } from '../address/formValidation';
import { Select } from '../address/Select';
import { DeliveryRecordsAddressContext } from './DeliveryRecordsProblemContext';
import { ReadOnlyAddressDisplay } from './ReadOnlyAddressDisplay';

interface DeliveryAddressStepProps {
	productDetail: ProductDetail;
	enableDeliveryInstructions: boolean;
	setAddressValidationState: Dispatch<SetStateAction<boolean>>;
}

export const DeliveryAddressStep = (props: DeliveryAddressStepProps) => {
	enum Status {
		ReadOnly,
		Edit,
		ValidationError,
		Pending,
		Confirmation,
		Error,
	}

	const [status, setStatus] = useState(Status.ReadOnly);

	const deliveryAddressContext = useContext(DeliveryRecordsAddressContext);

	const newAddress: DeliveryAddress =
		deliveryAddressContext.address ||
		(props.productDetail.subscription.deliveryAddress as DeliveryAddress);

	const [
		instructionsRemainingCharacters,
		setInstructionsRemainingCharacters,
	] = useState<number>(250 - (newAddress.instructions?.length || 0));
	const [acknowledgementChecked, setAcknowledgementState] =
		useState<boolean>(false);
	const [formErrors, setFormErrors] = useState<FormValidationResponse>({
		isValid: false,
	});

	const specificProductType = getSpecificProductType(
		props.productDetail.tier,
	);

	const isNationalDelivery =
		specificProductType === PRODUCT_TYPES.nationaldelivery;

	const [showCallCentreNumbers, setCallCentreNumbersVisibility] =
		useState<boolean>(false);

	const [addressChangeInformation, setAddressChangeInformation] =
		useState<string>('');

	const handleFormSubmit =
		(
			subscriptionsNames: string[],
			productsAffected: ProductDescriptionListKeyValue[],
			addressChangeAffectedInfoArray: SubscriptionEffectiveData[],
		) =>
		(e: FormEvent) => {
			e.preventDefault();

			deliveryAddressContext.setProductsAffected?.(productsAffected);

			setStatus(Status.Pending);

			const isFormValidResponse = isFormValid(
				newAddress,
				subscriptionsNames,
			);

			setFormErrors({
				addressLine1: isFormValidResponse.addressLine1,
				town: isFormValidResponse.town,
				postcode: isFormValidResponse.postcode,
				country: isFormValidResponse.country,
			} as FormValidationResponse);

			if (isFormValidResponse.isValid && acknowledgementChecked) {
				props.setAddressValidationState(true);
				setAddressChangeInformation(
					[
						...addressChangeAffectedInfoArray.map(
							(element) =>
								`${element.friendlyProductName} subscription (${
									element.subscriptionId
								})${
									element.effectiveDate
										? ` as of front cover dated ${dateString(
												element.effectiveDate,
												'EEEE do MMMM yyyy',
										  )}`
										: ''
								}`,
						),
						'',
						`(as displayed on confirmation page at ${dateString(
							new Date(),
							"HH:mm:ss x 'on' do MMMM yyyy",
						)})`,
					].join('\n'),
				);
				setStatus(Status.Confirmation);
			} else {
				setStatus(Status.ValidationError);
			}
		};

	const renderDeliveryAddressForm = (
		mdapiResponse: MembersDataApiResponse,
	) => {
		const contactIdToArrayOfProductDetailAndProductType =
			getValidDeliveryAddressChangeEffectiveDates(
				mdapiResponse.products
					.filter(isProduct)
					.filter(
						(product) => product.subscription.readerType !== 'Gift',
					),
			);

		const addressChangeAffectedInfoArray = addressChangeAffectedInfo(
			contactIdToArrayOfProductDetailAndProductType,
		);

		const productsAffected: ProductDescriptionListKeyValue[] =
			convertToDescriptionListData(addressChangeAffectedInfoArray);

		const subscriptionNames = Object.values(
			contactIdToArrayOfProductDetailAndProductType,
		)
			.flatMap(flattenEquivalent)
			.map(({ productDetail }) => {
				const specificProductType = getSpecificProductType(
					productDetail.tier,
				);
				const friendlyProductName = specificProductType.friendlyName;
				return `${friendlyProductName}`;
			});

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
				{productsAffected.length > 1 && (
					<InfoSection>
						Please note that changing your address here will update
						the delivery address for all of your subscriptions.
					</InfoSection>
				)}
				<form
					action="#"
					onSubmit={handleFormSubmit(
						subscriptionNames,
						productsAffected,
						addressChangeAffectedInfoArray,
					)}
				>
					<fieldset
						css={css`
							margin: 0;
							padding: 0;
							border: 0;
							label {
								margin-top: ${space[3]}px;
							}
						`}
					>
						<Input
							label={'Address line 1'}
							width={30}
							value={newAddress.addressLine1}
							changeSetState={(value: string) =>
								deliveryAddressContext.setAddress?.({
									...newAddress,
									addressLine1: value,
								})
							}
							inErrorState={
								status === Status.ValidationError &&
								!formErrors.addressLine1?.isValid
							}
							errorMessage={formErrors.addressLine1?.message}
						/>
						<Input
							label="Address line 2"
							width={30}
							value={newAddress.addressLine2 || ''}
							changeSetState={(value: string) =>
								deliveryAddressContext.setAddress?.({
									...newAddress,
									addressLine2: value,
								})
							}
							optional={true}
						/>
						<Input
							label="Town or City"
							width={30}
							value={newAddress.town || ''}
							changeSetState={(value: string) =>
								deliveryAddressContext.setAddress?.({
									...newAddress,
									town: value,
								})
							}
							inErrorState={
								status === Status.ValidationError &&
								!formErrors.town?.isValid
							}
							errorMessage={formErrors.town?.message}
						/>
						<Input
							label="County or State"
							width={30}
							value={newAddress.region || ''}
							optional={true}
							changeSetState={(value: string) =>
								deliveryAddressContext.setAddress?.({
									...newAddress,
									region: value,
								})
							}
						/>
						<Input
							label="Postcode/Zipcode"
							width={11}
							value={newAddress.postcode}
							changeSetState={(value: string) =>
								deliveryAddressContext.setAddress?.({
									...newAddress,
									postcode: value,
								})
							}
							inErrorState={
								status === Status.ValidationError &&
								!formErrors.postcode?.isValid
							}
							errorMessage={formErrors.postcode?.message}
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
							value={
								COUNTRIES.find(
									(country) =>
										newAddress.country === country.iso,
								)?.name || newAddress.country
							}
							changeSetState={(value: string) =>
								deliveryAddressContext.setAddress?.({
									...newAddress,
									country: value,
								})
							}
							inErrorState={
								status === Status.ValidationError &&
								!formErrors.country?.isValid
							}
							errorMessage={formErrors.country?.message}
						/>
						{props.enableDeliveryInstructions && (
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
											value={newAddress.instructions}
											onChange={(
												e: ChangeEvent<HTMLTextAreaElement>,
											) => {
												deliveryAddressContext.setAddress?.(
													{
														...newAddress,
														instructions:
															e.target.value,
													},
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
											border: 4px solid
												${palette.brand[500]};
											padding: ${space[5]}px ${space[5]}px
												${space[5]}px 49px;
											margin: ${space[3]}px 0;
											position: relative;
											${from.tablet} {
												display: inline-block;
												margin: 2px 0 ${space[3]}px
													${space[3]}px;
												width: calc(
													100% -
														(
															30ch + ${space[3]}px +
																2px
														)
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
										Delivery instructions are only
										applicable for newspaper deliveries.
										They do not apply to Guardian Weekly.
									</p>
								</div>
							</label>
						)}
					</fieldset>
					<CheckboxGroup
						cssOverrides={css`
							margin-top: ${space[5]}px;
						`}
						name="instructions-checkbox"
						error={
							status === Status.ValidationError &&
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
					{productsAffected.length && (
						<ProductDescriptionListTable
							content={productsAffected}
							seperateEachRow
						/>
					)}
					<div
						css={css`
							* {
								display: inline-block;
							}
						`}
					>
						<Button
							type="submit"
							cssOverrides={css`
								color: ${palette.brand[400]};
								background-color: ${palette.brand[800]};
								:hover {
									background-color: ${Color(
										palette.brand[800],
										'hex',
									)
										.darken(0.1)
										.string()};
								}
							`}
						>
							Save address
						</Button>
						<Button
							onClick={() => {
								deliveryAddressContext.setAddress?.(
									props.productDetail.subscription
										.deliveryAddress,
								);
								props.setAddressValidationState(true);
								setStatus(Status.ReadOnly);
							}}
							cssOverrides={css`
								margin-top: ${space[5]}px;
								color: ${palette.brand[400]};
								background-color: transparent;
								:hover {
									background-color: transparent;
								}
							`}
						>
							Discard changes
						</Button>
					</div>
				</form>
				{productsAffected.length > 1 && (
					<p
						css={css`
							${textSans17};
							background-color: ${palette.neutral[97]};
							padding: ${space[5]}px ${space[5]}px ${space[5]}px
								49px;
							margin: ${space[5]}px 0 ${space[3]}px;
							position: relative;
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
							<InfoIconDark fillColor={palette.brand[500]} />
						</i>
						If you need seperate delivery addresses for each of your
						subscriptions, please{' '}
						<span
							css={css`
								cursor: pointer;
								color: ${palette.brand[500]};
								text-decoration: underline;
							`}
							onClick={() =>
								setCallCentreNumbersVisibility(
									!showCallCentreNumbers,
								)
							}
						>
							contact us
						</span>
						.
					</p>
				)}
				{showCallCentreNumbers && <CallCentreEmailAndNumbers />}
			</>
		);
	};

	const renderConfirmation = () => (
		<>
			<div
				css={css`
					padding: ${space[3]}px;
					${from.tablet} {
						padding: ${space[5]}px;
					}
				`}
			>
				<SuccessMessage
					additionalCss={css`
						margin-bottom: 0;
					`}
					message={`We have successfully updated your delivery details for your subscription${
						deliveryAddressContext.productsAffected &&
						deliveryAddressContext.productsAffected.length > 1 &&
						's'
					}. You will shortly receive a confirmation email.`}
				/>
			</div>
			<ReadOnlyAddressDisplay
				address={newAddress}
				instructions={
					(props.enableDeliveryInstructions &&
						deliveryAddressContext.address?.instructions) ||
					undefined
				}
			/>
		</>
	);

	if (
		status === Status.Edit ||
		status === Status.Pending ||
		status === Status.ValidationError
	) {
		return (
			<div
				css={css`
					padding: ${space[3]}px;
					${from.tablet} {
						padding: ${space[5]}px;
					}
				`}
			>
				<MembersDataApiAsyncLoader
					render={renderDeliveryAddressForm}
					fetch={createProductDetailFetcher(
						GROUPED_PRODUCT_TYPES.subscriptions
							.allProductsProductTypeFilterString,
					)}
					loadingMessage={'Loading delivery details...'}
				/>
			</div>
		);
	} else if (
		status === Status.Confirmation &&
		props.productDetail.subscription.contactId
	) {
		return (
			<AsyncLoader
				render={renderConfirmation}
				fetch={updateAddressFetcher(
					{
						...newAddress,
						addressChangeInformation,
					},
					props.productDetail.subscription.contactId,
				)}
				readerOnOK={(resp: Response) => resp.text()}
				loadingMessage={'Updating delivery address details...'}
			/>
		);
	}
	return (
		<>
			<ReadOnlyAddressDisplay
				showEditButton={!isNationalDelivery}
				editButtonCallback={() => {
					props.setAddressValidationState(false);
					setStatus(Status.Edit);
				}}
				address={newAddress}
				instructions={
					(props.enableDeliveryInstructions &&
						deliveryAddressContext.address?.instructions) ||
					undefined
				}
			/>
			{isNationalDelivery && (
				<div
					css={css`
						padding: ${space[2]}px;
					`}
				>
					<CallCentrePrompt />
				</div>
			)}
		</>
	);
};
