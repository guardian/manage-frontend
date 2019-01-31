import {
  hasProductPageProperties,
  hasProductPageRedirect,
  ProductTypes
} from "../productTypes";

test("should identify a product page definition which has real properties (i.e. is an object)", () => {
  expect(hasProductPageProperties(ProductTypes.membership)).toBeTruthy();
  expect(hasProductPageProperties(ProductTypes.digipack)).toBeFalsy();
});

test("should identify a product page definition which is a redirect (i.e. is a string)", () => {
  expect(hasProductPageRedirect(ProductTypes.membership)).toBeFalsy();
  expect(hasProductPageRedirect(ProductTypes.digipack)).toBeTruthy();
});
