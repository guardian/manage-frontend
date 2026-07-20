import { css } from '@emotion/react';
import {
	from,
	headlineLight20,
	headlineLight24,
	palette,
	space,
	textSans12,
	until,
} from '@guardian/source/foundations';
import {
	Button,
	themeButtonReaderRevenueBrand,
} from '@guardian/source/react-components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useUpgradeProductStore } from '@/client/stores/UpgradeProductStore';
import {
	subHeadingCss,
	subHeadingInformationTextCss,
	subHeadingWithInformationCss,
} from '@/client/styles/headings';
import { trackEvent } from '@/client/utilities/analytics';
import {
	formatCurrency,
	getInformationDiscountHelperText,
	isDiscountedPreview,
} from '@/client/utilities/upgradeProductPaymentCopy';
import { PRODUCT_TYPES } from '@/shared/productTypes';
import { Pill } from '../../shared/Pill';
import {
	productCardConfiguration,
	textColour,
} from '../accountoverview/ProductCardConfiguration';
import {
	productCardTitleCss,
	promoPillCss,
} from '../accountoverview/ProductCardStyles';
import { getUpsellBenefits } from '../shared/benefits/BenefitsConfiguration';
import { BenefitsToggle } from '../shared/benefits/BenefitsToggle';
import { Card } from '../shared/Card';
import { getNextPaymentDetails } from '../shared/NextPaymentDetails';
import {
	actionButtonsContainerCss,
	benefitsTextCss,
} from './UpgradeProductContainer';

const cardHeaderDivCss = css`
	display: flex;
	justify-content: space-between;
`;

const discountedPriceCss = css`
	${headlineLight20};
	text-decoration: line-through;
	margin-right: ${space[2]}px;

	${from.tablet} {
		${headlineLight24};
	}
`;

const cardHeaderOverrideCss = css`
	padding-bottom: ${space[5]}px;

	${from.tablet} {
		padding-bottom: ${space[5]}px;
	}
`;

const cardHeaderPriceContainerCss = css`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const cardHeaderPriceTextCss = css`
	${textSans12};
	color: ${textColour.light};
	margin-bottom: 0;
	text-align: center;

	${until.mobileMedium} {
		max-width: 75%;
	}
`;

const promoPillContainerCss = css`
	display: flex;
	align-items: flex-start;
	flex-direction: column;
	gap: ${space[0]}px;

	${from.tablet} {
		flex-direction: row;
		gap: ${space[3]}px;
	}
`;

export const UpgradeProductInformation = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const {
		mainPlan,
		specificProductType,
		subscription,
		previewResponse,
		isDiscountedOffer,
	} = useUpgradeProductStore();

	if (
		!mainPlan ||
		!specificProductType ||
		!subscription ||
		!previewResponse
	) {
		return null;
	}

	const nextPaymentDetails = getNextPaymentDetails(
		mainPlan,
		subscription,
		null,
		false,
	);

	const discountConditionsText =
		isDiscountedOffer && isDiscountedPreview(previewResponse)
			? getInformationDiscountHelperText(
					previewResponse,
					mainPlan.currency,
					nextPaymentDetails?.paymentInterval ?? 'month',
			  )
			: '';

	return (
		<>
			<h2 css={subHeadingCss}>Your current subscription</h2>

			<Card>
				<Card.Header
					backgroundColor={
						productCardConfiguration[
							PRODUCT_TYPES.supporterplus.productType
						].colour
					}
					minHeightOverride="auto"
				>
					<div css={cardHeaderDivCss}>
						<h3 css={productCardTitleCss(false)}>
							{PRODUCT_TYPES.supporterplus.productTitle()}
						</h3>
						<h3 css={productCardTitleCss(false)}>
							{nextPaymentDetails?.paymentValueShort}/
							{nextPaymentDetails?.paymentInterval}
						</h3>
					</div>
				</Card.Header>
				<Card.Section>
					<p css={benefitsTextCss}>
						You pay {nextPaymentDetails?.paymentValueShort} on a
						recurring basis every{' '}
						{nextPaymentDetails?.paymentInterval}
					</p>
					<BenefitsToggle
						productType={PRODUCT_TYPES.supporterplus.productType}
						subscriptionPlan={mainPlan}
					/>
				</Card.Section>
			</Card>

			<h2 css={subHeadingWithInformationCss}>Upgrade to Digital plus</h2>
			<p css={subHeadingInformationTextCss}>
				Get more from your subscription and enjoy new benefits and
				complete access with Digital plus.
			</p>
			<Card>
				<Card.Header
					backgroundColor={
						productCardConfiguration[
							PRODUCT_TYPES.digipack.productType
						].colour
					}
					minHeightOverride="auto"
					cssOverrides={
						isDiscountedOffer ? cardHeaderOverrideCss : undefined
					}
				>
					<div css={cardHeaderDivCss}>
						<div css={promoPillContainerCss}>
							<h3 css={[productCardTitleCss(false)]}>
								{PRODUCT_TYPES.digipack.productTitle()}
							</h3>
							{isDiscountedOffer && (
								<Pill
									copy="Limited offer"
									colour={palette.sport['800']}
									copyColour={palette.sport['300']}
									additionalCss={promoPillCss}
								/>
							)}
						</div>

						<div css={cardHeaderPriceContainerCss}>
							<h3
								css={[
									productCardTitleCss(false),
									css`
										margin-bottom: 0;
									`,
								]}
							>
								{isDiscountedOffer && (
									<span css={discountedPriceCss}>
										{formatCurrency(
											mainPlan.currency,
											previewResponse.targetCatalogPrice,
										)}
									</span>
								)}
								{isDiscountedOffer &&
								isDiscountedPreview(previewResponse)
									? formatCurrency(
											mainPlan.currency,
											previewResponse.discount
												.discountedPrice,
									  )
									: formatCurrency(
											mainPlan.currency,
											previewResponse.targetCatalogPrice,
									  )}
								/{nextPaymentDetails?.paymentInterval}
							</h3>
							{isDiscountedOffer && (
								<p css={cardHeaderPriceTextCss}>
									{discountConditionsText}
								</p>
							)}
						</div>
					</div>
				</Card.Header>
				<Card.Section>
					<p css={benefitsTextCss}>
						The rewards from{' '}
						<strong>All-access digital plus</strong>:
					</p>
					<BenefitsToggle
						productType={PRODUCT_TYPES.digipack.productType}
						subscriptionPlan={mainPlan}
						alwaysShowBenefits
						overrideBenefits={getUpsellBenefits(
							PRODUCT_TYPES.supporterplus.productType,
						)}
					/>
				</Card.Section>
			</Card>

			<div css={actionButtonsContainerCss}>
				<Button
					aria-label={`Product Card Digital Plus Upsell Button`}
					data-cy={`digital-plus-upsell-button`}
					size="small"
					priority="primary"
					theme={themeButtonReaderRevenueBrand}
					cssOverrides={css`
						justify-content: center;
					`}
					onClick={() => {
						const search = searchParams.toString();
						const confirmationPath = `/${
							specificProductType.urlPart
						}/upgrade-product/confirmation${
							search ? `?${search}` : ''
						}`;

						trackEvent({
							eventCategory: 'account_overview',
							eventAction: 'click',
							eventLabel: `/${specificProductType.urlPart}/upgrade-product/confirmation`,
						});
						navigate(confirmationPath);
					}}
				>
					{`Upgrade now`}
				</Button>
			</div>
		</>
	);
};
