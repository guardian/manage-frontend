import { getStripeKey } from "../../../stripe";
import {
  guardianWeeklySubscriptionCard,
  guardianWeeklySubscriptionAustralia
} from "../../../testData";

// @ts-ignore
window.guardian = {
  stripeKeyAustralia: {
    uat: "uatKeyAustralia",
    default: "defaultKeyAustralia"
  },
  stripeKeyDefaultCurrencies: {
    uat: "uatKeyDefaultCurrencies",
    default: "defaultKeyDefaultCurrencies"
  }
};

test("Uses Rest Of World Stripe key for UK delivery address", () => {
  const stripePublicKey = getStripeKey(
    guardianWeeklySubscriptionCard.deliveryAddress?.country,
    false
  );

  expect(stripePublicKey).toEqual(
    window.guardian.stripeKeyDefaultCurrencies?.default
  );
});

test("Uses Australian Stripe key for Autralian delivery address", () => {
  const stripePublicKey = getStripeKey(
    guardianWeeklySubscriptionAustralia.deliveryAddress?.country,
    false
  );

  expect(stripePublicKey).toEqual(window.guardian.stripeKeyAustralia?.default);
});
