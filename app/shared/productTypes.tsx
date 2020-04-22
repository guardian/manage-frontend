import { Link } from "@reach/router";
import React, { ReactNode } from "react";
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
import { NavItem, navLinks } from "../client/components/nav";
import {
  getScopeFromRequestPathOrEmptyString,
  X_GU_ID_FORWARDED_SCOPE
} from "./identity";
import { OphanProduct } from "./ophanTypes";
import {
  isGift,
  ProductDetail,
  Subscription,
  SubscriptionWithDeliveryAddress
} from "./productResponse";

export type ProductFriendlyName =
  | "membership"
  | "recurring contribution" // TODO use payment frequency instead of 'recurring' e.g. monthly annual etc
  | "newspaper subscription"
  | "newspaper voucher subscription"
  | "home delivery subscription"
  | "digital subscription"
  | "Guardian Weekly subscription"
  | "subscription";
export type ProductUrlPart =
  | "membership"
  | "contributions"
  | "paper"
  | "voucher"
  | "homedelivery"
  | "digital"
  | "guardianweekly"
  | "subscriptions";
export type SfCaseProduct =
  | "Membership"
  | "Recurring - Contributions"
  | "Voucher Subscriptions"
  | "Guardian Weekly"
  | "Digital Pack Subscriptions";
export type ProductTitle = "Membership" | "Contributions" | "Subscriptions";
export type AllProductsProductTypeFilterString =
  | "Weekly"
  | "Paper"
  | "Voucher"
  | "HomeDelivery"
  | "Contribution"
  | "Membership"
  | "Digipack"
  | "ContentSubscription";

export interface CancellationFlowProperties {
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

export interface ProductPageProperties {
  title: ProductTitle;
  navLink: NavItem;
  noProductInTabCopy: JSX.Element | string;
  tierRowLabel?: string; // no label means row is not displayed;
  tierChangeable?: true;
  showSubscriptionId?: true;
  forceShowJoinDateOnly?: true;
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

export const commonDeliveryProblemTypes: DeliveryProblemType[] = [
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

export interface DeliveryProperties {
  showAddress?: (
    subscription: Subscription
  ) => subscription is SubscriptionWithDeliveryAddress;
  enableDeliveryInstructionsUpdate?: boolean;
  records?: DeliveryRecordsProperties;
}

export interface ProductType {
  friendlyName: ProductFriendlyName;
  shortFriendlyName?: string;
  allProductsProductTypeFilterString: AllProductsProductTypeFilterString;
  urlPart: ProductUrlPart;
  legacyUrlPart?: string; // could easily adapt to be string[] if multiple were required in future
  getOphanProductType?: (
    productDetail: ProductDetail
  ) => OphanProduct | undefined;
  includeGuardianInTitles?: true;
  alternateTierValue?: string;
  alternateManagementUrl?: string;
  alternateManagementCtaLabel?: (
    productDetail: ProductDetail
  ) => string | undefined;
  noProductSupportUrlSuffix?: string;
  productPage?: ProductPageProperties | ProductUrlPart; // undefined 'productPage' means no product page
  cancellation?: CancellationFlowProperties; // undefined 'cancellation' means no cancellation flow
  showTrialRemainingIfApplicable?: true;
  mapGroupedToSpecific?: (productDetail: ProductDetail) => ProductType;
  updateAmountMdaEndpoint?: string;
  holidayStops?: HolidayStopFlowProperties;
  delivery?: DeliveryProperties;
  fulfilmentDateCalculator?: {
    productFilenamePart: string;
    explicitSingleDayOfWeek?: string;
  };
}

export interface ProductTypeWithCancellationFlow extends ProductType {
  cancellation: CancellationFlowProperties;
}
export const hasCancellationFlow = (
  productType: ProductType
): productType is ProductTypeWithCancellationFlow =>
  productType.cancellation !== undefined;

export interface ProductTypeWithProductPageProperties extends ProductType {
  productPage: ProductPageProperties;
}
export const hasProductPageProperties = (
  productType: ProductType
): productType is ProductTypeWithProductPageProperties =>
  productType.productPage !== undefined &&
  typeof productType.productPage === "object";

export const hasDeliveryFlow = (productType: ProductType) =>
  productType.delivery?.showAddress;

export interface ProductTypeWithDeliveryRecordsProperties extends ProductType {
  delivery: {
    records: DeliveryRecordsProperties;
  };
}
export interface ProductTypeWithMapGroupedToSpecific extends ProductType {
  mapGroupedToSpecific: (productDetail: ProductDetail) => ProductType;
}

export const hasDeliveryRecordsFlow = (
  productType: ProductType
): productType is ProductTypeWithDeliveryRecordsProperties =>
  !!productType.delivery?.records;

export interface ProductTypeWithProductPageRedirect extends ProductType {
  productPage: ProductUrlPart;
}
export const hasProductPageRedirect = (
  productType: ProductType
): productType is ProductTypeWithProductPageRedirect =>
  productType.productPage !== undefined &&
  typeof productType.productPage === "string";

export interface WithProductType<ProductTypeVariant extends ProductType> {
  productType: ProductTypeVariant;
}

export const shouldCreatePaymentUpdateFlow = (productType: ProductType) =>
  !productType.mapGroupedToSpecific;

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

const domainSpecificSubsManageURL = `https://subscribe.${
  typeof window !== "undefined" && window.guardian && window.guardian.domain
    ? window.guardian.domain
    : "theguardian.com"
}/manage`;

const getNoProductInTabCopy = (links: NavItem[]) => {
  return (
    <>
      {links.map((link, index) => {
        return (
          <span key={`noProduct-${index}`}>
            {index === 0
              ? ` Perhaps you ${
                  link.title === "contribution"
                    ? "support us via a "
                    : "have a "
                }`
              : ` or ${
                  link.title === "contribution" ? "support us via a " : ""
                }`}
            <Link to={link.link}>{link.title}</Link>
          </span>
        );
      })}
      {"."}
    </>
  );
};

const showDeliveryAddressCheck = (
  subscription: Subscription
): subscription is SubscriptionWithDeliveryAddress =>
  !isGift(subscription) && !!subscription.deliveryAddress;

export type ProductTypeKeys =
  | "membership"
  | "contributions"
  | "newspaper"
  | "homedelivery"
  | "voucher"
  | "guardianweekly"
  | "digipack"
  | "contentSubscriptions";

export const ProductTypes: { [productKey in ProductTypeKeys]: ProductType } = {
  membership: {
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
    productPage: {
      title: "Membership",
      navLink: navLinks.membership,
      noProductInTabCopy: getNoProductInTabCopy([
        { ...navLinks.subscriptions, title: "subscription" },
        { ...navLinks.contributions, title: "contribution" }
      ]),
      tierRowLabel: "Membership tier",
      tierChangeable: true,
      forceShowJoinDateOnly: true
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
    }
  },
  contributions: {
    friendlyName: "recurring contribution",
    allProductsProductTypeFilterString: "Contribution",
    urlPart: "contributions",
    getOphanProductType: () => "RECURRING_CONTRIBUTION",
    noProductSupportUrlSuffix: "/contribute",
    updateAmountMdaEndpoint: "contribution-update-amount",
    productPage: {
      title: "Contributions",
      navLink: navLinks.contributions,
      noProductInTabCopy: getNoProductInTabCopy([
        { ...navLinks.membership, title: "membership" },
        { ...navLinks.subscriptions, title: "subscription" }
      ])
    },
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
      alternateSupportButtonUrlSuffix: (
        reasonId: OptionalCancellationReasonId
      ) => "/contribute", // TODO tweak the support url to preselect single/monthly/annual once functionality is available
      swapFeedbackAndContactUs: true
    }
  },
  newspaper: {
    // FIXME: DEPRECATED: once Braze templates have been updated to use voucher/homedelivery, then replace with redirect to /subscriptions for anything with 'paper' in the URL
    friendlyName: "newspaper subscription",
    allProductsProductTypeFilterString: "Paper",
    urlPart: "paper",
    getOphanProductType: () => "PRINT_SUBSCRIPTION",
    includeGuardianInTitles: true,
    delivery: {
      showAddress: showDeliveryAddressCheck,
      enableDeliveryInstructionsUpdate: true
    },
    productPage: "subscriptions"
  },
  homedelivery: {
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
    productPage: "subscriptions",
    fulfilmentDateCalculator: {
      productFilenamePart: "Newspaper - Home Delivery"
    }
  },
  voucher: {
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
    },
    productPage: "subscriptions"
  },
  guardianweekly: {
    friendlyName: "Guardian Weekly subscription",
    shortFriendlyName: "Guardian Weekly",
    allProductsProductTypeFilterString: "Weekly",
    urlPart: "guardianweekly",
    getOphanProductType: () => "PRINT_SUBSCRIPTION", // TODO create a GUARDIAN_WEEKLY Product in Ophan data model
    alternateTierValue: "Guardian Weekly",
    alternateManagementUrl: domainSpecificSubsManageURL,
    alternateManagementCtaLabel: (productDetail: ProductDetail) =>
      productDetail.subscription.autoRenew
        ? undefined
        : "renew your one-off Guardian Weekly subscription",
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
    productPage: "subscriptions",
    fulfilmentDateCalculator: {
      productFilenamePart: "Guardian Weekly",
      explicitSingleDayOfWeek: "Friday"
    }
  },
  digipack: {
    friendlyName: "digital subscription",
    allProductsProductTypeFilterString: "Digipack",
    urlPart: "digital",
    legacyUrlPart: "digitalpack",
    getOphanProductType: () => "DIGITAL_SUBSCRIPTION",
    showTrialRemainingIfApplicable: true,
    alternateTierValue: "Digital Subscription",
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
    },
    productPage: "subscriptions"
  },
  contentSubscriptions: {
    friendlyName: "subscription",
    allProductsProductTypeFilterString: "ContentSubscription",
    urlPart: "subscriptions",
    productPage: {
      title: "Subscriptions",
      navLink: navLinks.subscriptions,
      noProductInTabCopy: getNoProductInTabCopy([
        { ...navLinks.membership, title: "membership" },
        { ...navLinks.contributions, title: "contribution" }
      ]),
      tierRowLabel: "Subscription product",
      showSubscriptionId: true
    },
    mapGroupedToSpecific: (productDetail: ProductDetail) => {
      if (productDetail.tier === "Digital Pack") {
        return ProductTypes.digipack;
      } else if (productDetail.tier === "Newspaper Delivery") {
        return ProductTypes.homedelivery;
      } else if (productDetail.tier === "Newspaper Voucher") {
        return ProductTypes.voucher;
      } else if (productDetail.tier.startsWith("Guardian Weekly")) {
        return ProductTypes.guardianweekly;
      }
      return ProductTypes.contentSubscriptions; // This should never happen!
    }
  }
};
