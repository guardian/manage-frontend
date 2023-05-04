// The reminders API does receive other fields as well, but reminderPeriod is the only one MMA needs to know about
export interface ReminderData {
	reminderPeriod?: string;
}

export type ReminderType = 'ONE_OFF' | 'RECURRING';

const getReminderDate = (date: Date): Date => {
	const monthsAhead = date.getDate() < 20 ? 1 : 2;
	date.setMonth(date.getMonth() + monthsAhead);

	return date;
};

// If reminderPeriod is not already present, set it to next month. Only applies for one-off reminders
// Based on https://github.com/guardian/support-dotcom-components/blob/main/packages/shared/src/lib/reminderFields.ts#L15
export const addReminderPeriod = (
	reminderType: ReminderType,
	reminderData: ReminderData,
	date: Date = new Date(),
): ReminderData => {
	if (reminderType === 'ONE_OFF' && !reminderData.reminderPeriod) {
		const reminderDate = getReminderDate(date);
		const month = reminderDate.getMonth() + 1; // javascript dates run from 0-11, we want 1-12
		const paddedMonth = month.toString().padStart(2, '0');
		const year = reminderDate.getFullYear();

		return {
			...reminderData,
			reminderPeriod: `${year}-${paddedMonth}-01`,
		};
	} else {
		return reminderData;
	}
};
