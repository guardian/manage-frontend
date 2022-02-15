import React from "react";
import { render } from "@testing-library/react";
import CurrentPaymentDetails from "../../../components/payment/update/CurrentPaymentDetail";
import {
  guardianWeeklyCard,
  guardianWeeklyExpiredCard,
  digitalDD,
  newspaperVoucherPaypal,
} from "../../../fixtures/productDetail";

describe("currentPaymentDetails.tsx", () => {
  it("Shows product name", () => {
    const { getByText } = render(
      <CurrentPaymentDetails {...guardianWeeklyCard} />
    );

    getByText("Guardian Weekly");
  });

  describe("For Card", () => {
    test("Shows last 4 digits on card and expiry date", () => {
      const { getByText } = render(
        <CurrentPaymentDetails {...guardianWeeklyCard} />
      );

      getByText("ending 4242");
      getByText("4 / 2024");
    });

    test("Shows expired when expiry date is in the past", () => {
      const { getByText } = render(
        <CurrentPaymentDetails {...guardianWeeklyExpiredCard} />
      );

      getByText("Expired");
    });
  });

  describe("For Direct Debit", () => {
    test("shows account number and sort code", () => {
      const { getByText } = render(<CurrentPaymentDetails {...digitalDD} />);

      getByText("ending 911");
      getByText("20-00-00");
    });
  });

  describe("For Paypal", () => {
    test("shows masked email", () => {
      const { getByText } = render(
        <CurrentPaymentDetails {...newspaperVoucherPaypal} />
      );

      getByText("t*******r@example.com");
    });
  });
});
