import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { OptOutSection } from "../../../components/identity/EmailAndMarketing/OptOutSection";
import {
  ConsentOption,
  ConsentOptionType,
} from "../../../components/identity/models";

afterEach(cleanup);

const mockClickHandler = jest.fn();

describe("OptOutSection component", () => {
  it("correctly displays toggle switch values for OPT OUT consent types", () => {
    render(
      <OptOutSection
        consents={idapiConsentsFixture}
        clickHandler={mockClickHandler}
      />
    );

    expect(screen.getByLabelText("Allow post")).toHaveAttribute(
      "aria-checked",
      "true"
    );
    expect(screen.getByLabelText("Allow phone")).toHaveAttribute(
      "aria-checked",
      "false"
    );
  });
});

const idapiConsentsFixture: ConsentOption[] = [
  {
    id: "post_optout",
    name: "Allow post",
    isProduct: false,
    isChannel: false,
    type: ConsentOptionType.OPT_OUT,
    subscribed: false,
  },
  {
    id: "phone_optout",
    name: "Allow phone",
    isProduct: false,
    isChannel: false,
    type: ConsentOptionType.OPT_OUT,
    subscribed: true,
  },
];
