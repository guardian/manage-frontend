import { css } from '@emotion/react';
import { palette, space, textSans } from '@guardian/source-foundations';
import {
	Button,
	SvgArrowRightStraight,
} from '@guardian/source-react-components';
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { measure } from '@/client/styles/typography';
import type { DiscountPreviewResponse } from '@/client/utilities/discountPreview';
import { getMainPlan } from '@/shared/productResponse';
import { GROUPED_PRODUCT_TYPES } from '@/shared/productTypes';
import type { DeliveryRecordDetail } from '../../../delivery/records/deliveryRecordsApi';
import type { OutstandingHolidayStop } from '../../../holiday/HolidayStopApi';
import { BenefitsSection } from '../../../shared/benefits/BenefitsSection';
import { BenefitsToggle } from '../../../shared/benefits/BenefitsToggle';
import { Heading } from '../../../shared/Heading';
import { getNextPaymentDetails } from '../../../shared/NextPaymentDetails';
import { ProgressStepper } from '../../../shared/ProgressStepper';
import type {
	CancellationContextInterface,
	CancellationPageTitleInterface,
} from '../../CancellationContainer';
import {
	CancellationContext,
	CancellationPageTitleContext,
} from '../../CancellationContainer';
import type { OptionalCancellationReasonId } from '../../cancellationReason';

interface RouterSate extends DiscountPreviewResponse {
	selectedReasonId: OptionalCancellationReasonId;
	cancellationPolicy: string;
	caseId: string;
	holidayStops?: OutstandingHolidayStop[];
	deliveryCredits?: DeliveryRecordDetail[];
	eligibleForFreePeriodOffer: boolean;
}

export const SupporterPlusOffer = () => {
	const location = useLocation();
	const routerState = location.state as RouterSate;
	const navigate = useNavigate();

	const cancellationContext = useContext(
		CancellationContext,
	) as CancellationContextInterface;

	const productDetail = cancellationContext.productDetail;
	const productType = cancellationContext.productType;
	const mainPlan = getMainPlan(productDetail.subscription);

	const pageTitleContext = useContext(
		CancellationPageTitleContext,
	) as CancellationPageTitleInterface;

	const groupedProductType =
		GROUPED_PRODUCT_TYPES[productType.groupedProductType];

	const currentSubscriptionBoxCss = css`
		display: flex;
		justify-content: space-between;
		border: 1px solid ${palette.neutral[86]};
		padding: ${space[5]}px;
		${textSans.medium()};
		dt {
			font-weight: bold;
		}
	`;

	const availableOfferBoxCss = css`
		${textSans.medium()};
		border: 1px solid ${palette.neutral[86]};
		display: flex;
		flex-wrap: wrap;
		margin: ${space[5]}px 0;
	`;

	const availableOfferBoxTitleCss = css`
		${textSans.medium()};
		text-align: center;
		background-color: ${palette.neutral[20]};
		color: ${palette.neutral[100]};
		padding: ${space[3]}px;
		margin: 0;
		width: 100%;
	`;

	const nextPaymentDetails = getNextPaymentDetails(
		mainPlan,
		productDetail?.subscription,
		null,
		false,
	);

	pageTitleContext.setPageTitle(
		`Cancel ${
			groupedProductType.shortFriendlyName ||
			groupedProductType.friendlyName()
		}`,
	); // reset the page title here incase you are coming back from the offer review page where the page title was changed

	return (
		<>
			<ProgressStepper
				steps={[{}, {}, { isCurrentStep: true }, {}]}
				additionalCSS={css`
					margin: ${space[5]}px 0 ${space[12]}px;
				`}
			/>
			<Heading
				cssOverrides={[
					measure.heading,
					css`
						margin-bottom: ${space[6]}px;
					`,
				]}
			>
				Headline asking the user to consider the offer
			</Heading>
			<div>
				<h3>Your current subscription</h3>
				<dl css={currentSubscriptionBoxCss}>
					<dt>
						All-access digital
						<BenefitsToggle productType="supporterplus" />
					</dt>
					<dd>
						{nextPaymentDetails && (
							<>
								{nextPaymentDetails.paymentValueShort}/
								{nextPaymentDetails.paymentInterval}
							</>
						)}
					</dd>
				</dl>
			</div>
			<div>
				<h3>Available offer</h3>
				<div css={availableOfferBoxCss}>
					<h4 css={availableOfferBoxTitleCss}>
						An exclusive offer for you
					</h4>
					<div
						css={css`
							padding: ${space[3]}px;
						`}
					>
						<h4>
							{routerState.upToPeriods}{' '}
							{routerState.upToPeriodsType.toLowerCase()} free of
							your All-access digital subscription
						</h4>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Curabitur pharetra, velit id varius pretium,
							nibh nisi sodales.
						</p>
						<BenefitsSection
							benefits={[
								{
									name: '',
									description: 'Lorem ipsum dolor sit',
								},
								{
									name: '',
									description: 'Lorem ipsum dolor sit',
								},
								{
									name: '',
									description: 'Lorem ipsum dolor sit',
								},
								{
									name: '',
									description: 'Lorem ipsum dolor sit',
								},
							]}
						/>
						<Button
							icon={<SvgArrowRightStraight />}
							iconSide="right"
							onClick={() => {
								navigate('../offer-review', {
									state: routerState,
								});
							}}
						>
							Redeem the offer
						</Button>
					</div>
				</div>
			</div>
			{/*
			<dl>
				<dt>DiscountPrice</dt>
				<dd>{routerState.discountedPrice}</dd>

				<dt>upToPeriods</dt>
				<dd>{routerState.upToPeriods}</dd>


				<dt>upToPeriodsType</dt>
				<dd>{routerState.upToPeriodsType}</dd>

			</dl>
			*/}
			<Button
				icon={<SvgArrowRightStraight />}
				iconSide="right"
				onClick={() => {
					navigate('../confirm', {
						state: {
							...routerState,
							eligibleForFreePeriodOffer: true,
						},
					});
				}}
			>
				No thanks, continue to cancel
			</Button>
			<Button
				iconSide="right"
				onClick={() => {
					navigate('/');
				}}
			>
				Return to your account
			</Button>
		</>
	);
};
