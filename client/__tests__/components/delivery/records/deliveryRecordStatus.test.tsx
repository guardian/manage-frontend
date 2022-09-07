import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { RecordStatus } from '../../../../components/delivery/records/deliveryRecordStatus';

describe('DeliveryRecordStatus', () => {
	it('renders dispatched status', () => {
		render(
			<RecordStatus
				isDispatched={true}
				isHolidayStop={false}
				isChangedAddress={false}
				isChangedDeliveryInstruction={false}
				isFutureRecord={false}
				deliveryProblem={null}
			/>,
		);

		expect(screen.getByText('Dispatched')).toBeInTheDocument();
	});

	it('renders holiday stop status', () => {
		render(
			<RecordStatus
				isDispatched={false}
				isHolidayStop={true}
				isChangedAddress={false}
				isChangedDeliveryInstruction={false}
				isFutureRecord={false}
				deliveryProblem={null}
			/>,
		);

		expect(screen.getByText('Holiday stop')).toBeInTheDocument();
	});

	it('renders delivery problem status', () => {
		render(
			<RecordStatus
				isDispatched={false}
				isHolidayStop={false}
				isChangedAddress={false}
				isChangedDeliveryInstruction={false}
				isFutureRecord={false}
				deliveryProblem="Damaged paper"
			/>,
		);

		expect(
			screen.getByText('Problem reported (Damaged paper)'),
		).toBeInTheDocument();
	});
});
