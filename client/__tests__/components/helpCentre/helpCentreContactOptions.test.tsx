import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HelpCentreContactOptions } from '../../../components/helpCentre/HelpCentreContactOptions';
import {
	isArticleLiveChatFeatureEnabled,
	isLiveChatFeatureEnabled,
} from '../../../components/helpCentre/liveChat/liveChatFeatureSwitch';

jest.mock(
	'../../../components/helpCentre/liveChat/liveChatFeatureSwitch',
	() => ({
		isLiveChatFeatureEnabled: jest.fn(),
		isArticleLiveChatFeatureEnabled: jest.fn(),
	}),
);

describe('HelpCentreContactOptions', () => {
	describe('Help Centre landing page', () => {
		describe('with live chat feature switch disabled', () => {
			beforeAll(() => {
				(isLiveChatFeatureEnabled as jest.Mock).mockImplementation(
					() => false,
				);
			});

			it('shows email and phone contacts only', () => {
				const { container } = render(<HelpCentreContactOptions />);
				expect(container).toMatchSnapshot();
			});
		});

		describe('with live chat feature switch enabled', () => {
			beforeAll(() => {
				(isLiveChatFeatureEnabled as jest.Mock).mockImplementation(
					() => true,
				);
			});

			it('shows the live chat contact box', () => {
				const { container } = render(<HelpCentreContactOptions />);
				expect(container).toMatchSnapshot();
			});
		});

		describe('Help Centre article (compact layout and contact options hidden)', () => {
			describe('with live chat feature switches disabled', () => {
				beforeAll(() => {
					(isLiveChatFeatureEnabled as jest.Mock).mockImplementation(
						() => false,
					);
					(
						isArticleLiveChatFeatureEnabled as jest.Mock
					).mockImplementation(() => false);
				});

				it('shows email and phone contacts only', () => {
					const { container } = render(
						<HelpCentreContactOptions
							compactLayout={true}
							hideContactOptions={true}
						/>,
					);
					expect(container).toMatchSnapshot();
				});
			});

			describe('with live chat features switches enabled', () => {
				beforeAll(() => {
					(isLiveChatFeatureEnabled as jest.Mock).mockImplementation(
						() => true,
					);
					(
						isArticleLiveChatFeatureEnabled as jest.Mock
					).mockImplementation(() => true);
				});

				it("shows a 'Contact us' button only with contact options hidden", () => {
					render(
						<HelpCentreContactOptions
							compactLayout={true}
							hideContactOptions={true}
						/>,
					);
					expect(screen.getByRole('button')).toHaveTextContent(
						'Contact us',
					);
					expect(
						screen.queryByText('Chat with us'),
					).not.toBeInTheDocument();
					expect(
						screen.queryByText('Email us'),
					).not.toBeInTheDocument();
					expect(
						screen.queryByText('Call us'),
					).not.toBeInTheDocument();
				});

				it("reveals the contact options with live chat when 'Contact us' is clicked", () => {
					render(
						<HelpCentreContactOptions
							compactLayout={true}
							hideContactOptions={true}
						/>,
					);
					fireEvent.click(screen.getByRole('button'));
					expect(
						screen.getByText('Chat with us'),
					).toBeInTheDocument();
					expect(screen.getByText('Email us')).toBeInTheDocument();
					expect(screen.getByText('Call us')).toBeInTheDocument();
				});
			});
		});
	});
});
