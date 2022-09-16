import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { ManageFrontend } from '../lib/manage-frontend';

const app = new App();
new ManageFrontend(app, 'ManageFrontend-CODE', {
	stack: 'support',
	stage: 'CODE',
	domain: 'manage.code.theguardian.com.origin.membership.guardianapis.com',
	cloudFormationStackName: 'support-CODE-manage-frontend',
});
new ManageFrontend(app, 'ManageFrontend-PROD', {
	stack: 'support',
	stage: 'PROD',
	domain: 'manage.theguardian.com.origin.membership.guardianapis.com',
	cloudFormationStackName: 'support-PROD-manage-frontend',
});
