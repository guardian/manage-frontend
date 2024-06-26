import type { ABTest, Participations } from '@guardian/ab-core';
import { AB } from '@guardian/ab-core';
import { abSwitches } from './abSwitches';

interface ABTestConfiguration {
	abTestSwitches: Record<string, boolean>;
	arrayOfTestObjects: ABTest[];
	pageIsSensitive: false;
	mvtMaxValue: 1000000;
}

// Add AB tests to run in this array (you can import them from ./tests ... then add then to this array)
export const tests: ABTest[] = [];

const getDefaultABTestConfiguration = (): ABTestConfiguration => ({
	abTestSwitches: abSwitches,
	arrayOfTestObjects: tests,
	mvtMaxValue: 1000000,
	pageIsSensitive: false,
});

export const abTestApiForMvtId = (
	mvtId: number,
	forcedTestVariants?: Participations,
) => {
	const { abTestSwitches, arrayOfTestObjects, mvtMaxValue, pageIsSensitive } =
		getDefaultABTestConfiguration();

	return new AB({
		abTestSwitches,
		arrayOfTestObjects,
		pageIsSensitive,
		mvtMaxValue,
		mvtId,
		forcedTestVariants,
	});
};
