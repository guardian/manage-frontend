import { mount } from "enzyme";
import React from "react";
import { RecordStatus } from "../../../../components/delivery/records/deliveryRecordStatus";

describe("RecordStatus", () => {
  it("renders dispatched status", () => {
    const wrapper = mount(
      <RecordStatus
        isDispatched={true}
        isHolidayStop={false}
        isChangedAddress={false}
        deliveryProblem={null}
      />
    );
    expect(wrapper.find("span").text()).toEqual("Dispatched yo");
  });
  it("renders holiday stop status", () => {
    const wrapper = mount(
      <RecordStatus
        isDispatched={false}
        isHolidayStop={true}
        isChangedAddress={false}
        deliveryProblem={null}
      />
    );
    expect(wrapper.find("span").text()).toEqual("Holiday Stop");
  });

  it("renders delivery problem status", () => {
    const wrapper = mount(
      <RecordStatus
        isDispatched={false}
        isHolidayStop={false}
        isChangedAddress={false}
        deliveryProblem={"uh oh!"}
      />
    );
    expect(wrapper.find("span").text()).toEqual("Delivery problem");
  });
});
