import { getObfuscatedPayPalId } from "../../../components/payment/paypalDisplay";

test("obfuscate email id", () => {
  expect(getObfuscatedPayPalId("hiTom@email.com")).toEqual("h***m@email.com");
  expect(getObfuscatedPayPalId("hiRichard@email.com")).toEqual(
    "h*******d@email.com"
  );
});

test("obfuscate string id", () => {
  expect(getObfuscatedPayPalId("usernameYo")).toEqual("u********o");
});
