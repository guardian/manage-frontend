import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { create } from 'react-test-renderer';
import { NewsletterPreference } from '../../../components/identity/NewsletterPreference';

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
		const rendered = create(
			<NewsletterPreference
				id={input.id}
				description={input.description}
				frequency={input.frequency}
				identityName={input.identityName}
				title={input.title}
				onClick={input.clickHandler}
			/>,
		);
		expect(rendered.toJSON()).toMatchSnapshot();
	});

	it('will select the checkbox when the selected prop is passed', () => {
		const rendered = create(
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
		expect(rendered.toJSON()).toMatchSnapshot();
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
