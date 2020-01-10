import { mount } from "enzyme";
import React from "react";
import { RecordAddress } from "../../../../components/delivery/records/deliveryRecordsAddress";

describe("RecordAddress", () => {
  it("renders postcode and read more button", () => {
    const wrapper = mount(
      <RecordAddress
        addressLine1={"Kings place, 90 York way"}
        addressLine2={"Kings cross"}
        town={"London"}
        postcode={"N1 9GU"}
        country={"United Kingdom"}
      />
    );
    expect(wrapper.find("span")[0].text()).toEqual("N1 9GU");
    expect(wrapper.find("span")[1].text()).toEqual("Read more");
  });
  it("shows the full address when the read more button is clicked", () => {
    const wrapper = mount(
      <RecordAddress
        addressLine1={"Kings place, 90 York way"}
        addressLine2={"Kings cross"}
        town={"London"}
        postcode={"N1 9GU"}
        country={"United Kingdom"}
      />
    );
    wrapper.find("span")[1].simulate("click");
    // expect(wrapper.find())
    expect(1 + 2).toEqual(3);
  });
});
