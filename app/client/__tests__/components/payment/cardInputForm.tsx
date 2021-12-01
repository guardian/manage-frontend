import React from "react";
// import { render, fireEvent, waitFor } from "@testing-library/react";
import { render, fireEvent } from "@testing-library/react";
import { NewPaymentMethodDetail } from "../../../components/payment/update/newPaymentMethodDetail";
import { CardInputForm } from "../../../components/payment/update/card/cardInputForm";

// unfortunately Stripe Elements is buggy with both RTl and Enzyme and does not render, ive posted a question here on their github: https://github.com/stripe/react-stripe-js/issues/243
// as of now, the tests are commented out
// we can mock stripes setupIntents, createPaymentMethod and confirmCardSetup APIs, but mocking their Elements library is time-consuming and seems pointless if we can just use it as is

const stripePublicKey = "pk_test_Qm3CGRdrV4WfGYCpm0sftR0f";
const userEmail = "myemail@email.com";

const newPaymentMethodDetailUpdater = jest.fn((_: NewPaymentMethodDetail) => 1);
const executePaymentUpdate = jest.fn((_: NewPaymentMethodDetail) =>
  Promise.resolve(null)
);

// const testCardNumber = "4242424242424242";
// const testExpiryDate = "424";
// const testCVC = "424";

function returnCardInputForm() {
  return (
    <CardInputForm
      stripeApiKey={stripePublicKey}
      userEmail={userEmail}
      newPaymentMethodDetailUpdater={newPaymentMethodDetailUpdater}
      executePaymentUpdate={executePaymentUpdate}
    />
  );
}

describe("cardInputForm.tsx and stripeCardInputForm.tsx", () => {
  test("Stripe Elements has not been loaded yet", async () => {
    const { getByText } = render(returnCardInputForm());

    fireEvent(
      getByText("Update payment method"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    );

    getByText("Something went wrong, please check the details and try again.");
  });

  /*
  test("Recaptcha error is shown when recaptcha not completed", async () => {
    // rtl tip: use 'findBy' methods with 'waitFor', they are async, 'getBy' will not work
    const { getByText, findByPlaceholderText } = render(returnCardInputForm());

    // wait for stripe and stripe elements to load
    await waitFor(() => findByPlaceholderText('Card Number'), { timeout: 3000 });

    fireEvent(
      getByText("Update payment method"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    );

    getByText('Recaptcha has not been completed')
  });

  test("Button loader shown when calling stripe API to validate card", async () => {
    const { getByText, findByPlaceholderText } = render(returnCardInputForm()); 

    // wait for stripe and stripe elements to load
    await waitFor(() => findByPlaceholderText('Card Number'));

    fireEvent(
      getByText("Update payment method"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    );

    getByText('Validating your card details...')
  });
  */
});

// testing our custom wrapper component
/*
describe("fieldWrapper.tsx with Stripe Elements",  () => {
  test("Real-time error messages are shown when using stripe elements", async () => {
      const { getByText, findByLabelText, getByLabelText } = render(returnCardInputForm());
      await waitFor(() => findByLabelText('Credit or debit card number'));
      const cardNumberInput = getByLabelText("Credit or debit card number")
      fireEvent.change(cardNumberInput, {target: {value: 1111}})

      // @ts-ignore
      expect(cardNumberInput.value).toBe(1111)

      // note: incomplete error messages are not shown in real-time when filling out the form, they appear when the input has been unfocused
      cardNumberInput.blur()

      getByText("Your card number is incomplete.")

      fireEvent.change(cardNumberInput, { target: {value: 9999999999999999 }})

      getByText('Your card number is invalid')
  });
})
*/
