import { cleanup, fireEvent, render } from "@testing-library/react";
import React from "react";
import { create } from "react-test-renderer";
import { MarketingToggle } from "../../../components/identity/MarketingToggle";

afterEach(cleanup);

describe("MarketingToggle component", () => {
  const input = {
    id: "13",
    description: "Test description",
    title: "Test title",
    clickHandler: jest.fn()
  };
  it("renders correctly and displays marketing information", () => {
    const rendered = create(
      <MarketingToggle
        id={input.id}
        description={input.description}
        title={input.title}
        onClick={input.clickHandler}
      />
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it("will select the checkbox when the selected prop is passed", () => {
    const rendered = create(
      <MarketingToggle
        id={input.id}
        description={input.description}
        title={input.title}
        selected={true}
        onClick={input.clickHandler}
      />
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it("will call the click handler when it is clicked", () => {
    const { getByText } = render(
      <MarketingToggle
        id={input.id}
        description={input.description}
        title={input.title}
        onClick={input.clickHandler}
      />
    );
    fireEvent.click(getByText(input.title));
    expect(input.clickHandler).toHaveBeenCalledTimes(1);
    expect(input.clickHandler).toHaveBeenLastCalledWith(input.id);
  });
});
