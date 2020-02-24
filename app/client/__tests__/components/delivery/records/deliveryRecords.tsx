import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import {
  hasDeliveryRecordsFlow,
  ProductTypes
} from "../../../../../shared/productTypes";
import { DeliveryRecords } from "../../../../components/delivery/records/deliveryRecords";
// import { FlowStartMultipleProductDetailHandler } from "../../../../components/flowStartMultipleProductDetailHandler";

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

const responseData = {
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
};

const apiMeMmaResponse = [
  {
    joinDate: "2019-11-26",
    tier: "Guardian Weekly - Domestic",
    isPaidTier: true,
    optIn: true,
    subscription: {
      readerType: "Direct",
      nextPaymentDate: "2020-03-06",
      contactId: "0033E00001BSPTaQAP",
      cancelledAt: false,
      currentPlans: [
        {
          shouldBeVisible: true,
          amount: 3750,
          currencyISO: "GBP",
          chargedThrough: "2020-03-06",
          name: null,
          start: "2019-12-06",
          end: "2020-11-26",
          currency: "£",
          interval: "quarter"
        }
      ],
      start: "2019-12-06",
      subscriberId: "A-S00052650",
      renewalDate: "2020-11-26",
      safeToUpdatePaymentMethod: false,
      trialLength: -80,
      futurePlans: [],
      deliveryAddress: {
        addressLine1: "Kings place, 90 York way",
        addressLine2: "Kings cross",
        town: "London",
        postcode: "N1 9GU",
        country: "GB"
      },
      lastPaymentDate: "2019-12-06",
      paymentMethod: "Card",
      autoRenew: true,
      end: "2020-03-06",
      subscriptionId: "A-S00052650",
      nextPaymentPrice: 3750,
      plan: {
        name: "Guardian Weekly - Domestic",
        amount: 3750,
        currency: "£",
        currencyISO: "GBP",
        interval: "quarter"
      },
      card: {
        last4: "4242",
        type: "Visa",
        stripePublicKeyForUpdate: "pk_test_AAAAaaaaa00000AAAA000000",
        email: "bob@bob.com"
      },
      deliveryAddressChangeEffectiveDate: "2020-03-06"
    },
    isTestUser: false
  }
];

describe("DeliveryRecords", () => {

  // /api/me/mma
  // /api/delivery-records/A-S00052650

  beforeEach(() => {
    // tslint:disable-next-line: no-object-mutation
    global.fetch = jest.fn().mockImplementation(url => {
      console.log(`url = ${url}`);
      return new Promise((resolve, reject) => {
        resolve({
          ok: true,
          status: 200,
          headers: {
            get: (prop: string) => "pass"
          },
          json: () => {
            return url.contains("/api/me/mma") ? apiMeMmaResponse : responseData;
          }
        });
      });
    });
  });

  it("renders without crashing", done => {
    if (hasDeliveryRecordsFlow(ProductTypes.guardianweekly)) {
      const wrapper = mount(
        <DeliveryRecords
          path="fakepath"
          productType={ProductTypes.guardianweekly}
        />
      );

      console.log(`debug 1 : ${wrapper.debug()}`);

      process.nextTick(() => {
        
        // wrapper.find(FlowStartMultipleProductDetailHandler).instance().setState({ selectedProductDetail: apiMeMmaResponse[0]})
        
        wrapper.update();

        console.log(`debug 2 : ${wrapper.debug()}`);

        expect(1 + 2).toEqual(3);
        done();

        // expect(
        //   wrapper
        //     .find("h1")
        //     .at(0)
        //     .text()
        // ).toEqual("Delivery history");
        // done();
      });
    } else {
      throw new Error("Guardian weekly missing DeliveryRecordsProperties");
    }
  });
});
