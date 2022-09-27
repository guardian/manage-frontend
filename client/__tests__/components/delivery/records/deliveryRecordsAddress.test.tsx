import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RecordAddress } from '../../../../components/delivery/records/deliveryRecordsAddress';

beforeEach(() => {
	render(
		<RecordAddress
			addressLine1={'Kings Place'}
			addressLine2={'90 York Way'}
			town={'London'}
			postcode={'N1 9GU'}
			country={'United Kingdom'}
		/>,
	);
});

describe('RecordsAddress', () => {
	it('displays the postcode only and a disclosure button to reveal the full address', () => {
		expect(screen.getByText('N1 9GU')).toBeInTheDocument();
		expect(screen.getByText('Show more')).toBeInTheDocument();
		expect(screen.queryByText('Kings Place')).not.toBeInTheDocument();
	});

	it('displays the full address when the disclosure button is clicked', () => {
		fireEvent.click(screen.getByText('Show more'));

		expect(screen.getByText('Kings Place')).toBeInTheDocument();
		expect(screen.getByText('90 York Way')).toBeInTheDocument();
		expect(screen.getByText('N1 9GU')).toBeInTheDocument();
		expect(screen.getByText('Show less')).toBeInTheDocument();
	});

	it('hides the full address when the disclosure button is clicked again', () => {
		fireEvent.click(screen.getByText('Show more'));
		fireEvent.click(screen.getByText('Show less'));

		expect(screen.getByText('N1 9GU')).toBeInTheDocument();
		expect(screen.queryByText('Kings Place')).not.toBeInTheDocument();
	});
});
