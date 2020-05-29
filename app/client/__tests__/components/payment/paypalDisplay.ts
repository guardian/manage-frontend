import { getPaypalIdObfuscate } from "../../../components/payment/paypalDisplay";

test("obfuscate email id", () => {
  expect(getPaypalIdObfuscate("hiTom@email.com")).toEqual("h***m@email.com");
  expect(getPaypalIdObfuscate("hiRichard@email.com")).toEqual(
    "h*******d@email.com"
  );
});

test("obfuscate string id", () => {
  expect(getPaypalIdObfuscate("usernameYo")).toEqual("u********o");
});
