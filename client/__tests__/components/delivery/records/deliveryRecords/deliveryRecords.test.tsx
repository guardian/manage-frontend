import {
	DATE_FNS_INPUT_FORMAT,
	dateAddDays,
	dateString,
} from '../../../../../../shared/dates';
import { checkForExistingDeliveryProblem } from '../../../../../components/delivery/records/DeliveryRecordsContainer';
import { DeliveryRecordDetail } from '../../../../../components/delivery/records/deliveryRecordsApi';

describe('delivery records unit tests', () => {
	const baseMockDeliveryRecord: DeliveryRecordDetail = {
		id: '123',
		deliveryAddress: 'address',
		addressLine1: 'addressLine1',
		addressTown: 'addressTown',
		addressCountry: 'addressCountry',
		addressPostcode: 'addressPostcode',
		hasHolidayStop: false,
		deliveryDate: dateString(new Date(), DATE_FNS_INPUT_FORMAT),
	};

	test('checkForExistingDeliveryProblem returns true if', () => {
		const deliverRecords = [
			{
				...baseMockDeliveryRecord,
				deliveryDate: dateString(
					dateAddDays(new Date(), -7),
					DATE_FNS_INPUT_FORMAT,
				),
				problemCaseId: '123',
			},
		];
		expect(checkForExistingDeliveryProblem(deliverRecords)).toEqual(true);
	});
});
