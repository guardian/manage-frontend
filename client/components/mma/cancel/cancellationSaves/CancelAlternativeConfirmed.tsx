import { css } from '@emotion/react';
import {
	between,
	from,
	palette,
	space,
	textEgyptian17,
	textEgyptianBold17,
	textSansBold17,
} from '@guardian/source/foundations';
import {
	Button,
	LinkButton,
	SvgInfoRound,
} from '@guardian/source/react-components';
import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { measure } from '@/client/styles/typography';
import type { DiscountPreviewResponse } from '@/client/utilities/discountPreview';
import { getMaxNonDiscountedPrice } from '@/client/utilities/discountPreview';
import { DATE_FNS_LONG_OUTPUT_FORMAT, parseDate } from '@/shared/dates';
import type { PaidSubscriptionPlan } from '@/shared/productResponse';
import { getMainPlan } from '@/shared/productResponse';
import { BenefitsSection } from '../../shared/benefits/BenefitsSection';
import { DownloadAppCta } from '../../shared/DownloadAppCta';
import { DownloadFeastAppCta } from '../../shared/DownloadFeastAppCta';
import { Heading } from '../../shared/Heading';
import type {
	CancellationContextInterface,
	CancellationPageTitleInterface,
} from '../CancellationContainer';
import {
	CancellationContext,
	CancellationPageTitleContext,
} from '../CancellationContainer';
import { getUpdateCasePromise } from '../caseUpdate';

interface RouterState extends DiscountPreviewResponse {
	caseId: string;
}

const standfirstCss = css`
	${textEgyptian17};
	color: ${palette.neutral[7]};
	margin-top: 0;
`;

const nextStepsCss = css`
	margin: ${space[4]}px 0 ${space[8]}px;
	h4 {
		${textEgyptianBold17};
		margin: 0;
	}
	ul {
		${textEgyptian17};
		padding: 0;
		padding-inline-start: 14px;
		margin: ${space[3]}px 0 0;
		line-height: 1.8rem;
	}
	${from.desktop} {
		margin: ${space[6]}px 0 ${space[8]}px;
	}
`;

const nextStepsWithSuffixText = css`
	padding-bottom: ${space[6]}px;
	margin-bottom: ${space[6]}px;
	${from.desktop} {
		padding-bottom: ${space[6]}px;
		margin-bottom: ${space[6]}px;
	}
`;

const benefitsCss = css`
	display: flex;
	flex-direction: column;
	background-color: ${palette.culture[800]};
	padding: ${space[1]}px ${space[3]}px ${space[3]}px;
	h4 {
		${textSansBold17};
		margin: 0;
	}
	ul {
		margin-top: ${space[4]}px;
	}
	${from.desktop} {
		flex-direction: row;
		justify-content: space-between;
		padding: 0;
		picture {
			order: 2;
		}
	}
`;

const pictureAlignmentCss = css`
	display: flex;
	justify-content: center;
	align-items: flex-end;
	${between.desktop.and.leftCol} {
		align-items: center;
	}
	${from.leftCol} {
		max-width: 361px;
	}
`;

const benefitsLeftSideCss = css`
	${from.desktop} {
		padding: ${space[6]}px;
	}
`;

const mobileHeroHRCss = css`
	height: 1px;
	width: calc(100% - 40px);
	background-color: ${palette.neutral[60]};
	margin: 0 auto ${space[3]}px;
	${from.desktop} {
		display: none;
	}
`;

const appAdCss = css`
	margin-top: ${space[5]}px;
	${from.desktop} {
		margin-top: ${space[6]}px;
	}
`;

const dontForgetCss = css`
	display: flex;
	gap: ${space[2]}px;
	margin-top: ${space[6]}px;
	border: 1px solid ${palette.neutral[86]};
	padding: ${space[4]}px ${space[4]}px ${space[4]}px ${space[3]}px;
	svg {
		flex-shrink: 0;
	}
	p {
		margin: 0;
	}
	${from.desktop} {
		padding: ${space[4]}px ${space[4]}px ${space[4]}px ${space[5]}px;
	}
`;

const onwardJourneyBtnsContainerCss = css`
	display: flex;
	flex-direction: column;
	gap: ${space[5]}px;
	margin-top: ${space[12]}px;
	${from.phablet} {
		flex-direction: row;
		gap: ${space[4]}px;
	}
`;

const buttonCentredCss = css`
	width: 100%;
	justify-content: center;
	margin: 0;
	${from.desktop} {
		width: fit-content;
	}
`;

const updateSalesforceCase = async (
	isTestUser: boolean,
	caseId: string,
	loggingCodeSuffix: string,
	description: string,
	subject: string,
) => {
	await getUpdateCasePromise(isTestUser, loggingCodeSuffix, caseId, {
		Description: description,
		Subject: subject,
	});
};

export const CancelAlternativeConfirmed = () => {
	const location = useLocation();
	const routerState = location.state as RouterState;
	const navigate = useNavigate();

	const pageTitleContext = useContext(
		CancellationPageTitleContext,
	) as CancellationPageTitleInterface;

	const cancellationContext = useContext(
		CancellationContext,
	) as CancellationContextInterface;

	const productDetail = cancellationContext.productDetail;
	const productType = cancellationContext.productType;
	const mainPlan = getMainPlan(
		productDetail.subscription,
	) as PaidSubscriptionPlan;

	const nextNonDiscountedPaymentDate = parseDate(
		routerState.nextNonDiscountedPaymentDate,
		'yyyy-MM-dd',
	).dateStr(DATE_FNS_LONG_OUTPUT_FORMAT);

	const humanReadableNextNonDiscountedPrice = getMaxNonDiscountedPrice(
		routerState.nonDiscountedPayments,
		true,
	);
	const offerPeriodType = routerState.upToPeriodsType.toLowerCase();

	const alternativeIsOffer = productType.productType === 'supporterplus';
	const alternativeIsPause = productType.productType === 'contributions';

	const sfCaseDebugSuffix = `_${alternativeIsOffer ? 'OFFER' : ''}${
		alternativeIsPause ? 'PAUSE' : ''
	}`;
	const sfCaseDescription = `User ${alternativeIsOffer ? 'took offer' : ''}${
		alternativeIsPause ? 'paused' : ''
	} instead of cancelling`;
	const sfCaseSubject = `Online Cancellation Save Discount - ${
		alternativeIsOffer ? 'Free' : ''
	}${alternativeIsPause ? 'Pause' : ''} for ${
		routerState.upToPeriods
	} ${offerPeriodType}`;

	useEffect(() => {
		pageTitleContext.setPageTitle('Confirmation');
		updateSalesforceCase(
			productDetail.isTestUser,
			routerState.caseId,
			sfCaseDebugSuffix,
			sfCaseDescription,
			sfCaseSubject,
		);
	}, []);

	return (
		<>
			<Heading
				borderless
				cssOverrides={[
					measure.heading,
					css`
						margin: ${space[8]}px 0 ${space[2]}px;
					`,
				]}
			>
				Thank you for choosing to stay with us
			</Heading>
			<h3 css={standfirstCss}>
				Your valued support powers independent journalism.
			</h3>
			<div
				css={[
					nextStepsCss,
					alternativeIsPause && nextStepsWithSuffixText,
				]}
			>
				<h4>What happens next?</h4>
				<ul>
					<li>
						You will receive an email confirming
						{alternativeIsOffer ? ' the details of your offer' : ''}
						{alternativeIsPause
							? " you've paused your support"
							: ''}
					</li>
					{alternativeIsOffer && (
						<li>
							You will continue enjoying all the benefits of your
							All-access digital subscription – for free
						</li>
					)}
					<li>
						You will not be billed until{' '}
						{nextNonDiscountedPaymentDate} after which you will pay{' '}
						{mainPlan.currency}
						{humanReadableNextNonDiscountedPrice}/
						{mainPlan.billingPeriod}
					</li>
				</ul>
			</div>
			{alternativeIsOffer && (
				<>
					<div css={benefitsCss}>
						<picture css={pictureAlignmentCss}>
							<source
								srcSet="https://media.guim.co.uk/4642d75e4282cf62980b6aa60eb5f710a6795e82/0_0_1444_872/1000.png"
								media="(min-width: 1140px)"
							/>
							<source
								srcSet="https://media.guim.co.uk/7a20e5ce7fd500ec7bac3ec372d7d1e041f5bfe5/0_0_1252_1100/500.png"
								media="(min-width: 980px) and (max-width: 1139px)"
							/>
							<img src="https://media.guim.co.uk/63d17ee19313703129fbbeacceaafcd6d1cc1014/0_0_1404_716/500.png" />
						</picture>
						<div css={mobileHeroHRCss}></div>
						<div css={benefitsLeftSideCss}>
							<h4>
								With your offer, you will continue to enjoy:
							</h4>
							<BenefitsSection
								small
								benefits={[
									{
										description:
											'Unlimited access to the Guardian app',
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
					<DownloadAppCta additionalCss={appAdCss} />
					<DownloadFeastAppCta additionalCss={appAdCss} />
					<div css={dontForgetCss}>
						<SvgInfoRound
							size="small"
							theme={{ fill: palette.brand[400] }}
						/>
						<p>
							Don't forget to sign in on all your devices to enjoy
							your benefits.
						</p>
					</div>
				</>
			)}
			{alternativeIsPause && (
				<p css={dontForgetCss}>
					Don't forget to sign in on all your devices to get the best
					experience
				</p>
			)}
			<div css={onwardJourneyBtnsContainerCss}>
				<LinkButton
					href="https://theguardian.com"
					priority="primary"
					cssOverrides={buttonCentredCss}
				>
					Continue reading the Guardian
				</LinkButton>
				<Button
					cssOverrides={buttonCentredCss}
					priority="tertiary"
					onClick={() => navigate('/')}
				>
					Return to your account
				</Button>
			</div>
		</>
	);
};
