import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { ManageFrontend } from './manage-frontend';

describe('The ManageFrontend stack', () => {
	it('matches the snapshot', () => {
		const app = new App();
		const stack = new ManageFrontend(app, 'ManageFrontend', {
			stack: 'support',
			stage: 'PROD',
			scaling: { minimumInstances: 3 },
			domain: 'manage.theguardian.com.origin.membership.guardianapis.com',
		});
		const template = Template.fromStack(stack);
		expect(template.toJSON()).toMatchSnapshot();
	});
});
