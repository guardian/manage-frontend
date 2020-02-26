import { css } from "@emotion/core";
import { space } from "@guardian/src-foundations";
import { palette } from "@guardian/src-foundations";
import { headline } from "@guardian/src-foundations/typography";
import { textSans } from "@guardian/src-foundations/typography";
import { Link } from "@reach/router";
import moment from "moment";
import React, { useContext } from "react";
import { getMainPlan } from "../../../../shared/productResponse";
import {
  DeliveryRecordApiItem,
  PaidSubscriptionPlan,
  Subscription
} from "../../../../shared/productResponse";
import { maxWidth, minWidth } from "../../../styles/breakpoints";
import { LinkButton } from "../../buttons";
import { navLinks } from "../../nav";
import { PageHeaderContainer, PageNavAndContentContainer } from "../../page";
import { ErrorIcon } from "../../svgs/errorIcon";
import { InfoIconDark } from "../../svgs/infoIconDark";
import { RouteableStepProps, WizardStep } from "../../wizardRouterAdapter";
import { DeliveryRecordCard } from "./deliveryRecordCard";
import {
  DeliveryRecordsRouteableStepProps,
  PageStatus
} from "./deliveryRecords";
import {
  createDeliveryRecordsProblemPost,
  DeliveryRecordsApiAsyncLoader,
  DeliveryRecordsResponse
} from "./deliveryRecordsApi";
import {
  DeliveryRecordCreditContext,
  DeliveryRecordsProblemContext,
  DeliveryRecordsProblemPostPayloadContext
} from "./deliveryRecordsProblemContext";

const renderDeliveryRecordsConfirmation = (
  props: DeliveryRecordsRouteableStepProps,
  subscription: Subscription
) => (data: DeliveryRecordsResponse) => {
  const mainPlan = getMainPlan(subscription) as PaidSubscriptionPlan;

  return (
    <DeliveryRecordsProblemConfirmationFC
      data={data}
      routeableStepProps={props}
      subscriptionId={subscription.subscriptionId}
      subscriptionCurrency={mainPlan.currency}
    />
  );
};

interface DeliveryRecordsProblemConfirmationFCProps {
  data: DeliveryRecordsResponse;
  routeableStepProps: RouteableStepProps;
  subscriptionId: string;
  subscriptionCurrency: string;
}

const DeliveryRecordsProblemConfirmationFC = (
  props: DeliveryRecordsProblemConfirmationFCProps
) => {
  const deliveryIssuePostPayload = useContext(
    DeliveryRecordsProblemPostPayloadContext
  );
  const deliveryProblemCredit = useContext(DeliveryRecordCreditContext);
  const filteredData = props.data.results.filter(
    (record, index) =>
      deliveryIssuePostPayload?.deliveryRecords?.findIndex(
        affectedRecord => affectedRecord.id === record.id
      ) !== -1
  );

  const problemCaseId = filteredData.find(record => record.problemCaseId)
    ?.problemCaseId;
  const problemReferenceId = problemCaseId
    ? props.data.deliveryProblemMap[problemCaseId]?.ref
    : "-";

  const dtCss: string = `
    font-weight: 500; 
    display: inline-block;
    vertical-align: top;
    min-width: 12ch;
    ${minWidth.tablet} {
      min-width: 16ch;
    }
  `;
  const ddCss: string = `
    margin: 0;
    display: inline-block;
    vertical-align: top;
  `;
  return (
    <WizardStep
      routeableStepProps={props.routeableStepProps}
      hideBackButton
      fullWidth
    >
      <PageHeaderContainer selectedNavItem={navLinks.subscriptions}>
        <h1>Delivery history</h1>
      </PageHeaderContainer>
      <PageNavAndContentContainer selectedNavItem={navLinks.subscriptions}>
        <h2
          css={css`
            border-top: 1px solid ${palette.neutral["86"]};
            ${headline.small()};
            font-weight: bold;
            ${maxWidth.tablet} {
              font-size: 1.25rem;
              line-height: 1.6;
            }
          `}
        >
          Delivery report confirmation
        </h2>
        <p>Your delivery problem report has been successfully submitted.</p>
        <span
          css={css`
            position: relative;
            display: block;
            margin: ${space[3]}px 0;
            padding: ${space[3]}px ${space[3]}px ${space[3]}px
              ${space[3] * 2 + 17}px;
            background-color: ${deliveryProblemCredit?.showCredit
              ? "transparent"
              : palette.neutral[97]};
            ${textSans.small()};
            ${minWidth.tablet} {
              margin: ${space[5]}px 0;
            }
          `}
        >
          <i
            css={css`
              position: absolute;
              top: ${deliveryProblemCredit?.showCredit ? "2" : space[3]}px;
              left: ${deliveryProblemCredit?.showCredit ? 0 : `${space[3]}px`};
            `}
          >
            <InfoIconDark fillColor={palette.brand.bright} />
          </i>
          {deliveryProblemCredit?.showCredit
            ? "Thank you for reporting your delivery problem. We will credit you for the affected issues and apologise for any inconvenience caused. We monitor these reports closely and use them to improve our service."
            : "Your case is high priority. Our customer service team will try their best to contact you within 48 hours to resolve the issue."}
        </span>
        <section
          css={css`
            border: 1px solid ${palette.neutral["86"]};
            margin-bottom: ${space[9]}px;
          `}
        >
          <h2
            css={css`
              margin: 0;
              padding: 14px ${space[3]}px;
              background-color: ${palette.neutral["97"]};
              border-bottom: 1px solid ${palette.neutral["86"]};
              ${textSans.medium({ fontWeight: "bold" })};
              ${minWidth.tablet} {
                padding: 14px ${space[5]}px;
              }
            `}
          >
            Reported delivery problems
          </h2>
          <dl
            css={css`
              padding: 0 ${space[3]}px;
              ${textSans.medium()};
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
              ${minWidth.tablet} {
                padding: 0 ${space[5]}px;
              }
            `}
          >
            <div
              css={css`
                ${minWidth.tablet} {
                  min-width: 50%;
                }
              `}
            >
              <dt
                css={css`
                  ${dtCss}
                `}
              >
                Reference:
              </dt>
              <dd
                css={css`
                  ${ddCss}
                  ${minWidth.tablet} {
                    min-width: 12ch;
                  }
                `}
              >
                {problemReferenceId}
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
                Status:
              </dt>
              <dd
                css={css`
                  ${ddCss}
                `}
              >
                <span
                  css={css`
                    display: block;
                    font-weight: bold;
                    padding-left: 30px;
                    position: relative;
                  `}
                >
                  <i
                    css={css`
                      position: absolute;
                      top: 0;
                      left: 0;
                    `}
                  >
                    <ErrorIcon fill={palette.brandYellow[300]} />
                  </i>
                  Reported
                </span>
              </dd>
            </div>
            <div
              css={css`
                flex-basis: 100%;
                height: 0;
                ${minWidth.tablet} {
                  margin-top: ${space[5]}px;
                }
              `}
            />
            <div
              css={css`
                margin-top: 16px;
                ${minWidth.tablet} {
                  margin-top: 0;
                  min-width: 50%;
                }
              `}
            >
              <dt
                css={css`
                  ${dtCss}
                `}
              >
                Date reported:
              </dt>
              <dd
                css={css`
                  ${ddCss}
                  ${minWidth.tablet} {
                    min-width: 12ch;
                  }
                `}
              >
                {moment().format("D MMM YYYY")}
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
                Subscription ID:
              </dt>
              <dd
                css={css`
                  ${ddCss}
                `}
              >
                {props.subscriptionId}
              </dd>
            </div>
            <div
              css={css`
                flex-basis: 100%;
                height: 0;
                ${minWidth.tablet} {
                  margin-top: ${space[5]}px;
                }
              `}
            />
            <div
              css={css`
                margin-top: 16px;
                ${minWidth.tablet} {
                  margin-top: 0;
                  min-width: 50%;
                }
              `}
            >
              <dt
                css={css`
                  ${dtCss}
                `}
              >
                Product:
              </dt>
              <dd
                css={css`
                  ${ddCss}
                  ${minWidth.tablet} {
                    min-width: 12ch;
                  }
                `}
              >
                {props.routeableStepProps.productType.shortenedFriendlyName}
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
                Contact number:
              </dt>
              <dd
                css={css`
                  ${ddCss}
                `}
              >
                {"-" ||
                  Object.entries(props.data.contactPhoneNumbers)
                    .filter(
                      phoneNumber =>
                        phoneNumber[0].toLowerCase() !== "id" && phoneNumber[1]
                    )
                    .map((phoneNumber, index) => (
                      <span
                        key={`phoneNo-${index}`}
                        css={css`
                          display: block;
                          margin-bottom: ${space[3]};
                        `}
                      >
                        {phoneNumber[1]}
                      </span>
                    ))}
              </dd>
            </div>
            <div
              css={css`
                flex-basis: 100%;
                height: 0;
                ${minWidth.tablet} {
                  margin-top: ${space[5]}px;
                }
              `}
            />
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
                Selected Issue(s):
              </dt>
              <dd
                css={css`
                  ${ddCss}
                `}
              >
                {deliveryIssuePostPayload?.deliveryRecords?.length}
              </dd>
            </div>
          </dl>
          <div
            css={css`
              padding: 0 ${space[3]}px;
              margin-bottom: ${space[5]}px;
              ${minWidth.tablet} {
                padding: 0 ${space[5]}px;
              }
            `}
          >
            {props.data.results.length ? (
              filteredData.map(
                (deliveryRecord: DeliveryRecordApiItem, listIndex) => (
                  <DeliveryRecordCard
                    key={deliveryRecord.id}
                    deliveryRecord={deliveryRecord}
                    listIndex={listIndex}
                    pageStatus={PageStatus.REPORT_ISSUE_CONFIRMATION}
                    deliveryProblemMap={props.data.deliveryProblemMap}
                    recordCurrency={props.subscriptionCurrency}
                  />
                )
              )
            ) : (
              <p>There aren't any delivery records to show you yet</p>
            )}
          </div>
          <span
            css={css`
              position: relative;
              display: block;
              margin: ${space[3]}px;
              padding: ${deliveryProblemCredit?.showCredit
                ? `0 ${space[5]}px 0 ${space[5] + space[2]}px`
                : `${space[3]}px ${space[3]}px ${space[3]}px ${space[3] * 2 +
                    17}px`};
              background-color: ${palette.neutral[97]};
              ${textSans.small()};
              ${minWidth.tablet} {
                margin: ${space[5]}px;
              }
            `}
          >
            <i
              css={css`
                position: absolute;
                top: ${space[3]}px;
                left: ${space[3]}px;
              `}
            >
              <InfoIconDark fillColor={palette.brand.bright} />
            </i>
            {
              "Before you go, please take a moment to check your current delivery address is update to date. "
            }
            <Link
              css={{
                textDecoration: "underline",
                color: palette.brand[500],
                ":visited": { color: palette.brand[500] }
              }}
              to={navLinks.subscriptions.link}
            >
              {"View address"}
            </Link>
          </span>
          {deliveryProblemCredit?.showCredit && (
            <dl
              css={css`
                ${textSans.medium()};
                padding: ${space[5]}px;
                margin: ${space[5]}px;
                background-color: ${palette.neutral["97"]};
              `}
            >
              <div
                css={css`
                  display: inline-block;
                `}
              >
                <dt
                  css={css`
                    display: inline-block;
                    font-weight: bold;
                  `}
                >
                  Credit amount:
                </dt>
                <dd
                  css={css`
                    display: inline-block;
                    min-width: 9ch;
                  `}
                >
                  {deliveryProblemCredit.creditAmount}
                </dd>
              </div>
              <div
                css={css`
                  display: inline-block;
                `}
              >
                <dt
                  css={css`
                    display: inline-block;
                    font-weight: bold;
                  `}
                >
                  Credit date:
                </dt>
                <dd
                  css={css`
                    display: inline-block;
                  `}
                >
                  {deliveryProblemCredit.creditDate}
                </dd>
              </div>
            </dl>
          )}
        </section>
        <LinkButton
          to={navLinks.subscriptions.link}
          text={"Go back to subscriptions"}
          colour={palette.brand.main}
          textColour={palette.neutral[100]}
          right
        />
      </PageNavAndContentContainer>
    </WizardStep>
  );
};

export const DeliveryRecordsProblemConfirmation = (
  props: DeliveryRecordsRouteableStepProps
) => {
  const deliveryIssuePostPayload = useContext(
    DeliveryRecordsProblemPostPayloadContext
  );
  const deliveryRecordsProblemContext = useContext(
    DeliveryRecordsProblemContext
  );

  return (
    <DeliveryRecordsApiAsyncLoader
      render={renderDeliveryRecordsConfirmation(
        props,
        deliveryRecordsProblemContext.subscription
      )}
      fetch={createDeliveryRecordsProblemPost(
        deliveryRecordsProblemContext.subscription.subscriptionId,
        deliveryIssuePostPayload
      )}
      loadingMessage={"Reporting problem..."}
    />
  );
};
