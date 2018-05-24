import "dom-testing-library/extend-expect";
import React from "react";

import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";

expect.addSnapshotSerializer(createSerializer(emotion));

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
