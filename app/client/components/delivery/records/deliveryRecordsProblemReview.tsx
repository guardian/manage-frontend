import { css } from "@emotion/core";
import { Button } from "@guardian/src-button";
import { space } from "@guardian/src-foundations";
import { palette } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import { headline } from "@guardian/src-foundations/typography";
import moment from "moment";
import React, { useContext, useState } from "react";
import { DeliveryRecordApiItem } from "../../../../shared/productResponse";
import { minWidth } from "../../../styles/breakpoints";
import { CallCentreEmailAndNumbers } from "../../callCenterEmailAndNumbers";
import {
  getPotentialHolidayStopsFetcher,
  PotentialHolidayStopsAsyncLoader,
  PotentialHolidayStopsResponse
} from "../../holiday/holidayStopApi";
import { navLinks } from "../../nav";
import { PageHeaderContainer, PageNavAndContentContainer } from "../../page";
import { InfoIconDark } from "../../svgs/infoIconDark";
import { WizardStep } from "../../wizardRouterAdapter";
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
  const [phoneNumbers, setPhoneNumbers] = useState<
    ContactPhoneNumbers | undefined
  >(deliveryProblemContext?.contactPhoneNumbers);
  const [creditDate, setCreditDate] = useState<string | null>();
  const [showCallCenterNumbers, setShowCallCenterNumbers] = useState<boolean>(
    false
  );

  const problemStartDate =
    deliveryProblemContext?.affectedRecords[
      deliveryProblemContext.affectedRecords.length - 1
    ].deliveryDate;
  const problemEndDate =
    deliveryProblemContext?.affectedRecords[0].deliveryDate;

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

  const renderReviewDetails = (
    potentialHolidayStopsResponseWithCredits: PotentialHolidayStopsResponse
  ) => {
    if (!deliveryProblemContext) {
      return <span>Something strange is going on</span>;
    }
    const totalCreditAmount = potentialHolidayStopsResponseWithCredits
      .potentials.length
      ? Math.abs(
          potentialHolidayStopsResponseWithCredits.potentials
            .flatMap<number>(x => [x.credit as number])
            .reduce((accumulator, currentValue) =>
              Math.abs(accumulator + currentValue)
            )
        )
      : 0;
    setCreditDate(
      potentialHolidayStopsResponseWithCredits.nextInvoiceDateAfterToday
    );

    return (
      <DeliveryRecordsProblemPostPayloadContext.Provider
        value={{
          productName: deliveryProblemContext?.apiProductName,
          description: deliveryProblemContext?.problemType?.message,
          problemType:
            props.productType.delivery.records.availableProblemTypes[
              Number(deliveryProblemContext?.problemType?.category)
            ].label,
          repeatDeliveryProblem: deliveryProblemContext?.repeatDeliveryProblem,
          deliveryRecords: deliveryProblemContext?.affectedRecords.map(
            record => {
              const matchingHolidayStop = potentialHolidayStopsResponseWithCredits.potentials.find(
                x => x.publicationDate === record.deliveryDate
              );
              return {
                id: record.id,
                creditAmount: matchingHolidayStop?.credit,
                invoiceDate: creditDate
              };
            }
          ),
          ...((phoneNumbers?.Phone ||
            phoneNumbers?.HomePhone ||
            phoneNumbers?.MobilePhone ||
            phoneNumbers?.OtherPhone) && {
            newContactPhoneNumbers: phoneNumbers
          })
        }}
      >
        <DeliveryRecordCreditContext.Provider
          value={{
            showCredit: deliveryProblemContext.showProblemCredit,
            creditAmount: `${
              deliveryProblemContext?.subscriptionCurrency
            }${totalCreditAmount.toFixed(2)}`,
            creditDate: creditDate && moment(creditDate).format("DD MMM YYYY")
          }}
        >
          <WizardStep routeableStepProps={props} hideBackButton fullWidth>
            <PageHeaderContainer selectedNavItem={navLinks.subscriptions}>
              <h1>Delivery history</h1>
            </PageHeaderContainer>
            <PageNavAndContentContainer
              selectedNavItem={navLinks.subscriptions}
            >
              <h2
                css={css`
                  ${headline.small({ fontWeight: "bold" })};
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
                  Step 3. Please review your report details
                </h2>
                {deliveryProblemContext && (
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
                            props.productType.delivery.records
                              .availableProblemTypes[
                              Number(
                                deliveryProblemContext.problemType.category
                              )
                            ].label}
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
                deliveryProblemContext.showProblemCredit ? (
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
                          ${minWidth.tablet} {
                            margin-left: ${space[9]}px;
                            min-width: 9ch;
                          }
                        `}
                      >
                        {deliveryProblemContext?.subscriptionCurrency}
                        {totalCreditAmount.toFixed(2)}
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
                        {creditDate && moment(creditDate).format("DD MMM YYYY")}
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
                      high priority. Our customer service team will try their
                      best to contact you within 48 hours to resolve the issue.
                    </span>
                    {phoneNumbers && (
                      <UserPhoneNumber
                        // existingPhoneNumber={phoneNumbers}
                        existingPhoneNumbers={{
                          id: "123",
                          Phone: "1234",
                          HomePhone: "2345",
                          MobilePhone: "3456",
                          OtherPhone: "4567"
                        }}
                        callback={(newNumber: ContactPhoneNumbers) => {
                          setPhoneNumbers(newNumber);
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
                Is your delivery problem urgent? Or want to report a problem
                older than the above?{" "}
                <span
                  css={css`
                    color: ${palette.brand[500]};
                    text-decoration: underline;
                    cursor: pointer;
                  `}
                  onClick={() =>
                    setShowCallCenterNumbers(!showCallCenterNumbers)
                  }
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

  if (!deliveryProblemContext) {
    return <span>Whoops, somethings gone wrong</span>;
  }
  return (
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
  );
};
