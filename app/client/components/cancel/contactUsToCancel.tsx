import { css } from "@emotion/core";
import { LinkButton } from "@guardian/src-button";
import { palette, space } from "@guardian/src-foundations";
import { headline, textSans } from "@guardian/src-foundations/typography";
import React from "react";
import { SelfServiceCancellation } from "../../../shared/productResponse";
import { ProductType } from "../../../shared/productTypes";
import { maxWidth, minWidth } from "../../styles/breakpoints";
import { CallCentreEmailAndNumbers } from "../callCenterEmailAndNumbers";
import { InfoSection } from "../infoSection";
import { NAV_LINKS } from "../nav/navConfig";

interface ContactUsToCancelProps {
  selfServiceCancellation: SelfServiceCancellation;
  productType: ProductType;
}

export const ContactUsToCancel = (props: ContactUsToCancelProps) => {
  const subHeadingTitleCss = `
    ${headline.small()};
    font-weight: bold;
    ${maxWidth.tablet} {
      font-size: 1.25rem;
      line-height: 1.6;
    };
  `;
  const subHeadingBorderTopCss = `
    border-top: 1px solid ${palette.neutral["86"]};
    margin: 50px 0 ${space[5]}px;
  `;
  const subHeadingCss = `
    ${subHeadingBorderTopCss}
    ${subHeadingTitleCss}
  `;
  return (
    <>
      <h2
        css={css`
          ${subHeadingCss}
        `}
      >
        Contact us to cancel
      </h2>
      <p
        css={css`
          ${textSans.medium()}
        `}
      >
        Please contact our Customer Service team. You can find the contact
        details for your region below.
      </p>
      {props.productType.cancellationContactUsWarningSuffix && (
        <InfoSection>
          <strong>Please remember</strong>{" "}
          {props.productType.cancellationContactUsWarningSuffix}
        </InfoSection>
      )}
      <CallCentreEmailAndNumbers
        hideEmailAddress={!props.selfServiceCancellation.shouldDisplayEmail}
        phoneRegionFilterKeys={
          props.selfServiceCancellation.phoneRegionsToDisplay
        }
      />
      <LinkButton
        css={css`
          margin-top: ${space[3]}px;
          ${minWidth.tablet} {
            margin-top: ${space[5]}px;
          }
        `}
        href={NAV_LINKS.accountOverview.link}
        showIcon={false}
      >
        Return to your account
      </LinkButton>
    </>
  );
  // TODO: Ask jian about displaying subscription id
  // Do everything else! (will need new key on productType for warning text about cancellation notice)
};
