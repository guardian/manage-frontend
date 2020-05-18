import { css } from "@emotion/core";
import { Button } from "@guardian/src-button";
import { space } from "@guardian/src-foundations";
import { palette } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import { headline } from "@guardian/src-foundations/typography";
import moment from "moment";
import React, { useContext, useState } from "react";
import { formatDateStr } from "../../../../shared/dates";
import { DeliveryRecordApiItem } from "../../../../shared/productResponse";
import { isInAccountOverviewTest } from "../../../accountOverviewRelease";
import { maxWidth, minWidth } from "../../../styles/breakpoints";
import { CallCentreEmailAndNumbers } from "../../callCenterEmailAndNumbers";
import { GenericErrorScreen } from "../../genericErrorScreen";
import {
  getPotentialHolidayStopsFetcher,
  PotentialHolidayStopsAsyncLoader,
  PotentialHolidayStopsResponse,
  RawPotentialHolidayStopDetail
} from "../../holiday/holidayStopApi";
import { navLinks } from "../../nav";
import { PageHeaderContainer, PageNavAndContentContainer } from "../../page";
import { ProgressIndicator } from "../../progressIndicator";
import { InfoIconDark } from "../../svgs/infoIconDark";
import {
  visuallyNavigateToParent,
  WizardStep
} from "../../wizardRouterAdapter";
import { DeliveryRecordCard } from "./deliveryRecordCard";
import {
  DeliveryRecordsRouteableStepProps,
  PageStatus
} from "./deliveryRecords";
import { ContactPhoneNumbers } from "./deliveryRecordsApi";
import {
  DeliveryRecordCreditContext,
  DeliveryRecordsProblemContext,
  DeliveryRecordsProblemPostPayloadContext
} from "./deliveryRecordsProblemContext";
import { UserPhoneNumber } from "./userPhoneNumber";

export const DeliveryRecordsProblemReview = (
  props: DeliveryRecordsRouteableStepProps
) => {
  const deliveryProblemContext = useContext(DeliveryRecordsProblemContext);

  if (!deliveryProblemContext?.affectedRecords.length) {
    return visuallyNavigateToParent(props);
  }

  const problemStartDate =
    deliveryProblemContext?.affectedRecords[
      deliveryProblemContext.affectedRecords.length - 1
    ].deliveryDate;
  const problemEndDate =
    deliveryProblemContext?.affectedRecords[0].deliveryDate;

  const renderReviewDetails = (
    potentialHolidayStopsResponseWithCredits: PotentialHolidayStopsResponse
  ) => {
    const totalCreditAmount: number =
      potentialHolidayStopsResponseWithCredits.potentials.length &&
      potentialHolidayStopsResponseWithCredits.potentials
        .flatMap(x => [Math.abs(x.credit || 0)])
        .reduce((accumulator, currentValue) => accumulator + currentValue);

    return (
      <DeliveryRecordsProblemReviewFC
        {...props}
        showCredit
        creditDate={
          potentialHolidayStopsResponseWithCredits.nextInvoiceDateAfterToday
        }
        relatedPublications={
          potentialHolidayStopsResponseWithCredits.potentials
        }
        totalCreditAmount={totalCreditAmount}
      />
    );
  };

  if (!deliveryProblemContext) {
    return (
      <GenericErrorScreen
        loggingMessage={
          "Got to the review stage of delivery record problem reporting but the context object 'DeliveryRecordsProblemContext' does not seem to exist"
        }
      />
    );
  }

  return deliveryProblemContext.showProblemCredit ? (
    <PotentialHolidayStopsAsyncLoader
      fetch={getPotentialHolidayStopsFetcher(
        deliveryProblemContext?.subscription.subscriptionId,
        moment(problemStartDate),
        moment(problemEndDate),
        deliveryProblemContext.isTestUser
      )}
      render={renderReviewDetails}
      loadingMessage="Generating your report"
    />
  ) : (
    <DeliveryRecordsProblemReviewFC {...props} />
  );
};

interface DeliveryRecordsProblemReviewFCProps
  extends DeliveryRecordsRouteableStepProps {
  showCredit?: true;
  creditDate?: string;
  totalCreditAmount?: number;
  relatedPublications?: RawPotentialHolidayStopDetail[];
}

const DeliveryRecordsProblemReviewFC = (
  props: DeliveryRecordsProblemReviewFCProps
) => {
  const deliveryProblemContext = useContext(DeliveryRecordsProblemContext);
  const [newPhoneNumbers, setPhoneNumbers] = useState<
    ContactPhoneNumbers | undefined
  >(deliveryProblemContext?.contactPhoneNumbers);
  const [showCallCenterNumbers, setShowCallCenterNumbers] = useState<boolean>(
    false
  );

  const dtCss: string = `
    font-weight: bold;
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
    <DeliveryRecordsProblemPostPayloadContext.Provider
      value={{
        productName: deliveryProblemContext?.apiProductName,
        description: deliveryProblemContext?.problemType?.message,
        problemType: deliveryProblemContext?.problemType?.category,
        repeatDeliveryProblem: deliveryProblemContext?.repeatDeliveryProblem,
        deliveryRecords:
          props.showCredit && props.relatedPublications
            ? deliveryProblemContext?.affectedRecords.map(record => {
                const matchingPublication = props.relatedPublications?.find(
                  x => x.publicationDate === record.deliveryDate
                );
                return {
                  id: record.id,
                  creditAmount: matchingPublication?.credit,
                  invoiceDate: matchingPublication
                    ? props.creditDate
                    : undefined
                };
              })
            : deliveryProblemContext?.affectedRecords.map(record => {
                return { id: record.id };
              }),
        ...((newPhoneNumbers?.Phone ||
          newPhoneNumbers?.HomePhone ||
          newPhoneNumbers?.MobilePhone ||
          newPhoneNumbers?.OtherPhone) && {
          newContactPhoneNumbers: newPhoneNumbers
        })
      }}
    >
      <DeliveryRecordCreditContext.Provider
        value={{
          showCredit: deliveryProblemContext.showProblemCredit,
          ...(props.totalCreditAmount && {
            creditAmount: `${
              deliveryProblemContext?.subscriptionCurrency
            }${props.totalCreditAmount.toFixed(2)}`
          }),
          ...(props.creditDate && {
            creditDate: props.creditDate && formatDateStr(props.creditDate)
          })
        }}
      >
        <WizardStep routeableStepProps={props} hideBackButton fullWidth>
          <PageHeaderContainer
            title="Delivery history"
            breadcrumbs={[
              {
                title: navLinks.accountOverview.title,
                link: navLinks.accountOverview.link
              },
              {
                title: "Delivery history",
                currentPage: true
              }
            ]}
          />
          <PageNavAndContentContainer
            selectedNavItem={
              isInAccountOverviewTest()
                ? navLinks.accountOverview
                : navLinks.subscriptions
            }
          >
            <ProgressIndicator
              steps={[
                { title: "Update" },
                { title: "Review", isCurrentStep: true },
                { title: "Confirmation" }
              ]}
              additionalCSS={css`
                margin: ${space[5]}px 0 ${space[12]}px;
              `}
            />
            <h2
              css={css`
                border-top: 1px solid ${palette.neutral["86"]};
                ${headline.small({ fontWeight: "bold" })};
                ${maxWidth.tablet} {
                  font-size: 1.25rem;
                  line-height: 1.6;
                }
              `}
            >
              Delivery report review
            </h2>
            <section
              css={css`
                border: 1px solid ${palette.neutral["86"]};
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
                Step 4. Please review your report details
              </h2>
              {deliveryProblemContext && (
                <dl
                  css={css`
                    padding: 0 ${space[3]}px;
                    ${textSans.medium()};
                    display: flex;
                    flex-wrap: wrap;
                    flex-direction: column;
                    justify-content: space-between;
                    ${minWidth.tablet} {
                      flex-direction: initial;
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
                      Subscription ID:
                    </dt>
                    <dd
                      css={css`
                        ${ddCss}
                      `}
                    >
                      {deliveryProblemContext.subscription.subscriptionId}
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
                        ${minWidth.tablet} {
                          min-width: 10ch;
                        }
                      `}
                    >
                      Product:
                    </dt>
                    <dd
                      css={css`
                        ${ddCss}
                      `}
                    >
                      {deliveryProblemContext.productName}
                    </dd>
                  </div>
                  <div
                    css={css`
                      margin-top: 16px;
                      width: 100%;
                      ${minWidth.tablet} {
                        margin-top: ${space[5]}px;
                      }
                    `}
                  >
                    <dt
                      css={css`
                        ${dtCss}
                      `}
                    >
                      Type of problem:
                    </dt>
                    <dd
                      css={css`
                        ${ddCss}
                        max-width: calc(100% - 12ch);
                        ${minWidth.tablet} {
                          max-width: calc(100% - 16ch);
                        }
                      `}
                    >
                      <h4
                        css={css`
                          ${textSans.medium({ fontWeight: "bold" })};
                          margin: 0;
                        `}
                      >
                        {deliveryProblemContext.problemType &&
                          deliveryProblemContext.problemType.category}
                      </h4>
                      {deliveryProblemContext.problemType?.message && (
                        <p
                          css={css`
                            margin: 0;
                          `}
                        >
                          {deliveryProblemContext.problemType?.message}
                        </p>
                      )}
                    </dd>
                  </div>
                  <div
                    css={css`
                      margin-top: 16px;
                      width: 100%;
                      ${minWidth.tablet} {
                        margin-top: ${space[5]}px;
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
                        max-width: calc(100% - 12ch);
                        ${minWidth.tablet} {
                          max-width: calc(100% - 16ch);
                        }
                      `}
                    >
                      <h4
                        css={css`
                          ${textSans.medium()};
                          margin: 0;
                        `}
                      >
                        {deliveryProblemContext.affectedRecords?.length}
                      </h4>
                    </dd>
                  </div>
                </dl>
              )}
              {deliveryProblemContext &&
              deliveryProblemContext.affectedRecords?.length ? (
                <div
                  css={css`
                    padding: 0 ${space[3]}px;
                    margin-bottom: ${space[3]}px;
                    ${minWidth.tablet} {
                      padding: 0 ${space[5]}px;
                      margin-bottom: ${space[5]}px;
                    }
                  `}
                >
                  {deliveryProblemContext.affectedRecords.map(
                    (deliveryRecord: DeliveryRecordApiItem, listIndex) => (
                      <DeliveryRecordCard
                        key={deliveryRecord.id}
                        deliveryRecord={deliveryRecord}
                        listIndex={listIndex}
                        pageStatus={PageStatus.READ_ONLY}
                        deliveryProblemMap={
                          deliveryProblemContext.deliveryProblemMap
                        }
                      />
                    )
                  )}
                </div>
              ) : (
                <p>There aren't any delivery records to show you yet</p>
              )}
              {deliveryProblemContext &&
              deliveryProblemContext.showProblemCredit &&
              props.totalCreditAmount ? (
                <dl
                  css={css`
                    ${textSans.medium()};
                    padding: ${space[3]}px;
                    margin: ${space[3]}px;
                    background-color: ${palette.neutral["97"]};
                    ${minWidth.tablet} {
                      padding: ${space[5]}px;
                      margin: ${space[5]}px;
                    }
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
                        min-width: 12ch;
                        ${minWidth.tablet} {
                          min-width: 0;
                        }
                      `}
                    >
                      Credit amount:
                    </dt>
                    <dd
                      css={css`
                        display: inline-block;
                        margin-left: 0;
                        font-weight: bold;
                        ${minWidth.tablet} {
                          margin-left: ${space[9]}px;
                          min-width: 9ch;
                        }
                      `}
                    >
                      {deliveryProblemContext?.subscriptionCurrency}
                      {props.totalCreditAmount.toFixed(2)}
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
                        min-width: 12ch;
                        ${minWidth.tablet} {
                          min-width: 0;
                        }
                      `}
                    >
                      Credit date:
                    </dt>
                    <dd
                      css={css`
                        display: inline-block;
                        margin-left: 0;
                        ${minWidth.tablet} {
                          margin-left: ${space[9]}px;
                        }
                      `}
                    >
                      {props.creditDate && formatDateStr(props.creditDate)}
                    </dd>
                  </div>
                </dl>
              ) : (
                <>
                  <span
                    css={css`
                      position: relative;
                      display: block;
                      margin: ${space[3]}px;
                      padding: 0 ${space[3]}px 0 ${space[5] + space[2]}px;
                      ${textSans.medium()};
                      ${minWidth.tablet} {
                        margin: ${space[5]}px;
                        padding: 0 ${space[5]}px 0 ${space[5] + space[2]}px;
                      }
                    `}
                  >
                    <i
                      css={css`
                        position: absolute;
                        top: 4px;
                        left: 0;
                      `}
                    >
                      <InfoIconDark fillColor={palette.brand.bright} />
                    </i>
                    Once you submit your report, your case will be marked as
                    high priority. Our customer service team will try their best
                    to contact you as soon as possible to resolve the issue.
                  </span>
                  {newPhoneNumbers && (
                    <UserPhoneNumber
                      existingPhoneNumbers={
                        deliveryProblemContext?.contactPhoneNumbers
                      }
                      callback={(newNumbers: ContactPhoneNumbers) => {
                        setPhoneNumbers(newNumbers);
                      }}
                    />
                  )}
                </>
              )}
            </section>
            <div
              css={css`
                margin-top: ${space[9]}px;
              `}
            >
              <Button
                onClick={() => {
                  if (props.navigate) {
                    props.navigate("confirmed");
                  }
                }}
              >
                Submit your report
              </Button>
              <Button
                css={css`
                  ${textSans.medium()};
                  background-color: transparent;
                  font-weight: bold;
                  margin-left: 22px;
                  padding: 0;
                  color: ${palette.brand.main};
                  :hover {
                    background-color: transparent;
                  }
                `}
                onClick={() => {
                  if (props.navigate) {
                    deliveryProblemContext.resetDeliveryRecordsPage();
                    props.navigate("..");
                  }
                }}
              >
                Cancel
              </Button>
            </div>
            <p
              css={css`
                ${textSans.medium()};
                margin-top: ${space[9]}px;
                color: ${palette.neutral[46]};
              `}
            >
              Is your delivery problem urgent? Or want to report a problem older
              than the above?{" "}
              <span
                css={css`
                  color: ${palette.brand[500]};
                  text-decoration: underline;
                  cursor: pointer;
                `}
                onClick={() => setShowCallCenterNumbers(!showCallCenterNumbers)}
              >
                Contact us
              </span>
            </p>
            {showCallCenterNumbers && <CallCentreEmailAndNumbers />}
          </PageNavAndContentContainer>
        </WizardStep>
      </DeliveryRecordCreditContext.Provider>
    </DeliveryRecordsProblemPostPayloadContext.Provider>
  );
};
