import { css } from "@emotion/core";
import { space } from "@guardian/src-foundations";
import { Location } from "@reach/router";
import React from "react";
import {
  GROUPED_PRODUCT_TYPES,
  PRODUCT_TYPES,
  shouldHaveHolidayStopsFlow
} from "../../shared/productTypes";
import { MenuSpecificNavItem, NAV_LINKS } from "./nav/navConfig";
import { PageContainer, WithStandardTopMargin } from "./page";
import { SectionHeader } from "./sectionHeader";
import { SectionPageContainer } from "./sectionPageContainer";
import { Spinner } from "./spinner";

interface LocationObject {
  title: string;
  path: string;
  selectedNavItem: MenuSpecificNavItem;
}

const manageProductLocationObjects: LocationObject[] = Object.values(
  GROUPED_PRODUCT_TYPES
).map(groupedProductType => ({
  title: `Manage ${groupedProductType.shortFriendlyName ||
    groupedProductType.friendlyName}`,
  path: `/${groupedProductType.urlPart}`,
  selectedNavItem: NAV_LINKS.accountOverview
}));

const cancellationFlowLocationObjects: LocationObject[] = Object.values(
  PRODUCT_TYPES
).map(productType => ({
  title: `Cancel ${productType.shortFriendlyName || productType.friendlyName}`,
  path: `/cancel/${productType.urlPart}`,
  selectedNavItem: NAV_LINKS.accountOverview
}));

const paymentUpdateFlowLocationObjects: LocationObject[] = Object.values(
  PRODUCT_TYPES
).map(productType => ({
  title: "Manage payment method",
  path: `/payment/${productType.urlPart}`,
  selectedNavItem: NAV_LINKS.accountOverview
}));

const holidaysOverviewLocationObjects: LocationObject[] = Object.values(
  PRODUCT_TYPES
)
  .filter(shouldHaveHolidayStopsFlow)
  .map(productType => ({
    title: "Manage suspensions",
    path: `/suspend/${productType.urlPart}`,
    selectedNavItem: NAV_LINKS.accountOverview
  }));

const deliveryAddressFormLocationObjects: LocationObject[] = Object.values(
  PRODUCT_TYPES
)
  .filter(shouldHaveHolidayStopsFlow)
  .map(productType => ({
    title: "Update delivery details",
    path: `/delivery/${productType.urlPart}/address`,
    selectedNavItem: NAV_LINKS.accountOverview
  }));

const deliveryRecordsLocationObjects: LocationObject[] = Object.values(
  PRODUCT_TYPES
)
  .filter(shouldHaveHolidayStopsFlow)
  .map(productType => ({
    title: "Delivery history",
    path: `/delivery/${productType.urlPart}/records`,
    selectedNavItem: NAV_LINKS.accountOverview
  }));

const MMALocationObjectArr: LocationObject[] = [
  {
    title: "Account overview",
    path: "/",
    selectedNavItem: NAV_LINKS.accountOverview
  },
  {
    title: "Billing",
    path: "/billing",
    selectedNavItem: NAV_LINKS.billing
  },
  ...manageProductLocationObjects,
  ...cancellationFlowLocationObjects,
  ...paymentUpdateFlowLocationObjects,
  ...holidaysOverviewLocationObjects,
  ...deliveryAddressFormLocationObjects,
  ...deliveryRecordsLocationObjects,
  {
    title: "Emails & marketing",
    path: "/email-prefs",
    selectedNavItem: NAV_LINKS.emailPrefs
  },
  {
    title: "Edit your profile",
    path: "/public-settings",
    selectedNavItem: NAV_LINKS.profile
  },
  {
    title: "Settings",
    path: "/account-settings",
    selectedNavItem: NAV_LINKS.settings
  },
  {
    title: "Help",
    path: "/help",
    selectedNavItem: NAV_LINKS.help
  }
];

const nonMMALocationObjectArr: LocationObject[] = [
  {
    title: "Help Centre",
    path: "/help-centre",
    selectedNavItem: NAV_LINKS.help
  },
  {
    title: "Need to contact us about something?",
    path: "/contact-us",
    selectedNavItem: NAV_LINKS.help
  }
];

const PageSkeleton = () => {
  return (
    <Location>
      {({ location }) => {
        const selectedMMALocationObject = MMALocationObjectArr.filter(
          currentObject => location.pathname === currentObject.path
        )[0];
        const selectedNonMMALocationObject = nonMMALocationObjectArr.filter(
          currentObject => location.pathname.startsWith(currentObject.path)
        )[0];

        if (selectedNonMMALocationObject) {
          return (
            <>
              <SectionHeader title={selectedNonMMALocationObject.title} />
              <SectionPageContainer sectionTitle="&nbsp;">
                <div
                  css={css`
                    margin-bottom: ${space[24]}px;
                  `}
                >
                  <WithStandardTopMargin>
                    <Spinner />
                  </WithStandardTopMargin>
                  <div style={{ height: "50vh" }} />
                </div>
              </SectionPageContainer>
            </>
          );
        }

        if (selectedMMALocationObject) {
          return (
            <PageContainer
              selectedNavItem={selectedMMALocationObject.selectedNavItem}
              pageTitle={selectedMMALocationObject.title}
            >
              <WithStandardTopMargin>
                <Spinner />
              </WithStandardTopMargin>
            </PageContainer>
          );
        }
      }}
    </Location>
  );
};

export default PageSkeleton;
