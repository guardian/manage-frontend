import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import { featureSwitches } from '@/shared/featureSwitches';
import { toMembersDataApiResponse } from '../../../fixtures/mdapiResponse';
import {
	digitalPackPaidByDirectDebit,
	guardianWeeklyPaidByCard,
	homeDeliverySundayPlus,
	membershipSupporter,
	newspaperDigitalVoucherObserver,
	newspaperDigitalVoucherPaidByPaypal,
	observerDelivery,
	patronMembership,
	supporterPlus,
	tierThree,
	voucherPaidByCard,
} from '../../../fixtures/productBuilder/testProducts';
import { AccountOverview } from './AccountOverview';

featureSwitches['appSubscriptions'] = true;

export default {
	title: 'Pages/AccountOverviewErrors',
	component: AccountOverview,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof AccountOverview>;

export const MpapiRequestFailure: StoryObj<typeof AccountOverview> = {
	render: () => {
		return <AccountOverview />;
	},

	parameters: {
		msw: [
			http.get('/api/cancelled/', () => {
				return HttpResponse.json([]);
			}),
			http.get('/mpapi/user/mobile-subscriptions', () => {
				return HttpResponse.error();
			}),
			http.get('/api/me/mma', () => {
				return HttpResponse.json(
					toMembersDataApiResponse(
						guardianWeeklyPaidByCard(),
						digitalPackPaidByDirectDebit(),
						newspaperDigitalVoucherPaidByPaypal(),
						membershipSupporter(),
						patronMembership(),
						supporterPlus(),
						tierThree(),
						homeDeliverySundayPlus(),
						voucherPaidByCard(),
						observerDelivery(),
						newspaperDigitalVoucherObserver(),
					),
				);
			}),
			http.get('/api/me/one-off-contributions', () => {
				return HttpResponse.json([]);
			}),
		],
	},
};
