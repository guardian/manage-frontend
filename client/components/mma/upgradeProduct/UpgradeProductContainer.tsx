import { css } from '@emotion/react';
import {
	from,
	palette,
	space,
	textSans15,
	textSans17,
} from '@guardian/source/foundations';
import * as Sentry from '@sentry/browser';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import type {
	PaidSubscriptionPlan,
	ProductDetail,
} from '../../../../shared/productResponse';
import { getMainPlan } from '../../../../shared/productResponse';
import type { UpgradePreviewResponse } from '../../../../shared/productSwitchTypes';
import { useAccountStore } from '../../../stores/AccountStore';
import {
	UpgradePreviewLoadingState,
	useUpgradeProductStore,
} from '../../../stores/UpgradeProductStore';
import { changePlanFetch } from '../../../utilities/productUtils';
import { NAV_LINKS } from '../../shared/nav/NavConfig';
import { PageContainer } from '../Page';

export const benefitsTextCss = css`
	${textSans17};
	margin: 0;
	margin-bottom: ${space[2]}px;
`;

export const actionButtonsContainerCss = css`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-top: ${space[4]}px;

	${from.tablet} {
		flex-direction: row;
		margin-top: ${space[5]}px;
	}
`;

export const whatHappensNowItemInformationTextCss = css`
	${textSans15};
	margin: 0;
	margin-top: ${space[2]}px;
	margin-bottom: ${space[3]}px;
	padding-bottom: ${space[3]}px;

	${from.tablet} {
		${textSans17};
		margin-top: ${space[1]}px;
	}
`;

export const whatHappensNowItemInformationBorderCss = css`
	border-bottom: 1px solid ${palette.neutral[86]};
`;

export const whatHappensNowItemCss = css`
	display: flex;
	align-items: flex-start;
`;

export const whatHappensNowItemInfoCss = css`
	flex: 1;
	margin-left: ${space[2]}px;
`;

interface UpgradeProductRouterState {
	productDetail: ProductDetail;
}

const UpgradeProductPageContainer = ({ children }: { children: ReactNode }) => {
	return (
		<PageContainer
			compactTitle
			minimalFooter
			selectedNavItem={NAV_LINKS.accountOverview}
			pageTitle={'Upgrade your subscription'}
		>
			{children}
		</PageContainer>
	);
};

export const UpgradeProductContainer = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const routerState = location.state as UpgradeProductRouterState | null;
	const {
		mainPlan,
		subscription,
		previewLoadingState,
		setMainPlan,
		setSubscription,
		setPreviewResponse,
		setPreviewLoadingState,
		setPreviewError,
		clearStore,
	} = useUpgradeProductStore();
	const { getIsTestUser } = useAccountStore();

	useEffect(() => {
		if (!routerState && !mainPlan) {
			navigate('/');
			return;
		}

		if (mainPlan && subscription) {
			return;
		}

		if (routerState) {
			// Cast to PaidSubscriptionPlan - this upgrade flow only applies to paid subscriptions
			// which have currency, billingPeriod etc. at runtime (getMainPlan return type is too narrow)
			const mainPlanState = getMainPlan(
				routerState.productDetail.subscription,
			) as PaidSubscriptionPlan;

			setMainPlan(mainPlanState);
			setSubscription(routerState.productDetail.subscription);
		}
	}, [
		mainPlan,
		subscription,
		navigate,
		routerState,
		setMainPlan,
		setSubscription,
	]);

	useEffect(() => {
		if (
			!subscription ||
			previewLoadingState !== UpgradePreviewLoadingState.NotStarted
		) {
			return;
		}

		const isTestUser = getIsTestUser();

		const fetchPreview = async () => {
			setPreviewLoadingState(UpgradePreviewLoadingState.Loading);

			try {
				const response = await changePlanFetch({
					subscriptionId: subscription.subscriptionId,
					isTestUser,
					mode: 'switchToBasePrice',
					targetProduct: 'DigitalSubscription',
					preview: true,
				});

				if (!response.ok) {
					throw new Error(
						`Failed to fetch upgrade preview: ${response.status}`,
					);
				}

				const previewResponse =
					(await response.json()) as UpgradePreviewResponse;
				setPreviewResponse(previewResponse);
			} catch (error) {
				Sentry.captureException(
					error instanceof Error
						? error
						: new Error('Failed to fetch upgrade preview'),
					{
						extra: {
							subscriptionId: subscription.subscriptionId,
							isTestUser,
						},
					},
				);

				const errorMessage =
					error instanceof Error ? error.message : 'Unknown error';
				setPreviewError(errorMessage);
			}
		};

		void fetchPreview();
	}, [
		subscription,
		previewLoadingState,
		getIsTestUser,
		setPreviewLoadingState,
		setPreviewResponse,
		setPreviewError,
	]);

	useEffect(() => {
		if (previewLoadingState === UpgradePreviewLoadingState.Error) {
			clearStore();
			navigate('/');
		}
	}, [previewLoadingState, setPreviewLoadingState, navigate, clearStore]);

	return (
		<UpgradeProductPageContainer>
			<Outlet />
		</UpgradeProductPageContainer>
	);
};
