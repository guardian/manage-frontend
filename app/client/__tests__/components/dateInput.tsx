import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { DateInput } from '../../components/dateInput';

Enzyme.configure({ adapter: new Adapter() });

describe('DateInput', () => {
	it.each([
		{
			givenDate: '2022-01-10',
			expectedDay: 10,
			expectedMonth: 1,
			expectedYear: 2022,
		},
		{
			givenDate: '2022-03-16',
			expectedDay: 16,
			expectedMonth: 3,
			expectedYear: 2022,
		},
		{
			givenDate: '2023-12-04',
			expectedDay: 4,
			expectedMonth: 12,
			expectedYear: 2023,
		},
	])(
		'Displays the correct day, month and year for $givenDate',
		({ givenDate, expectedDay, expectedMonth, expectedYear }) => {
			const date = new Date(givenDate);
			const wrapper = mount(
				<DateInput date={date} labelText="My Label" />,
			);

			expect(wrapper.find("[aria-label='day']").props().value).toEqual(
				expectedDay,
			);
			expect(wrapper.find("[aria-label='month']").props().value).toEqual(
				expectedMonth,
			);
			expect(wrapper.find("[aria-label='year']").props().value).toEqual(
				expectedYear,
			);
		},
	);
});
