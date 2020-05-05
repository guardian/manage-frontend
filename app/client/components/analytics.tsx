import { Location } from "@reach/router";
import React, { ReactNode } from "react";
import parse from "url-parse";
import { OphanProduct } from "../../shared/ophanTypes";
import { ProductDetail } from "../../shared/productResponse";
import { ProductType } from "../../shared/productTypes";
import { isInAccountOverviewTest } from "../accountOverviewRelease";

declare global {
  interface Window {
    ga?: any;
    gaData?: any;
    dataLayer?: any;
  }
}

export interface Event {
  eventCategory: string;
  eventAction: string;
  product?: {
    productType: ProductType;
    productDetail: ProductDetail;
  };
  eventLabel?: string;
  eventValue?: number;
}

const MMA_AB_TEST_DIMENSION_VALUE = isInAccountOverviewTest()
  ? "IN-ACCOUNT-OVERVIEW_TEST"
  : "NOT-IN-ACCOUNT-OVERVIEW_TEST";

export const trackEvent = (
  { eventCategory, eventAction, product, eventLabel, eventValue }: Event,
  alsoTrackInGA = true
) => {
  if (alsoTrackInGA && window.ga) {
    window.ga(
      "send",
      "event",
      eventCategory,
      eventAction,
      eventLabel,
      eventValue
    );
  }
  if (window.guardian && window.guardian.ophan) {
    const ophanProduct: OphanProduct | undefined =
      product &&
      product.productType.getOphanProductType &&
      product.productType.getOphanProductType(product.productDetail);

    window.guardian.ophan.record({
      componentEvent: {
        component: {
          componentType: "ACQUISITIONS_MANAGE_MY_ACCOUNT",
          products: ophanProduct ? [ophanProduct] : undefined,
          campaignCode: window.guardian.INTCMP,
          labels: [
            eventCategory.toUpperCase(),
            eventAction.toUpperCase(),
            ...(eventLabel ? [eventLabel.toUpperCase()] : []),
            MMA_AB_TEST_DIMENSION_VALUE
          ]
        },
        action: "VIEW",
        value: eventValue !== undefined ? `${eventValue}` : undefined,
        abTest: window.guardian.abTest
      }
    });
  }
};

export const trackEventInOphanOnly = (event: Event) => trackEvent(event, false);

export const applyAnyOptimiseExperiments = () => {
  if (typeof window !== "undefined" && window.ga && window.dataLayer) {
    window.dataLayer.push({ event: "optimize.activate" });
  }
};

export class AnalyticsTracker extends React.PureComponent<{}> {
  public readonly INTCMP?: string;

  constructor(props: {}) {
    super(props);
    if (typeof window !== "undefined" && window.ga) {
      const queryParams = parse(window.location.href, true).query;

      this.INTCMP = queryParams.INTCMP;

      if (window.guardian) {
        // tslint:disable-next-line:no-object-mutation
        window.guardian.INTCMP = this.INTCMP;

        const abName = queryParams.abName;
        const abVariant = queryParams.abVariant;

        if (abName && abVariant) {
          window.guardian.abTest = {
            name: abName,
            variant: abVariant
          };
        }
      }

      if (window.dataLayer === undefined) {
        window.dataLayer = [];
      }

      window.ga("create", "UA-51507017-5", "auto");
      window.ga("require", "GTM-M985W29");
      window.ga("set", "transport", "beacon");
      if (this.INTCMP) {
        window.ga("set", "dimension12", this.INTCMP);
      }
      window.ga("set", "dimension29", MMA_AB_TEST_DIMENSION_VALUE);

      new MutationObserver(applyAnyOptimiseExperiments).observe(document.body, {
        attributes: false,
        characterData: false,
        childList: true,
        subtree: true,
        attributeOldValue: false,
        characterDataOldValue: false
      });
    }
  }

  public render(): ReactNode {
    return (
      <Location>
        {({ location }) => {
          if (location && typeof window !== "undefined") {
            setTimeout(() => {
              // tslint:disable-next-line:no-object-mutation
              document.body.scrollTop = 0; // For Safari
              // tslint:disable-next-line:no-object-mutation
              document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
            }, 250);
            if (
              window.guardian &&
              window.guardian.ophan &&
              window.guardian.ophan.sendInitialEvent
            ) {
              if (window.guardian.spaTransition) {
                window.guardian.ophan.sendInitialEvent(location.href);
              } else {
                // tslint:disable-next-line:no-object-mutation
                window.guardian.spaTransition = true;
              }
            }
            if (window.ga) {
              window.ga("send", "pageview", {
                location: location.href,
                page: location.pathname + location.search,
                dimension12: this.INTCMP,
                dimension29: MMA_AB_TEST_DIMENSION_VALUE
              });
              // TODO add ophan pageViewId as a GA dimension
              applyAnyOptimiseExperiments();
            }
          }
          return null; // null is a valid React node type, but void is not.
        }}
      </Location>
    );
  }
}
