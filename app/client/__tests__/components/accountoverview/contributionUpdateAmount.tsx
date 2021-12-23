// @ts-nocheck
import { debug, fireEvent, render, screen } from "@testing-library/react";
import each from "jest-each";
import { before } from "lodash";
import { ContributionUpdateAmount } from "../../../components/accountoverview/contributionUpdateAmount";

const mainPlan = (interval) => ({
  start: "2019-10-30",
  end: "2050-10-30",
  amount: 500,
  name: "",
  shouldBeVisible: false,
  currency: "£",
  currencyISO: "GBP",
  interval,
});

const productType = {
  productTitle: () => "contribution test",
  friendlyName: "recurring contribution",
  urlPart: "contributions",
};

each`
  interval    | expectedMinAmount
  ${"month"}  | ${2}
  ${"year"}   | ${10}
`.test(
  "renders validation error if $interval.interval amount below $expectedMinAmount",
  (params, done) => {
    const { container } = render(
      <ContributionUpdateAmount
        subscriptionId="A-123"
        mainPlan={mainPlan(params.interval)}
        amountUpdateStateChange={jest.fn()}
        nextPaymentDate="2050-10-29"
        productType={productType}
      />
    );

    fireEvent.click(screen.queryByText("Change amount"));

    fireEvent.click(screen.getByLabelText("Other"));

    const otherInputElem = container.querySelector('input[type="number"]');
    fireEvent.change(otherInputElem, {
      target: { value: params.expectedMinAmount - 1 },
    });

    // click on the change amount button again and then check to make sure that the validation error message shows up
    fireEvent.click(screen.queryByText("Change amount"));

    // assert that the minimum amount validation error message is shown
    expect(
      screen.queryByText(
        `There is a minimum ${
          params.interval
        }ly contribution amount of £${params.expectedMinAmount.toFixed(2)} GBP`
      )
    ).toBeTruthy();

    done();
  }
);

each`
  interval    | expectedMaxAmount
  ${"month"}  | ${166}
  ${"year"}   | ${2000}
`.test(
  "renders validation error if $interval.interval amount above $expectedMaxAmount",
  (params, done) => {
    const { container } = render(
      <ContributionUpdateAmount
        subscriptionId="A-123"
        mainPlan={mainPlan(params.interval)}
        amountUpdateStateChange={jest.fn()}
        nextPaymentDate="2050-10-29"
        productType={productType}
      />
    );

    fireEvent.click(screen.queryByText("Change amount"));

    fireEvent.click(screen.getByLabelText("Other"));

    const otherInputElem = container.querySelector('input[type="number"]');
    fireEvent.change(otherInputElem, {
      target: { value: params.expectedMaxAmount + 1 },
    });

    // click on the change amount button again and then check to make sure that the validation error message shows up
    fireEvent.click(screen.queryByText("Change amount"));

    // assert that the maximum amount validation error message is shown
    expect(
      screen.queryByText(
        `There is a maximum ${
          params.interval
        }ly contribution amount of £${params.expectedMaxAmount.toFixed(2)} GBP`
      )
    ).toBeTruthy();

    done();
  }
);

test("renders validation error if blank input is provided", (done) => {
  const { container } = render(
    <ContributionUpdateAmount
      subscriptionId="A-123"
      mainPlan={mainPlan("month")}
      amountUpdateStateChange={jest.fn()}
      nextPaymentDate="2050-10-29"
      productType={productType}
    />
  );

  fireEvent.click(screen.queryByText("Change amount"));

  fireEvent.click(screen.getByLabelText("Other"));

  const otherInputElem = container.querySelector('input[type="number"]');
  fireEvent.change(otherInputElem, {
    target: { value: "" },
  });

  // click on the change amount button again and then check to make sure that the validation error message shows up
  fireEvent.click(screen.queryByText("Change amount"));

  // assert that the maximum amount validation error message is shown
  expect(
    screen.queryByText(
      "There is a problem with the amount you have selected, please make sure it is a valid amount"
    )
  ).toBeTruthy();

  done();
});

test("renders validation error if a string is attempted to be input", (done) => {
  const { container } = render(
    <ContributionUpdateAmount
      subscriptionId="A-123"
      mainPlan={mainPlan("month")}
      amountUpdateStateChange={jest.fn()}
      nextPaymentDate="2050-10-29"
      productType={productType}
    />
  );

  fireEvent.click(screen.queryByText("Change amount"));

  fireEvent.click(screen.getByLabelText("Other"));

  const otherInputElem = container.querySelector('input[type="number"]');
  fireEvent.change(otherInputElem, {
    target: { value: "twelfty" },
  });

  // click on the change amount button again and then check to make sure that the validation error message shows up
  fireEvent.click(screen.queryByText("Change amount"));

  // assert that the maximum amount validation error message is shown
  expect(
    screen.queryByText(
      "There is a problem with the amount you have selected, please make sure it is a valid amount"
    )
  ).toBeTruthy();

  done();
});

test("input correct value", (done) => {
  // mock the console error for this test case to mute "Cannot update a component (`Unknown`) while rendering a different component" error
  const mockedError = () => true;
  // tslint:disable-next-line
  console.error = mockedError; // tslint:disable-line:no-console

  const { container } = render(
    <ContributionUpdateAmount
      subscriptionId="A-123"
      mainPlan={mainPlan("month")}
      amountUpdateStateChange={jest.fn()}
      nextPaymentDate="2050-10-29"
      productType={productType}
    />
  );

  fireEvent.click(screen.queryByText("Change amount"));

  fireEvent.click(screen.getByLabelText("Other"));

  const otherInputElem = container.querySelector('input[type="number"]');
  fireEvent.change(otherInputElem, {
    target: { value: 4 },
  });

  // click on the change amount button again and then check to make sure that the validation error message shows up
  fireEvent.click(screen.queryByText("Change amount"));
  expect(screen.queryByText("Updating...")).toBeTruthy();

  done();
});

// screen.debug();
