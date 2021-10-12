import React, {Suspense} from "react";
import { render } from "@testing-library/react";
import { BillingRenderer } from "../../../components/billing/billing";
import "@testing-library/jest-dom/extend-expect";
import {GenericErrorScreen} from "../../../components/genericErrorScreen";
import SpinLoader from "../../../components/SpinLoader";
import {ErrorBoundary} from "react-error-boundary";
import {ClientContextProvider} from 'react-fetching-library';

/*
const mockedPromise = jest.fn(() => Promise.reject({}));

describe("billingRenderer", () => {
  test("error message renders when promise throws error", () => {
    const { getByText } = render(
      <BillingRenderer promiseToFetch={mockedPromise} />
    );

    expect(getByText("Oops")).toBeTruthy();
  });
});
 */

describe("Billing Route", () => {
  test("error message renders when fetching error occurs", () => {
    const mockedFetchClient = {
      query: async () => ({
        error: Error(),
        status: 401,
        payload: {},
      }),
    };

    const { getByText } = render(
        // @ts-ignore
        <ClientContextProvider client={mockedFetchClient}>
          <ErrorBoundary FallbackComponent={() => <GenericErrorScreen loggingMessage={false} />}>
            <Suspense fallback={<SpinLoader loadingMessage="Loading your billing details..." />}>
              <BillingRenderer />
            </Suspense>
          </ErrorBoundary>
        </ClientContextProvider>
    );

    expect(getByText("Oops")).toBeTruthy();
  });
});
