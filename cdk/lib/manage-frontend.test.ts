import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { ManageFrontend } from './manage-frontend';

describe('The ManageFrontend stack', () => {
	it('matches the snapshot', () => {
		const app = new App();
		const stack = new ManageFrontend(app, 'ManageFrontend', {
			stack: 'support',
			stage: 'TEST',
			scaling: { minimumInstances: 1 },
			domain: 'manage.code.theguardian.com.origin.membership.guardianapis.com',
		});
		const template = Template.fromStack(stack);
		expect(template.toJSON()).toMatchSnapshot();
	});
});
