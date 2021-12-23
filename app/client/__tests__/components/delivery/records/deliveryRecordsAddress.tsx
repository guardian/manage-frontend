import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { RecordAddress } from "../../../../components/delivery/records/deliveryRecordsAddress";

Enzyme.configure({ adapter: new Adapter() });

describe("RecordsAddress", () => {
  it("postcode and read more button", () => {
    const wrapper = mount(
      <RecordAddress
        addressLine1={"Kings place, 90 York way"}
        addressLine2={"Kings cross"}
        town={"London"}
        postcode={"N1 9GU"}
        country={"United Kingdom"}
      />
    );
    expect(wrapper.find("span").at(0).text()).toEqual("N1 9GU");

    expect(wrapper.find("span").at(1).text()).toEqual("Show more");

    expect(wrapper.find("ul")).toHaveLength(0);
  });

  it("clicking on the read more button displays the whole address", () => {
    const wrapper = mount(
      <RecordAddress
        addressLine1={"Kings place, 90 York way"}
        addressLine2={"Kings cross"}
        town={"London"}
        postcode={"N1 9GU"}
        country={"United Kingdom"}
      />
    );
    wrapper.find("span").at(1).simulate("click");
    expect(wrapper.find("ul")).toHaveLength(1);
  });

  it("clicking on the read more button twice hides the whole address", () => {
    const wrapper = mount(
      <RecordAddress
        addressLine1={"Kings place, 90 York way"}
        addressLine2={"Kings cross"}
        town={"London"}
        postcode={"N1 9GU"}
        country={"United Kingdom"}
      />
    );
    const readmoreBtn = wrapper.find("span").at(1);
    readmoreBtn.simulate("click");
    readmoreBtn.simulate("click");
    expect(wrapper.find("ul")).toHaveLength(0);
  });
});
