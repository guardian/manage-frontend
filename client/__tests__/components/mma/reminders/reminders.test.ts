import { getReminderParams } from '../../../../components/mma/reminders/reminders';

describe('getReminderParams', () => {
	it('handles a query string with extra "?"', () => {
		const qs =
			'?reminderData={"email"%3A"test@test.com"%2C"reminderPlatform"%3A"EMAIL"%2C"reminderComponent"%3A"EMAIL"%2C"reminderStage"%3A"PRE"}&token=c6a58d0281736d2a4a18095b6c74b54a9893595e?cid=1684487428181008414&utm_source=eml&utm_medium=emaq&utm_campaign=MK_CN_PreReminderSingleRESENDMay23&utm_term=Email2_MKSupporterPreReminder_Test&utm_content=variantA';
		const result = getReminderParams(qs);
		expect(result).toEqual({
			reminderData:
				'{"email":"test@test.com","reminderPlatform":"EMAIL","reminderComponent":"EMAIL","reminderStage":"PRE"}',
			token: 'c6a58d0281736d2a4a18095b6c74b54a9893595e',
		});
	});
});
