import React from "react";
import { render, screen } from "@testing-library/react";
import { BillingRenderer } from "../../../components/billing/billing";
import "@testing-library/jest-dom/extend-expect";

const mockedPromise = jest.fn(() => Promise.reject({}));

describe("billingRenderer", () => {
  test("error message renders when promise throws error", () => {
    const { getByText } = render(
      <BillingRenderer promiseToFetch={mockedPromise} />
    );

    expect(getByText("Oops")).toBeTruthy();
  });
});
