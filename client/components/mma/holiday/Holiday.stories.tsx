import type { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import { PRODUCT_TYPES } from '@/shared/productTypes';
import { existingHolidays } from '../../../fixtures/holidays';
import { toMembersDataApiResponse } from '../../../fixtures/mdapiResponse';
import { guardianWeeklyPaidByCard } from '../../../fixtures/productBuilder/testProducts';
import { HolidayDateChooser } from './HolidayDateChooser';
import { HolidaysOverview } from './HolidaysOverview';
import { HolidayStopsContainer } from './HolidayStopsContainer';

const productTypeWithHolidayStops = {
	...PRODUCT_TYPES.guardianweekly,
	holidayStops: {
		issueKeyword: '',
	},
};

export default {
	component: HolidayStopsContainer,
	title: 'Pages/HolidayStops',
	decorators: [ReactRouterDecorator],
	parameters: {
		reactRouter: {
			container: (
				<HolidayStopsContainer
					productType={productTypeWithHolidayStops}
				/>
			),
		},
	},
} as Meta<typeof HolidayStopsContainer>;

export const Manage: StoryObj<typeof HolidaysOverview> = {
	render: () => {
		return <HolidaysOverview />;
	},

	parameters: {
		msw: [
			rest.get('/api/me/mma', (_req, res, ctx) => {
				return res(
					ctx.json(
						toMembersDataApiResponse(guardianWeeklyPaidByCard()),
					),
				);
			}),
			rest.get('/api/holidays/*', (_req, res, ctx) => {
				return res(ctx.json(existingHolidays));
			}),
		],
	},
};

export const Create: StoryObj<typeof HolidayDateChooser> = {
	render: () => {
		return <HolidayDateChooser />;
	},

	parameters: {
		msw: [
			rest.get('/api/me/mma', (_req, res, ctx) => {
				return res(
					ctx.json(
						toMembersDataApiResponse(guardianWeeklyPaidByCard()),
					),
				);
			}),
			rest.get('/api/holidays/*', (_req, res, ctx) => {
				return res(ctx.json(existingHolidays));
			}),
		],
	},
};
