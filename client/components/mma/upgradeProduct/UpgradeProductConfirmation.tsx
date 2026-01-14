import { css } from '@emotion/react';
import {
	from,
	palette,
	space,
	textSans15,
	textSansBold17,
	textSansBold20,
} from '@guardian/source/foundations';
import {
	Button,
	SvgClock,
	SvgCreditCard,
	SvgReload,
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
import { BenefitsToggle } from '../shared/benefits/BenefitsToggle';
import { Card } from '../shared/Card';
import {
	actionButtonsContainerCss,
	benefitsTextCss,
	whatHappensNowItemCss,
	whatHappensNowItemInfoCss,
	whatHappensNowItemInformationBorderCss,
	whatHappensNowItemInformationTextCss,
} from './UpgradeProductContainer';

const subheadingTextCss = css`
	${textSansBold17};
	margin: 0;

	${from.tablet} {
		${textSansBold20};
	}
`;

const termsAndConditionsContainerCss = css`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: ${space[3]}px;

	${textSans15};
	padding: ${space[3]}px;
	border: 4px solid ${palette.neutral[0]};
	background-color: ${palette.neutral[97]};
`;

const termsAndConditionsTextCss = css`
	${textSans15};
	margin: 0;
`;

export const UpgradeProductConfirmation = () => {
	const navigate = useNavigate();

	const { mainPlan, specificProductType } = useUpgradeProductStore();

	if (!mainPlan || !specificProductType) {
		return null;
	}

	return (
		<>
			<h2 css={subHeadingWithInformationCss}>Your upgrade</h2>
			<p css={subHeadingInformationTextCss}>
				Review changes to your subscription to unlock exclusive access.
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
					<div>
						<h3 css={productCardTitleCss(false)}>
							{PRODUCT_TYPES.digipack.productTitle()}
						</h3>
					</div>
				</Card.Header>
				<Card.Section>
					<p css={benefitsTextCss}>
						Enjoy unlimited access to the Guardian's premium apps,
						uninterrupted, ad-free reading and more
					</p>
					<BenefitsToggle
						productType={PRODUCT_TYPES.tierthree.productType}
						subscriptionPlan={mainPlan}
					/>
				</Card.Section>
				<Card.Section>
					<p css={subheadingTextCss}>£X/month</p>
				</Card.Section>
			</Card>

			<h2 css={subHeadingCss}>What happens now?</h2>

			<div css={whatHappensNowItemCss}>
				<SvgClock size="medium" />
				<div css={whatHappensNowItemInfoCss}>
					<h3 css={subheadingTextCss}>
						This change will happen today
					</h3>
					<p
						css={[
							whatHappensNowItemInformationTextCss,
							whatHappensNowItemInformationBorderCss,
						]}
					>
						Dive in and start enjoying your benefits straight away
					</p>
				</div>
			</div>

			<div css={whatHappensNowItemCss}>
				<SvgReload size="medium" />
				<div css={whatHappensNowItemInfoCss}>
					<h3 css={subheadingTextCss}>
						Your first payment will be £X
					</h3>
					<p
						css={[
							whatHappensNowItemInformationTextCss,
							whatHappensNowItemInformationBorderCss,
						]}
					>
						We will charge you a smaller amount today, to offset the
						payment you've already given us for the rest of the
						month. After this, from DAY MONTH, your monthly payment
						will be £X
					</p>
				</div>
			</div>

			<div css={whatHappensNowItemCss}>
				<SvgCreditCard size="medium" />
				<div css={whatHappensNowItemInfoCss}>
					<h3 css={subheadingTextCss}>Your payment method</h3>
					<p css={whatHappensNowItemInformationTextCss}>
						We will take payment as before, from Visa card ending
						4242
					</p>
				</div>
			</div>

			<div css={termsAndConditionsContainerCss}>
				<p css={termsAndConditionsTextCss}>
					This subscription auto-renews. You'll be charged the
					applicable monthly amount at each renewal unless you cancel.
					You can cancel your subscription at any time before your
					next renewal date. To cancel go to Manage My Account.
					Cancellation will take effect at the end of your currently
					monthly payment period. There is also a cooling off period
					of 14 days from sign-up. You can cancel your subscription
					within 14 days of sign-up by contacting Customer Service and
					receive a full refund.
				</p>
				<p css={termsAndConditionsTextCss}>
					If you want to change the payment method, please go to your
					billing section and update your payment details.
				</p>
				<p css={termsAndConditionsTextCss}>
					By proceeding, you are agreeing to our Terms and Conditions.
				</p>
				<p css={termsAndConditionsTextCss}>
					To find out what personal data we collect and how we use it,
					please visit our Privacy Policy.
				</p>
			</div>

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
							eventLabel: `/${specificProductType.urlPart}/upgrade-product/thank-you`,
						});
						navigate(
							`/${specificProductType.urlPart}/upgrade-product/thank-you`,
						);
					}}
				>
					{`Upgrade for £X per month`}
				</Button>
				<Button
					aria-label={`Product Card Digital Plus Upsell Button`}
					data-cy={`digital-plus-upsell-button`}
					size="small"
					priority="tertiary"
					cssOverrides={css`
						justify-content: center;
						margin-left: 0px;
						margin-top: ${space[3]}px;

						${from.tablet} {
							margin-top: 0px;
							margin-left: ${space[3]}px;
						}
					`}
					onClick={() => {
						trackEvent({
							eventCategory: 'account_overview',
							eventAction: 'click',
							eventLabel: `/${specificProductType.urlPart}/upgrade-product/information`,
						});
						navigate(
							`/${specificProductType.urlPart}/upgrade-product/information`,
						);
					}}
				>
					{`Back`}
				</Button>
			</div>
		</>
	);
};
