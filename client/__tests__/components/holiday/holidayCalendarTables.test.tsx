import { dateAddDays } from '../../../../shared/dates';
import type { CalendarTableDate } from '../../../components/mma/holiday/HolidayCalendarTables';
import { selectDatesFromRange } from '../../../components/mma/holiday/HolidayCalendarTables';

describe('calendarTables', () => {
	test('return array of selected dates where end selection date is before the start selection date', () => {
		const allDatesStart = new Date(1985, 9, 26);
		const mockAllDates: CalendarTableDate[] = [
			{
				date: allDatesStart,
				isActive: true,
				isDeliveryDay: true,
				isSelected: false,
				isExisting: false,
				showAsterisk: false,
			},
			{
				date: dateAddDays(allDatesStart, 1),
				isActive: true,
				isDeliveryDay: true,
				isSelected: false,
				isExisting: false,
				showAsterisk: false,
			},
			{
				date: dateAddDays(allDatesStart, 2),
				isActive: true,
				isDeliveryDay: true,
				isSelected: false,
				isExisting: true,
				showAsterisk: false,
			},
			{
				date: dateAddDays(allDatesStart, 3),
				isActive: true,
				isDeliveryDay: true,
				isSelected: false,
				isExisting: true,
				showAsterisk: false,
			},
			{
				date: dateAddDays(allDatesStart, 4),
				isActive: true,
				isDeliveryDay: true,
				isSelected: false,
				isExisting: false,
				showAsterisk: false,
			},
			{
				date: dateAddDays(allDatesStart, 5),
				isActive: true,
				isDeliveryDay: true,
				isSelected: false,
				isExisting: false,
				showAsterisk: false,
			},
		];
		expect(
			JSON.stringify(selectDatesFromRange(mockAllDates, 5, 1)),
		).toEqual('[4,5]');
	});

	test('return array of selected dates where start selection date is before the end selection date', () => {
		const allDatesStart = new Date(1985, 9, 26);
		const mockAllDates: CalendarTableDate[] = [
			{
				date: allDatesStart,
				isActive: true,
				isDeliveryDay: true,
				isSelected: false,
				isExisting: false,
				showAsterisk: false,
			},
			{
				date: dateAddDays(allDatesStart, 1),
				isActive: true,
				isDeliveryDay: true,
				isSelected: false,
				isExisting: false,
				showAsterisk: false,
			},
			{
				date: dateAddDays(allDatesStart, 2),
				isActive: true,
				isDeliveryDay: true,
				isSelected: false,
				isExisting: true,
				showAsterisk: false,
			},
			{
				date: dateAddDays(allDatesStart, 3),
				isActive: true,
				isDeliveryDay: true,
				isSelected: false,
				isExisting: true,
				showAsterisk: false,
			},
			{
				date: dateAddDays(allDatesStart, 4),
				isActive: true,
				isDeliveryDay: true,
				isSelected: false,
				isExisting: false,
				showAsterisk: false,
			},
			{
				date: dateAddDays(allDatesStart, 5),
				isActive: true,
				isDeliveryDay: true,
				isSelected: false,
				isExisting: false,
				showAsterisk: false,
			},
		];
		expect(
			JSON.stringify(selectDatesFromRange(mockAllDates, 1, 5)),
		).toEqual('[1]');
	});
});
