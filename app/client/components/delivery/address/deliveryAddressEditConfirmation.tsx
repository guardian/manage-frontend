import { css } from "@emotion/core";
import { LinkButton } from "@guardian/src-button";
import { palette, space } from "@guardian/src-foundations";
import { headline, textSans } from "@guardian/src-foundations/typography";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { maxWidth, minWidth } from "../../../styles/breakpoints";
import AsyncLoader from "../../asyncLoader";
import { CallCentreEmailAndNumbers } from "../../callCenterEmailAndNumbers";
import { GenericErrorScreen } from "../../genericErrorScreen";
import { navLinks } from "../../nav";
import { PageHeaderContainer, PageNavAndContentContainer } from "../../page";
import { ProductDescriptionListTable } from "../../productDescriptionListTable";
import { TickInCircle } from "../../svgs/tickInCircle";
import {
  RouteableStepProps,
  visuallyNavigateToParent,
  WizardStep
} from "../../wizardRouterAdapter";
import { updateAddressFetcher } from "./deliveryAddressApi";
import { DeliveryAddressDisplay } from "./deliveryAddressDisplay";
import {
  AddressChangedInformationContext,
  ContactIdContext,
  isAddress,
  NewDeliveryAddressContext,
  ProductName
} from "./deliveryAddressFormContext";
import { ProgressIndicator } from "./progressIndicator";

const renderConfirmation = (props: RouteableStepProps) => () => (
  <ConfirmationFC {...props} />
);

const ConfirmationFC = (props: RouteableStepProps) => {
  const addressContext = useContext(NewDeliveryAddressContext);
  const addressChangedInformationContext = useContext(
    AddressChangedInformationContext
  );
  const productName = useContext(ProductName);

  const [
    showTopCallCentreNumbers,
    setTopCallCentreNumbersVisibility
  ] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      addressContext.addressStateReset?.();
    };
  }, []);

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
    <WizardStep routeableStepProps={props} hideBackButton fullWidth>
      {isAddress(addressContext.newDeliveryAddress) ? (
        <>
          <PageHeaderContainer selectedNavItem={navLinks.subscriptions}>
            <h1
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
            </h1>
          </PageHeaderContainer>
          <PageNavAndContentContainer selectedNavItem={navLinks.subscriptions}>
            <ProgressIndicator
              steps={[
                { title: "Update" },
                { title: "Review" },
                { title: "Confirmation", isCurrentStep: true }
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
              Confirmation
            </h2>
            <SuccessMessage
              message={`We have successfully updated your delivery details for your ${productName}. You will shortly receive a confirmation email.`}
            />
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
                Delivery address and instructions
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
                    {addressContext.newDeliveryAddress && (
                      <DeliveryAddressDisplay
                        {...addressContext.newDeliveryAddress}
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
                    Instructions
                  </dt>
                  <dd
                    css={css`
                      ${ddCss}
                    `}
                  >
                    {addressContext.newDeliveryAddress?.instructions || "-"}
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
              content={addressChangedInformationContext}
              seperateEachRow
            />
            <LinkButton
              css={css`
                margin-top: ${space[3]}px;
                ${minWidth.tablet} {
                  margin-top: ${space[5]}px;
                }
              `}
              href={navLinks.subscriptions.link}
            >
              Go back to Subscriptions
            </LinkButton>
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
          </PageNavAndContentContainer>
        </>
      ) : (
        visuallyNavigateToParent(props)
      )}
    </WizardStep>
  );
};

export const DeliveryAddressEditConfirmation = (props: RouteableStepProps) => {
  const addressContext = useContext(NewDeliveryAddressContext);
  const contactIdContext = useContext(ContactIdContext);
  const addressChangedInformationContext = useContext(
    AddressChangedInformationContext
  );

  const addressChangeEmailCopy = [
    ...addressChangedInformationContext
      // tslint:disable-next-line: no-bitwise
      .filter((_, i) => !(i & 1))
      .map((element, index) => {
        const originalAffectedDate =
          addressChangedInformationContext[index * 2 + 1].value;
        return {
          name: element.title,
          subId: element.value,
          date:
            originalAffectedDate && originalAffectedDate !== "-"
              ? `as of front cover dated ${moment(
                  `${originalAffectedDate}`,
                  "D MMM YYYY"
                ).format("dddd Do MMMM YYYY")}`
              : ""
        };
      })
      .map(element => `${element.name} (${element.subId}) ${element.date}`),
    "",
    `(as displayed on confirmation page at ${moment().format(
      "H:mm:ss zz [on] Do MMMM YYYY"
    )})`
  ].join("\n");

  return addressContext.newDeliveryAddress ? (
    <AsyncLoader
      render={renderConfirmation(props)}
      fetch={updateAddressFetcher(
        {
          ...addressContext.newDeliveryAddress,
          addressChangeInformation: addressChangeEmailCopy
        },
        contactIdContext
      )}
      readerOnOK={(resp: Response) => resp.text()}
      loadingMessage={"Updating delivery address details..."}
    />
  ) : (
    <GenericErrorScreen loggingMessage="delivery address confirmation page - no new delivery address context" />
  );
};

interface SuccessMessageProps {
  message: string;
}
const SuccessMessage = (props: SuccessMessageProps) => (
  <div
    css={css`
      position: relative;
      width: 100%;
      text-align: left;
      border: 4px solid ${palette.success.main};
      box-sizing: border-box;
      padding: 14px 14px 14px 50px;
      margin-bottom: 50px;
      ${textSans.medium()};
      font-weight: bold;
    `}
  >
    <i
      css={css`
        position: absolute;
        top: 14px;
        left: 14px;
      `}
    >
      <TickInCircle />
    </i>
    {props.message}
  </div>
);
