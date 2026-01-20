import { cleanup, fireEvent, render } from '@testing-library/react';
import { NewsletterPreference } from '../../../components/mma/identity/NewsletterPreference';

afterEach(cleanup);

describe('NewsletterPreference component', () => {
	const input = {
		id: '13',
		description: 'Test description',
		frequency: 'Test frequency',
		title: 'Test title',
		clickHandler: jest.fn(),
		identityName: 'Test-13',
	};
	it('renders correctly and displays marketing information', () => {
		const { container } = render(
			<NewsletterPreference
				id={input.id}
				description={input.description}
				frequency={input.frequency}
				identityName={input.identityName}
				title={input.title}
				onClick={input.clickHandler}
			/>,
		);
		expect(container).toMatchSnapshot();
	});

	it('will select the checkbox when the selected prop is passed', () => {
		const { container } = render(
			<NewsletterPreference
				id={input.id}
				description={input.description}
				frequency={input.frequency}
				identityName={input.identityName}
				title={input.title}
				selected={true}
				onClick={input.clickHandler}
			/>,
		);
		expect(container).toMatchSnapshot();
	});

	it('will call the click handler when it is clicked', () => {
		const { getByText } = render(
			<NewsletterPreference
				id={input.id}
				description={input.description}
				frequency={input.frequency}
				identityName={input.identityName}
				title={input.title}
				onClick={input.clickHandler}
			/>,
		);
		fireEvent.click(getByText(input.title));
		expect(input.clickHandler).toHaveBeenCalledTimes(1);
		expect(input.clickHandler).toHaveBeenLastCalledWith(input.id);
	});
});
