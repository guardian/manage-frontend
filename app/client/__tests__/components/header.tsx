import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Header from "../../components/header";

Enzyme.configure({ adapter: new Adapter() });

describe.only("Header", () => {
  it("renders the header in a signed out state", () => {
    const wrapper = mount(<Header />);
    expect(wrapper.find("a").at(0).text()).toEqual("Sign in");
  });

  it("renders the header in a signed in state", () => {
    Object.defineProperty(global, "guardian", {
      value: {
        identityDetails: {
          signInStatus: "signedInRecently",
        },
      },
    });
    const wrapper = mount(<Header />);

    expect(wrapper.find("Link").text()).toEqual("My account");
  });
});
