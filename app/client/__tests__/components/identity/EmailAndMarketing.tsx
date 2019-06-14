import React from "react";
import renderer from "react-test-renderer";
import { EmailAndMarketing } from "../../../components/identity/EmailAndMarketing";

describe("Email and marketing tab", () => {
  test("The page renders correctly", () => {
    const rendered = renderer.create(<EmailAndMarketing />);
    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
