import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { ManageFrontend } from './manage-frontend';

describe('The ManageFrontend stack', () => {
	it('matches the snapshot', () => {
		const app = new App();
		const stack = new ManageFrontend(app, 'ManageFrontend', {
			stack: 'support',
			stage: 'TEST',
		});
		const template = Template.fromStack(stack);
		expect(template.toJSON()).toMatchSnapshot();
	});
});
