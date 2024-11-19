import { css } from '@emotion/react';
import {
	from,
	neutral,
	palette,
	space,
	textEgyptian17,
	textSans12,
	textSans17,
	textSansBold15,
	textSansBold20,
	textSansBold24,
	textSansBold28,
} from '@guardian/source/foundations';
import { Button } from '@guardian/source/react-components';
import { capitalize } from 'lodash';
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Pill } from '@/client/components/shared/Pill';
import { measure } from '@/client/styles/typography';
import type { DiscountPreviewResponse } from '@/client/utilities/discountPreview';
import { getMaxNonDiscountedPrice } from '@/client/utilities/discountPreview';
import {
	DATE_FNS_LONG_OUTPUT_FORMAT,
	getAppropriateReadableTimePeriod,
	parseDate,
} from '@/shared/dates';
import { number2words } from '@/shared/numberUtils';
import { getMainPlan, isPaidSubscriptionPlan } from '@/shared/productResponse';
import type { ProductTypeKeys } from '@/shared/productTypes';
import type { DeliveryRecordDetail } from '../../delivery/records/deliveryRecordsApi';
import type { OutstandingHolidayStop } from '../../holiday/HolidayStopApi';
import { BenefitsSection } from '../../shared/benefits/BenefitsSection';
import { Heading } from '../../shared/Heading';
import { ProgressStepper } from '../../shared/ProgressStepper';
import type { CancellationContextInterface } from '../CancellationContainer';
import { CancellationContext } from '../CancellationContainer';
import type { OptionalCancellationReasonId } from '../cancellationReason';

interface RouterSate extends DiscountPreviewResponse {
	selectedReasonId: OptionalCancellationReasonId;
	cancellationPolicy: string;
	caseId: string;
	holidayStops?: OutstandingHolidayStop[];
	deliveryCredits?: DeliveryRecordDetail[];
	eligibleForFreePeriodOffer: boolean;
}

const standfirstCss = css`
	${textEgyptian17};
	color: ${neutral[7]};
	margin: 0 0 ${space[8]}px;
`;

const availableOfferBoxCss = css`
	${textSans17};
	border: 1px solid ${palette.neutral[86]};
	display: flex;
	flex-wrap: wrap;
	margin: ${space[5]}px 0 ${space[8]}px;
	width: 100%;
	position: relative;
	${from.tablet} {
		border: none;
	}
`;

const offerBoxWithoutImageCss = css`
	${from.tablet} {
		border: 1px solid ${palette.neutral[93]};
	}
`;

const availableOfferBoxInnerCss = css`
	padding: 0 ${space[4]}px ${space[5]}px;
	width: 100%;
	${from.tablet} {
		background-color: ${palette.neutral[100]};
		width: 363px;
		padding: var(--offerBoxTopPadding) ${space[6]}px ${space[5]}px;
		margin: ${space[6]}px;
	}
`;

const offerBoxInnerWithoutImageCss = css`
	padding: ${space[4]}px;
	${from.tablet} {
		width: 410px;
		padding: ${space[6]}px;
		margin: 0;
	}
`;

const headerImageCss = css`
	display: flex;
	justify-content: center;
	width: 100%;
	height: auto;
	background-color: ${palette.culture[800]};
	${from.tablet} {
		position: absolute;
		z-index: -1;
		height: 100%;
		overflow: hidden;
		justify-content: flex-start;
		img {
			height: 100%;
			margin-left: 389px;
		}
	}
`;

const pillCss = css`
	transform: translateY(-50%);
	margin-left: ${space[4]}px;
	${from.tablet} {
		margin-left: 0;
		position: absolute;
		top: ${space[6]}px;
		left: ${space[12]}px;
	}
`;

const strikethroughPriceCss = css`
	${textSans17};
	color: ${neutral[46]};
	margin: 0;
`;

const discountedPriceSpan = css`
	${textSansBold20};
	color: ${neutral[0]};
`;

const offerBoxTitleCss = css`
	color: ${neutral[7]};
	margin: 0;
`;

const billingResumptionDateCss = css`
	${textSans12};
	color: ${neutral[38]};
	margin: 0;
`;

const billingResumptionDatePercentageOfferCss = css`
	margin-bottom: ${space[6]}px;
	${from.tablet} {
		margin-bottom: ${space[5]}px;
	}
`;

const offerButtonCss = css`
	margin: ${space[5]}px 0 ${space[6]}px;
	width: 100%;
	justify-content: center;
	${from.tablet} {
		margin-bottom: ${space[5]}px;
	}
`;

const offerButtonSmallBottomMargin = css`
	margin-bottom: ${space[2]}px;
	${from.tablet} {
		margin-bottom: ${space[2]}px;
	}
`;

const benefitsSubTitleCss = css`
	margin: 0 0 ${space[3]}px;
	${textSansBold15};
	${from.tablet} {
		border-top: 1px solid ${palette.neutral[86]};
		padding-top: ${space[3]}px;
		margin-bottom: ${space[4]}px;
	}
`;

const cancelBtnHolderCss = css`
	${from.phablet} {
		display: flex;
		justify-content: space-between;
	}
`;

const cancelButtonCss = css`
	margin: 0 0 ${space[3]}px;
	width: 100%;
	justify-content: center;
	${from.tablet} {
		width: fit-content;
	}
`;

const termsCss = css`
	${textSans12};
	color: ${palette.neutral[46]};
	margin-top: ${space[3]}px;
`;

export const CancelAlternativeOffer = () => {
	const location = useLocation();
	const routerState = location.state as RouterSate;
	const navigate = useNavigate();

	const cancellationContext = useContext(
		CancellationContext,
	) as CancellationContextInterface;

	const productDetail = cancellationContext.productDetail;
	const productType = cancellationContext.productType;
	const mainPlan = getMainPlan(productDetail.subscription);

	const offerPeriodWord = number2words(routerState.upToPeriods);
	const offerPeriodType = routerState.upToPeriodsType;
	const nextNonDiscountedPaymentDate = parseDate(
		routerState.nextNonDiscountedPaymentDate,
		'yyyy-MM-dd',
	).dateStr(DATE_FNS_LONG_OUTPUT_FORMAT);

	const humanReadableStrikethroughPrice = getMaxNonDiscountedPrice(
		routerState.nonDiscountedPayments,
		true,
	);
	const alternativeIsOffer = productType.productType === 'supporterplus';
	const alternativeIsPause = productType.productType === 'contributions';

	const offerIsPercentageOrFree: 'percentage' | 'free' | false =
		alternativeIsOffer &&
		(routerState.discountPercentage < 100 ? 'percentage' : 'free');

	const standfirstCopy: Partial<Record<ProductTypeKeys, string>> = {
		supporterplus:
			offerIsPercentageOrFree === 'percentage'
				? `Instead of cancelling, take ${routerState.discountPercentage}% off and keep enjoying all your existing benefits.`
				: `Instead of cancelling, enjoy ${offerPeriodWord} ${offerPeriodType} with all your existing benefits${
						offerIsPercentageOrFree === 'free' ? ' — for free' : ''
				  }.`,
		contributions: `Instead of cancelling, you can pause your recurring payment for ${offerPeriodWord} ${offerPeriodType}.`,
	};

	const heroImageSrc: { mobile: string; desktop: string } = {
		mobile: alternativeIsOffer
			? 'https://media.guim.co.uk/63d17ee19313703129fbbeacceaafcd6d1cc1014/0_0_1404_716/500.png'
			: '',
		desktop: alternativeIsOffer
			? 'https://i.guim.co.uk/img/media/02c17de8ea17126fbd87f6567ce5cd80f128546d/0_0_2212_1869/2000.png?width=1000&quality=75&s=492edad637979aa4e57e957cb12cd4f1'
			: '',
	};

	const withHeroImage =
		Boolean(heroImageSrc.mobile) && Boolean(heroImageSrc.desktop);

	return (
		<>
			<ProgressStepper
				steps={[{}, {}, { isCurrentStep: true }, {}]}
				additionalCSS={css`
					margin: ${space[8]}px 0 ${space[9]}px;
				`}
			/>
			<Heading
				borderless
				cssOverrides={[
					measure.heading,
					css`
						margin-bottom: ${space[2]}px;
					`,
				]}
			>
				This doesn't have to be goodbye
			</Heading>
			<h3 css={standfirstCss}>
				{standfirstCopy[productType.productType]}
			</h3>
			<div
				css={[
					availableOfferBoxCss,
					!withHeroImage && offerBoxWithoutImageCss,
				]}
			>
				{withHeroImage && (
					<picture css={headerImageCss}>
						<source
							srcSet={heroImageSrc.desktop}
							media="(min-width: 740px)"
						/>
						<img src={heroImageSrc.mobile} />
					</picture>
				)}
				{alternativeIsOffer && (
					<Pill
						copy="Your one-time offer"
						colour={
							offerIsPercentageOrFree === 'percentage'
								? palette.news[400]
								: palette.brand[500]
						}
						additionalCss={pillCss}
					/>
				)}
				<div
					css={[
						availableOfferBoxInnerCss,
						!withHeroImage && offerBoxInnerWithoutImageCss,
					]}
					style={{
						['--offerBoxTopPadding' as string]: alternativeIsOffer
							? `${space[8]}px`
							: `${space[4]}px`,
					}}
				>
					{offerIsPercentageOrFree === 'percentage' && (
						<h4
							css={[
								offerBoxTitleCss,
								css`
									${textSansBold24}
								`,
							]}
						>
							{routerState.discountPercentage}% off for{' '}
							{getAppropriateReadableTimePeriod(
								routerState.upToPeriods,
								offerPeriodType,
							)}
						</h4>
					)}
					{alternativeIsOffer && isPaidSubscriptionPlan(mainPlan) && (
						<p css={strikethroughPriceCss}>
							<s>
								{mainPlan.currency}
								{humanReadableStrikethroughPrice}/
								{mainPlan.billingPeriod}
							</s>
							{offerIsPercentageOrFree === 'percentage' && (
								<span css={discountedPriceSpan}>
									{' '}
									{mainPlan.currency}
									{routerState.discountedPrice}/
									{mainPlan.billingPeriod}
								</span>
							)}
						</p>
					)}
					{alternativeIsPause && (
						<h4
							css={[
								offerBoxTitleCss,
								css`
									${textSansBold20}
								`,
							]}
						>
							Would you like to pause your support to the Guardian
							for {offerPeriodWord} {offerPeriodType}?
						</h4>
					)}
					{offerIsPercentageOrFree === 'free' && (
						<h4
							css={[
								offerBoxTitleCss,
								css`
									${textSansBold28}
								`,
							]}
						>
							{capitalize(offerPeriodWord)} {offerPeriodType} free
						</h4>
					)}
					{offerIsPercentageOrFree === 'free' && (
						<p css={billingResumptionDateCss}>
							Billing resumes on {nextNonDiscountedPaymentDate}
						</p>
					)}
					<Button
						onClick={() => {
							const reviewUrlPart = `../${
								(alternativeIsOffer && 'offer-review') || ''
							}${(alternativeIsPause && 'pause-review') || ''}`;
							navigate(reviewUrlPart, {
								state: routerState,
							});
						}}
						cssOverrides={[
							offerButtonCss,
							css`
								${offerIsPercentageOrFree === 'percentage'
									? offerButtonSmallBottomMargin
									: ''}
							`,
						]}
					>
						{alternativeIsOffer && 'Redeem your offer'}
						{alternativeIsPause && 'Yes, pause my support'}
					</Button>
					{offerIsPercentageOrFree === 'percentage' &&
						isPaidSubscriptionPlan(mainPlan) && (
							<p
								css={[
									billingResumptionDateCss,
									billingResumptionDatePercentageOfferCss,
								]}
							>
								You will pay {mainPlan.currency}
								{routerState.discountedPrice} for the next{' '}
								{routerState.upToPeriods} {offerPeriodType} then{' '}
								{mainPlan.currency}
								{getMaxNonDiscountedPrice(
									routerState.nonDiscountedPayments,
									true,
								)}
								/{mainPlan.billingPeriod}
							</p>
						)}
					{alternativeIsOffer && (
						<>
							<p css={benefitsSubTitleCss}>
								Keep your existing benefits:
							</p>
							<div
								css={css`
									max-width: 290px;
								`}
							>
								<BenefitsSection
									small
									benefits={[
										{
											description:
												'Unlimited access to the Guardian app',
										},
										{
											description:
												'Unlimited access to the Guardian Feast App',
										},
										{
											description:
												'Ad-free reading across all your devices',
										},
										{
											description:
												'Exclusive supporter newsletter',
										},
										{
											description:
												"Far fewer asks for support when you're signed in",
										},
									]}
								/>
							</div>
						</>
					)}
				</div>
			</div>
			<div css={cancelBtnHolderCss}>
				<Button
					priority="tertiary"
					cssOverrides={cancelButtonCss}
					onClick={() => {
						navigate('../confirm', {
							state: {
								...routerState,
								eligibleForFreePeriodOffer: alternativeIsOffer,
								eligibleForPause: alternativeIsPause,
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
			</div>
			{isPaidSubscriptionPlan(mainPlan) && (
				<p css={termsCss}>
					Your {mainPlan.billingPeriod}ly payments of{' '}
					{mainPlan.currency}
					{humanReadableStrikethroughPrice} will automatically resume
					on {nextNonDiscountedPaymentDate} unless you cancel
				</p>
			)}
		</>
	);
};
