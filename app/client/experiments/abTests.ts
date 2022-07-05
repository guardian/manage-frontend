import { AB, ABTest, Participations } from '@guardian/ab-core';
import { abSwitches } from './abSwitches';
import { ProductMovementTest } from './tests/product-movement-test';

interface ABTestConfiguration {
	abTestSwitches: Record<string, boolean>;
	arrayOfTestObjects: ABTest[];
	pageIsSensitive: false;
	mvtMaxValue: 1000000;
}

// Add AB tests to run in this array
export const tests: ABTest[] = [ProductMovementTest];

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
