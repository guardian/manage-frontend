import {
  cleanup,
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { createSerializer } from "@emotion/jest";
import { create } from "react-test-renderer";
import { DropMenu } from "../../../components/identity/DropMenu";

expect.addSnapshotSerializer(createSerializer());

const ELEMENT_TEXT = {
  TITLE: "TEST DROPMENU",
  CONTENT: "TEST_CONTENT",
};
const element = (
  <DropMenu color="blue" title={ELEMENT_TEXT.TITLE}>
    <p>{ELEMENT_TEXT.CONTENT}</p>
  </DropMenu>
);

afterEach(cleanup);

describe("DropMenu", () => {
  it("initalises in the unopened state and displays the title", () => {
    const { container } = render(element);
    expect(container).toMatchSnapshot();
  });
  it("if closed, opens and shows children on click", async () => {
    const { container, getByText } = render(element);
    fireEvent.click(getByText(ELEMENT_TEXT.TITLE));
    await waitFor(() => getByText(ELEMENT_TEXT.CONTENT));
    expect(container).toMatchSnapshot();
  });
  it("if open, closes and hides children on click", async () => {
    const { container, getByText } = render(element);
    fireEvent.click(getByText(ELEMENT_TEXT.TITLE));
    await waitFor(() => getByText(ELEMENT_TEXT.CONTENT));
    const promise = waitForElementToBeRemoved(() =>
      getByText(ELEMENT_TEXT.CONTENT)
    ).then(() => {
      expect(container).toMatchSnapshot();
    });
    fireEvent.click(getByText(ELEMENT_TEXT.TITLE));
    return promise;
  });
  it("displays the text in the supplied color", () => {
    const container = create(
      <DropMenu color="green" title={ELEMENT_TEXT.TITLE}>
        {ELEMENT_TEXT.CONTENT}
      </DropMenu>
    );
    expect(container).toMatchSnapshot();
  });
});
