import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { ReaderType } from "../../../../../shared/productResponse";
import {
  DeliveryRecords,
  DeliveryRecordsFC
} from "../../../../components/delivery/records/deliveryRecords";

Enzyme.configure({ adapter: new Adapter() });

const routeableStepProps = {
  location: {
    assign: "assign",
    hash: "",
    host: "manage.thegulocal.com",
    hostname: "manage.thegulocal.com",
    href: "https://manage.thegulocal.com/delivery/homedelivery/records",
    key: "1581869831280",
    origin: "https://manage.thegulocal.com",
    pathname: "/delivery/homedelivery/records",
    port: "",
    protocol: "https:",
    reload: "reload",
    replace: "replace",
    search: "",
    state: { key: "1581869831280" },
    toString: "toString",
    ancestorOrigins: {
      contains: () => true,
      item: () => "",
      length: 42,
      [Symbol.iterator]: () => [{ next: () => "" }]
    }
  },
  navigate: () => true,
  path: "/delivery/homedelivery/records",
  productType: {
    allProductsProductTypeFilterString: "HomeDelivery",
    delivery: {
      contactUserOnExistingProblemReport: true,
      numberOfProblemRecordsToShow: 14,
      showAddress: () => true,
      showDeliveryInstructions: true,
      showRecords: true
    },
    friendlyName: "home delivery subscription",
    fulfilmentDateCalculator: {},
    getOphanProductType: {},
    holidayStops: {},
    includeGuardianInTitles: true,
    productPage: "subscriptions",
    shortenedFriendlyName: "home delivery",
    urlPart: "homedelivery"
  },
  url: "/delivery/homedelivery/records"
};

const data = {
    results: [
      // {
      //   id: "a3P3E000000V51hUAC",
      //   deliveryDate: "2019-12-19",
      //   deliveryInstruction: "uasddafsjsdjf",
      //   deliveryAddress: "asdf, asdf, asdf, asdf, N1 9GU",
      //   addressLine1: "asdf",
      //   addressLine2: "asdf",
      //   addressLine3: null,
      //   addressTown: "asdf",
      //   addressCountry: "asdf",
      //   addressPostcode: "N1 9GU",
      //   hasHolidayStop: false,
      //   problemCaseId: "5003E00000FtPF8QAN",
      //   isChangedAddress: true,
      //   isChangedDeliveryInstruction: true,
      //   credit: { amount: -2.04, invoiceDate: null, isActioned: true }
      // },
      {
        id: "a3P3E000000V7HoUAK",
        deliveryDate: "2019-11-20",
        deliveryInstruction: "Leave with reception",
        deliveryAddress:
          "Kings place, 90 York way, Kings Cross, London, United Kingdom, N1 9GU",
        addressLine1: "Kings place, 90 York way",
        addressLine2: "Kings Cross",
        addressTown: "London",
        addressCountry: "United Kingdom",
        addressPostcode: "N1 9GU",
        hasHolidayStop: false,
        isChangedAddress: false,
        isChangedDeliveryInstruction: false,
      }
    ],
    deliveryProblemMap: {
      "5003E00000FtPF8QAN": {
        id: "5003E00000FtPF8QAN",
        subject: "subject foo",
        description: "description foo",
        problemType: "No Delivery"
      }
    },
    contactPhoneNumbers: {
      id: "0033E00001BSPTaQAP",
    },
    subscription: {
        subscriptionId: "123",
        end: "12/02/2050",
        renewalDate: "12/02/2050",
        cancelledAt: false,
        nextPaymentDate: null,
        nextPaymentPrice: null,
        safeToUpdatePaymentMethod: false,
        autoRenew: false,
        currentPlans: [{
            name: "Guardian Weekly",
            shouldBeVisible: true
        }],
        futurePlans: [{
            name: "Guardian Weekly",
            shouldBeVisible: true
        }],
        trialLength: 1000,
        readerType: "Direct" as ReaderType,
    },
    problemTypes: ["1", "2", "3"]
  };

describe("DeliveryRecords", () => {
  it("renders the correct number of records", () => {
    const wrapper = mount(<DeliveryRecordsFC data={data} routeableStepProps={routeableStepProps} subscriptionId={"123"} subscriptionCurrency={"£"} isTestUser={true} />);
  });
});
