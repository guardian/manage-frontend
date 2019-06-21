type PurposeList = { [K in PurposeType]: Purpose };

type PurposeType =
  | "essential"
  | "performance"
  | "functionality"
  | "personalisedAds";

type Purpose = {
  label: string;
  description: string;
  hasButton: boolean;
  vendors: VendorList | null;
};

type VendorList = {
  [K: number]: Vendor;
};

type Vendor = {
  label: string;
  url: string;
  hasButton: boolean;
};

type PurposeValueList = { [K in PurposeType]: PurposeValue };

type PurposeValue = {
  purposeValue: boolean | null;
  vendorValues: VendorValueList | null;
};

type VendorValueList = {
  [K: number]: VendorValue;
};

type VendorValue = {
  vendorValue: boolean | null;
};
