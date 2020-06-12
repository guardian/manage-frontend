import { ReactNode } from "react";
import { SupportTheGuardianSectionProps } from "../client/components/accountoverview/accountOverview";
import {
  CancellationReason,
  OptionalCancellationReasonId
} from "../client/components/cancel/cancellationReason";
import { contributionsCancellationFlowStart } from "../client/components/cancel/contributions/contributionsCancellationFlowStart";
import { contributionsCancellationReasons } from "../client/components/cancel/contributions/contributionsCancellationReasons";
import { digipackCancellationFlowStart } from "../client/components/cancel/digipack/digipackCancellationFlowStart";
import { digipackCancellationReasons } from "../client/components/cancel/digipack/digipackCancellationReasons";
import { gwCancellationFlowStart } from "../client/components/cancel/gw/gwCancellationFlowStart";
import { gwCancellationReasons } from "../client/components/cancel/gw/gwCancellationReasons";
import { membershipCancellationFlowStart } from "../client/components/cancel/membership/membershipCancellationFlowStart";
import { membershipCancellationReasons } from "../client/components/cancel/membership/membershipCancellationReasons";
import {
  physicalSubsCancellationFlowWrapper,
  RestOfCancellationFlow
} from "../client/components/cancel/physicalSubsCancellationFlowWrapper";
import { voucherCancellationFlowStart } from "../client/components/cancel/voucher/voucherCancellationFlowStart";
import { voucherCancellationReasons } from "../client/components/cancel/voucher/voucherCancellationReasons";
import { SupportTheGuardianButtonProps } from "../client/components/supportTheGuardianButton";
import {
  getScopeFromRequestPathOrEmptyString,
  X_GU_ID_FORWARDED_SCOPE
} from "./identity";
import { OphanProduct } from "./ophanTypes";
import {
  isGift,
  ProductDetail,
  Subscription,
  SubscriptionPlan,
  SubscriptionWithDeliveryAddress
} from "./productResponse";

type ProductFriendlyName =
  | "membership"
  | "recurring contribution" // TODO use payment frequency instead of 'recurring' e.g. monthly annual etc
  | "newspaper subscription"
  | "newspaper voucher subscription"
  | "newspaper subscription card"
  | "home delivery subscription"
  | "digital subscription"
  | "Guardian Weekly subscription"
  | "subscription";
type ProductUrlPart =
  | "membership"
  | "contributions"
  | "paper"
  | "voucher"
  | "subscriptioncard"
  | "homedelivery"
  | "digital"
  | "guardianweekly"
  | "subscriptions";
type SfCaseProduct =
  | "Membership"
  | "Recurring - Contributions"
  | "Voucher Subscriptions"
  | "Guardian Weekly"
  | "Digital Pack Subscriptions";
type AllProductsProductTypeFilterString =
  | "Weekly"
  | "Paper"
  | "Voucher"
  | "DigitalVoucher"
  | "HomeDelivery"
  | "Contribution"
  | "Membership"
  | "Digipack"
  | "ContentSubscription";

interface CancellationFlowProperties {
  reasons: CancellationReason[];
  sfCaseProduct: SfCaseProduct;
  linkOnProductPage?: true;
  flowWrapper?: (
    productDetail: ProductDetail,
    productType: ProductType
  ) => (restOfFlow: RestOfCancellationFlow) => ReactNode;
  startPageBody: (subscription: Subscription) => JSX.Element;
  startPageOfferEffectiveDateOptions?: true;
  hideReasonTitlePrefix?: true;
  alternateSummaryMainPara?: string;
  summaryReasonSpecificPara: (
    reasonId: OptionalCancellationReasonId
  ) => string | undefined;
  onlyShowSupportSectionIfAlternateText: boolean;
  alternateSupportButtonText: (
    reasonId: OptionalCancellationReasonId
  ) => string | undefined;
  alternateSupportButtonUrlSuffix: (
    reasonId: OptionalCancellationReasonId
  ) => string | undefined;
  swapFeedbackAndContactUs?: true;
}

export interface HolidayStopFlowProperties {
  issueKeyword: string;
  alternateNoticeString?: string;
  additionalHowAdvice?: string;
  hideDeliveryRedirectionHelpBullet?: true;
  explicitConfirmationRequired?: {
    checkboxLabel: string;
    explainerModalTitle: string;
    explainerModalBody: string;
  };
}

export interface DeliveryProblemType {
  label: string;
  messageIsMandatory: boolean;
}
export const holidaySuspensionDeliveryProblem: DeliveryProblemType = {
  label: "Delivered despite suspension",
  messageIsMandatory: false
};

const commonDeliveryProblemTypes: DeliveryProblemType[] = [
  { label: "Damaged Paper", messageIsMandatory: true },
  { label: "No Delivery", messageIsMandatory: false },
  { label: "Other", messageIsMandatory: true }
  // {...holidaySuspensionDeliveryProblem}
];

interface DeliveryRecordsProperties {
  productNameForProblemReport: string;
  showDeliveryInstructions?: true;
  numberOfProblemRecordsToShow: number;
  contactUserOnExistingProblemReport: boolean;
  availableProblemTypes: DeliveryProblemType[];
}

interface DeliveryProperties {
  showAddress?: (
    subscription: Subscription
  ) => subscription is SubscriptionWithDeliveryAddress;
  enableDeliveryInstructionsUpdate?: boolean;
  records?: DeliveryRecordsProperties;
}

export interface ProductType {
  productTitle: (mainPlan?: SubscriptionPlan) => string;
  friendlyName: ProductFriendlyName;
  shortFriendlyName?: string;
  allProductsProductTypeFilterString: AllProductsProductTypeFilterString;
  urlPart: ProductUrlPart;
  legacyUrlPart?: string; // could easily adapt to be string[] if multiple were required in future
  getOphanProductType?: (
    productDetail: ProductDetail
  ) => OphanProduct | undefined;
  shouldRevealSubscriptionId?: boolean;
  tierLabel?: string;
  changeTierUrl?: (domain?: string) => string;
  includeGuardianInTitles?: true;
  renewalMetadata?: SupportTheGuardianButtonProps;
  noProductSupportUrlSuffix?: string;
  cancellation?: CancellationFlowProperties; // undefined 'cancellation' means no cancellation flow
  showTrialRemainingIfApplicable?: true;
  updateAmountMdaEndpoint?: string;
  holidayStops?: HolidayStopFlowProperties;
  delivery?: DeliveryProperties;
  fulfilmentDateCalculator?: {
    productFilenamePart: string;
    explicitSingleDayOfWeek?: string;
  };
  cancelledCopy?: string;
  shouldShowJoinDateNotStartDate?: true;
}

export interface GroupedProductType extends ProductType {
  mapGroupedToSpecific: (productDetail: ProductDetail) => ProductType;
  groupFriendlyName: string;
  supportTheGuardianSectionProps: SupportTheGuardianSectionProps;
}

export interface ProductTypeWithCancellationFlow extends ProductType {
  cancellation: CancellationFlowProperties;
}
export const hasCancellationFlow = (
  productType: ProductType
): productType is ProductTypeWithCancellationFlow =>
  productType.cancellation !== undefined;

export const hasDeliveryFlow = (productType: ProductType) =>
  productType.delivery?.showAddress;

export interface ProductTypeWithDeliveryRecordsProperties extends ProductType {
  delivery: {
    records: DeliveryRecordsProperties;
  };
}

export const hasDeliveryRecordsFlow = (
  productType: ProductType
): productType is ProductTypeWithDeliveryRecordsProperties =>
  !!productType.delivery?.records;

export interface WithProductType<PT extends ProductType> {
  productType: PT;
}

export interface WithGroupedProductType<GPT extends GroupedProductType> {
  groupedProductType: GPT;
}

export interface ProductTypeWithHolidayStopsFlow extends ProductType {
  holidayStops: HolidayStopFlowProperties;
}
export const shouldHaveHolidayStopsFlow = (
  productType: ProductType
): productType is ProductTypeWithHolidayStopsFlow => !!productType.holidayStops;

export const createProductDetailFetcher = (
  productType: ProductType,
  subscriptionName?: string
) => () =>
  fetch(
    "/api/me/mma" +
      (subscriptionName
        ? `/${subscriptionName}`
        : `?productType=${productType.allProductsProductTypeFilterString}`),
    {
      credentials: "include",
      mode: "same-origin",
      headers: {
        [X_GU_ID_FORWARDED_SCOPE]: getScopeFromRequestPathOrEmptyString(
          window.location.href
        )
      }
    }
  );

export const allProductsDetailFetcher = () =>
  fetch("/api/me/mma", {
    credentials: "include",
    mode: "same-origin",
    headers: {
      [X_GU_ID_FORWARDED_SCOPE]: getScopeFromRequestPathOrEmptyString(
        window.location.href
      )
    }
  });

const showDeliveryAddressCheck = (
  subscription: Subscription
): subscription is SubscriptionWithDeliveryAddress =>
  !isGift(subscription) && !!subscription.deliveryAddress;

const calculateProductTitle = (baseProductTitle: string) => (
  mainPlan?: SubscriptionPlan
) => baseProductTitle + (mainPlan?.name ? ` - ${mainPlan.name}` : "");

type ProductTypeKeys =
  | "membership"
  | "contributions"
  | "newspaper"
  | "homedelivery"
  | "voucher"
  | "digitalvoucher"
  | "guardianweekly"
  | "digipack";

export type GroupedProductTypeKeys =
  | "membership"
  | "contributions"
  | "subscriptions";

export const PRODUCT_TYPES: { [productKey in ProductTypeKeys]: ProductType } = {
  membership: {
    productTitle: () => "Guardian membership",
    friendlyName: "membership",
    allProductsProductTypeFilterString: "Membership",
    urlPart: "membership",
    getOphanProductType: (productDetail: ProductDetail) => {
      switch (productDetail.tier) {
        case "Supporter":
          return "MEMBERSHIP_SUPPORTER";
        case "Partner":
          return "MEMBERSHIP_PARTNER";
        case "Patron":
          return "MEMBERSHIP_PATRON";
      }
    },
    includeGuardianInTitles: true,
    cancellation: {
      reasons: membershipCancellationReasons,
      sfCaseProduct: "Membership",
      startPageBody: membershipCancellationFlowStart,
      hideReasonTitlePrefix: true,
      summaryReasonSpecificPara: () => undefined,
      onlyShowSupportSectionIfAlternateText: false,
      alternateSupportButtonText: () => undefined,
      alternateSupportButtonUrlSuffix: () => undefined
    },
    cancelledCopy:
      "Your membership has been cancelled. You will continue to receive the benefits of your membership until",
    tierLabel: "Membership tier",
    changeTierUrl: (domain?: string) =>
      `https://membership.${domain || "theguardian.com"}/tier/change`,
    shouldShowJoinDateNotStartDate: true
  },
  contributions: {
    productTitle: () => "Recurring contribution",
    friendlyName: "recurring contribution",
    allProductsProductTypeFilterString: "Contribution",
    urlPart: "contributions",
    getOphanProductType: () => "RECURRING_CONTRIBUTION",
    noProductSupportUrlSuffix: "/contribute",
    updateAmountMdaEndpoint: "contribution-update-amount",
    cancellation: {
      linkOnProductPage: true,
      reasons: contributionsCancellationReasons,
      sfCaseProduct: "Recurring - Contributions",
      startPageBody: contributionsCancellationFlowStart,
      alternateSummaryMainPara: "Thank you for your valuable support.",
      summaryReasonSpecificPara: (reasonId: OptionalCancellationReasonId) => {
        switch (reasonId) {
          case "mma_financial_circumstances":
          case "mma_value_for_money":
          case "mma_one_off":
            return "You can support The Guardian’s independent journalism with a single contribution, from as little as £1 – and it only takes a minute.";
          case "mma_wants_annual_contribution":
            return "You can support The Guardian’s independent journalism for the long term with an annual contribution.";
          case "mma_wants_monthly_contribution":
            return "You can support The Guardian’s independent journalism for the long term with a monthly contribution.";
          default:
            return undefined;
        }
      },
      onlyShowSupportSectionIfAlternateText: true,
      alternateSupportButtonText: (reasonId: OptionalCancellationReasonId) => {
        switch (reasonId) {
          case "mma_financial_circumstances":
          case "mma_value_for_money":
          case "mma_one_off":
            return "Make a single contribution";
          case "mma_wants_annual_contribution":
            return "Make an annual contribution";
          case "mma_wants_monthly_contribution":
            return "Make a monthly contribution";
          default:
            return undefined;
        }
      },
      alternateSupportButtonUrlSuffix: () => "/contribute", // TODO tweak the support url to preselect single/monthly/annual once functionality is available
      swapFeedbackAndContactUs: true
    }
  },
  // FIXME: DEPRECATED: once Braze templates have been updated to use voucher/homedelivery, then replace with redirect to /subscriptions for anything with 'paper' in the URL
  newspaper: {
    productTitle: calculateProductTitle("Newspaper subscription"),
    friendlyName: "newspaper subscription",
    allProductsProductTypeFilterString: "Paper",
    urlPart: "paper",
    getOphanProductType: () => "PRINT_SUBSCRIPTION",
    includeGuardianInTitles: true,
    delivery: {
      showAddress: showDeliveryAddressCheck,
      enableDeliveryInstructionsUpdate: true
    }
  },
  homedelivery: {
    productTitle: calculateProductTitle("Newspaper Delivery"),
    friendlyName: "home delivery subscription",
    shortFriendlyName: "home delivery",
    allProductsProductTypeFilterString: "HomeDelivery",
    urlPart: "homedelivery",
    getOphanProductType: () => "PRINT_SUBSCRIPTION",
    includeGuardianInTitles: true,
    holidayStops: {
      issueKeyword: "paper"
    },
    delivery: {
      showAddress: showDeliveryAddressCheck,
      enableDeliveryInstructionsUpdate: true,
      records: {
        productNameForProblemReport: "Home Delivery",
        showDeliveryInstructions: true,
        numberOfProblemRecordsToShow: 14,
        contactUserOnExistingProblemReport: true,
        availableProblemTypes: [
          { label: "Instructions Not Followed", messageIsMandatory: true },
          ...commonDeliveryProblemTypes
        ]
      }
    },
    fulfilmentDateCalculator: {
      productFilenamePart: "Newspaper - Home Delivery"
    }
  },
  voucher: {
    productTitle: calculateProductTitle("Newspaper Voucher"),
    friendlyName: "newspaper voucher subscription",
    allProductsProductTypeFilterString: "Voucher",
    urlPart: "voucher",
    getOphanProductType: () => "PRINT_SUBSCRIPTION",
    includeGuardianInTitles: true,
    holidayStops: {
      issueKeyword: "voucher",
      alternateNoticeString: "one day's notice",
      additionalHowAdvice:
        "Please discard suspended vouchers before the voucher dates. Please note that historical suspensions may not appear here.",
      hideDeliveryRedirectionHelpBullet: true,
      explicitConfirmationRequired: {
        checkboxLabel: "I confirm that I will destroy suspended vouchers.",
        explainerModalTitle: "Destroying your vouchers",
        explainerModalBody:
          "We monitor voucher usage and reserve the right to cancel credits where vouchers have been used during the suspension period."
      }
    },
    delivery: {
      showAddress: showDeliveryAddressCheck,
      enableDeliveryInstructionsUpdate: true
    },
    cancellation: {
      linkOnProductPage: true,
      reasons: voucherCancellationReasons,
      sfCaseProduct: "Voucher Subscriptions",
      flowWrapper: physicalSubsCancellationFlowWrapper,
      startPageBody: voucherCancellationFlowStart,
      startPageOfferEffectiveDateOptions: true,
      summaryReasonSpecificPara: () => undefined,
      onlyShowSupportSectionIfAlternateText: false,
      alternateSupportButtonText: (reasonId: OptionalCancellationReasonId) =>
        reasonId === "mma_financial_circumstances" ? "/contribute" : undefined,
      alternateSupportButtonUrlSuffix: (
        reasonId: OptionalCancellationReasonId
      ) =>
        reasonId === "mma_financial_circumstances" ? "/contribute" : undefined,
      swapFeedbackAndContactUs: true
    }
  },
  digitalvoucher: {
    productTitle: calculateProductTitle("Newspaper Subscription Card"),
    friendlyName: "newspaper subscription card",
    allProductsProductTypeFilterString: "DigitalVoucher",
    urlPart: "subscriptioncard",
    legacyUrlPart: "digitalvoucher",
    getOphanProductType: () => "PRINT_SUBSCRIPTION",
    delivery: {
      showAddress: showDeliveryAddressCheck
    }
  },
  guardianweekly: {
    productTitle: () => "Guardian Weekly",
    friendlyName: "Guardian Weekly subscription",
    shortFriendlyName: "Guardian Weekly",
    allProductsProductTypeFilterString: "Weekly",
    urlPart: "guardianweekly",
    getOphanProductType: () => "PRINT_SUBSCRIPTION", // TODO create a GUARDIAN_WEEKLY Product in Ophan data model
    renewalMetadata: {
      alternateButtonText: "Subscribe here",
      urlSuffix: "subscribe/weekly",
      supportReferer: "gw_renewal"
    },
    holidayStops: {
      issueKeyword: "issue"
    },
    delivery: {
      showAddress: showDeliveryAddressCheck,
      enableDeliveryInstructionsUpdate: false,
      records: {
        productNameForProblemReport: "Guardian Weekly",
        numberOfProblemRecordsToShow: 4,
        contactUserOnExistingProblemReport: false,
        availableProblemTypes: commonDeliveryProblemTypes
      }
    },
    cancellation: {
      linkOnProductPage: true,
      reasons: gwCancellationReasons,
      sfCaseProduct: "Guardian Weekly",
      flowWrapper: physicalSubsCancellationFlowWrapper,
      startPageBody: gwCancellationFlowStart,
      startPageOfferEffectiveDateOptions: true,
      summaryReasonSpecificPara: () => undefined,
      onlyShowSupportSectionIfAlternateText: false,
      alternateSupportButtonText: (reasonId: OptionalCancellationReasonId) =>
        reasonId === "mma_financial_circumstances" ? "/contribute" : undefined,
      alternateSupportButtonUrlSuffix: (
        reasonId: OptionalCancellationReasonId
      ) =>
        reasonId === "mma_financial_circumstances" ? "/contribute" : undefined,
      swapFeedbackAndContactUs: true
    },
    fulfilmentDateCalculator: {
      productFilenamePart: "Guardian Weekly",
      explicitSingleDayOfWeek: "Friday"
    }
  },
  digipack: {
    productTitle: () => "Digital Subscription",
    friendlyName: "digital subscription",
    allProductsProductTypeFilterString: "Digipack",
    urlPart: "digital",
    legacyUrlPart: "digitalpack",
    getOphanProductType: () => "DIGITAL_SUBSCRIPTION",
    showTrialRemainingIfApplicable: true,
    cancellation: {
      linkOnProductPage: true,
      reasons: digipackCancellationReasons,
      sfCaseProduct: "Digital Pack Subscriptions",
      startPageBody: digipackCancellationFlowStart,
      summaryReasonSpecificPara: () => undefined,
      onlyShowSupportSectionIfAlternateText: false,
      alternateSupportButtonText: (reasonId: OptionalCancellationReasonId) =>
        reasonId === "mma_financial_circumstances" ? "/contribute" : undefined,
      alternateSupportButtonUrlSuffix: (
        reasonId: OptionalCancellationReasonId
      ) =>
        reasonId === "mma_financial_circumstances" ? "/contribute" : undefined,
      swapFeedbackAndContactUs: true
    }
  }
};

export const GROUPED_PRODUCT_TYPES: {
  [productKey in GroupedProductTypeKeys]: GroupedProductType;
} = {
  membership: {
    ...PRODUCT_TYPES.membership,
    mapGroupedToSpecific: () => PRODUCT_TYPES.membership,
    groupFriendlyName: "membership",
    supportTheGuardianSectionProps: {
      supportReferer: "account_overview_membership_section",
      message:
        "We no longer have a membership programme but you can still continue to support The Guardian via a contribution or subscription."
    }
  },
  contributions: {
    ...PRODUCT_TYPES.contributions,
    mapGroupedToSpecific: () => PRODUCT_TYPES.contributions,
    groupFriendlyName: "contributions",
    supportTheGuardianSectionProps: {
      alternateButtonText: "Contribute again",
      supportReferer: "account_overview_contributions_section",
      urlSuffix: "contribute",
      message:
        "You can use your existing payment details, so setting up a new recurring contribution only takes a minute."
    }
  },
  subscriptions: {
    productTitle: () => "Subscription",
    friendlyName: "subscription",
    groupFriendlyName: "subscriptions",
    allProductsProductTypeFilterString: "ContentSubscription",
    urlPart: "subscriptions",
    mapGroupedToSpecific: (productDetail: ProductDetail) => {
      if (productDetail.tier === "Digital Pack") {
        return PRODUCT_TYPES.digipack;
      } else if (productDetail.tier === "Newspaper Delivery") {
        return PRODUCT_TYPES.homedelivery;
      } else if (productDetail.tier === "Newspaper Voucher") {
        return PRODUCT_TYPES.voucher;
      } else if (productDetail.tier.startsWith("Newspaper Digital Voucher")) {
        return PRODUCT_TYPES.digitalvoucher;
      } else if (productDetail.tier.startsWith("Guardian Weekly")) {
        return PRODUCT_TYPES.guardianweekly;
      }
      return GROUPED_PRODUCT_TYPES.subscriptions; // This should never happen!
    },
    cancelledCopy:
      "Your subscription has been cancelled. You are able to access your subscription until",
    shouldRevealSubscriptionId: true,
    supportTheGuardianSectionProps: {
      alternateButtonText: "Subscribe again",
      supportReferer: "account_overview_subscriptions_section",
      urlSuffix: "subscribe",
      message: "" // TODO : copy here!!
    }
  }
};
