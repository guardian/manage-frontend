import "dom-testing-library/extend-expect";
import React from "react";

import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";

expect.addSnapshotSerializer(createSerializer(emotion));

import { render, Simulate, wait } from "react-testing-library";
// this add custom expect matchers from dom-testing-library
import { Main } from "../components/main";

test("Main renders something", () => {
  const rendered = render(
    <Main>
      <p>hi</p>
    </Main>
  );
  expect(JSON.stringify(rendered)).toMatchSnapshot();
});
