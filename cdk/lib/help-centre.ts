import { GuStack } from '@guardian/cdk/lib/constructs/core';
import { GuCname } from '@guardian/cdk/lib/constructs/dns/dns-records';
import type { App } from 'aws-cdk-lib';
import { Duration } from 'aws-cdk-lib';

export class HelpCentre extends GuStack {
	constructor(scope: App, id: string, stage: 'CODE' | 'PROD') {
		super(scope, id, { stack: 'support', stage });

		const app = 'help-centre';
		const mappings = {
			CODE: {
				domainName: 'help.code.dev-theguardian.com',
				resourceRecord:
					'help.code.dev-theguardian.com.00d20000000nq5geaa.live.siteforce.com', // temp
			},
			PROD: {
				domainName: 'help.theguardian.com',
				resourceRecord:
					'help.theguardian.com.00d20000000nq5geaa.live.siteforce.com', // temp
			},
		};
		const { domainName, resourceRecord } = mappings[stage];
		new GuCname(this, 'NS1Domain', {
			app,
			domainName,
			resourceRecord,
			ttl: Duration.minutes(1),
		});
	}
}
