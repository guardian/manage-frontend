import { css } from '@emotion/react';
import {
	from,
	headlineBold24,
	headlineBold34,
	space,
	textSans17,
	textSansBold20,
} from '@guardian/source/foundations';
import {
	Button,
	Stack,
	SvgTickRound,
	themeButtonReaderRevenueBrand,
} from '@guardian/source/react-components';
import { ErrorSummary } from '@guardian/source-development-kitchen/react-components';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import {
	buttonCentredCss,
	buttonContainerCss,
} from '@/client/styles/ButtonStyles';
import type { DiscountPreviewResponse } from '@/client/utilities/discountPreview';
import { fetchWithDefaultParameters } from '@/client/utilities/fetch';
import { formatAmount } from '@/client/utilities/utils';
import type { PaidSubscriptionPlan } from '@/shared/productResponse';
import { getMainPlan } from '@/shared/productResponse';
import { dateString } from '../../../../../../shared/dates';
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
	discountPeriod: string;
	discountedPrice: number;
	isApplyDiscountLoading: boolean;
	hasDiscountFailed: boolean;
	handleDiscountOfferClick: () => void;
	newPrice: number;
};

const DiscountOffer = ({
	currencySymbol,
	discountPeriod,
	discountedPrice,
	isApplyDiscountLoading: isDiscountLoading,
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
					${textSansBold20};
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
						Get a 25% discount for {discountPeriod} (
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
			<Button
				theme={themeButtonReaderRevenueBrand}
				cssOverrides={buttonCentredCss}
				onClick={handleDiscountOfferClick}
				isLoading={isDiscountLoading}
			>
				Keep support with discount
			</Button>
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

function getDiscountPeriod(discountPreview: DiscountPreviewResponse): string {
	return `${
		discountPreview.upToPeriods
	} ${discountPreview.upToPeriodsType.toLowerCase()}`;
}

export interface DigisubCancellationRouterState
	extends CancellationRouterState {
	eligibleForDiscount: boolean;
	discountedPrice?: number;
	discountPeriod?: string;
}

export const DigiSubThankYouOffer = () => {
	const navigate = useNavigate();
	const cancellationContext = useContext(
		CancellationContext,
	) as CancellationContextInterface;
	const productDetail = cancellationContext.productDetail;

	const location = useLocation();
	const routerState = location.state as CancellationRouterState;

	const [isApplyDiscountLoading, setIsApplyDiscountLoading] =
		useState<boolean>(false);
	const [hasDiscountFailed, setHasDiscountFailed] = useState<boolean>(false);

	const [isPreviewDiscountLoading, setIsPreviewDiscountLoading] =
		useState<boolean>(false);
	const [discountPreview, setDiscountPreview] =
		useState<DiscountPreviewResponse | null>(null);

	useEffect(() => {
		setIsPreviewDiscountLoading(true);
		fetchWithDefaultParameters('/api/discounts/preview-discount', {
			method: 'POST',
			body: JSON.stringify({
				subscriptionNumber: productDetail.subscription.subscriptionId,
			}),
		}).then((response) => {
			if (response.ok) {
				response.json().then((data) => {
					setDiscountPreview(data);
				});
			}
			setIsPreviewDiscountLoading(false);
		});
	}, []);

	if (isPreviewDiscountLoading) {
		return <DefaultLoadingView loadingMessage="Loading..." />;
	}

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

	const newPrice =
		(productDetail.subscription.nextPaymentPrice ?? mainPlan.price) / 100;

	const newRouterState: DigisubCancellationRouterState = {
		...routerState,
		discountedPrice: discountPreview?.discountedPrice,
		eligibleForDiscount: discountPreview !== null,
		discountPeriod: discountPreview
			? getDiscountPeriod(discountPreview)
			: undefined,
	};

	const handleDiscountOfferClick = async () => {
		if (isApplyDiscountLoading) {
			return;
		}

		try {
			setIsApplyDiscountLoading(true);

			const response = await fetchWithDefaultParameters(
				'/api/discounts/apply-discount',
				{
					method: 'POST',
					body: JSON.stringify({
						subscriptionNumber:
							productDetail.subscription.subscriptionId,
					}),
				},
			);

			if (response.ok) {
				setIsApplyDiscountLoading(false);
				navigate('../discount-confirmed', {
					state: {
						...newRouterState,
						journeyCompleted: true,
					},
				});
			} else {
				setIsApplyDiscountLoading(false);
				setHasDiscountFailed(true);
			}
		} catch (e) {
			setIsApplyDiscountLoading(false);
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
						${headlineBold24};
						margin-top: 0;
						margin-bottom: 0;
						${from.tablet} {
							${headlineBold34};
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
							${textSans17};
						`}
					>
						Since you first joined as a Guardian supporter, we've
						lived through some of the most important news events of
						our times. Without you, our fearless, independent
						journalism wouldn't have reached millions around the
						world. We're so grateful.
					</p>
				</Stack>
				{discountPreview && (
					<DiscountOffer
						currencySymbol={mainPlan.currency}
						discountPeriod={getDiscountPeriod(discountPreview)}
						discountedPrice={discountPreview.discountedPrice}
						isApplyDiscountLoading={isApplyDiscountLoading}
						hasDiscountFailed={hasDiscountFailed}
						handleDiscountOfferClick={handleDiscountOfferClick}
						newPrice={newPrice}
					/>
				)}
				<div>
					<h3
						css={css`
							${textSansBold20};
							margin: 0;
						`}
					>
						Still want to cancel?
					</h3>
					<Button
						priority="subdued"
						onClick={() =>
							navigate('../confirm-cancel', {
								state: { ...newRouterState },
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
