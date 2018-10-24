import { pleaseCheck, validateValue } from "../../components/updatableAmount";

const monthlyPounds = {
  currency: "£",
  currencyISO: "GBP",
  interval: "month"
};
const monthlyNZD = {
  currency: "$",
  currencyISO: "NZD",
  interval: "month"
};
const annualPounds = {
  currency: "£",
  currencyISO: "GBP",
  interval: "year"
};
const annualNZD = {
  currency: "$",
  currencyISO: "NZD",
  interval: "year"
};

test("should reject invalid number", () => {
  expect(validateValue(0, parseFloat("invalid"), monthlyPounds)).toContain(
    "valid number"
  );
});

test("should reject no change in value", () => {
  expect(validateValue(5, 5, monthlyPounds)).toContain(
    "enter a different amount"
  );
});

test("should reject below minimum for currency and interval", () => {
  const expectedStrContain = "or more";
  expect(validateValue(5, 1, monthlyPounds)).toContain(expectedStrContain);
  expect(validateValue(5, 2, monthlyPounds)).toBeUndefined();
  expect(validateValue(20, 2, annualPounds)).toContain(expectedStrContain);
  expect(validateValue(20, 10, annualPounds)).toBeUndefined();
  expect(validateValue(15, 1, monthlyNZD)).toContain(expectedStrContain);
  expect(validateValue(15, 10, monthlyNZD)).toBeUndefined();
  expect(validateValue(20, 1, annualNZD)).toContain(expectedStrContain);
  expect(validateValue(20, 10, annualNZD)).toBeUndefined();
});

test("should reject above maximum for currency and interval", () => {
  const expectedStrContain = "cannot accept contributions over";
  expect(validateValue(5, 9999, monthlyPounds)).toContain(expectedStrContain);
  expect(validateValue(5, 10, monthlyPounds)).toBeUndefined();
  expect(validateValue(20, 9999, annualPounds)).toContain(expectedStrContain);
  expect(validateValue(20, 100, annualPounds)).toBeUndefined();
  expect(validateValue(15, 9999, monthlyNZD)).toContain(expectedStrContain);
  expect(validateValue(15, 150, monthlyNZD)).toBeUndefined();
  expect(validateValue(20, 9999, annualNZD)).toContain(expectedStrContain);
  expect(validateValue(20, 150, annualNZD)).toBeUndefined();
});

test("should warn about more than 10x increase", () => {
  expect(validateValue(5, 60, monthlyPounds)).toContain(pleaseCheck);
  expect(validateValue(5, 10, monthlyPounds)).toBeUndefined();
});
