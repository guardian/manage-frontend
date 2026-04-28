import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom';
import { PRODUCT_TYPES } from '../../../../../../shared/productTypes';
import {
	CancellationContext,
	CancellationPageTitleContext,
} from '../../../../../components/mma/cancel/CancellationContainer';
import { CancellationReasonContext } from '../../../../../components/mma/cancel/cancellationContexts';
import { ConfirmCancellation } from '../../../../../components/mma/cancel/stages/ConfirmCancellation';
import { ExecuteCancellation } from '../../../../../components/mma/cancel/stages/ExecuteCancellation';
import { monthlyContributionPaidByCard } from '../../../../../fixtures/productBuilder/testProducts';

const renderWithCancellationContext = (initialPath: string) => {
	const productDetail = monthlyContributionPaidByCard();
	const productType = PRODUCT_TYPES.contributions;

	return render(
		<MemoryRouter initialEntries={[initialPath]}>
			<CancellationPageTitleContext.Provider
				value={{ setPageTitle: jest.fn() }}
			>
				<CancellationContext.Provider
					value={{ productDetail, productType }}
				>
					<CancellationReasonContext.Provider value={undefined}>
						<Routes>
							<Route
								path="/cancel/contributions"
								element={
									<>
										<div>Cancellation start page</div>
										<Outlet />
									</>
								}
							>
								<Route
									path="confirm"
									element={<ConfirmCancellation />}
								/>
								<Route
									path="confirmed"
									element={<ExecuteCancellation />}
								/>
							</Route>
						</Routes>
					</CancellationReasonContext.Provider>
				</CancellationContext.Provider>
			</CancellationPageTitleContext.Provider>
		</MemoryRouter>,
	);
};

describe('Cancellation route state guards', () => {
	it('redirects from confirm stage when router state is missing', () => {
		renderWithCancellationContext('/cancel/contributions/confirm');

		expect(screen.getByText('Cancellation start page')).toBeInTheDocument();
	});

	it('redirects from execute stage when router state is missing', () => {
		renderWithCancellationContext('/cancel/contributions/confirmed');

		expect(screen.getByText('Cancellation start page')).toBeInTheDocument();
	});
});
