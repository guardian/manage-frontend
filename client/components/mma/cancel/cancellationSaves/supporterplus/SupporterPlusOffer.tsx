import { css } from '@emotion/react';
import {
	neutral,
	palette,
	space,
	textEgyptian17,
	textSans12,
	textSans15,
	textSans17,
	textSansBold24,
} from '@guardian/source/foundations';
import { Button } from '@guardian/source/react-components';
import { capitalize } from 'lodash';
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Ribbon } from '@/client/components/shared/Ribbon';
import { measure } from '@/client/styles/typography';
import type { DiscountPreviewResponse } from '@/client/utilities/discountPreview';
import { parseDate } from '@/shared/dates';
import { number2words } from '@/shared/numberUtils';
import { getMainPlan, isPaidSubscriptionPlan } from '@/shared/productResponse';
import type { DeliveryRecordDetail } from '../../../delivery/records/deliveryRecordsApi';
import type { OutstandingHolidayStop } from '../../../holiday/HolidayStopApi';
import { BenefitsSection } from '../../../shared/benefits/BenefitsSection';
import { Heading } from '../../../shared/Heading';
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
	const mainPlan = getMainPlan(productDetail.subscription);

	const pageTitleContext = useContext(
		CancellationPageTitleContext,
	) as CancellationPageTitleInterface;

	const offerPeriodWord = number2words(routerState.upToPeriods);
	const offerPeriodType = routerState.upToPeriodsType.toLowerCase();
	const nextNonDiscountedPaymentDate = parseDate(
		routerState.nextNonDiscountedPaymentDate,
		'yyyy-MM-dd',
	).dateStr();

	const standfirstCss = css`
		${textEgyptian17};
		color: ${neutral[7]};
		margin: 0 0 ${space[10]}px;
	`;

	const availableOfferBoxCss = css`
		${textSans17};
		border: 1px solid ${palette.neutral[86]};
		display: flex;
		flex-wrap: wrap;
		margin: ${space[5]}px 0;
		position: relative;
		width: 100%;
	`;

	const ribbonCss = css`
		transform: translate(4px, -50%);
		position: absolute;
		top: 0;
		right: 0;
	`;

	const strikethroughPriceCss = css`
		${textSans17};
		color: ${neutral[46]};
		margin: 0;
	`;

	const offerBoxTitleCss = css`
		${textSansBold24};
		color: ${neutral[7]};
		margin: 0;
	`;

	const billingResumptionDateCss = css`
		${textSans15};
		color: ${neutral[38]};
		margin: 0;
	`;

	const offerButtonCss = css`
		margin: ${space[5]}px 0;
		width: 100%;
		justify-content: center;
	`;

	const cancelButtonCss = css`
		margin: ${space[3]}px 0;
		width: 100%;
		justify-content: center;
	`;

	const termsCss = css`
		${textSans12};
		color: ${palette.neutral[46]};
		margin-top: ${space[3]}px;
	`;

	pageTitleContext.setPageTitle('Your exclusive offer');

	return (
		<>
			<ProgressStepper
				steps={[{}, {}, { isCurrentStep: true }, {}]}
				additionalCSS={css`
					margin: ${space[8]}px 0 ${space[9]}px;
				`}
			/>
			<Heading
				cssOverrides={[
					measure.heading,
					css`
						margin-bottom: ${space[1]}px;
					`,
				]}
			>
				This doesn't have to be goodbye
			</Heading>
			<h3 css={standfirstCss}>
				Instead of cancelling, enjoy {offerPeriodWord} {offerPeriodType}{' '}
				with all your existing benefits - for free
			</h3>
			<div css={availableOfferBoxCss}>
				<Ribbon
					copy="Exclusive for you"
					ribbonColour={palette.neutral[60]}
					copyColour={palette.neutral[0]}
					additionalCss={ribbonCss}
				/>
				<div
					css={css`
						padding: ${space[6]}px ${space[3]}px ${space[5]}px;
						width: 100%;
					`}
				>
					{isPaidSubscriptionPlan(mainPlan) && (
						<p css={strikethroughPriceCss}>
							<s>
								{mainPlan.currency}
								{mainPlan.price / 100}/{mainPlan.billingPeriod}
							</s>
						</p>
					)}

					<h4 css={offerBoxTitleCss}>
						{capitalize(offerPeriodWord)} {offerPeriodType} free
					</h4>
					<p css={billingResumptionDateCss}>
						Billing resumes on {nextNonDiscountedPaymentDate}
					</p>
					<Button
						onClick={() => {
							navigate('../offer-review', {
								state: routerState,
							});
						}}
						cssOverrides={offerButtonCss}
					>
						Redeem your offer
					</Button>
					<p
						css={css`
							margin: 0 0 ${space[5]}px;
							${textSans15};
						`}
					>
						Keep your existing benefits:
					</p>
					<BenefitsSection
						small
						benefits={[
							{
								name: '',
								description:
									'Unlimited access to the Guardian app',
							},
							{
								name: '',
								description:
									'Ad-free reading across all your devices',
							},
							{
								name: '',
								description: 'Exclusive supporter newsletter',
							},
							{
								name: '',
								description: 'Far fewer asks for support when',
							},
						]}
					/>
				</div>
			</div>
			<Button
				priority="tertiary"
				cssOverrides={cancelButtonCss}
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
				priority="subdued"
				cssOverrides={cancelButtonCss}
				onClick={() => {
					navigate('/');
				}}
			>
				Return to your account
			</Button>
			<p css={termsCss}>
				Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam
				condimentum tempus diam, ultricies sollicitudin erat facilisis
				eget. Vestibulum rhoncus dui vel eros laoreet consectetur.
				Vivamus eget elementum ligula, vitae pharetra quam. Nullam at
				ligula sed metu
			</p>
		</>
	);
};
