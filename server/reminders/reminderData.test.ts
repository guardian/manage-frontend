import { addReminderPeriod } from './reminderData';

describe('addReminderPeriod', () => {
	it('should set date to the next calendar month if the current date is BEFORE the 20th', () => {
		const novemberNineteenth = new Date('2020-11-19');
		const reminderData = {};
		const expected = {
			reminderPeriod: `2020-12-01`,
		};
		const actual = addReminderPeriod(
			'ONE_OFF',
			reminderData,
			novemberNineteenth,
		);

		expect(actual).toEqual(expected);
	});

	it('should set date to the next + 1 calendar month if the current date is the 20th', () => {
		const novemberTwentieth = new Date('2020-11-20');
		const reminderData = {};
		const expected = {
			reminderPeriod: `2021-01-01`,
		};
		const actual = addReminderPeriod(
			'ONE_OFF',
			reminderData,
			novemberTwentieth,
		);

		expect(actual).toEqual(expected);
	});

	it('should set date to the next + 1 calendar month if the current date is AFTER the 20th', () => {
		const novemberTwentyFirst = new Date('2020-11-21');
		const reminderData = {};
		const expected = {
			reminderPeriod: `2021-01-01`,
		};
		const actual = addReminderPeriod(
			'ONE_OFF',
			reminderData,
			novemberTwentyFirst,
		);

		expect(actual).toEqual(expected);
	});

	it('should not overwrite reminderPeriod if already there', () => {
		const novemberTwentyFirst = new Date('2020-11-21');
		const reminderData = { reminderPeriod: `2022-12-01` };
		const expected = {
			reminderPeriod: `2022-12-01`,
		};
		const actual = addReminderPeriod(
			'ONE_OFF',
			reminderData,
			novemberTwentyFirst,
		);

		expect(actual).toEqual(expected);
	});
});
