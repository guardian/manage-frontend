import Raven from "raven-js";
import { ProductDetail } from "../shared/productResponse";
import { ProductTypes } from "../shared/productTypes";
import { s3FilePromise } from "./awsIntegration";
import { conf } from "./config";
import { log } from "./log";

interface RawFulfilmentDateCalculatorDates {
  today: string;
  acquisitionsStartDate: string;
  deliveryAddressChangeEffectiveDate: string;
  holidayStopFirstAvailableDate: string;
  finalFulfilmentFileGenerationDate: string;
  nextAffectablePublicationDateOnFrontCover: string;
}

const getFulfilmentRelatedDatesPromise = (filenameProductPart: string) =>
  s3FilePromise<RawFulfilmentDateCalculatorDates>(
    `fulfilment-date-calculator-${conf.STAGE.toLowerCase()}`,
    `${filenameProductPart}/${new Date()
      .toISOString()
      .substr(0, 10)}_${filenameProductPart}.json`,
    "deliveryAddressChangeEffectiveDate"
  );

const getDeliveryAddressChangeEffectiveDateForToday = async (
  filenameProductPart: string
) =>
  (await getFulfilmentRelatedDatesPromise(filenameProductPart))
    ?.deliveryAddressChangeEffectiveDate;

export const augmentProductDetailWithDeliveryAddressChangeEffectiveDateForToday = async (
  productDetail: ProductDetail
) => {
  const maybeProductType = ProductTypes.contentSubscriptions.mapGroupedToSpecific?.(
    productDetail
  );
  const maybeFulfilmentDateCalculatorProductFilenamePart =
    maybeProductType?.fulfilmentDateCalculatorProductFilenamePart;
  const maybeDeliveryAddressChangeEffectiveDate =
    maybeFulfilmentDateCalculatorProductFilenamePart &&
    (await getDeliveryAddressChangeEffectiveDateForToday(
      maybeFulfilmentDateCalculatorProductFilenamePart
    ));
  if (
    maybeFulfilmentDateCalculatorProductFilenamePart &&
    !maybeDeliveryAddressChangeEffectiveDate
  ) {
    const errorMessage = `Expected 'deliveryAddressChangeEffectiveDate' to be available for ${maybeProductType}, but wasn't.`;
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
