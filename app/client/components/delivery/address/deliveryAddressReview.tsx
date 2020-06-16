import { css } from "@emotion/core";
import { Button } from "@guardian/src-button";
import { palette, space } from "@guardian/src-foundations";
import { headline, textSans } from "@guardian/src-foundations/typography";
import { Link, navigate } from "@reach/router";
import React, { useContext, useState } from "react";
import { maxWidth, minWidth } from "../../../styles/breakpoints";
import { CallCentreEmailAndNumbers } from "../../callCenterEmailAndNumbers";
import { NAV_LINKS } from "../../nav/navConfig";
import { PageHeaderContainer, PageNavAndContentContainer } from "../../page";
import { ProductDescriptionListTable } from "../../productDescriptionListTable";
import { ProgressIndicator } from "../../progressIndicator";
import { InfoIconDark } from "../../svgs/infoIconDark";
import {
  RouteableStepProps,
  visuallyNavigateToParent,
  WizardStep
} from "../../wizardRouterAdapter";
import { DeliveryAddressDisplay } from "./deliveryAddressDisplay";
import {
  AddressChangedInformationContext,
  convertToDescriptionListData,
  NewDeliveryAddressContext
} from "./deliveryAddressFormContext";

export const DeliveryAddressReview = (props: RouteableStepProps) => (
  <DeliveryAddressReviewFC {...props} />
);

const DeliveryAddressReviewFC = (props: RouteableStepProps) => {
  const newDeliveryAddressContext = useContext(NewDeliveryAddressContext);
  const addressChangedInformationContext = useContext(
    AddressChangedInformationContext
  );

  const [
    showTopCallCentreNumbers,
    setTopCallCentreNumbersVisibility
  ] = useState<boolean>(false);

  if (!newDeliveryAddressContext.newDeliveryAddress?.addressLine1) {
    visuallyNavigateToParent(props);
  }

  const subHeadingCss = `
    border-top: 1px solid ${palette.neutral["86"]};
    ${headline.small()};
    font-weight: bold;
    margin-top: 50px;
    ${maxWidth.tablet} {
      font-size: 1.25rem;
      line-height: 1.6;
    };
  `;

  const dtCss: string = `
    font-weight: bold;
    display: inline-block;
    vertical-align: top;
    min-width: 12ch;
  `;
  const ddCss: string = `
    margin: 0;
    display: inline-block;
    vertical-align: top;
    min-width: 12ch;
  `;

  return (
    <WizardStep routeableStepProps={props}>
      <PageHeaderContainer
        title={
          <span
            css={css`
              ::first-letter {
                text-transform: capitalize;
              }
            `}
          >
            <span
              css={css`
                display: none;
                ${minWidth.tablet} {
                  display: inline;
                }
              `}
            >
              Update{" "}
            </span>
            delivery details
          </span>
        }
        breadcrumbs={[
          {
            title: NAV_LINKS.accountOverview.title,
            link: NAV_LINKS.accountOverview.link
          },
          {
            title: "Edit delivery address",
            currentPage: true
          }
        ]}
      />
      <PageNavAndContentContainer selectedNavItem={NAV_LINKS.accountOverview}>
        <ProgressIndicator
          steps={[
            { title: "Update" },
            { title: "Review", isCurrentStep: true },
            { title: "Confirmation" }
          ]}
          additionalCSS={css`
            margin-top: ${space[5]}px;
          `}
        />
        <h2
          css={css`
            ${subHeadingCss}
          `}
        >
          Review address details
        </h2>
        <div>
          {addressChangedInformationContext.length > 1 && (
            <p
              css={css`
                ${textSans.medium()};
                background-color: ${palette.neutral[97]};
                padding: ${space[5]}px ${space[5]}px ${space[5]}px 49px;
                margin-bottom: 12px;
                position: relative;
              `}
            >
              <i
                css={css`
                  width: 17px;
                  height: 17px;
                  position: absolute;
                  top: ${space[5]}px;
                  left: ${space[5]}px;
                `}
              >
                <InfoIconDark fillColor={palette.brand[500]} />
              </i>
              Please note that changing your address here will update the
              delivery address for all of your subscriptions.
            </p>
          )}
          <section
            css={css`
              border: 1px solid ${palette.neutral["86"]};
              margin-top: ${space[5]}px;
            `}
          >
            <h2
              css={css`
                margin: 0;
                padding: ${space[3]}px;
                background-color: ${palette.neutral["97"]};
                border-bottom: 1px solid ${palette.neutral["86"]};
                ${textSans.medium({ fontWeight: "bold" })};
                ${minWidth.tablet} {
                  padding: ${space[3]}px ${space[5]}px;
                }
              `}
            >
              Delivery address
              {props.productType.delivery?.enableDeliveryInstructionsUpdate &&
                " and instructions"}
            </h2>
            <dl
              css={css`
                padding: 0 ${space[3]}px;
                ${textSans.medium()};
                display: flex;
                flex-wrap: wrap;
                flex-direction: column;
                justify-content: space-between;
                ${minWidth.tablet} {
                  padding: 0 ${space[5]}px;
                }
              `}
            >
              <div
                css={css`
                  flex-grow: 1;
                `}
              >
                <dt
                  css={css`
                    ${dtCss}
                  `}
                >
                  Address
                </dt>
                <dd
                  css={css`
                    ${ddCss}
                  `}
                >
                  {newDeliveryAddressContext.newDeliveryAddress && (
                    <DeliveryAddressDisplay
                      {...newDeliveryAddressContext.newDeliveryAddress}
                    />
                  )}
                </dd>
              </div>
              <div
                css={css`
                  flex-grow: 1;
                  margin-top: 16px;
                  ${minWidth.tablet} {
                    margin-top: 0;
                  }
                `}
              >
                <dt
                  css={css`
                    ${dtCss}
                  `}
                >
                  Instruction
                </dt>
                <dd
                  css={css`
                    ${ddCss}
                  `}
                >
                  {newDeliveryAddressContext.newDeliveryAddress?.instructions ||
                    "-"}
                </dd>
              </div>
            </dl>
          </section>
          <p
            css={css`
              ${textSans.medium()};
              margin-top: ${space[9]}px;
            `}
          >
            I understand that this address change will affect the following
            subscriptions
          </p>
          <ProductDescriptionListTable
            content={convertToDescriptionListData(
              addressChangedInformationContext
            )}
            seperateEachRow
          />
          <div
            css={css`
              margin-top: ${space[5]}px;
              * {
                display: inline-block;
              }
              ${minWidth.tablet} {
                margin-top: ${space[6]}px;
              }
            `}
          >
            <Button
              onClick={() => {
                (props.navigate || navigate)("confirmed");
              }}
            >
              Submit details
            </Button>
            <Link
              to={".."}
              css={css`
                ${textSans.medium()};
                font-weight: bold;
                margin-left: 22px;
                color: ${palette.brand.main};
              `}
            >
              Go back
            </Link>
          </div>
          <p
            css={css`
              ${textSans.medium()};
              margin-top: ${space[12]}px;
              color: ${palette.neutral[46]};
            `}
          >
            If you need seperate delivery addresses for each of your
            subscriptions, please{" "}
            <span
              css={css`
                cursor: pointer;
                color: ${palette.brand[500]};
                text-decoration: underline;
              `}
              onClick={() =>
                setTopCallCentreNumbersVisibility(!showTopCallCentreNumbers)
              }
            >
              contact us
            </span>
            .
          </p>
          {showTopCallCentreNumbers && <CallCentreEmailAndNumbers />}
        </div>
      </PageNavAndContentContainer>
    </WizardStep>
  );
};
