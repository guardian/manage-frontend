import { css } from '@emotion/react';
import {
	Button,
	themeButtonReaderRevenueBrand,
} from '@guardian/source/react-components';
import { useNavigate } from 'react-router-dom';
import { useUpgradeProductStore } from '@/client/stores/UpgradeProductStore';
import {
	subHeadingCss,
	subHeadingInformationTextCss,
	subHeadingWithInformationCss,
} from '@/client/styles/headings';
import { trackEvent } from '@/client/utilities/analytics';
import { PRODUCT_TYPES } from '@/shared/productTypes';
import { productCardConfiguration } from '../accountoverview/ProductCardConfiguration';
import { productCardTitleCss } from '../accountoverview/ProductCardStyles';
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

export const UpgradeProductInformation = () => {
	const navigate = useNavigate();

	const { mainPlan, specificProductType, subscription, previewResponse } =
		useUpgradeProductStore();

	if (!mainPlan || !specificProductType || !subscription) {
		return null;
	}

	const nextPaymentDetails = getNextPaymentDetails(
		mainPlan,
		subscription,
		null,
		false,
	);

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
				>
					<div css={cardHeaderDivCss}>
						<h3 css={productCardTitleCss(false)}>
							{PRODUCT_TYPES.digipack.productTitle()}
						</h3>
						<h3 css={productCardTitleCss(false)}>
							{mainPlan.currency}
							{previewResponse?.targetCatalogPrice}/
							{nextPaymentDetails?.paymentInterval}
						</h3>
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
						trackEvent({
							eventCategory: 'account_overview',
							eventAction: 'click',
							eventLabel: `/${specificProductType.urlPart}/upgrade-product/confirmation`,
						});
						navigate(
							`/${specificProductType.urlPart}/upgrade-product/confirmation`,
						);
					}}
				>
					{`Upgrade now`}
				</Button>
			</div>
		</>
	);
};
