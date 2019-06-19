import React from "react";
import renderer from "react-test-renderer";
import { EmailAndMarketing } from "../../../components/identity/EmailAndMarketing";

describe("Email and marketing tab", () => {
  // @TODO: DEVELOPMENT: Disabled until most of the functionality done. May also need shallow render.
  test.skip("The page renders correctly", () => {
    const rendered = renderer.create(<EmailAndMarketing />);
    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
