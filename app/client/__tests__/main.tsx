import React from "react";
import serializer from "jest-emotion";
import renderer from "react-test-renderer";
import { Main } from "../components/main";

expect.addSnapshotSerializer(serializer);

describe("Main", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2022-01-01"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders something", () => {
    const rendered = renderer.create(
      <Main>
        <p>hi</p>
      </Main>
    );

    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
