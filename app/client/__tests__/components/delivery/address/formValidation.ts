import { isFormValid } from "../../../../components/delivery/address/formValidation";

describe("update delivery address form validation", () => {
  const londonAddress = {
    addressLine1: "Kings place, 90 York way",
    addressLine2: "Kings cross",
    town: "London",
    postcode: "N1 9GU",
    country: "GB"
  };
  const outsideLondonAddress = {
    addressLine1: "Cadbury World, Linden Rd",
    town: "Birmingham",
    postcode: "B30 1JR",
    country: "GB"
  };
  const outsideUKAddress = {
    addressLine1: "101 Chocolate World Way",
    town: "Hershey",
    region: "PA",
    postcode: "17033",
    country: "US"
  };
  const guardianWeeklySubscription = ["Guardian Weekly subscription"];
  const homeDeliverySubscription = ["home delivery subscription"];

  //   | "membership"
  //   | "recurring contribution"
  //   | "newspaper subscription"
  //   | "newspaper voucher subscription"
  //   | "home delivery subscription"
  //   | "digital subscription"
  //   | "Guardian Weekly subscription"
  //   | "subscription"

  test(`isFormValid returns 'isValid' true given valid UK address. Subscriptions: ${guardianWeeklySubscription}`, () => {
    expect(
      isFormValid(londonAddress, guardianWeeklySubscription).isValid
    ).toBeTruthy();
  });

  test(`isFormValid returns 'isValid' true given valid UK address outside M25. Subscriptions: ${guardianWeeklySubscription}`, () => {
    expect(
      isFormValid(outsideLondonAddress, guardianWeeklySubscription).isValid
    ).toBeTruthy();
  });

  test(`isFormValid returns 'isValid' true given valid outside UK address. Subscriptions: ${guardianWeeklySubscription}`, () => {
    expect(
      isFormValid(outsideUKAddress, guardianWeeklySubscription).isValid
    ).toBeTruthy();
  });

  test(`isFormValid returns 'isValid' false given valid UK address outside M25 with home delivery subscription. Subscriptions: ${guardianWeeklySubscription}`, () => {
    expect(
      isFormValid(outsideLondonAddress, homeDeliverySubscription).isValid
    ).toBeFalsy();
  });
});
