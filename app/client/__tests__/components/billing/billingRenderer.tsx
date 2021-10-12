import React from "react";
import { render } from "@testing-library/react";
import {BillingRenderer, DataFetcher} from "../../../components/billing/billing";
import "@testing-library/jest-dom/extend-expect";
import {ClientContextProvider} from 'react-fetching-library';

function renderBillingRoute(mockedFetchClient: any) {
  return render(
      // @ts-ignore
      <ClientContextProvider client={mockedFetchClient}>
        <DataFetcher loadingMessage="Loading your billing details...">
          <BillingRenderer />
        </DataFetcher>
      </ClientContextProvider>
  );
}

describe("Billing Route", () => {
  test("error message renders when fetching error occurs", () => {
    const mockedFetchClient = {
      query: async () => ({
        error: Error(),
        status: 401,
        payload: {},
      }),
    };

    const { getByText } = renderBillingRoute(mockedFetchClient);

    expect(getByText("Oops")).toBeTruthy();
  });

  test("Loading message appears when fetching", () => {
    const mockedFetchClient = {

    }

    const { getByText } = renderBillingRoute(mockedFetchClient);

    expect(getByText("Loading your billing details...")).toBeTruthy();
  })
});
