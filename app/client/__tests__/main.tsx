import "dom-testing-library/extend-expect";
import React from "react";

import serializer from "jest-emotion";

expect.addSnapshotSerializer(serializer);

import renderer from "react-test-renderer";

import { Main } from "../components/main";

test("Main renders something", () => {
  const rendered = renderer.create(
    <Main>
      <p>hi</p>
    </Main>
  );

  expect(rendered.toJSON()).toMatchSnapshot();
});
