import React from "react";
import { render } from "@testing-library/react";
import {
  PaymentMethod,
  SelectPaymentMethod
} from "../../../components/payment/update/updatePaymentFlow";

describe("updatePaymentFlow.tsx", () => {
  it("Shows only card when sub/crontrib is already using card", () => {
    const { getByText, queryByText } = render(
      <SelectPaymentMethod
        value={PaymentMethod.card}
        currentPaymentMethod="Card"
        updatePaymentMethod={() => null}
      />
    );

    getByText("Card");
    expect(queryByText("Direct Debit")).toBeNull();
  });

  it("Shows both card and direct debit when sub/crontrib is using direct debit", () => {
    const { getByText } = render(
      <SelectPaymentMethod
        value={PaymentMethod.dd}
        currentPaymentMethod="DirectDebit"
        updatePaymentMethod={() => null}
      />
    );

    getByText("Card");
    getByText("Direct Debit");
  });

  it("Shows only card when sub/crontrib is using Paypal", () => {
    const { getByText, queryByText } = render(
      <SelectPaymentMethod
        value={PaymentMethod.payPal}
        currentPaymentMethod="PayPal"
        updatePaymentMethod={() => null}
      />
    );

    getByText("Card");
    expect(queryByText("Direct Debit")).toBeNull();
  });
});
