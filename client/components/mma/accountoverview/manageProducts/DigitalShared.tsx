import { css } from '@emotion/react';
import { palette, space } from '@guardian/source/foundations';
import { Button } from '@guardian/source/react-components';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { subHeadingCss } from '@/client/styles/headings';
import type {
	MembersDataApiUser,
	SubscriptionPlan,
} from '@/shared/productResponse';
import { getSpecificProductTypeFromProductKey } from '@/shared/productResponse';
import { NAV_LINKS } from '../../../shared/nav/NavConfig';
import { PageContainer } from '../../Page';
import { BenefitsToggle } from '../../shared/benefits/BenefitsToggle';
import {
	sectionHeadingCss,
	sharedMembershipTextCss,
} from '../ProductCardStyles';

export interface DigitalSharedRouterState {
	subscriptionName: string;
	primarySubscriber: MembersDataApiUser;
}

const sectionsContainerCss = css`
	> * + * {
		margin-bottom: ${space[4]}px;
	}
`;

const greySectionCss = css`
	background-color: ${palette.neutral[97]};
	border: 1px solid ${palette.neutral[86]};
	padding: ${space[5]}px ${space[4]}px;
`;

const leaveButtonCss = css`
	display: flex-end;
`;

export const DigitalShared = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const routerState = location.state as DigitalSharedRouterState | null;

	if (!routerState?.primarySubscriber) {
		return <Navigate to="/" />;
	}

	const { subscriptionName, primarySubscriber } = routerState;

	// TODO Hard-coded atm, mirrors SecondaryAccountProductCard
	const specificProductType =
		getSpecificProductTypeFromProductKey('Digital Pack');
	const mainPlan: SubscriptionPlan = {
		name: subscriptionName,
		shouldBeVisible: true,
	};

	return (
		<PageContainer
			selectedNavItem={NAV_LINKS.accountOverview}
			pageTitle="Manage subscription"
		>
			<div css={sectionsContainerCss}>
				<div css={sectionsContainerCss} key={'subscription-info'}>
					<h2 css={subHeadingCss}>{subscriptionName}</h2>
					<div css={greySectionCss}>
						<p css={sharedMembershipTextCss}>
							Subscription details
						</p>
						{/* TODO Fix CSS for padding/margins at the bottom */}
						<h3 css={sectionHeadingCss}>
							{subscriptionName} shared subscription
						</h3>
					</div>
				</div>

				<div css={sectionsContainerCss} key={'subscription-access'}>
					<h2 css={subHeadingCss}>Your subscription access</h2>
					<div css={greySectionCss}>
						<p css={sharedMembershipTextCss}>
							With this subscription you have access to:
						</p>
						<BenefitsToggle
							productType={specificProductType.productType}
							subscriptionPlan={mainPlan}
							alwaysShowBenefits
						/>
					</div>
				</div>

				<div css={sectionsContainerCss} key={'manage-access'}>
					<h2 css={subHeadingCss}>Manage access</h2>
					<div css={greySectionCss}>
						<p css={sharedMembershipTextCss}>
							You been given access to this subscription by{' '}
							{primarySubscriber.firstName} (
							{primarySubscriber.email}).
						</p>
						<p>
							You can leave this shared subscription at any time.
							If you leave, you’ll lose access to Digital plus
							benefits.
						</p>
						{/* TODO: implement leave shared subscription flow */}
						<Button
							size="small"
							priority="tertiary"
							cssOverrides={leaveButtonCss}
							onClick={() => {
								navigate(`/digital-shared/leave`, {
									state: {
										subscriptionName,
										primarySubscriber,
									},
								});
							}}
						>
							Leave subscription
						</Button>
					</div>
				</div>
			</div>
		</PageContainer>
	);
};
