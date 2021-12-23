import "dom-testing-library/extend-expect";

import { createSerializer } from "@emotion/jest";

expect.addSnapshotSerializer(createSerializer());

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
