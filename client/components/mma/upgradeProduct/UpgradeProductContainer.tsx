import { css } from '@emotion/react';
import {
	from,
	palette,
	space,
	textSans15,
	textSans17,
} from '@guardian/source/foundations';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import type { ProductDetail } from '../../../../shared/productResponse';
import { getMainPlan } from '../../../../shared/productResponse';
import { useUpgradeProductStore } from '../../../stores/UpgradeProductStore';
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

interface UpgradeAllAccessRouterState {
	productDetail: ProductDetail;
}

const UpgradeAllAccessPageContainer = ({
	children,
}: {
	children: ReactNode;
}) => {
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

export const UpgradeAllAccessContainer = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const routerState = location.state as UpgradeAllAccessRouterState | null;
	const { mainPlan, setMainPlan } = useUpgradeProductStore();

	useEffect(() => {
		if (!routerState && !mainPlan) {
			navigate('/');
			return;
		}

		if (mainPlan) {
			return;
		}

		if (routerState) {
			const mainPlanState = getMainPlan(
				routerState.productDetail.subscription,
			);

			setMainPlan(mainPlanState);
		}
	}, [mainPlan, navigate, routerState, setMainPlan]);

	return (
		<UpgradeAllAccessPageContainer>
			<Outlet />
		</UpgradeAllAccessPageContainer>
	);
};
