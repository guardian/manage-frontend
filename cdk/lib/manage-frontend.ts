import { join } from 'path';
import { GuNodeApp } from '@guardian/cdk';
import { AccessScope } from '@guardian/cdk/lib/constants';
import type { GuStackProps } from '@guardian/cdk/lib/constructs/core';
import { GuStack, GuStringParameter } from '@guardian/cdk/lib/constructs/core';
import {
	GuAllowPolicy,
	GuGetS3ObjectsPolicy,
	GuPutCloudwatchMetricsPolicy,
} from '@guardian/cdk/lib/constructs/iam';
import type { GuAsgCapacity } from '@guardian/cdk/lib/types';
import type { App } from 'aws-cdk-lib';
import { Tags } from 'aws-cdk-lib';
import { InstanceClass, InstanceSize, InstanceType } from 'aws-cdk-lib/aws-ec2';
import type { CfnLoadBalancer } from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import type { CfnLogGroup } from 'aws-cdk-lib/aws-logs';
import { CfnRecordSet } from 'aws-cdk-lib/aws-route53';
import { CfnInclude } from 'aws-cdk-lib/cloudformation-include';

interface ManageGuStackProps extends GuStackProps {
	scaling: GuAsgCapacity;
	domain: string;
}
export class ManageFrontend extends GuStack {
	constructor(scope: App, id: string, props: ManageGuStackProps) {
		super(scope, id, props);
		const yamlTemplateFilePath = join(__dirname, '../..', 'cfn.yaml');

		const app = 'manage-frontend';

		const existingYaml = new CfnInclude(this, 'YamlTemplate', {
			templateFile: yamlTemplateFilePath,
		});

		const loadBalancer = existingYaml.getResource(
			'ElasticLoadBalancer',
		) as CfnLoadBalancer;

		const hostedZoneId = new GuStringParameter(this, 'hostedZoneId', {
			fromSSM: true,
			default: '/account/route53/membership/hostedZoneId',
		}).valueAsString;

		new CfnRecordSet(this, 'AliasRecord', {
			name: props.domain,
			type: 'A',
			hostedZoneId,
			aliasTarget: {
				dnsName: loadBalancer.attrDnsName,
				hostedZoneId: loadBalancer.attrCanonicalHostedZoneId,
			},
		});

		const clientRavenDSN = new GuStringParameter(this, 'clientRavenDSN', {
			description: 'the DSN to use with Sentry on the client',
			fromSSM: true,
			default: `/${this.stage}/${this.stack}/${app}/clientRavenDSN`,
		});

		const serverRavenDSN = new GuStringParameter(this, 'serverRavenDSN', {
			description: 'the DSN to use with Sentry on the server',
			fromSSM: true,
			default: `/${this.stage}/${this.stack}/${app}/serverRavenDSN`,
		});

		// intentionally removed tabs from the following string for bash's sake!
		const userData = `#!/bin/bash -ev
# get runnable tar from S3
aws --region ${this.region} s3 cp s3://membership-dist/${this.stack}/${this.stage}/${app}/manage-frontend.zip /tmp
mkdir /etc/gu
unzip /tmp/manage-frontend.zip -d /etc/gu/dist/
# add user
groupadd manage-frontend
useradd -r -s /usr/bin/nologin -g manage-frontend manage-frontend
touch /var/log/manage-frontend.log
chown -R manage-frontend:manage-frontend /etc/gu
chown manage-frontend:manage-frontend /var/log/manage-frontend.log
# write out systemd file
cat >/etc/systemd/system/manage-frontend.service <<EOL
[Service]
ExecStart=/usr/bin/node /etc/gu/dist/server.js
Restart=always
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=manage-frontend
User=manage-frontend
Group=manage-frontend
Environment=STAGE=${this.stage}
Environment=CLIENT_DSN=${clientRavenDSN.valueAsString}
Environment=SERVER_DSN=${serverRavenDSN.valueAsString}
[Install]
WantedBy=multi-user.target
EOL
# RUN
systemctl enable manage-frontend
systemctl start manage-frontend
/opt/cloudwatch-logs/configure-logs application ${this.stack} ${this.stage} ${app} /var/log/manage-frontend.log`;

		const logGroup = existingYaml.getResource(
			'ManageFrontendLogGroup',
		) as CfnLogGroup;

		// docs https://guardian.github.io/cdk/classes/patterns.GuEc2App.html
		const nodeApp = new GuNodeApp(this, {
			access: { scope: AccessScope.PUBLIC },
			app,
			certificateProps: {
				domainName: props.domain,
				// `dig NS manage.theguardian.com.origin.membership.guardianapis.com` shows the nameserver as `ns-1529.awsdns-63.org`, which is Route53
				// https://prism.gutools.co.uk/route53-zones tells us the zone id for 'membership.guardianapis.com'
				hostedZoneId: 'Z1E4V12LQGXFEC',
			},
			instanceType: InstanceType.of(
				InstanceClass.T4G,
				InstanceSize.SMALL,
			),
			monitoringConfiguration: {
				noMonitoring: true,
			},
			scaling: props.scaling,
			userData,
			roleConfiguration: {
				additionalPolicies: [
					new GuAllowPolicy(this, 'PushLogs', {
						actions: [
							'logs:CreateLogGroup',
							'logs:CreateLogStream',
							'logs:PutLogEvents',
						],
						resources: [logGroup.attrArn],
					}),
					new GuPutCloudwatchMetricsPolicy(this),
					// TODO: whats this bucket used for and are we doing the right thing?
					new GuGetS3ObjectsPolicy(this, 'ReadPrivateCredentials', {
						bucketName: 'gu-reader-revenue-private',
						paths: [`${app}/${this.stage}/*`],
					}),
					// we're using a wild card for the help center content as the bucket only contains public json files needed to display the help center pages
					new GuGetS3ObjectsPolicy(this, 'ReadManageHelpContent', {
						bucketName: 'manage-help-content',
						paths: [`${this.stage}/*`],
					}),
					new GuGetS3ObjectsPolicy(
						this,
						'ReadFulfilmentDateCalculatorOutput',
						{
							bucketName: `fulfilment-date-calculator-${this.stage}`,
							paths: ['*'],
						},
					),
					new GuAllowPolicy(this, 'DiscoverApiGatewayLambdas', {
						actions: ['cloudformation:ListStackResources'],
						resources: [
							`arn:aws:cloudformation:${this.region}:${this.account}:stack/membership-${this.stage}-*`,
							`arn:aws:cloudformation:${this.region}:${this.account}:stack/support-${this.stage}-*`,
						],
					}),
					new GuAllowPolicy(this, 'DiscoverApiGatewayApiKeys', {
						actions: ['apigateway:GET'],
						resources: [
							`arn:aws:apigateway:${this.region}::/apikeys/*`,
						],
					}),
					new GuAllowPolicy(this, 'InvokeApiGateway', {
						actions: ['execute-api:Invoke'],
						resources: [
							`arn:aws:execute-api:${this.region}:${this.account}:*/${this.stage}/*`,
						],
					}),
				],
			},
		});

		const nodeAppAsg = nodeApp.autoScalingGroup;
		Tags.of(nodeAppAsg).add('gu:riffraff:new-asg', 'true');
	}
}