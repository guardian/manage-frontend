import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { ManageFrontend } from '../lib/manage-frontend';

const app = new App();
new ManageFrontend(app, 'ManageFrontend-CODE', {
	stack: 'support',
	stage: 'CODE',
});
new ManageFrontend(app, 'ManageFrontend-PROD', {
	stack: 'support',
	stage: 'PROD',
});
