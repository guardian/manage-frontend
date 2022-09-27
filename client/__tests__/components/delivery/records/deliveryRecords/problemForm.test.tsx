import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DeliveryProblemType } from '../../../../../../shared/productTypes';
import { DeliveryRecordProblemForm } from '../../../../../components/delivery/records/deliveryRecordsProblemForm';

const guardianWeeklyProblemArr: DeliveryProblemType[] = [
	{ label: 'Damaged paper', messageIsMandatory: true },
	{ label: 'Delivered despite holiday', messageIsMandatory: false },
	{ label: 'No delivery', messageIsMandatory: false },
	{ label: 'Other', messageIsMandatory: true },
];

describe('DeliveryRecordsProblemForm', () => {
	it('renders the correct problem options', async () => {
		const onFormSubmitSpy = jest.fn();
		const updateValidationStatusCallback = jest.fn();

		render(
			<DeliveryRecordProblemForm
				showNextStepButton={true}
				onFormSubmit={onFormSubmitSpy}
				inValidationState={true}
				updateValidationStatusCallback={updateValidationStatusCallback}
				updateRadioSelectionCallback={jest.fn()}
				problemTypes={guardianWeeklyProblemArr}
			/>,
		);

		for (let i = 0; i < guardianWeeklyProblemArr.length; i++) {
			expect(
				screen.queryByRole('radio', {
					name: guardianWeeklyProblemArr[i].label,
				}),
			).toBeInTheDocument();
		}
	});

	it('shows a validation warning if form is submitted without selecting option', async () => {
		const onFormSubmitSpy = jest.fn();
		const updateValidationStatusCallback = jest.fn();

		render(
			<DeliveryRecordProblemForm
				showNextStepButton={true}
				onFormSubmit={onFormSubmitSpy}
				inValidationState={true}
				updateValidationStatusCallback={updateValidationStatusCallback}
				updateRadioSelectionCallback={jest.fn()}
				problemTypes={guardianWeeklyProblemArr}
			/>,
		);

		fireEvent.click(screen.getByText('Continue to Step 2 & 3'));

		expect(
			screen.queryByText('Please select the type of problem'),
		).toBeInTheDocument();
	});
});
