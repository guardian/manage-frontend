import { join } from 'path';
import type { GuStackProps } from '@guardian/cdk/lib/constructs/core';
import { GuStack, GuStringParameter } from '@guardian/cdk/lib/constructs/core';
import type { App } from 'aws-cdk-lib';
import type { CfnLoadBalancer } from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { CfnRecordSet } from 'aws-cdk-lib/aws-route53';
import { CfnInclude } from 'aws-cdk-lib/cloudformation-include';

interface ManageGuStackProps extends GuStackProps {
	domain: string;
}
export class ManageFrontend extends GuStack {
	constructor(scope: App, id: string, props: ManageGuStackProps) {
		super(scope, id, props);
		const yamlTemplateFilePath = join(__dirname, '../..', 'cfn.yaml');
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
	}
}
