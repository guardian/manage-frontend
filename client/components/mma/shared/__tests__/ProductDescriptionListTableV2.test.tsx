import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import type { ProductDescriptionListRow } from '../ProductDescriptionListTableV2';
import { ProductDescriptionListTableV2 } from '../ProductDescriptionListTableV2';

// Mock the Buttons module to avoid Router dependency
jest.mock('../Buttons', () => ({
	Button: ({ text, onClick }: { text: string; onClick: () => void }) => (
		<button onClick={onClick}>{text}</button>
	),
	LinkButton: ({ text, to }: { text: string; to: string }) => (
		<a href={to}>{text}</a>
	),
}));

describe('ProductDescriptionListTableV2', () => {
	describe('Basic Rendering', () => {
		it('renders a single row with tiles', () => {
			const rows: ProductDescriptionListRow[] = [
				{
					tiles: [
						{ title: 'Next Payment Date', value: '31 Dec 2025' },
						{ title: 'Amount', value: '£10.00' },
					],
				},
			];

			render(<ProductDescriptionListTableV2 rows={rows} />);

			expect(screen.getByText('Next Payment Date')).toBeInTheDocument();
			expect(screen.getByText('£10.00')).toBeInTheDocument();
			expect(screen.getByText('31 Dec 2025')).toBeInTheDocument();
		});

		it('renders multiple rows', () => {
			const rows: ProductDescriptionListRow[] = [
				{
					tiles: [{ title: 'Row 1', value: 'Value 1' }],
				},
				{
					tiles: [{ title: 'Row 2', value: 'Value 2' }],
				},
			];

			render(<ProductDescriptionListTableV2 rows={rows} />);

			expect(screen.getByText('Row 1')).toBeInTheDocument();
			expect(screen.getByText('Row 2')).toBeInTheDocument();
		});

		it('renders tiles without values', () => {
			const rows: ProductDescriptionListRow[] = [
				{
					tiles: [
						{ title: 'Optional Field' }, // No value provided
						{ title: 'Another Field', value: 'Has Value' },
					],
				},
			];

			render(<ProductDescriptionListTableV2 rows={rows} />);

			expect(screen.getByText('Optional Field')).toBeInTheDocument();
			expect(screen.getByText('Another Field')).toBeInTheDocument();
		});
	});

	describe('ReactElement Values', () => {
		it('renders a tile with a React element as value', () => {
			const rows: ProductDescriptionListRow[] = [
				{
					tiles: [
						{
							title: 'Payment Method',
							value: (
								<span data-testid="payment-element">
									Visa ending in 4242
								</span>
							),
						},
					],
				},
			];

			render(<ProductDescriptionListTableV2 rows={rows} />);

			expect(screen.getByTestId('payment-element')).toBeInTheDocument();
			expect(screen.getByText('Visa ending in 4242')).toBeInTheDocument();
		});

		it('renders tile with complex nested elements', () => {
			const rows: ProductDescriptionListRow[] = [
				{
					tiles: [
						{
							title: 'Benefits',
							value: (
								<ul>
									<li>Benefit 1</li>
									<li>Benefit 2</li>
								</ul>
							),
						},
					],
				},
			];

			render(<ProductDescriptionListTableV2 rows={rows} />);

			expect(screen.getByText('Benefit 1')).toBeInTheDocument();
			expect(screen.getByText('Benefit 2')).toBeInTheDocument();
		});
	});

	describe('Actions', () => {
		it('renders action buttons', () => {
			const mockOnClick = jest.fn();
			const rows: ProductDescriptionListRow[] = [
				{
					tiles: [{ title: 'Field', value: 'Value' }],
					actions: [
						{
							text: 'Update',
							onClick: mockOnClick,
						},
					],
				},
			];

			render(<ProductDescriptionListTableV2 rows={rows} />);

			const button = screen.getByRole('button', { name: 'Update' });
			expect(button).toBeInTheDocument();
		});

		it('renders action links', () => {
			const rows: ProductDescriptionListRow[] = [
				{
					tiles: [{ title: 'Field', value: 'Value' }],
					actions: [
						{
							text: 'Go to Billing',
							linkTo: '/billing',
						},
					],
				},
			];

			render(<ProductDescriptionListTableV2 rows={rows} />);

			const link = screen.getByRole('link', { name: 'Go to Billing' });
			expect(link).toBeInTheDocument();
			expect(link).toHaveAttribute('href', '/billing');
		});

		it('renders multiple actions', () => {
			const rows: ProductDescriptionListRow[] = [
				{
					tiles: [{ title: 'Field', value: 'Value' }],
					actions: [
						{ text: 'Action 1', onClick: jest.fn() },
						{ text: 'Action 2', linkTo: '/page2' },
					],
				},
			];

			render(<ProductDescriptionListTableV2 rows={rows} />);

			expect(
				screen.getByRole('button', { name: 'Action 1' }),
			).toBeInTheDocument();
			expect(
				screen.getByRole('link', { name: 'Action 2' }),
			).toBeInTheDocument();
		});

		it('renders promotional text with actions', () => {
			const rows: ProductDescriptionListRow[] = [
				{
					tiles: [{ title: 'Field', value: 'Value' }],
					actions: [
						{
							text: 'Upgrade',
							linkTo: '/upgrade',
							promo: 'Save £50 per year',
						},
					],
				},
			];

			render(<ProductDescriptionListTableV2 rows={rows} />);

			expect(screen.getByText('Save £50 per year')).toBeInTheDocument();
		});

		it('does not render actions group when no actions provided', () => {
			const rows: ProductDescriptionListRow[] = [
				{
					tiles: [{ title: 'Field', value: 'Value' }],
					// No actions property
				},
			];

			render(<ProductDescriptionListTableV2 rows={rows} />);

			expect(screen.queryByLabelText('Actions')).not.toBeInTheDocument();
		});
	});

	describe('Layout Props', () => {
		it('applies gap spacing when separateEachRow is true', () => {
			const rows: ProductDescriptionListRow[] = [
				{ tiles: [{ title: 'Row 1', value: 'Value 1' }] },
				{ tiles: [{ title: 'Row 2', value: 'Value 2' }] },
			];

			const { container } = render(
				<ProductDescriptionListTableV2
					rows={rows}
					separateEachRow={true}
				/>,
			);

			const tableContainer = container.querySelector('[role="region"]');
			// When separateEachRow is true, gap should not be 0px
			expect(tableContainer).not.toHaveStyle('gap: 0px');
		});

		it('does not apply gap spacing when separateEachRow is not provided', () => {
			const rows: ProductDescriptionListRow[] = [
				{ tiles: [{ title: 'Row 1', value: 'Value 1' }] },
				{ tiles: [{ title: 'Row 2', value: 'Value 2' }] },
			];

			const { container } = render(
				<ProductDescriptionListTableV2 rows={rows} />,
			);

			const tableContainer = container.querySelector('[role="region"]');
			expect(tableContainer).toHaveStyle('gap: 0px');
		});
	});

	describe('Accessibility', () => {
		it('has product details region role and label', () => {
			const rows: ProductDescriptionListRow[] = [
				{ tiles: [{ title: 'Field', value: 'Value' }] },
			];

			render(<ProductDescriptionListTableV2 rows={rows} />);

			expect(
				screen.getByRole('region', { name: 'Product details' }),
			).toBeInTheDocument();
		});

		it('has group role for rows', () => {
			const rows: ProductDescriptionListRow[] = [
				{ tiles: [{ title: 'Field', value: 'Value' }] },
			];

			render(<ProductDescriptionListTableV2 rows={rows} />);

			expect(screen.getByRole('group')).toBeInTheDocument();
		});

		it('has aria label for actions group when actions exist', () => {
			const rows: ProductDescriptionListRow[] = [
				{
					tiles: [{ title: 'Field', value: 'Value' }],
					actions: [{ text: 'Update', onClick: jest.fn() }],
				},
			];

			render(<ProductDescriptionListTableV2 rows={rows} />);

			expect(screen.getByLabelText('Actions')).toBeInTheDocument();
		});

		it('renders numeric values correctly', () => {
			const rows: ProductDescriptionListRow[] = [
				{
					tiles: [
						{ title: 'Amount', value: 100 },
						{ title: 'Price', value: 99.99 },
					],
				},
			];

			render(<ProductDescriptionListTableV2 rows={rows} />);

			expect(screen.getByText('100')).toBeInTheDocument();
			expect(screen.getByText('99.99')).toBeInTheDocument();
		});
	});

	describe('spanTwoCols', () => {
		it('renders tile with spanTwoCols as true', () => {
			const rows: ProductDescriptionListRow[] = [
				{
					tiles: [
						{
							title: 'Full Width Field',
							value: 'Extended content',
							spanTwoCols: true,
						},
					],
				},
			];

			render(<ProductDescriptionListTableV2 rows={rows} />);

			expect(screen.getByText('Full Width Field')).toBeInTheDocument();
			expect(screen.getByText('Extended content')).toBeInTheDocument();
		});

		it('renders tile with spanTwoCols as undefined (default)', () => {
			const rows: ProductDescriptionListRow[] = [
				{
					tiles: [
						{
							title: 'Normal Field',
							value: 'Normal content',
						},
					],
				},
			];

			render(<ProductDescriptionListTableV2 rows={rows} />);

			expect(screen.getByText('Normal Field')).toBeInTheDocument();
		});
	});

	describe('Snapshot Testing', () => {
		it('matches snapshot with basic structure', () => {
			const rows: ProductDescriptionListRow[] = [
				{
					tiles: [
						{ title: 'Date', value: '31 Dec 2025' },
						{ title: 'Amount', value: '£10.00' },
					],
					actions: [
						{
							text: 'Update',
							linkTo: '/update',
							promo: 'Save £5',
						},
					],
				},
			];

			const { container } = render(
				<ProductDescriptionListTableV2 rows={rows} />,
			);
			expect(container).toMatchSnapshot();
		});

		it('matches snapshot with multiple rows separated', () => {
			const rows: ProductDescriptionListRow[] = [
				{ tiles: [{ title: 'Row 1', value: 'Value 1' }] },
				{ tiles: [{ title: 'Row 2', value: 'Value 2' }] },
			];

			const { container } = render(
				<ProductDescriptionListTableV2
					rows={rows}
					separateEachRow={true}
				/>,
			);
			expect(container).toMatchSnapshot();
		});
	});
});
