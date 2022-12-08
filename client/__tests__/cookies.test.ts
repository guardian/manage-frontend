import { getCookie } from '../utilities/cookies';

const cookieName = 'testCookie';
const cookieValue = 'whatever';

describe('cookies', () => {
	beforeAll(() => {
		Object.defineProperty(window.document, 'cookie', {
			writable: true,
			value: '',
		});
	});
	it('getCookie returns null when no cookie exists', () => {
		expect(getCookie(cookieName)).toBeNull();
	});

	it('getCookie returns null when no cookie is found', () => {
		// tslint:disable-next-line:no-object-mutation
		window.document.cookie = 'testName=testValue;';

		expect(getCookie(cookieName)).toBeNull();
	});

	it('getCookie returns the cookie value when a cookie is found', () => {
		// tslint:disable-next-line:no-object-mutation
		window.document.cookie = `testName=testValue; ${cookieName}=${cookieValue}`;

		expect(getCookie(cookieName)).toBe(cookieValue);
	});
});
