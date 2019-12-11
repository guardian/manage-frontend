import Raven from "raven-js";
import { getMainPlan, ProductDetail } from "../shared/productResponse";
import { ProductTypes } from "../shared/productTypes";
import { s3FilePromise } from "./awsIntegration";
import { conf } from "./config";
import { log } from "./log";

interface RawFulfilmentDateCalculatorDates {
  [dayOfWeek: string]: {
    deliveryAddressChangeEffectiveDate?: string;
    // there are a number of other fields, but we don't need them
  };
}

const getDeliveryAddressChangeEffectiveDateForToday = async (
  filenameProductPart: string,
  daysOfWeek: string[]
) => {
  const datesByDayOfWeek = await s3FilePromise<
    RawFulfilmentDateCalculatorDates
  >(
    `fulfilment-date-calculator-${conf.STAGE.toLowerCase()}`,
    `${filenameProductPart}/${new Date()
      .toISOString()
      .substr(0, 10)}_${filenameProductPart}.json`,
    ...daysOfWeek
  );
  return (
    datesByDayOfWeek &&
    daysOfWeek.reduce((earliestAcc, dayOfWeek) => {
      const deliveryAddressChangeEffectiveDateStr =
        datesByDayOfWeek[dayOfWeek].deliveryAddressChangeEffectiveDate;
      if (
        !earliestAcc ||
        !deliveryAddressChangeEffectiveDateStr ||
        new Date(earliestAcc) > new Date(deliveryAddressChangeEffectiveDateStr)
      ) {
        return deliveryAddressChangeEffectiveDateStr || "";
      } else {
        return earliestAcc;
      }
    }, "")
  );
};

export const augmentProductDetailWithDeliveryAddressChangeEffectiveDateForToday = async (
  productDetail: ProductDetail
) => {
  const maybeProductType = ProductTypes.contentSubscriptions.mapGroupedToSpecific?.(
    productDetail
  );
  const maybeFulfilmentDateCalculatorProductFilenamePart =
    maybeProductType?.fulfilmentDateCalculator?.productFilenamePart;
  const maybeExplicitSingleDayOfWeek =
    maybeProductType?.fulfilmentDateCalculator?.explicitSingleDayOfWeek;
  const maybeDaysOfWeek = maybeExplicitSingleDayOfWeek
    ? [maybeExplicitSingleDayOfWeek]
    : getMainPlan(productDetail.subscription).daysOfWeek;
  const maybeDeliveryAddressChangeEffectiveDate =
    maybeFulfilmentDateCalculatorProductFilenamePart &&
    maybeDaysOfWeek &&
    (await getDeliveryAddressChangeEffectiveDateForToday(
      maybeFulfilmentDateCalculatorProductFilenamePart,
      maybeDaysOfWeek
    ));
  if (
    maybeFulfilmentDateCalculatorProductFilenamePart &&
    !(maybeDeliveryAddressChangeEffectiveDate && maybeDaysOfWeek)
  ) {
    const errorMessage = `Expected 'deliveryAddressChangeEffectiveDate' to be available for ${maybeProductType?.friendlyName}, but wasn't.`;
    log.error(errorMessage);
    Raven.captureMessage(errorMessage);
  }
  return maybeDeliveryAddressChangeEffectiveDate
    ? {
        ...productDetail,
        subscription: {
          ...productDetail.subscription,
          deliveryAddressChangeEffectiveDate: maybeDeliveryAddressChangeEffectiveDate
        }
      }
    : productDetail;
};
