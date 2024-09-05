import { css } from '@emotion/react';
import {
	palette,
	space,
	textEgyptianBold17,
} from '@guardian/source/foundations';
import { Link } from 'react-router-dom';
import type { CurrencyIso } from '@/client/utilities/currencyIso';
import { cancellationFormatDate } from '../../../../shared/dates';
import type {
	PaidSubscriptionPlan,
	ProductDetail,
	Subscription,
} from '../../../../shared/productResponse';
import { getMainPlan } from '../../../../shared/productResponse';
import type { ProductType } from '../../../../shared/productTypes';
import { measure } from '../../../styles/typography';
import { hasDeliveryRecordsFlow } from '../../../utilities/productUtils';
import { GenericErrorScreen } from '../../shared/GenericErrorScreen';
import { SupportTheGuardianButton } from '../../shared/SupportTheGuardianButton';
import { WithStandardTopMargin } from '../../shared/WithStandardTopMargin';
import { Heading } from '../shared/Heading';
import { hrefStyle } from './cancellationConstants';
import { CancellationReasonContext } from './cancellationContexts';
import { CancellationContributionReminder } from './cancellationContributionReminder';
import { ResubscribeThrasher } from './ResubscribeThrasher';

const actuallyCancelled = (
	productType: ProductType,
	productDetail: ProductDetail,
	eligableForOffer?: boolean,
	eligibleForPause?: boolean,
) => {
	const isSupportPlus = productType.productType === 'supporterplus';
	const isContribution = productType.productType === 'contributions';

	let showReminder: boolean = !!productType.cancellation?.shouldShowReminder;
	if (isSupportPlus && eligableForOffer) {
		showReminder = false;
	}
	if (isContribution && eligibleForPause) {
		showReminder = false;
	}

	const deliveryRecordsLink: string = `/delivery/${productType.urlPart}/records`;
	const subscription = productDetail.subscription;
	let currencySymbol: undefined | CurrencyIso;
	let contributionheadingCopy = '';
	if (Object.keys(subscription).length) {
		const mainPlan = getMainPlan(
			productDetail.subscription,
		) as PaidSubscriptionPlan;
		currencySymbol = mainPlan.currencyISO;
		if (isContribution) {
			contributionheadingCopy = `Your ${mainPlan.billingPeriod}ly support has been cancelled`;
		}
	}

	return (
		<>
			<WithStandardTopMargin>
				<Heading
					cssOverrides={[
						measure.heading,
						css`
							margin-bottom: ${space[6]}px;
						`,
					]}
				>
					{isSupportPlus && 'Your subscription has been cancelled'}
					{isContribution && contributionheadingCopy}
					{!isSupportPlus &&
						!isContribution &&
						`Your ${productType.friendlyName(
							productDetail,
						)} is cancelled`}
				</Heading>
				{productType.cancellation &&
					!productType.cancellation.shouldHideSummaryMainPara && (
						<p>
							{productType.cancellation
								?.alternateSummaryMainPara ||
								(subscription.end ? (
									<>
										You will continue to receive the
										benefits of your{' '}
										{productType.friendlyName(
											productDetail,
										)}{' '}
										until{' '}
										<b>
											{cancellationFormatDate(
												productDetail.subscription
													.cancellationEffectiveDate,
											)}
										</b>
										. You will not be charged again. If you
										think you’re owed a refund, please
										contact us at{' '}
										<a
											css={hrefStyle}
											href="mailto:customer.help@theguardian.com"
										>
											customer.help@theguardian.com
										</a>
										.
									</>
								) : (
									'Your cancellation is effective immediately.'
								))}
						</p>
					)}
				{isContribution && eligibleForPause && (
					<p>This is immediate and you will not be charged again.</p>
				)}
			</WithStandardTopMargin>

			{showReminder && <CancellationContributionReminder />}

			{!productType.cancellation?.shouldHideThrasher && (
				<ResubscribeThrasher
					usageContext={`${productType.urlPart}_cancellation_summary`}
				>
					<WithStandardTopMargin>
						{hasDeliveryRecordsFlow(productType) && (
							<p>
								You can still{' '}
								<Link
									css={css`
										color: ${palette.brand[500]};
										text-decoration: underline;
										:visited {
											color: ${palette.brand[500]};
										}
									`}
									to={deliveryRecordsLink}
									state={{ productDetail }}
								>
									view your previous deliveries
								</Link>{' '}
								and{' '}
								<Link
									css={css`
										color: ${palette.brand[500]};
										text-decoration: underline;
										:visited {
											color: ${palette.brand[500]};
										}
									`}
									to={deliveryRecordsLink}
									state={{ productDetail }}
								>
									report a delivery problem
								</Link>
								.
							</p>
						)}
						<CancellationReasonContext.Consumer>
							{(reason) =>
								(!productType.cancellation ||
									!productType.cancellation
										.onlyShowSupportSectionIfAlternateText ||
									productType.cancellation.summaryReasonSpecificPara(
										reason,
									)) && (
									<>
										<h4
											css={css`
												${textEgyptianBold17};
												margin-bottom: ${space[3]}px;
											`}
										>
											Support us another way
										</h4>
										<p>
											{productType?.cancellation?.summaryReasonSpecificPara(
												reason,
												currencySymbol,
											) ||
												'If you are interested in supporting our journalism in other ways, ' +
													'please consider either a contribution or a subscription.'}
										</p>
										<div css={{ marginBottom: '30px' }}>
											<SupportTheGuardianButton
												urlSuffix={
													productType.cancellation &&
													productType.cancellation
														.alternateSupportButtonUrlSuffix &&
													productType.cancellation.alternateSupportButtonUrlSuffix(
														reason,
													)
												}
												alternateButtonText={
													productType.cancellation &&
													productType.cancellation
														.alternateSupportButtonText &&
													productType.cancellation.alternateSupportButtonText(
														reason,
													)
												}
												supportReferer={
													productType.urlPart +
													'_cancellation_summary'
												}
												theme="brand"
												size="small"
											/>
										</div>
									</>
								)
							}
						</CancellationReasonContext.Consumer>
					</WithStandardTopMargin>
				</ResubscribeThrasher>
			)}
		</>
	);
};

export const isCancelled = (subscription: Subscription) =>
	Object.keys(subscription).length === 0 || subscription.cancelledAt;

export const getCancellationSummary = (
	productType: ProductType,
	productDetail: ProductDetail,
	eligableForOffer?: boolean,
	eligibleForPause?: boolean,
) =>
	isCancelled(productDetail.subscription) ? (
		actuallyCancelled(
			productType,
			productDetail,
			eligableForOffer,
			eligibleForPause,
		)
	) : (
		<GenericErrorScreen
			loggingMessage={`${productType.friendlyName(
				productDetail,
			)} cancellation call succeeded but subsequent product detail doesn't show as cancelled`}
		/>
	);
