import * as Sentry from '@sentry/browser';
import type { ProductDetail } from '../shared/productResponse';
import { getMainPlan, getSpecificProductType } from '../shared/productResponse';
import { s3FilePromise } from './awsIntegration';
import { conf } from './config';
import { log } from './log';

type RawFulfilmentDateCalculatorDates = Record<
	string,
	{ deliveryAddressChangeEffectiveDate?: string }
>;

const getDeliveryAddressChangeEffectiveDateForToday = async (
	filenameProductPart: string,
	daysOfWeek: string[],
) => {
	const datesByDayOfWeek =
		await s3FilePromise<RawFulfilmentDateCalculatorDates>(
			`fulfilment-date-calculator-${conf.STAGE.toLowerCase()}`,
			`${filenameProductPart}/${new Date()
				.toISOString()
				.substring(0, 10)}_${filenameProductPart}.json`,
			...daysOfWeek,
		);
	return (
		datesByDayOfWeek &&
		daysOfWeek.reduce((earliestAcc, dayOfWeek) => {
			const deliveryAddressChangeEffectiveDateStr =
				datesByDayOfWeek[dayOfWeek].deliveryAddressChangeEffectiveDate;
			if (
				!earliestAcc ||
				!deliveryAddressChangeEffectiveDateStr ||
				new Date(earliestAcc) >
					new Date(deliveryAddressChangeEffectiveDateStr)
			) {
				return deliveryAddressChangeEffectiveDateStr || '';
			}
			return earliestAcc;
		}, '')
	);
};

export const augmentProductDetailWithDeliveryAddressChangeEffectiveDateForToday =
	async (productDetail: ProductDetail) => {
		const specificProductType = getSpecificProductType(productDetail.tier);
		if (specificProductType.groupedProductType !== 'subscriptions') {
			return productDetail;
		}

		const mainPlan = getMainPlan(productDetail.subscription);
		if (!mainPlan) {
			const missingMainPlanErrorMsg =
				'mainPlan does not exist in augmentProductDetailWithDeliveryAddressChangeEffectiveDateForToday function (fulfilmentDateCalculatorReader)';
			log.error(missingMainPlanErrorMsg);
			Sentry.captureMessage(missingMainPlanErrorMsg);
		}
		const maybeFulfilmentDateCalculatorProductFilenamePart =
			specificProductType.fulfilmentDateCalculator?.productFilenamePart;
		const maybeExplicitSingleDayOfWeek =
			specificProductType.fulfilmentDateCalculator
				?.explicitSingleDayOfWeek;
		const maybeDaysOfWeek = maybeExplicitSingleDayOfWeek
			? [maybeExplicitSingleDayOfWeek]
			: mainPlan.daysOfWeek;
		const maybeDeliveryAddressChangeEffectiveDate =
			maybeFulfilmentDateCalculatorProductFilenamePart &&
			maybeDaysOfWeek &&
			(await getDeliveryAddressChangeEffectiveDateForToday(
				maybeFulfilmentDateCalculatorProductFilenamePart,
				maybeDaysOfWeek,
			));
		if (
			maybeFulfilmentDateCalculatorProductFilenamePart &&
			!(maybeDeliveryAddressChangeEffectiveDate && maybeDaysOfWeek)
		) {
			const errorMessage = `Expected 'deliveryAddressChangeEffectiveDate' to be available for ${specificProductType.friendlyName}, but wasn't.`;
			log.error(errorMessage);
			Sentry.captureMessage(errorMessage);
		}
		return maybeDeliveryAddressChangeEffectiveDate
			? {
					...productDetail,
					subscription: {
						...productDetail.subscription,
						deliveryAddressChangeEffectiveDate:
							maybeDeliveryAddressChangeEffectiveDate,
					},
			  }
			: productDetail;
	};
