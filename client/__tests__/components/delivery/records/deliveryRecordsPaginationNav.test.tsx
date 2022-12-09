import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PaginationNav } from '../../../../components/delivery/records/DeliveryRecordsPaginationNav';

describe('PaginationNav', () => {
	it('renders the correct number of pages', () => {
		render(
			<PaginationNav
				resultsPerPage={7}
				totalNumberOfResults={90}
				currentPage={0}
				setCurrentPage={() => true}
				changeCallBack={() => true}
			/>,
		);

		const pages = screen.getAllByRole('listitem');

		expect(pages).toHaveLength(13);
		expect(pages[0]).toHaveTextContent('1');
		expect(pages[12]).toHaveTextContent('13');
	});

	it('renders the correct summary for the first page', () => {
		render(
			<PaginationNav
				resultsPerPage={7}
				totalNumberOfResults={90}
				currentPage={0}
				setCurrentPage={() => true}
				changeCallBack={() => true}
			/>,
		);

		expect(
			screen.getByText('Displaying 1 - 7 of 90 deliveries'),
		).toBeInTheDocument();
	});

	it('renders the correct summary for subsequent pages', () => {
		render(
			<PaginationNav
				resultsPerPage={7}
				totalNumberOfResults={90}
				currentPage={1}
				setCurrentPage={() => true}
				changeCallBack={() => true}
			/>,
		);

		expect(
			screen.getByText('Displaying 8 - 14 of 90 deliveries'),
		).toBeInTheDocument();
	});

	it('renders the correct summary when the total number of results is not cleanly divisible by the number of results per page', () => {
		render(
			<PaginationNav
				resultsPerPage={7}
				totalNumberOfResults={10}
				currentPage={1}
				setCurrentPage={() => true}
				changeCallBack={() => true}
			/>,
		);

		expect(
			screen.getByText('Displaying 8 - 10 of 10 deliveries'),
		).toBeInTheDocument();
	});
});
