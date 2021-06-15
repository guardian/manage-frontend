import moment from "moment";
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
    deliveryDate: moment().format("D MMM YYYY")
  };

  test("checkForExistingDeliveryProblem returns true if ", () => {
    const deliverRecords = [
      {
        ...baseMockDeliveryRecord,
        deliveryDate: moment()
          .subtract(7, "d")
          .format("D MMM YYYY"),
        problemCaseId: "123"
      }
    ];
    expect(checkForExistingDeliveryProblem(deliverRecords)).toEqual(true);
  });
});
