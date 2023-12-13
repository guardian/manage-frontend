import { css, ThemeProvider } from '@emotion/react';
import { from, headline, space, textSans } from '@guardian/source-foundations';
import {
	Button,
	buttonThemeReaderRevenueBrand,
	Stack,
	SvgTickRound,
} from '@guardian/source-react-components';
import { ErrorSummary } from '@guardian/source-react-components-development-kitchen';
import { captureMessage } from '@sentry/browser';
import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import {
	buttonCentredCss,
	buttonContainerCss,
} from '@/client/styles/ButtonStyles';
import { fetchWithDefaultParameters } from '@/client/utilities/fetch';
import {
	LoadingState,
	useAsyncLoader,
} from '@/client/utilities/hooks/useAsyncLoader';
import {
	getDiscountMonthsForDigisub,
	getNewDigisubPrice,
	getOldDigisubPrice,
} from '@/client/utilities/pricingConfig/digisubDiscountPricing';
import { formatAmount } from '@/client/utilities/utils';
import type { PaidSubscriptionPlan } from '@/shared/productResponse';
import { getMainPlan } from '@/shared/productResponse';
import { dateString } from '../../../../../../shared/dates';
import { JsonResponseHandler } from '../../../shared/asyncComponents/DefaultApiResponseHandler';
import { DefaultLoadingView } from '../../../shared/asyncComponents/DefaultLoadingView';
import { benefitsCss } from '../../../shared/benefits/BenefitsStyles';
import { Heading } from '../../../shared/Heading';
import type {
	CancellationContextInterface,
	CancellationRouterState,
} from '../../CancellationContainer';
import { CancellationContext } from '../../CancellationContainer';

type DiscountOfferProps = {
	currencySymbol: string;
	discountMonths: number;
	discountedPrice: number;
	isDiscountLoading: boolean;
	hasDiscountFailed: boolean;
	handleDiscountOfferClick: () => void;
	newPrice: number;
};

const DiscountOffer = ({
	currencySymbol,
	discountMonths,
	discountedPrice,
	isDiscountLoading,
	hasDiscountFailed,
	handleDiscountOfferClick,
	newPrice,
}: DiscountOfferProps) => (
	<Stack
		space={4}
		css={css`
			background-color: #f3f7fe;
			border-radius: 4px;
			padding: ${space[4]}px;
		`}
	>
		<div>
			<div
				css={css`
					${textSans.large({ fontWeight: 'bold' })}
					margin-bottom: ${space[2]}px;
				`}
			>
				A subscription offer just for you
			</div>
			<ul css={benefitsCss}>
				<li>
					<SvgTickRound isAnnouncedByScreenReader size="medium" />
					<span
						css={css`
							padding-top: ${space[1]}px;
						`}
					>
						Get a 25% discount for {discountMonths} months (
						{currencySymbol}
						{formatAmount(discountedPrice)}, then {currencySymbol}
						{newPrice})
					</span>
				</li>
				<li>
					<SvgTickRound isAnnouncedByScreenReader size="medium" />{' '}
					<span
						css={css`
							padding-top: ${space[1]}px;
						`}
					>
						Keep all your supporter extras, including unlimited,
						ad-free reading
					</span>
				</li>
				<li>
					<SvgTickRound isAnnouncedByScreenReader size="medium" />{' '}
					<span
						css={css`
							padding-top: ${space[1]}px;
						`}
					>
						Exclusive access to the Editions app (our daily digital
						newspaper)
					</span>
				</li>
			</ul>
		</div>
		<div css={buttonContainerCss}>
			<ThemeProvider theme={buttonThemeReaderRevenueBrand}>
				<Button
					cssOverrides={buttonCentredCss}
					onClick={handleDiscountOfferClick}
					isLoading={isDiscountLoading}
				>
					Keep support with discount
				</Button>
			</ThemeProvider>
		</div>
		{hasDiscountFailed && (
			<ErrorSummary
				message={
					'We were unable to apply your discount. Please try again'
				}
			/>
		)}
	</Stack>
);

type EligibilityResponse = {
	valid: boolean;
};

export const ThankYouOffer = () => {
	const navigate = useNavigate();
	const cancellationContext = useContext(
		CancellationContext,
	) as CancellationContextInterface;
	const productDetail = cancellationContext.productDetail;

	const {
		data,
		loadingState,
	}: {
		data: EligibilityResponse | null;
		loadingState: LoadingState;
	} = useAsyncLoader(
		() =>
			fetchWithDefaultParameters('/api/discounts/check-eligibility', {
				method: 'POST',
				body: JSON.stringify({
					subscriptionNumber:
						productDetail.subscription.subscriptionId,
					discountProductRatePlanId:
						'2c92c0f962cec7990162d3882afc52dd',
				}),
			}),
		JsonResponseHandler,
	);

	const location = useLocation();
	const routerState = location.state as CancellationRouterState;

	const [isDiscountLoading, setIsDiscountLoading] = useState<boolean>(false);
	const [hasDiscountFailed, setHasDiscountFailed] = useState<boolean>(false);

	if (loadingState == LoadingState.IsLoading) {
		return <DefaultLoadingView loadingMessage="Loading..." />;
	}
	if (loadingState == LoadingState.HasError) {
		captureMessage('Error loading discount eligibility');
	}

	const eligibleForDiscount = data?.valid;

	if (!productDetail) {
		navigate('/');
		return null;
	}

	const supportStartYear = dateString(
		new Date(productDetail.joinDate),
		'yyyy',
	);

	const mainPlan = getMainPlan(
		productDetail.subscription,
	) as PaidSubscriptionPlan;

	const discountMonths = getDiscountMonthsForDigisub(productDetail);
	const discountedPrice = getOldDigisubPrice(mainPlan);
	const newPrice = getNewDigisubPrice(mainPlan);

	const handleDiscountOfferClick = async () => {
		if (isDiscountLoading) {
			return;
		}

		try {
			setIsDiscountLoading(true);

			const result = await fetchWithDefaultParameters(
				'/api/discounts/apply-discount',
				{
					method: 'POST',
					body: JSON.stringify({
						subscriptionNumber: productDetail.subscription,
						discountProductRatePlanId: 'todo',
					}),
				},
			).then((response) => response.text());

			if (result === 'Success') {
				setIsDiscountLoading(false);
				navigate('./confirm-discount', {
					state: { ...routerState },
				});
			} else {
				setIsDiscountLoading(false);
				setHasDiscountFailed(true);
			}
		} catch (e) {
			setIsDiscountLoading(false);
			setHasDiscountFailed(true);
		}
	};

	return (
		<section
			css={css`
				margin-top: ${space[4]}px;
			`}
		>
			<Stack space={6}>
				<h2
					css={css`
						${headline.xsmall({ fontWeight: 'bold' })};
						margin-top: 0;
						margin-bottom: 0;
						${from.tablet} {
							${headline.medium({ fontWeight: 'bold' })};
						}
					`}
				>
					Thank you for supporting the Guardian since{' '}
					{supportStartYear}
				</h2>
				<Stack space={1}>
					<Heading sansSerif borderless level="3">
						Your funding has played a vital role in our progress
					</Heading>
					<p
						css={css`
							${textSans.medium()};
						`}
					>
						Since you first joined as a Guardian supporter, we've
						lived through some of the most important news events of
						our times. Without you, our fearless, independent
						journalism wouldn't have reached millions around the
						world. We're so grateful.
					</p>
				</Stack>
				{eligibleForDiscount && (
					<DiscountOffer
						currencySymbol={mainPlan.currency}
						discountMonths={discountMonths}
						discountedPrice={discountedPrice}
						isDiscountLoading={isDiscountLoading}
						hasDiscountFailed={hasDiscountFailed}
						handleDiscountOfferClick={handleDiscountOfferClick}
						newPrice={newPrice}
					/>
				)}
				<div>
					<h3
						css={css`
							${textSans.large({ fontWeight: 'bold' })};
							margin: 0;
						`}
					>
						Still want to cancel?
					</h3>
					<Button
						priority="subdued"
						onClick={() =>
							navigate('../confirm-cancel', {
								state: { ...routerState },
							})
						}
					>
						Continue to cancel
					</Button>
				</div>
			</Stack>
		</section>
	);
};
