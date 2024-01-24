import { joinUrl } from '@guardian/libs';
import { log } from './log';
import type { OktaValidationResponse } from './middleware/oktaServerSideAuthMiddleware';
import { IdTokenClaims } from './oauthConfig';
import type { OktaConfig } from './oktaConfig';

export const validateWithOkta = async ({
	oktaConfig,
	accessToken,
}: {
	oktaConfig: OktaConfig;
	accessToken: string;
}): Promise<OktaValidationResponse> => {
	const issuerUrl = joinUrl(
		oktaConfig.orgUrl,
		'/oauth2/',
		oktaConfig.authServerId,
	);

	try {
		const oktaResponse = await fetch(`${issuerUrl}/v1/userinfo/`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
		});
		if (oktaResponse.status === 200) {
			// Valid token
			const oktaUserInfo = IdTokenClaims.parse(await oktaResponse.json());
			return {
				ok: true,
				valid: true,
				userId: oktaUserInfo.legacy_identity_id,
				displayName: oktaUserInfo.name,
				email: oktaUserInfo.email,
			};
		} else if ([401, 403].includes(oktaResponse.status)) {
			log.error(`OAuth / Validate with Okta / Error: invalid token.`);
			return { ok: true, valid: false };
		} else {
			log.error(
				`OAuth / Validate with Okta / Error: unexpected status code from Okta: ${oktaResponse.status}`,
			);
			return { ok: false, valid: false };
		}
	} catch (error) {
		log.error(`OAuth / Validate with Okta / Error: ${error.message}`);
		return { ok: false, valid: false };
	}
};
