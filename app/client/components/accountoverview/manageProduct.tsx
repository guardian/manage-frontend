import { css } from '@emotion/core';
import { space } from '@guardian/src-foundations';
import { brand, brandAlt, neutral } from '@guardian/src-foundations/palette';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { cancellationFormatDate } from '../../../shared/dates';
import {
	getMainPlan,
	isGift,
	isPaidSubscriptionPlan,
	ProductDetail,
} from '../../../shared/productResponse';
import {
	WithGroupedProductType,
	GroupedProductType,
	ProductType,
} from '../../../shared/productTypes';
import {
	hasDeliveryRecordsFlow,
	shouldHaveHolidayStopsFlow,
} from '../../productUtils';
import { maxWidth } from '../../styles/breakpoints';
import { BasicProductInfoTable } from '../basicProductInfoTable';
import { LinkButton } from '../buttons';
import { CallCentreEmailAndNumbers } from '../callCenterEmailAndNumbers';
import { DeliveryAddressDisplay } from '../delivery/address/deliveryAddressDisplay';
import { NAV_LINKS } from '../nav/navConfig';
import { PageContainer } from '../page';
import { getNextPaymentDetails } from '../payment/nextPaymentDetails';
import { PaymentDetailsTable } from '../payment/paymentDetailsTable';
import { PaymentFailureAlertIfApplicable } from '../payment/paymentFailureAlertIfApplicable';
import { ProductDescriptionListTable } from '../productDescriptionListTable';
import { SupportTheGuardianButton } from '../supportTheGuardianButton';
import { ErrorIcon } from '../svgs/errorIcon';
import { GiftIcon } from '../svgs/giftIcon';
import { ContributionUpdateAmount } from './contributionUpdateAmount';
import { NewsletterOptinSection } from './newsletterOptinSection';
import { SixForSixExplainerIfApplicable } from './sixForSixExplainer';

const subHeadingTitleCss = `
    ${headline.small()};
    font-weight: bold;
    ${maxWidth.tablet} {
      font-size: 1.25rem;
      line-height: 1.6;
    };
  `;
const subHeadingBorderTopCss = `
    border-top: 1px solid ${neutral['86']};
    margin: 50px 0 ${space[5]}px;
  `;
export const subHeadingCss = `
    ${subHeadingBorderTopCss}
    ${subHeadingTitleCss}
  `;

interface InnerContentProps {
	manageProductProps: WithGroupedProductType<GroupedProductType>;
	productDetail: ProductDetail;
}

const InnerContent = ({
	manageProductProps,
	productDetail,
}: InnerContentProps) => {
	const mainPlan = getMainPlan(productDetail.subscription);

	const groupedProductType = manageProductProps.groupedProductType;

	const specificProductType =
		groupedProductType.mapGroupedToSpecific(productDetail);

	const hasCancellationPending = productDetail.subscription.cancelledAt;

	const cancelledCopy =
		specificProductType.cancelledCopy || groupedProductType.cancelledCopy;

	const [overiddenAmount, setOveriddenAmount] = useState<number | null>(null);
	const isAmountOveridable = specificProductType.updateAmountMdaEndpoint;

	const nextPaymentDetails = getNextPaymentDetails(
		mainPlan,
		productDetail.subscription,
		overiddenAmount,
		!!productDetail.alertText,
	);

	const maybePatronSuffix =
		productDetail.subscription.readerType === 'Patron' ? ' - Patron' : '';

	return (
		<>
			<PaymentFailureAlertIfApplicable productDetail={productDetail} />
			<div
				css={css`
					${subHeadingBorderTopCss}
					display: flex;
					align-items: start;
					justify-content: space-between;
				`}
			>
				<h2
					css={css`
						${subHeadingTitleCss}
						margin: 0;
					`}
				>
					{specificProductType.productTitle(mainPlan)}
					{maybePatronSuffix}
				</h2>
				{isGift(productDetail.subscription) && (
					<i
						css={css`
							margin: 4px 0 0 ${space[3]}px;
						`}
					>
						<GiftIcon alignArrowToThisSide={'left'} />
					</i>
				)}
			</div>

			{hasCancellationPending && (
				<p
					css={css`
						${textSans.medium()};
					`}
				>
					<ErrorIcon fill={brandAlt[200]} />
					<span
						css={css`
							margin-left: ${space[2]}px;
						`}
					>
						{cancelledCopy}{' '}
						<strong>
							{cancellationFormatDate(
								productDetail.subscription
									.cancellationEffectiveDate,
							)}
						</strong>
					</span>
					.
				</p>
			)}

			{isAmountOveridable && isPaidSubscriptionPlan(mainPlan) ? (
				<ContributionUpdateAmount
					subscriptionId={productDetail.subscription.subscriptionId}
					mainPlan={mainPlan}
					productType={specificProductType}
					nextPaymentDate={productDetail.subscription.nextPaymentDate}
					amountUpdateStateChange={setOveriddenAmount}
				/>
			) : (
				<BasicProductInfoTable
					groupedProductType={groupedProductType}
					productDetail={productDetail}
				/>
			)}

			<h2
				css={css`
					${subHeadingCss}
				`}
			>
				Payment
			</h2>
			<SixForSixExplainerIfApplicable
				additionalCss={css`
					${textSans.medium()};
				`}
				mainPlan={mainPlan}
				hasCancellationPending={hasCancellationPending}
			/>
			<PaymentDetailsTable
				productDetail={productDetail}
				nextPaymentDetails={nextPaymentDetails}
				hasCancellationPending={hasCancellationPending}
			/>
			{productDetail.isPaidTier &&
				!productDetail.subscription.payPalEmail && (
					<LinkButton
						colour={
							productDetail.alertText ? brand[400] : brand[800]
						}
						textColour={
							productDetail.alertText ? neutral[100] : brand[400]
						}
						fontWeight={'bold'}
						alert={!!productDetail.alertText}
						text="Update payment method"
						to={`/payment/${specificProductType.urlPart}`}
						state={{ productDetail: productDetail }}
					/>
				)}

			{specificProductType.delivery?.showAddress?.(
				productDetail.subscription,
			) &&
				productDetail.subscription.deliveryAddress && (
					<>
						<h2
							css={css`
								${subHeadingCss}
							`}
						>
							Delivery address
						</h2>
						<ProductDescriptionListTable
							alternateRowBgColors
							borderColour={neutral[86]}
							content={[
								{
									title: 'Address',
									value: (
										<DeliveryAddressDisplay
											{...productDetail.subscription
												.deliveryAddress}
										/>
									),
									spanTwoCols: true,
								},
								...(specificProductType.delivery
									?.enableDeliveryInstructionsUpdate
									? [
											{
												title: 'Instructions',
												value: productDetail
													.subscription
													.deliveryAddress
													.instructions,
												spanTwoCols: true,
											},
									  ]
									: []),
							]}
						/>
						<LinkButton
							colour={brand[800]}
							textColour={brand[400]}
							fontWeight="bold"
							text="Manage delivery address"
							to={`/delivery/${specificProductType.urlPart}/address`}
							state={productDetail}
						/>
					</>
				)}

			{hasDeliveryRecordsFlow(specificProductType) && (
				<>
					<h2
						css={css`
							${subHeadingCss}
						`}
					>
						Delivery history
					</h2>
					<p
						css={css`
							${textSans.medium()}
						`}
					>
						Check delivery history and report an issue.
					</p>
					<LinkButton
						colour={brand[800]}
						textColour={brand[400]}
						fontWeight="bold"
						text="Manage delivery history"
						to={`/delivery/${specificProductType.urlPart}/records`}
						state={{ productDetail }}
					/>
				</>
			)}

			{shouldHaveHolidayStopsFlow(specificProductType) &&
				productDetail.subscription.autoRenew &&
				!hasCancellationPending && (
					<>
						<h2
							css={css`
								${subHeadingCss}
							`}
						>
							Going on holiday?
						</h2>
						<p
							css={css`
								${textSans.medium()}
							`}
						>
							Don’t fret - you can manage your suspensions by
							clicking the button below. You will be credited for
							each suspended{' '}
							{specificProductType.holidayStops.issueKeyword} on
							the first bill after the suspension date.
						</p>
						<LinkButton
							colour={brand[800]}
							textColour={brand[400]}
							fontWeight="bold"
							text="Manage suspensions"
							to={`/suspend/${specificProductType.urlPart}`}
							state={{ productDetail }}
						/>
					</>
				)}

			{!productDetail.subscription.autoRenew &&
				specificProductType.renewalMetadata && (
					<>
						<h2
							css={css`
								${subHeadingCss}
							`}
						>
							Renewal
						</h2>
						<p
							css={css`
								${textSans.medium()}
							`}
						>
							To renew this one-off{' '}
							{specificProductType.friendlyName}, please contact
							us.
						</p>
						<CallCentreEmailAndNumbers />
						<p
							css={css`
								${textSans.medium()}
							`}
						>
							Alternatively, if you would prefer to start a
							recurring {specificProductType.friendlyName} you can
							explore payment options and subscribe online by
							clicking the button below.
						</p>
						<SupportTheGuardianButton
							{...specificProductType.renewalMetadata}
							fontWeight="bold"
							textColour={neutral[100]}
							colour={brand[400]}
							notPrimary
						/>
					</>
				)}

			{specificProductType.productPageNewsletterIDs && (
				<NewsletterOptinSection
					activeNewletterIDs={
						specificProductType.productPageNewsletterIDs
					}
				/>
			)}

			{!hasCancellationPending && (
				<CancellationCTA
					productDetail={productDetail}
					friendlyName={groupedProductType.friendlyName}
					specificProductType={specificProductType}
				/>
			)}
		</>
	);
};

interface CancellationCTAProps {
	productDetail: ProductDetail;
	friendlyName: string;
	specificProductType: ProductType;
}

const CancellationCTA = (props: CancellationCTAProps) => {
	const shouldContactUsToCancel =
		!props.productDetail.selfServiceCancellation.isAllowed ||
		!props.specificProductType.cancellation;
	return (
		<div
			css={css`
				margin: ${space[24]}px 0 0 auto;
				${textSans.medium()}
				color: ${neutral[46]};
			`}
		>
			{shouldContactUsToCancel &&
				'Would you like to cancel your subscription? '}
			<Link
				css={css`
					color: ${brand['500']};
				`}
				to={'/cancel/' + props.specificProductType.urlPart}
				state={{ productDetail: props.productDetail }}
			>
				{shouldContactUsToCancel
					? 'Contact us'
					: `Cancel ${props.friendlyName}`}
			</Link>
		</div>
	);
};

interface ManageProductRouterState {
	productDetail: ProductDetail;
}

const ManageProduct = (props: WithGroupedProductType<GroupedProductType>) => {
	const location = useLocation();
	const routerState = location.state as ManageProductRouterState;
	const productDetail = routerState?.productDetail;

	return (
		<PageContainer
			selectedNavItem={NAV_LINKS.accountOverview}
			pageTitle={`Manage ${
				props.groupedProductType.shortFriendlyName ||
				props.groupedProductType.friendlyName
			}`}
			breadcrumbs={[
				{
					title: NAV_LINKS.accountOverview.title,
					link: NAV_LINKS.accountOverview.link,
				},
				{
					title: `Manage ${props.groupedProductType.friendlyName}`,
					currentPage: true,
				},
			]}
		>
			{productDetail ? (
				<InnerContent
					manageProductProps={props}
					productDetail={productDetail}
				/>
			) : (
				<Navigate to="/" />
			)}
		</PageContainer>
	);
};

export default ManageProduct;
