import React from "react";
import { render } from "@testing-library/react";
import CurrentPaymentDetails from "../../../components/payment/update/CurrentPaymentDetails";
import { PaymentMethod, SelectPaymentMethod } from "../../../components/payment/update/updatePaymentFlow";

describe("updatePaymentFlow.tsx", () => {
  it("Shows only card when sub/crontrib is already using card", () => {
    const { getByText } = render(
      <SelectPaymentMethod currentPaymentMethod="CARD" />
    );

    getByText('Card')
    !getByText("Direct Debit");
  });

  it("Shows both card and direct debit when sub/crontrib is using direct debit", () => {
    const { getByText } = render(
      <SelectPaymentMethod currentPaymentMethod="Direct Debit" />
    );

    getByText('Card')
    getByText("Direct Debit");
  });

  describe("For Card", () => {
    test("Shows last 4 digits on card and expiry date", () => {
      const { getByText } = render(
        <CurrentPaymentDetails {...cardProductDetail} />
      );

      getByText("ending 4242");
      getByText("4 / 2024");
    });
  });

  describe("For Direct Debit", () => {
    test("shows account number and sort code", () => {
      const { getByText } = render(
        <CurrentPaymentDetails {...directDebitProductDetail} />
      );

      getByText("ending 911");
      getByText("20-00-00");
    });
  });

  describe("For Paypal", () => {});
});
