import { AccessScope } from '@guardian/cdk/lib/constants/access';
import type { GuStackProps } from '@guardian/cdk/lib/constructs/core';
import { GuStack } from '@guardian/cdk/lib/constructs/core';
import { GuNodeApp } from '@guardian/cdk/lib/patterns/ec2-app';
import type { App } from 'aws-cdk-lib';
import { InstanceClass, InstanceSize, InstanceType } from 'aws-cdk-lib/aws-ec2';

export class ManageFrontend extends GuStack {
	constructor(scope: App, id: string, props: GuStackProps) {
		super(scope, id, props);

		const ec2app = new GuNodeApp(this, {
			app: 'manage-frontend',
			access: { scope: AccessScope.PUBLIC },
			instanceType: InstanceType.of(
				InstanceClass.T4G,
				InstanceSize.SMALL,
			),
			userData: 'echo todo',
			monitoringConfiguration: { noMonitoring: true },
			scaling: { minimumInstances: 1, maximumInstances: 2 },
			certificateProps: {
				domainName:
					'manage.theguardian.com.origin.membership.guardianapis.com',
			},
		});

		//sdfgdfg
	}
}
