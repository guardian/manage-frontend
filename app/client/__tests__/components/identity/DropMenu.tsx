import serializer from "jest-emotion";
import React from "react";
import { act, create } from "react-test-renderer";
import { DropMenu } from "../../../components/identity/DropMenu";

expect.addSnapshotSerializer(serializer);

describe("DropMenu", () => {
  it("initalises in the unopened state and displays the title", () => {
    const rendered = create(
      <DropMenu color={"red"} title="test component">
        <h1>SHOULD NOT BE VISIBLE</h1>
      </DropMenu>
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });
  it.skip("@TODO: Make testing-library test: open on click", () => {
    const rendered = create(
      <DropMenu color={"red"} title="test component">
        <h1>SHOULD BE VISIBLE</h1>
      </DropMenu>
    );
    act(() => rendered.root.findByType("div").props.onClick());
    expect(rendered.toJSON()).toMatchSnapshot();
  });
  it.skip("@TODO: Make testing-library test: should close on click if already open", () => {
    const rendered = create(
      <DropMenu color={"red"} title="test component">
        <h1>SHOULD NOT BE VISIBLE</h1>
      </DropMenu>
    );
    act(() => {
      rendered.root.findByType("div").props.onClick();
      rendered.root.findByType("div").props.onClick();
    });
    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
