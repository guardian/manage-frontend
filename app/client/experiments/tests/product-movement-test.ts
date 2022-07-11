import { ABTest } from '@guardian/ab-core';

export const ProductMovementTest: ABTest = {
	id: 'ProductMovementTest', // This ID must match the Server Side AB Test
	start: '2022-06-21',
	expiry: '2023-12-01', // Remember that the server side test expiry can be different
	author: 'supporter.revenue.retention.dev@guardian.co.uk',
	description: 'Initial AB test for our product movement MVP',
	audience: 1, // 0.01% (1 is 100%)
	audienceOffset: 0.5, // 50% (1 is 100%). Prevent overlapping with other tests.
	successMeasure: 'It works',
	audienceCriteria: 'Everyone',
	idealOutcome: 'It works',
	showForSensitive: true, // Should this A/B test run on sensitive articles?
	canRun: () => true, // Check for things like user or page sections
	variants: [
		{
			id: 'control',
			test: (): string => {
				// You can define what you want your variant to do in here or use the isUserInVariant API
				return 'control';
			},
		},
		{
			id: 'showOffer',
			test: (): string => {
				return 'showOffer';
			},
		},
	],
};
