import {dateAddDays, dateString} from "../../../../../../shared/dates";
import { checkForExistingDeliveryProblem } from "../../../../../components/delivery/records/deliveryRecords";
import { DeliveryRecordDetail } from "../../../../../components/delivery/records/deliveryRecordsApi";

describe("delivery records unit tests", () => {
  const baseMockDeliveryRecord: DeliveryRecordDetail = {
    id: "123",
    deliveryAddress: "address",
    addressLine1: "addressLine1",
    addressTown: "addressTown",
    addressCountry: "addressCountry",
    addressPostcode: "addressPostcode",
    hasHolidayStop: false,
    deliveryDate: dateString(new Date(), "d MMM yyyy")
  };

  test("checkForExistingDeliveryProblem returns true if ", () => {
    const deliverRecords = [
      {
        ...baseMockDeliveryRecord,
        deliveryDate: dateString(dateAddDays(new Date(), -7), "d MMM yyyy"),
        problemCaseId: "123"
      }
    ];
    expect(checkForExistingDeliveryProblem(deliverRecords)).toEqual(true);
  });
});
