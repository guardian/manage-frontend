import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	from,
	headlineBold28,
	palette,
	space,
	textSans17,
	textSansBold17,
	until,
} from '@guardian/source/foundations';
import { Stack } from '@guardian/source/react-components';
import { useContext, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { dateString } from '../../../../../shared/dates';
import type { ProductDetail } from '../../../../../shared/productResponse';
import type {
	ProductType,
	WithProductType,
} from '../../../../../shared/productTypes';
import { trackEvent } from '../../../../utilities/analytics';
import { CallCentreEmailAndNumbers } from '../../../shared/CallCenterEmailAndNumbers';
import { TickInCircle } from '../../shared/assets/TickInCircle';
import { AsyncLoader } from '../../shared/AsyncLoader';
import { LinkButton } from '../../shared/Buttons';
import { ProductDescriptionListTable } from '../../shared/ProductDescriptionListTable';
import { ProgressIndicator } from '../../shared/ProgressIndicator';
import { updateAddressFetcher } from './deliveryAddressApi';
import { DeliveryAddressDisplay } from './DeliveryAddressDisplay';
import {
	AddressChangedInformationContext,
	ContactIdContext,
	convertToDescriptionListData,
	isAddress,
	NewDeliveryAddressContext,
} from './DeliveryAddressFormContext';

const renderConfirmation = (props: ProductType) => () =>
	<AddressConfirmation {...props} />;

const AddressConfirmation = (props: ProductType) => {
	const location = useLocation();
	const productDetail = location.state as ProductDetail;

	const addressContext = useContext(NewDeliveryAddressContext);
	const addressChangedInformationContext = useContext(
		AddressChangedInformationContext,
	);

	const productName = props.friendlyName;

	if (isAddress(addressContext.addressStateObject)) {
		productDetail.subscription.deliveryAddress = {
			...productDetail.subscription.deliveryAddress,
			...addressContext.addressStateObject,
		};
	}

	const [showTopCallCentreNumbers, setTopCallCentreNumbersVisibility] =
		useState<boolean>(false);

	const subHeadingCss = `
    border-top: 1px solid ${palette.neutral['86']};
	${headlineBold28};
    margin-top: 50px;
    ${until.tablet} {
      font-size: 1.25rem;
      line-height: 1.6;
    };
  `;

	const dtCss: string = `
    font-weight: bold;
    display: inline-block;
    vertical-align: top;
    min-width: 12ch;
  `;
	const ddCss: string = `
    margin: 0;
    display: inline-block;
    vertical-align: top;
    min-width: 12ch;
  `;

	return (
		<>
			{isAddress(addressContext.addressStateObject) ? (
				<>
					<ProgressIndicator
						steps={[
							{ title: 'Update' },
							{ title: 'Review' },
							{ title: 'Confirmation', isCurrentStep: true },
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
						Confirmation
					</h2>
					<SuccessMessage
						message={`We have successfully updated your delivery details for your ${productName}. You will shortly receive a confirmation email.`}
					/>
					<section
						css={css`
							border: 1px solid ${palette.neutral['86']};
							margin-top: ${space[5]}px;
						`}
					>
						<h2
							css={css`
								margin: 0;
								padding: ${space[3]}px;
								background-color: ${palette.neutral['97']};
								border-bottom: 1px solid
									${palette.neutral['86']};
								${textSansBold17};
								${from.tablet} {
									padding: ${space[3]}px ${space[5]}px;
								}
							`}
						>
							Delivery address
							{props.delivery?.enableDeliveryInstructionsUpdate &&
								' and instructions'}
						</h2>
						<dl
							css={css`
								padding: 0 ${space[3]}px;
								${textSans17};
								display: flex;
								flex-wrap: wrap;
								flex-direction: column;
								justify-content: space-between;
								${from.tablet} {
									padding: 0 ${space[5]}px;
								}
							`}
						>
							<div
								css={css`
									flex-grow: 1;
								`}
							>
								<dt
									css={css`
										${dtCss}
									`}
								>
									Address
								</dt>
								<dd
									css={css`
										${ddCss}
									`}
								>
									{addressContext.addressStateObject && (
										<DeliveryAddressDisplay
											{...addressContext.addressStateObject}
										/>
									)}
								</dd>
							</div>
							<div
								css={css`
									flex-grow: 1;
									margin-top: 16px;
									${from.tablet} {
										margin-top: 0;
									}
								`}
							>
								<dt
									css={css`
										${dtCss}
									`}
								>
									Instructions
								</dt>
								<dd
									css={css`
										${ddCss}
									`}
								>
									{addressContext.addressStateObject
										?.instructions || '-'}
								</dd>
							</div>
						</dl>
					</section>
					<p
						css={css`
							${textSans17};
							margin-top: ${space[9]}px;
						`}
					>
						I understand that this address change will affect the
						following subscriptions
					</p>
					<ProductDescriptionListTable
						content={convertToDescriptionListData(
							addressChangedInformationContext,
						)}
						seperateEachRow
					/>
					<div
						css={css`
							margin-top: ${space[3]}px;
							${from.tablet} {
								margin-top: ${space[5]}px;
							}
						`}
					>
						<LinkButton
							to={`/${props.urlPart}`}
							text={'Return to subscription'}
							state={{ productDetail }}
							colour={palette.brand[400]}
							textColour={palette.neutral[100]}
							fontWeight={'bold'}
							onClick={() => {
								trackEvent({
									eventCategory:
										'delivery_address_update_confirmation',
									eventAction: 'click',
									eventLabel: `manage_${props.urlPart}`,
								});
							}}
						/>
					</div>
					<Stack space={5}>
						<p
							css={css`
								${textSans17};
								margin: ${space[12]}px 0 0;
								color: ${palette.neutral[46]};
							`}
						>
							If you need separate delivery addresses for each of
							your subscriptions, please{' '}
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
						{showTopCallCentreNumbers && (
							<CallCentreEmailAndNumbers />
						)}
					</Stack>
				</>
			) : (
				<Navigate to=".." replace />
			)}
		</>
	);
};

export const DeliveryAddressConfirmation = (
	props: WithProductType<ProductType>,
) => {
	const addressContext = useContext(NewDeliveryAddressContext);
	const contactIdContext = useContext(ContactIdContext);
	const addressChangedInformationContext = useContext(
		AddressChangedInformationContext,
	);
	const contactId = Object.keys(contactIdContext)[0];

	const addressChangeInformationCopy = [
		...addressChangedInformationContext.map(
			(element) =>
				`${element.friendlyProductName} subscription (${
					element.subscriptionId
				})${
					element.effectiveDate
						? ` as of front cover dated ${dateString(
								element.effectiveDate,
								'iiii do MMMM yyyy',
						  )}`
						: ''
				}`,
		),
		'',
		`(as displayed on confirmation page at ${dateString(
			new Date(),
			"HH:mm:ss x 'on' do MMMM yyyy",
		)} )`,
	].join('\n');

	return addressContext.addressStateObject ? (
		<AsyncLoader
			render={renderConfirmation(props.productType)}
			fetch={updateAddressFetcher(
				{
					...addressContext.addressStateObject,
					addressChangeInformation: addressChangeInformationCopy,
				},
				contactId,
			)}
			readerOnOK={(resp: Response) => resp.text()}
			loadingMessage={'Updating delivery address details...'}
		/>
	) : (
		<Navigate to=".." replace />
	);
};

interface SuccessMessageProps {
	message: string;
	additionalCss?: SerializedStyles;
}
export const SuccessMessage = (props: SuccessMessageProps) => (
	<div
		css={css`
			position: relative;
			width: 100%;
			text-align: left;
			border: 4px solid ${palette.success[400]};
			box-sizing: border-box;
			padding: 14px 14px 14px 50px;
			margin-bottom: 50px;
			${textSans17};
			font-weight: bold;
			${props.additionalCss}
		`}
	>
		<i
			css={css`
				position: absolute;
				top: 14px;
				left: 14px;
			`}
		>
			<TickInCircle />
		</i>
		{props.message}
	</div>
);
