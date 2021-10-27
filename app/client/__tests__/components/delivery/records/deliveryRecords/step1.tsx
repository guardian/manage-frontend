import { Button } from "@guardian/src-button";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { PRODUCT_TYPES } from "../../../../../../shared/productTypes";
import DeliveryRecords, {
  DeliveryRecordsFC
} from "../../../../../components/delivery/records/deliveryRecords";
import { DeliveryRecordProblemForm } from "../../../../../components/delivery/records/deliveryRecordsProblemForm";
import { hasDeliveryRecordsFlow } from "../../../../../productUtils";
import { act, fireEvent, render } from "@testing-library/react";
import fetchMock from "fetch-mock";

Enzyme.configure({ adapter: new Adapter() });

/* *************************************************
    NOTE: there are 2 process.nextTick calls 
    throughout the tests here to handle the updates 
    to the component after the 2 fetch calls :
    /api/me/mma and
    /api/delivery-records/{subscriptionId}
   ************************************************** */

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

const deliveryRecordsResponse = {
  results: [
    {
      id: "a0A0A000000A000AAA",
      deliveryDate: "2019-12-18",
      deliveryInstruction: "Description",
      deliveryAddress: "Made up address, Line 2, London, UK, N1 1AA",
      addressLine1: "Made up address",
      addressLine2: "Line 2",
      addressLine3: null,
      addressTown: "London",
      addressCountry: "UK",
      addressPostcode: "N1 1AA",
      hasHolidayStop: false,
      isChangedAddress: false,
      isChangedDeliveryInstruction: false,
      credit: {
        amount: -2.89,
        invoiceDate: "2020-03-06",
        isActioned: true
      }
    },
    {
      id: "b0A0A000000A000AAA",
      deliveryDate: "2019-12-15",
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
        "[Self Service] Delivery Problem : Damaged Paper (Guardian Weekly - A-S0000000000)",
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
      cancelledAt: false,
      currentPlans: [
        {
          shouldBeVisible: true,
          name: null,
          currency: "£"
        }
      ],
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
      autoRenew: true,
      end: "2020-03-06",
      subscriptionId: "A-S0000000000",
      nextPaymentPrice: 3750
    },
    isTestUser: false
  }
];

const guardianWeeklyProblemArr = ["Damaged paper", "No delivery", "Other"];

const promisifyNextNTicks = (n: number) =>
  new Promise(resolve => nextNTicks(n, resolve));

const nextNTicks = (n: number, callback: () => void) => {
  process.nextTick(() => {
    if (n < 1) {
      callback();
    } else {
      nextNTicks(n - 1, callback);
    }
  });
};

describe("DeliveryRecords", () => {
  fetchMock
    .get(/api\/delivery-records/, deliveryRecordsResponse)
    .get(/api\/me\/mma/, apiMeMmaResponse);

  it("renders without crashing", async done => {
    if (hasDeliveryRecordsFlow(PRODUCT_TYPES.guardianweekly)) {
      jest.useFakeTimers();

      render(
        <DeliveryRecords
          path="fakepath"
          productType={PRODUCT_TYPES.guardianweekly}
        />
      );

      await promisifyNextNTicks(2);
      act(() => {
        jest.runAllTimers();
      });

      expect(document.querySelectorAll("h1")[0].textContent).toEqual(
        "Delivery history"
      );
      done();
    } else {
      throw new Error("Guardian weekly missing DeliveryRecordsProperties");
    }
  });

  it("renders in 'read only' mode initially", async done => {
    if (hasDeliveryRecordsFlow(PRODUCT_TYPES.guardianweekly)) {
      jest.useFakeTimers();

      const { getByText } = render(
        <DeliveryRecords
          path="fakepath"
          productType={PRODUCT_TYPES.guardianweekly}
        />
      );

      await promisifyNextNTicks(2);
      act(() => {
        jest.runAllTimers();
      });

      getByText("Report a problem");

      expect(document.querySelectorAll(".deliveryRecordCard")).toHaveLength(2);
      done();
    } else {
      throw new Error("Guardian weekly missing DeliveryRecordsProperties");
    }
  });

  it("clicking on 'Report a problem' button shows delivery problem radio list (Guardian weekly sub)", async done => {
    if (hasDeliveryRecordsFlow(PRODUCT_TYPES.guardianweekly)) {
      jest.useFakeTimers();

      const { getByText } = render(
        <DeliveryRecords
          path="fakepath"
          productType={PRODUCT_TYPES.guardianweekly}
        />
      );

      await promisifyNextNTicks(2);
      act(() => {
        jest.runAllTimers();
      });

      fireEvent(
        getByText("Report a problem"),
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true
        })
      );

      expect(
        document
          .querySelectorAll(".deliveryRecordProblemForm")[0]
          .querySelectorAll("li")
      ).toHaveLength(guardianWeeklyProblemArr.length);

      guardianWeeklyProblemArr.map(problemCopy => getByText(problemCopy));

      getByText("Damaged paper");
      getByText("Continue to Step 2 & 3");
      done();
    } else {
      throw new Error("Guardian weekly missing DeliveryRecordsProperties");
    }
  });

  it("clicking on 'Continue to Step 2 & 3' button WITHOUT selecting problem shows validation error", async done => {
    if (hasDeliveryRecordsFlow(PRODUCT_TYPES.guardianweekly)) {
      const wrapper = mount(
        <DeliveryRecords
          path="fakepath"
          productType={PRODUCT_TYPES.guardianweekly}
        />
      );

      await promisifyNextNTicks(2);

      wrapper.update();

      wrapper
        .find(DeliveryRecordsFC)
        .find(Button)
        .at(0)
        .simulate("click");

      const problemForm = wrapper
        .find(DeliveryRecordsFC)
        .find(DeliveryRecordProblemForm);

      const continueToStep2Btn = problemForm.find("button").at(0);
      continueToStep2Btn.simulate("submit");

      expect(
        wrapper
          .find("form")
          .find("span")
          .text()
      ).toEqual("Please select the type of problem");

      done();
    } else {
      throw new Error("Guardian weekly missing DeliveryRecordsProperties");
    }
  });
});
