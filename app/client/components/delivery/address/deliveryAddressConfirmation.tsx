import { css, SerializedStyles } from '@emotion/react';
import { space } from '@guardian/src-foundations';
import {
	background,
	brand,
	neutral,
	success,
	text,
} from '@guardian/src-foundations/palette';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { useContext, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { dateString } from '../../../../shared/dates';
import { ProductDetail } from '../../../../shared/productResponse';
import { ProductType, WithProductType } from '../../../../shared/productTypes';
import { maxWidth, minWidth } from '../../../styles/breakpoints';
import { trackEvent } from '../../../services/analytics';
import AsyncLoader from '../../asyncLoader';
import { LinkButton } from '../../buttons';
import { CallCentreEmailAndNumbers } from '../../callCenterEmailAndNumbers';
import { ProductDescriptionListTable } from '../../productDescriptionListTable';
import { ProgressIndicator } from '../../progressIndicator';
import { TickInCircle } from '../../svgs/tickInCircle';
import { updateAddressFetcher } from './deliveryAddressApi';
import { DeliveryAddressDisplay } from './deliveryAddressDisplay';
import {
	AddressChangedInformationContext,
	ContactIdContext,
	convertToDescriptionListData,
	isAddress,
	NewDeliveryAddressContext,
} from './deliveryAddressFormContext';

const renderConfirmation = (props: ProductType) => () =>
	<AddressConfirmation {...props} />;

const AddressConfirmation = (props: ProductType) => {
	interface LocationState {
		productDetail: ProductDetail;
	}

	const location = useLocation();
	const state = location.state as LocationState;

	const addressContext = useContext(NewDeliveryAddressContext);
	const addressChangedInformationContext = useContext(
		AddressChangedInformationContext,
	);

	const productName = props.friendlyName;

	const [showTopCallCentreNumbers, setTopCallCentreNumbersVisibility] =
		useState<boolean>(false);

	const subHeadingCss = `
    border-top: 1px solid ${neutral['86']};
    ${headline.small()};
    font-weight: bold;
    margin-top: 50px;
    ${maxWidth.tablet} {
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
							border: 1px solid ${neutral['86']};
							margin-top: ${space[5]}px;
						`}
					>
						<h2
							css={css`
								margin: 0;
								padding: ${space[3]}px;
								background-color: ${neutral['97']};
								border-bottom: 1px solid ${neutral['86']};
								${textSans.medium({ fontWeight: 'bold' })};
								${minWidth.tablet} {
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
								${textSans.medium()};
								display: flex;
								flex-wrap: wrap;
								flex-direction: column;
								justify-content: space-between;
								${minWidth.tablet} {
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
									${minWidth.tablet} {
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
							${textSans.medium()};
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
							${minWidth.tablet} {
								margin-top: ${space[5]}px;
							}
						`}
					>
						<LinkButton
							to={'/subscriptions'}
							text={'Return to subscription'}
							state={state}
							colour={background.ctaPrimary}
							textColour={text.ctaPrimary}
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
					<p
						css={css`
							${textSans.medium()};
							margin-top: ${space[12]}px;
							color: ${neutral[46]};
						`}
					>
						If you need separate delivery addresses for each of your
						subscriptions, please{' '}
						<span
							css={css`
								cursor: pointer;
								color: ${brand[500]};
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
				</>
			) : (
				<Navigate to=".." replace />
			)}
		</>
	);
};

const DeliveryAddressConfirmation = (props: WithProductType<ProductType>) => {
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
			border: 4px solid ${success[400]};
			box-sizing: border-box;
			padding: 14px 14px 14px 50px;
			margin-bottom: 50px;
			${textSans.medium()};
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

export default DeliveryAddressConfirmation;
