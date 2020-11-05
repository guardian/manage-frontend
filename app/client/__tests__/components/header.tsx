import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import Header from "../../components/header";

Enzyme.configure({ adapter: new Adapter() });

describe.only("Header", () => {
  it("renders the header in a signed out state", () => {
    const wrapper = mount(<Header />);
    expect(wrapper.find("Link").text()).toEqual("Sign in");
  });

  it("renders the header in a signed in state", () => {
    Object.defineProperty(global, "guardian", {
      value: {
        identityDetails: {
          userId: "123"
        }
      }
    });
    const wrapper = mount(<Header />);

    expect(wrapper.find("Link").text()).toEqual("My account");
  });
});
