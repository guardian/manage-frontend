import { css } from '@emotion/react';
import {
	from,
	neutral,
	palette,
	space,
	textEgyptian17,
	textSans12,
	textSans15,
	textSans17,
	textSans20,
	textSansBold15,
	textSansBold20,
	textSansBold28,
} from '@guardian/source/foundations';
import { Button } from '@guardian/source/react-components';
import * as Sentry from '@sentry/browser';
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Pill } from '@/client/components/shared/Pill';
import { measure } from '@/client/styles/typography';
import { getBenefitsThreshold } from '@/client/utilities/pricingConfig/supporterPlusPricing';
import { getMainPlan, isPaidSubscriptionPlan } from '@/shared/productResponse';
import type { SwitchPreviewResponse } from '@/shared/productSwitchTypes';
import type { DeliveryRecordDetail } from '../../delivery/records/deliveryRecordsApi';
import type { OutstandingHolidayStop } from '../../holiday/HolidayStopApi';
import { GenericErrorMessage } from '../../identity/GenericErrorMessage';
import { BenefitsSection } from '../../shared/benefits/BenefitsSection';
import { Heading } from '../../shared/Heading';
import { ProgressStepper } from '../../shared/ProgressStepper';
import type { CancellationContextInterface } from '../CancellationContainer';
import { CancellationContext } from '../CancellationContainer';
import type { OptionalCancellationReasonId } from '../cancellationReason';
import { reasonIsEligibleForSwitch } from './saveEligibilityCheck';

interface RouterSate extends SwitchPreviewResponse {
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
	position: relative;
	display: flex;
	flex-wrap: wrap;
	margin: ${space[5]}px 0 ${space[6]}px;
	width: 100%;
	${from.tablet} {
		border: none;
		margin: ${space[5]}px 0 ${space[8]}px;
	}
`;

const contactUsBoxCss = css`
	border: 1px solid ${palette.neutral[86]};
	margin: ${space[6]}px 0 ${space[8]}px;
	padding: ${space[4]}px;
	${from.tablet} {
		background-color: ${palette.culture[800]};
		border: none;
		margin: ${space[8]}px 0;
		padding: ${space[6]}px;
	}
`;

const contactUsSeperator = css`
	display: flex;
	align-items: center;
	text-align: center;
	${textSans20};
	&::before,
	::after {
		content: '';
		flex: 1;
		border-bottom: 1px solid ${palette.neutral[86]};
	}
	&:not(:empty)::before {
		margin-right: ${space[4]}px;
	}
	&:not(:empty)::after {
		margin-left: ${space[4]}px;
	}
`;

const contactUsInnerBoxCss = css`
	${from.tablet} {
		background-color: ${palette.neutral[100]};
		padding: ${space[4]}px;
	}
`;

const contactUsTitleCss = css`
	${textSansBold20};
	text-align: left;
	color: ${neutral[7]};
	margin: 0;
`;

const contactUsBodyCopyCss = css`
	${textSans15};
	margin: 0;
`;

const contactUsDescriptionCss = css`
	margin: ${space[2]}px 0 ${space[5]}px;
	${from.tablet} {
		margin: ${space[2]}px 0 ${space[6]}px;
	}
`;

const contactUsPhoneNumber = css`
	padding-top: ${space[3]}px;
	border-top: 1px solid ${palette.neutral[86]};
`;

const contactUsOpeningTimes = css`
	margin-top: ${space[3]}px;
	line-height: 1.5;
`;

const offerBoxWithoutImageCss = css`
	${from.tablet} {
		border: 1px solid ${palette.neutral[93]};
	}
`;

const availableOfferBoxInnerCss = css`
	padding: ${space[5]}px ${space[4]}px ${space[5]}px;
	width: 100%;
	position: relative;
	${from.tablet} {
		background-color: ${palette.neutral[100]};
		width: 366px;
		padding: ${space[5]}px ${space[6]}px ${space[5]}px;
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
	transform: translate(-50%, -50%);
	display: inline-block;
	position: absolute;
	top: 0;
	left: 50%;
`;

const offerBoxHeaderCss = css`
	${textSansBold20};
	text-align: center;
	color: ${neutral[7]};
	margin: 0;
`;

const offerHeaderPriceCss = css`
	${textSansBold28};
	color: ${neutral[7]};
	margin: 0;
`;

const strikethroughPriceCss = css`
	${textSans17};
	color: ${neutral[46]};
	margin: 0;
`;

const offerButtonCss = css`
	margin: ${space[5]}px 0 0;
	width: 100%;
	justify-content: center;
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

export const CancelAlternativeSwitch = () => {
	const location = useLocation();
	const routerState = location.state as RouterSate;
	const navigate = useNavigate();

	const cancellationContext = useContext(
		CancellationContext,
	) as CancellationContextInterface;

	const productDetail = cancellationContext.productDetail;
	const mainPlan = getMainPlan(productDetail.subscription);

	const standfirstCopy: string =
		'Consider staying a Guardian supporter and continue making great impact in support of open, independent journalism.';

	const heroImageSrc: { mobile: string; desktop: string } = {
		mobile: 'https://media.guim.co.uk/63d17ee19313703129fbbeacceaafcd6d1cc1014/0_0_1404_716/500.png',
		desktop:
			'https://i.guim.co.uk/img/media/02c17de8ea17126fbd87f6567ce5cd80f128546d/0_0_2212_1869/2000.png?width=1000&quality=75&s=492edad637979aa4e57e957cb12cd4f1',
	};

	const withHeroImage =
		Boolean(heroImageSrc.mobile) && Boolean(heroImageSrc.desktop);

	const isPaidPlan = isPaidSubscriptionPlan(mainPlan);
	if (isPaidPlan) {
		const supporterplusThreshold = getBenefitsThreshold(
			mainPlan.currencyISO,
			mainPlan.billingPeriod as 'month' | 'year',
		);

		const eligableForContactDetailsBeforeCancelling =
			productDetail.billingCountry === 'United Kingdom' &&
			mainPlan.price / 100 <= supporterplusThreshold * 0.5 &&
			reasonIsEligibleForSwitch(routerState.selectedReasonId);

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
					Before you go...
				</Heading>
				<h3 css={standfirstCss}>{standfirstCopy}</h3>
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

					<div
						css={[
							availableOfferBoxInnerCss,
							!withHeroImage && offerBoxInnerWithoutImageCss,
						]}
					>
						<Pill
							copy="Your one-time offer"
							colour={palette.news[400]}
							additionalCss={pillCss}
						/>
						<h4 css={offerBoxHeaderCss}>
							Unlock All-access digital for
							<br />
							<span css={offerHeaderPriceCss}>
								{mainPlan.currency}
								{Math.ceil(routerState.amountPayableToday)}
							</span>
							<span>/year </span>
							<s css={strikethroughPriceCss}>
								{mainPlan.currency}
								{routerState.supporterPlusPurchaseAmount}/
								{mainPlan.billingPeriod}
							</s>
						</h4>
						<Button
							onClick={() => {
								navigate('../switch-review', {
									state: routerState,
								});
							}}
							cssOverrides={[offerButtonCss]}
						>
							Redeem the offer
						</Button>
						<p css={termsCss}>
							You will pay {mainPlan.currency}
							{routerState.amountPayableToday} for the next 12
							months then {mainPlan.currency}
							{routerState.supporterPlusPurchaseAmount}
							/year.
						</p>
						<p css={benefitsSubTitleCss}>
							Access exclusive benefits:
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
					</div>
				</div>
				{eligableForContactDetailsBeforeCancelling && (
					<>
						<div css={contactUsSeperator}>or</div>
						<div css={contactUsBoxCss}>
							<div css={contactUsInnerBoxCss}>
								<h4 css={contactUsTitleCss}>
									Can’t find what you’re looking for? Contact
									us.
								</h4>
								<p
									css={[
										contactUsBodyCopyCss,
										contactUsDescriptionCss,
									]}
								>
									Get in touch with our customer service team
									for technical assistance, help managing your
									subscription, and special offers.
								</p>
								<h4
									css={[
										contactUsTitleCss,
										contactUsPhoneNumber,
									]}
								>
									+44 (0) 330 333 6790
								</h4>
								<p
									css={[
										contactUsBodyCopyCss,
										contactUsOpeningTimes,
									]}
								>
									9am - 6pm, Monday to Friday (GMT/BST)
									<br />
									9am - 6pm Saturday - Sunday (GMT/BST)
								</p>
							</div>
						</div>
					</>
				)}
				<div css={cancelBtnHolderCss}>
					<Button
						priority="tertiary"
						cssOverrides={cancelButtonCss}
						onClick={() => {
							navigate('../confirm', {
								state: {
									...routerState,
									eligibleForFreePeriodOffer: false,
									eligibleForPause: false,
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
				<p css={termsCss}>
					Ollicitudin erat facilisis eget. Vestibulum rhoncus dui vel
					eros laoreet consectetur. Vivamus eget elementum ligula,
					vitae pharetra quam. Nullam at ligula sed metu
				</p>
			</>
		);
	} else {
		Sentry.captureMessage(
			'mainPlan is not a PaidSubscriptionPlan in CancelAlternativeSwitch',
		);
		return <GenericErrorMessage />;
	}
};
