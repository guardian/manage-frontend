type PurposeList = { [K in PurposeType]: Purpose };

type PurposeType =
  | "essential"
  | "performance"
  | "functionality"
  | "personalisedAds";

type Purpose = {
  label: string;
  purposeValue: boolean | null;
  description: string;
  hasButton: boolean;
  vendors?: VendorList;
};

type VendorList = {
  [K: number]: Vendor;
};

type Vendor = {
  label: string;
  url: string;
  hasButton: boolean;
  vendorValue: boolean | null;
};
