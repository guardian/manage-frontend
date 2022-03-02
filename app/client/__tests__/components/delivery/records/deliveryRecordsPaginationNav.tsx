import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PaginationNav } from '../../../../components/delivery/records/deliveryRecordsPaginationNav';

Enzyme.configure({ adapter: new Adapter() });

describe('PaginationNav', () => {
	it('renders the correct number of pages', () => {
		const wrapper = mount(
			<PaginationNav
				resultsPerPage={7}
				totalNumberOfResults={90}
				currentPage={0}
				setCurrentPage={() => true}
				changeCallBack={() => true}
			/>,
		);

		expect(wrapper.find('li')).toHaveLength(13);
		expect(wrapper.find('li').at(0).text()).toEqual('1');
		expect(wrapper.find('li').at(12).text()).toEqual('13');
	});

	it('renders the correct summary', () => {
		const wrapper = mount(
			<PaginationNav
				resultsPerPage={7}
				totalNumberOfResults={90}
				currentPage={0}
				setCurrentPage={() => true}
				changeCallBack={() => true}
			/>,
		);

		expect(wrapper.find('span').text()).toEqual(
			'Displaying 1 - 7 of 90 deliveries',
		);
	});

	it('renders the correct summary (page 2)', () => {
		const wrapper = mount(
			<PaginationNav
				resultsPerPage={7}
				totalNumberOfResults={90}
				currentPage={1}
				setCurrentPage={() => true}
				changeCallBack={() => true}
			/>,
		);

		expect(wrapper.find('span').text()).toEqual(
			'Displaying 8 - 14 of 90 deliveries',
		);
	});

	it('renders the correct summary for a non divisional number of results', () => {
		const wrapper = mount(
			<PaginationNav
				resultsPerPage={7}
				totalNumberOfResults={10}
				currentPage={1}
				setCurrentPage={() => true}
				changeCallBack={() => true}
			/>,
		);

		expect(wrapper.find('span').text()).toEqual(
			'Displaying 8 - 10 of 10 deliveries',
		);
	});
});
