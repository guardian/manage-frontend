import { signInAndAcceptCookies } from '../../../lib/signInAndAcceptCookies';

interface GuardianIdentityDetails {
	displayName: string;
	email: string;
}

interface GuardianObject {
	identityDetails: GuardianIdentityDetails;
	recaptchaPublicKey: string;
}

interface ReCaptchaOptions {
	callback?: (token: string) => void;
}

interface MockGreCaptcha {
	render: (container: string, options: ReCaptchaOptions) => string;
}

const getValueLength = (
	value: string | number | string[] | undefined,
): number => {
	if (value === undefined || value === null) {
		return 0;
	}
	return typeof value === 'string' ? value.length : String(value).length;
};

describe('Contact Us Form Tests', () => {
	beforeEach(() => {
		signInAndAcceptCookies();

		cy.intercept('POST', '/api/contact-us', {
			statusCode: 200,
			body: { success: true },
		}).as('submitContactForm');

		// Mock the reCAPTCHA script load
		cy.intercept('GET', 'https://www.google.com/recaptcha/api.js*', {
			statusCode: 200,
			body: '// Mock reCAPTCHA script',
		});

		cy.visit('/help-centre/contact-us/');

		// Set up all mocks after page load but before navigation
		cy.window().then((win) => {
			const extendedWin = win as typeof win & {
				guardian?: GuardianObject;
				grecaptcha?: MockGreCaptcha;
				v2ReCaptchaOnLoadCallback?: () => void;
			};

			extendedWin.guardian = {
				...extendedWin.guardian,
				identityDetails: {
					displayName: 'Test User',
					email: 'test.user@guardian.co.uk',
				},
				recaptchaPublicKey: 'test-key',
			};

			// Mock reCAPTCHA before the form component loads
			extendedWin.grecaptcha = {
				render: cy
					.stub()
					.callsFake(
						(container: string, options: ReCaptchaOptions) => {
							// Immediately trigger the callback to simulate successful reCAPTCHA
							if (options.callback) {
								options.callback('test-recaptcha-token');
							}
							return 'widget-id';
						},
					),
			};

			extendedWin.v2ReCaptchaOnLoadCallback = () => {};
		});

		cy.findByText('Something else').click();
		cy.findByText('Begin form').click();

		// Wait for reCAPTCHA element to be rendered
		cy.get('#recaptcha').should('exist');
	});

	context('Form Display and Initial State', () => {
		it('should display the contact form with pre-filled user details', () => {
			cy.findByLabelText('Full Name').should('be.visible');
			cy.findByLabelText(/^Email address/).should('be.visible');
			cy.findByLabelText('Subject of enquiry').should('be.visible');
			cy.contains('2500 characters remaining').should('be.visible');
			it('should display file upload section', () => {
				cy.contains('Upload image').should('be.visible');
				cy.contains(
					'File must be in .png, .jpeg, .jpg, .gif or  .pdf format and less than 5MB',
				).should('be.visible');
			});
		});
	});

	context('Form Validation', () => {
		it('should show validation errors for empty required fields', () => {
			cy.findByLabelText('Full Name').clear();
			cy.findByLabelText(/^Email address/).clear();

			cy.findByText('Submit').click();

			cy.contains('You cannot leave this field empty').should(
				'be.visible',
			);
			cy.contains('Please insert a valid email address').should(
				'be.visible',
			);
		});

		it('should validate email format', () => {
			cy.findByLabelText(/^Email address/)
				.clear()
				.type('invalid-email');
			cy.get('textarea[name="message"]').type('Test message');
			cy.findByText('Submit').click();

			cy.contains('Please insert a valid email address').should(
				'be.visible',
			);
		});

		it('should enforce character limits', () => {
			const longName = 'a'.repeat(60);
			cy.findByLabelText('Full Name').clear().type(longName);
			cy.findByLabelText('Full Name').should(($input) => {
				expect(getValueLength($input.val())).to.equal(50);
			});

			const longEmail = 'a'.repeat(60) + '@test.com';
			cy.findByLabelText(/^Email address/)
				.clear()
				.type(longEmail);
			cy.findByLabelText(/^Email address/).should(($input) => {
				expect(getValueLength($input.val())).to.equal(50);
			});
		});

		it('should update character counter for message field', () => {
			const testMessage = 'This is a test message';
			cy.get('textarea[name="message"]').type(testMessage);

			const expectedRemaining = 2500 - testMessage.length;
			cy.contains(`${expectedRemaining} characters remaining`).should(
				'be.visible',
			);
		});
	});

	context('Form Interactions', () => {
		it('should clear failure state when user starts typing', () => {
			cy.intercept('POST', '/api/contact-us', {
				statusCode: 500,
				body: { error: 'Internal server error' },
			}).as('failedSubmit');

			cy.findByLabelText('Full Name').clear().type('Jontho');
			cy.findByLabelText(/^Email address/)
				.clear()
				.type('jonhto@gmail.com');
			cy.get('textarea[name="message"]').type(
				'I need help with my subscription',
			);

			cy.findByText('Submit').click();
			cy.contains(
				'Something went wrong when submitting your form',
			).should('be.visible');

			cy.findByLabelText('Full Name').type(' Updated');
			cy.contains(
				'Something went wrong when submitting your form',
			).should('not.exist');
		});

		it('should focus on first invalid field when validation fails', () => {
			cy.findByLabelText('Full Name').clear();
			cy.findByLabelText(/^Email address/).clear();

			cy.findByText('Submit').click();

			cy.findByLabelText(/^Full Name/)
				.should('exist')
				.should('be.visible')
				.should('have.focus');
		});
	});

	context('Form Submission', () => {
		it('should successfully submit a valid form', () => {
			cy.findByLabelText('Full Name').clear().type('Jontho');
			cy.findByLabelText(/^Email address/)
				.clear()
				.type('jonhto@gmail.com');
			cy.get('textarea[name="message"]').type(
				'I need help with my subscription',
			);

			cy.findByText('Submit').click();

			cy.wait('@submitContactForm').then((interception) => {
				const body =
					typeof interception.request.body === 'string'
						? JSON.parse(interception.request.body)
						: interception.request.body;

				expect(body).to.have.property('topic', 'other');
				expect(body).to.have.property('name', 'Jontho');
				expect(body).to.have.property('email', 'jonhto@gmail.com');
				expect(body).to.have.property(
					'message',
					'I need help with my subscription',
				);
				expect(body).to.have.property(
					'captchaToken',
					'test-recaptcha-token',
				);
			});
		});

		it('should handle submission failure gracefully', () => {
			cy.intercept('POST', '/api/contact-us', {
				statusCode: 500,
				body: { error: 'Internal server error' },
			}).as('failedSubmitContactForm');

			cy.findByLabelText('Full Name').clear().type('Jontho');
			cy.findByLabelText(/^Email address/)
				.clear()
				.type('jonhto@gmail.com');
			cy.get('textarea[name="message"]').type(
				'I need help with my subscription',
			);

			cy.findByText('Submit').click();

			cy.contains(
				'Something went wrong when submitting your form',
			).should('be.visible');
			cy.contains(
				'Please try again or if the problem persists please contact',
			).should('be.visible');

			cy.findByText('Customer Service').click();
			cy.contains('Customer Service').should('be.visible');
		});
	});
});
