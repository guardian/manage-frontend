import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { rest } from 'msw';
import { ReactRouterDecorator } from '../../../../.storybook/ReactRouterDecorator';
import { PRODUCT_TYPES } from '../../../../shared/productTypes';
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
} as ComponentMeta<typeof HolidayStopsContainer>;

export const Manage: ComponentStory<typeof HolidaysOverview> = () => {
	return <HolidaysOverview />;
};

Manage.parameters = {
	msw: [
		rest.get('/api/me/mma', (_req, res, ctx) => {
			return res(
				ctx.json(toMembersDataApiResponse(guardianWeeklyPaidByCard())),
			);
		}),
		rest.get('/api/holidays/*', (_req, res, ctx) => {
			return res(ctx.json(existingHolidays));
		}),
	],
};

export const Create: ComponentStory<typeof HolidayDateChooser> = () => {
	return <HolidayDateChooser />;
};

Create.parameters = {
	msw: [
		rest.get('/api/me/mma', (_req, res, ctx) => {
			return res(
				ctx.json(toMembersDataApiResponse(guardianWeeklyPaidByCard())),
			);
		}),
		rest.get('/api/holidays/*', (_req, res, ctx) => {
			return res(ctx.json(existingHolidays));
		}),
	],
};
