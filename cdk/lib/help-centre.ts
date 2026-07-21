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
				resourceRecord: 'guardian.map.fastly.net.',
			},
			PROD: {
				domainName: 'help.theguardian.com',
				resourceRecord: 'guardian.map.fastly.net.',
			},
		};
		const { domainName, resourceRecord } = mappings[stage];
		new GuCname(this, 'NS1Domain', {
			app,
			domainName,
			resourceRecord,
			ttl: Duration.minutes(5),
		});
	}
}
