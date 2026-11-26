/**
 * @jest-environment node
 */
import type http from 'http';
import type { AddressInfo } from 'net';
import express from 'express';
import { router as helpCentreRouter } from '../../routes/helpCentreFrontend';

jest.mock('../../middleware/identityMiddleware', () => ({
	withIdentity: () => (_req: unknown, _res: unknown, next: () => void) =>
		next(),
}));

jest.mock('../../routes/frontendCommon', () => ({
	clientDSN: null,
	getRecaptchaPublicKey: async () => 'test-recaptcha-key',
	getStripePublicKeys: async () => ({}),
}));

jest.mock('../../html', () => ({
	htmlAndScriptHashes: () => ({
		body: '<!DOCTYPE html><html><body>help</body></html>',
		hashes: ['hash-one', 'hash-two'],
	}),
}));

// The route imports createCsp from the server module. Mock it so this test
// does not execute server.listen or the Okta config lookup.
jest.mock('../../server', () => ({
	createCsp: (hashes: string[]) =>
		`script-src ${hashes
			.map((hash) => `'sha256-${hash}'`)
			.join(' ')} 'strict-dynamic' 'unsafe-eval'`,
}));

const defaultEnforcingCsp =
	"script-src 'strict-dynamic' 'unsafe-eval'; style-src 'unsafe-inline'; object-src 'none'";

const listen = (app: express.Express) =>
	new Promise<http.Server>((resolve) => {
		const server = app.listen(0, () => resolve(server));
	});

describe('help centre CSP', () => {
	test('contact-us enforces the policy with script hashes', async () => {
		const app = express();
		app.use((_req, res, next) => {
			res.set('Content-Security-Policy', defaultEnforcingCsp);
			next();
		});
		app.use('/help-centre', helpCentreRouter);

		const server = await listen(app);
		try {
			const { port } = server.address() as AddressInfo;
			const response = await fetch(
				`http://127.0.0.1:${port}/help-centre/contact-us/`,
			);

			expect(response.status).toBe(200);
			expect(response.headers.get('content-security-policy')).toContain(
				"'sha256-hash-one'",
			);
			expect(response.headers.get('content-security-policy')).toContain(
				"'strict-dynamic'",
			);
			expect(
				response.headers.get('content-security-policy-report-only'),
			).toBeNull();
		} finally {
			await new Promise<void>((resolve, reject) => {
				server.close((err) => (err ? reject(err) : resolve()));
			});
		}
	});
});
