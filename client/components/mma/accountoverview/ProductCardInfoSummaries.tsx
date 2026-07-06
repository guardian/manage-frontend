import { css } from '@emotion/react';
import { palette } from '@guardian/source/foundations';
import {
	InfoSummary,
	SuccessSummary,
} from '@guardian/source-development-kitchen/react-components';
import { Link } from 'react-router-dom';
import {
	cancellationFormatDate,
	DATE_FNS_LONG_OUTPUT_FORMAT,
} from '@/shared/dates';
import type { ProductDetail, SubscriptionPlan } from '@/shared/productResponse';
import { isPaidSubscriptionPlan } from '@/shared/productResponse';
import type { GroupedProductType } from '@/shared/productTypes';
import type { NextPaymentDetails } from '../shared/NextPaymentDetails';

export const CancellationInfoRow = ({
	hasCancellationPending,
	productDetail,
	groupedProductType,
	productBenefits,
}: {
	hasCancellationPending: boolean;
	productDetail: ProductDetail;
	groupedProductType: GroupedProductType;
	productBenefits: string;
}) =>
	hasCancellationPending &&
	productDetail.subscription.end && (
		<InfoSummary
			message={`Your ${groupedProductType.friendlyName} has been cancelled`}
			context={
				<>
					You are able to access your {productBenefits} until{' '}
					<strong>
						{cancellationFormatDate(
							productDetail.subscription
								.cancellationEffectiveDate,
							DATE_FNS_LONG_OUTPUT_FORMAT,
						)}
					</strong>
				</>
			}
		/>
	);

export const OfferActiveInfoRow = ({
	canBeInOfferPeriod,
	isInOfferOrPausePeriod,
	nextPaymentDetails,
	mainPlan,
}: {
	canBeInOfferPeriod: boolean;
	isInOfferOrPausePeriod: boolean | '' | null; // Looks like there gotta be a better way?
	nextPaymentDetails: NextPaymentDetails | undefined;
	mainPlan: SubscriptionPlan;
}) =>
	canBeInOfferPeriod &&
	isInOfferOrPausePeriod &&
	isPaidSubscriptionPlan(mainPlan) &&
	mainPlan.billingPeriod === 'month' && (
		<SuccessSummary
			message="Your offer is active"
			context={
				<>
					Your free offer is active until{' '}
					{nextPaymentDetails?.nextPaymentDateValue}. If you have any
					questions, feel free to{' '}
					{
						<Link
							to="/help-centre#contact-options"
							css={css`
								text-decoration: underline;
								color: ${palette.brand[500]};
							`}
						>
							contact our support team
						</Link>
					}
					.
				</>
			}
		/>
	);

export const OfferPauseInfoRow = ({
	canBeInPausePeriod,
	isInOfferOrPausePeriod,
	nextPaymentDetails,
}: {
	canBeInPausePeriod: boolean;
	isInOfferOrPausePeriod: boolean | '' | null;
	nextPaymentDetails: NextPaymentDetails | undefined;
}) =>
	canBeInPausePeriod &&
	isInOfferOrPausePeriod && (
		<SuccessSummary
			message="You have paused your support"
			context={
				<>
					Your support is now paused until{' '}
					{nextPaymentDetails?.nextPaymentDateValue}. If you
					{nextPaymentDetails?.nextPaymentDateValue}. If you have any
					questions, feel free to{' '}
					{
						<Link
							to="/help-centre#contact-options"
							css={css`
								text-decoration: underline;
								color: ${palette.brand[500]};
							`}
						>
							contact our support team
						</Link>
					}
					.
				</>
			}
		/>
	);
