import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import {
  hasDeliveryRecordsFlow,
  ProductTypes
} from "../../../../../shared/productTypes";
import { DeliveryRecords } from "../../../../components/delivery/records/deliveryRecords";

Enzyme.configure({ adapter: new Adapter() });
declare global {
  namespace NodeJS {
    interface Global {
      document: Document;
      window: Window;
      navigator: Navigator;
      fetch: () => void;
    }
  }
}

describe("DeliveryRecords", () => {
  /* tslint:disable:no-object-mutation */
  beforeEach(
    () =>
      (global.fetch = jest.fn().mockImplementation(() => {
        const p = new Promise((resolve, reject) => {
          resolve({
            results: [
              {
                id: "a0A0A000000A000AAA",
                deliveryDate: "2019-12-13",
                deliveryInstruction: "Description",
                deliveryAddress: "Made up address, Line 2, London, UK, N1 1AA",
                addressLine1: "Made up address",
                addressLine2: "Line 2",
                addressLine3: null,
                addressTown: "London",
                addressCountry: "UK",
                addressPostcode: "N1 1AA",
                hasHolidayStop: false,
                problemCaseId: "0000A00000AaAAAAA0",
                isChangedAddress: false,
                isChangedDeliveryInstruction: false,
                credit: {
                  amount: -2.89,
                  invoiceDate: "2020-03-06",
                  isActioned: true
                }
              }
            ],
            deliveryProblemMap: {
              "0000A00000AaAAAAA0": {
                id: "0000A00000AaAAAAA0",
                ref: "00000000",
                subject:
                  "[Self Service] Delivery Problem : Damaged Paper (Guardian Weekly - A-S00052650)",
                description: "Hi there",
                problemType: "Damaged Paper"
              }
            },
            contactPhoneNumbers: {
              Id: "000000000000000AAA",
              Phone: null,
              HomePhone: null,
              MobilePhone: null,
              OtherPhone: null
            }
          });
        });

        return p;
      }))
  );

  it("renders without crashing", () => {
    if (hasDeliveryRecordsFlow(ProductTypes.guardianweekly)) {
      const wrapper = mount(
        <DeliveryRecords
          path="fakepath"
          productType={ProductTypes.guardianweekly}
        />
      );
      expect(
        wrapper
          .find("h1")
          .at(0)
          .text()
      ).toEqual("Delivery history");
    } else {
      throw new Error("Guardian weekly missing DeliveryRecordsProperties");
    }
  });
});
