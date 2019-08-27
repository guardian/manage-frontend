interface GuPurposeState {
  [key: string]: boolean | null;
}

interface GuPurposeList {
  purposes: GuPurpose[];
}

interface ParsedGuPurposeList {
  purposes: ParsedGuPurpose[];
}

interface GuPurpose {
  id: GuPurposeType;
  name: string;
  description: string;
  integrations: GuIntegration[];
}

interface ParsedGuPurpose extends GuPurpose {
  integDescription: React.ReactNode;
}

interface GuPurpose {
  id: GuPurposeType;
  name: string;
  description: string;
  integrations: GuIntegration[];
}

interface GuIntegration {
  name: string;
  policyUrl: string;
}

interface IabPurposeState {
  [key: number]: boolean | null;
}

interface IabPurpose {
  id: number;
  name: string;
  description: string;
}

interface IabFeature {
  id: number;
  name: string;
  description: string;
}

interface IabVendor {
  id: number;
  name: string;
  policyUrl: string;
  purposeIds: number[];
  legIntPurposeIds: number[];
  featureIds: number[];
}

interface ParsedIabVendor extends IabVendor {
  description: React.ReactNode;
}

interface IabVendorList {
  vendorListVersion: number;
  lastUpdated: string;
  purposes: IabPurpose[];
  features: IabFeature[];
  vendors: IabVendor[];
}

interface ParsedIabVendorList extends IabVendorList {
  vendors: ParsedIabVendor[];
}
