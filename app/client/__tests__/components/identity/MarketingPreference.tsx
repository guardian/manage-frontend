import React from "react";
import { create } from "react-test-renderer";
import { MarketingPreference } from "../../../components/identity/MarketingPreference";

describe("MarketingPreference component", () => {
  const input = {
    description: "Test description",
    frequency: "Test frequency",
    title: "Test title"
  };
  it("renders correctly and displays marketing information", () => {
    const rendered = create(
      <MarketingPreference
        description={input.description}
        frequency={input.frequency}
        title={input.title}
      />
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it("will select the checkbox when the selected prop is passed", () => {
    const rendered = create(
      <MarketingPreference
        description={input.description}
        frequency={input.frequency}
        title={input.title}
        selected={true}
      />
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it("will call the click handler when it is clicked", () => {
    const spy = jest.fn();
    const rendered = create(
      <MarketingPreference
        description={input.description}
        frequency={input.frequency}
        title={input.title}
        onClick={spy}
      />
    );
    rendered.root.props.onClick();
    expect(spy.mock.calls.length).toBe(1);
  });
});
