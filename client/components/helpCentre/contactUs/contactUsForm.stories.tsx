import { css } from '@emotion/react';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ContactUsForm } from './contactUsForm';

// Mocked Type definitions
interface MockedReCaptchaOptions {
	sitekey?: string;
	callback?: (token: string) => void;
}

interface MockedGreCaptcha {
	render: (container: string, options: MockedReCaptchaOptions) => string;
}

interface MockedGuardianIdentityDetails {
	displayName: string;
	email: string;
}

interface MockedGuardian {
	recaptchaPublicKey: string;
	identityDetails: MockedGuardianIdentityDetails;
}

// Mock the global guardian object and reCAPTCHA for Storybook
const withMockedGlobals = (Story: StoryFn) => {
	if (typeof window !== 'undefined') {
		const windowWithGuardian = window as typeof window & {
			guardian?: MockedGuardian;
			grecaptcha?: MockedGreCaptcha;
			v2ReCaptchaOnLoadCallback?: () => void;
		};

		windowWithGuardian.guardian = {
			...windowWithGuardian.guardian,
			recaptchaPublicKey: 'storybook-mock-key',
			identityDetails: {
				displayName: 'John Doe',
				email: 'john.doe@example.com',
			},
		};

		// Mock reCAPTCHA
		windowWithGuardian.grecaptcha = {
			render: (container: string, options: MockedReCaptchaOptions) => {
				const element = document.getElementById(container);
				if (element) {
					element.innerHTML = `
						<div style="
							border: 2px solid #ddd; 
							padding: 10px; 
							background: #f9f9f9; 
							text-align: center;
							border-radius: 4px;
							color: #666;
						">
							[Mock reCAPTCHA - Storybook]
						</div>
					`;
				}
				setTimeout(() => {
					if (options.callback) {
						options.callback('mock-recaptcha-token');
					}
				}, 1000);
				return 'mock-widget-id';
			},
		};

		// Prevent loading the actual reCAPTCHA script
		windowWithGuardian.v2ReCaptchaOnLoadCallback = () => {};
	}

	return <Story />;
};

const meta: Meta<typeof ContactUsForm> = {
	title: 'Components/Help Centre/Contact Us Form',
	component: ContactUsForm,
	decorators: [withMockedGlobals],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'Contact form for help centre with validation, file upload, and reCAPTCHA',
			},
		},
	},
	args: {
		submitCallback: fn(),
	},
	argTypes: {
		submitCallback: {
			description: 'Callback function called when form is submitted',
		},
		title: {
			control: 'text',
			description: 'Form title displayed in the legend',
		},
		subject: {
			control: 'text',
			description: 'Subject of the enquiry',
		},
		editableSubject: {
			control: 'boolean',
			description:
				'Whether the subject field is editable or display-only',
		},
	},
};

export default meta;
type Story = StoryObj<typeof ContactUsForm>;

export const Default: Story = {
	args: {
		title: 'Contact Form',
		subject: 'General Enquiry',
		editableSubject: false,
	},
};

export const EditableSubject: Story = {
	args: {
		title: 'Contact Form',
		subject: '',
		editableSubject: true,
	},
};

export const WithCustomStyling: Story = {
	args: {
		title: 'Custom Styled Form',
		subject: 'General Enquiry',
		editableSubject: false,
		additionalCss: css`
			border: 2px solid #007abc;
			border-radius: 8px;
			padding: 16px;
		`,
	},
};

export const LongContent: Story = {
	args: {
		title: 'This is a very long form title to test how the layout handles longer text content',
		subject:
			'This is a very long subject line to test how the form handles longer subject text and whether it wraps properly',
		editableSubject: false,
	},
};
