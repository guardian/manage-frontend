import { css } from "@emotion/core";
import { Button } from "@guardian/src-button";
import { space } from "@guardian/src-foundations";
import { palette } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import { headline } from "@guardian/src-foundations/typography";
import { navigate } from "@reach/router";
import moment from "moment";
import React, { useContext, useState } from "react";
import { DeliveryRecordApiItem } from "../../../../shared/productResponse";
import {
  getPotentialHolidayStopsFetcher,
  PotentialHolidayStopsAsyncLoader,
  PotentialHolidayStopsResponse
} from "../../holiday/holidayStopApi";
import { navLinks } from "../../nav";
import { PageHeaderContainer, PageNavAndContentContainer } from "../../page";
import { InfoIconDark } from "../../svgs/infoIconDark";
import { RouteableStepProps, WizardStep } from "../../wizardRouterAdapter";
import { DeliveryRecordCard } from "./deliveryRecordCard";
import { PageStatus } from "./deliveryRecords";
import { ContactPhoneNumbers } from "./deliveryRecordsApi";
import {
  DeliveryRecordsProblemContext,
  DeliveryRecordsProblemPostPayloadContext
} from "./deliveryRecordsProblemContext";
import { deliveryProblemsRadioArr } from "./deliveryRecordsProblemForm";
import { UserPhoneNumber } from "./userPhoneNumber";

export const DeliveryRecordsProblemReview = (props: RouteableStepProps) => {
  const deliveryIssue = useContext(DeliveryRecordsProblemContext);
  const [phoneNumbers, setPhoneNumbers] = useState<
    ContactPhoneNumbers | undefined
  >(deliveryIssue?.contactPhoneNumbers);

  const problemStartDate =
    deliveryIssue?.affectedRecords[deliveryIssue.affectedRecords.length - 1]
      .deliveryDate;
  const problemEndDate = deliveryIssue?.affectedRecords[0].deliveryDate;

  const dtCss: string = `
    font-weight: 500;
    display: inline-block;
    vertical-align: top;
    min-width: 16ch;
  `;
  const ddCss: string = `
    margin: 0;
    display: inline-block;
    vertical-align: top;
  `;

  const renderExpectedCredit = (
    potentialHolidayStopsResponseWithCredits: PotentialHolidayStopsResponse
  ) => {
    const totalCreditAmount = potentialHolidayStopsResponseWithCredits.potentials
      .flatMap<number>(x => [x.credit as number])
      .reduce((accumulator, currentValue) =>
        Math.abs(accumulator + currentValue)
      );
    return (
      <dl
        css={css`
          ${textSans.medium()};
          padding: ${space[5]}px;
          margin: 0 0 ${space[5]}px;
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
            {deliveryIssue?.subscriptionCurrency}
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
            `}
          >
            Credit date:
          </dt>
          <dd
            css={css`
              display: inline-block;
              min-width: 9ch;
            `}
          >
            08 Jan 2020
          </dd>
        </div>
      </dl>
    );
  };

  return (
    <DeliveryRecordsProblemPostPayloadContext.Provider
      value={{
        productName: deliveryIssue?.productName,
        description: deliveryIssue?.problemType?.message,
        problemType: deliveryIssue?.problemType?.category,
        repeatDeliveryProblem: deliveryIssue?.repeatDeliveryProblem,
        deliveryRecords: deliveryIssue?.affectedRecords.map(record => {
          return {
            id: record.id,
            creditAmount: record.credit?.amount,
            invoiveDate: record.credit?.invoiceDate
          };
        }),
        ...(phoneNumbers && { newContactPhoneNumbers: phoneNumbers })
      }}
    >
      <WizardStep routeableStepProps={props} hideBackButton fullWidth>
        <PageHeaderContainer selectedNavItem={navLinks.subscriptions}>
          <h1>Delivery history</h1>
        </PageHeaderContainer>
        <PageNavAndContentContainer selectedNavItem={navLinks.subscriptions}>
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
                padding: 14px ${space[5]}px;
                background-color: ${palette.neutral["97"]};
                border-bottom: 1px solid ${palette.neutral["86"]};
                ${textSans.medium({ fontWeight: "bold" })};
              `}
            >
              Reported delivery problems
            </h2>
            {deliveryIssue && (
              <dl
                css={css`
                  padding: 0 ${space[5]}px;
                  ${textSans.medium()};
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: space-between;
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
                    {deliveryIssue.subscriptionId}
                  </dd>
                </div>
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
                    Product:
                  </dt>
                  <dd
                    css={css`
                      ${ddCss}
                    `}
                  >
                    {deliveryIssue.productName}
                  </dd>
                </div>
                <div
                  css={css`
                    margin-top: ${space[5]}px;
                    width: 100%;
                  `}
                >
                  <dt
                    css={css`
                      ${dtCss}
                    `}
                  >
                    Type of Issue:
                  </dt>
                  <dd
                    css={css`
                      ${ddCss}
                      max-width: calc(100% - 16ch);
                    `}
                  >
                    <h4
                      css={css`
                        ${textSans.medium({ fontWeight: "bold" })};
                        margin: 0;
                      `}
                    >
                      {deliveryIssue.problemType &&
                        deliveryProblemsRadioArr[
                          Number(deliveryIssue.problemType.category)
                        ].label}
                    </h4>
                    {deliveryIssue.problemType?.message && (
                      <p
                        css={css`
                          margin: 0;
                        `}
                      >
                        {deliveryIssue.problemType?.message}
                      </p>
                    )}
                  </dd>
                </div>
                <div
                  css={css`
                    margin-top: ${space[5]}px;
                    width: 100%;
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
                      max-width: calc(100% - 16ch);
                    `}
                  >
                    <h4
                      css={css`
                        ${textSans.medium()};
                        margin: 0;
                      `}
                    >
                      {deliveryIssue.affectedRecords?.length}
                    </h4>
                  </dd>
                </div>
              </dl>
            )}
            {deliveryIssue && deliveryIssue.affectedRecords?.length ? (
              <div
                css={css`
                  padding: 0 ${space[5]}px;
                  margin-bottom: ${space[5]}px;
                `}
              >
                {deliveryIssue.affectedRecords.map(
                  (deliveryRecord: DeliveryRecordApiItem, listIndex) => (
                    <DeliveryRecordCard
                      key={deliveryRecord.id}
                      deliveryRecord={deliveryRecord}
                      listIndex={listIndex}
                      pageStatus={PageStatus.READ_ONLY}
                      deliveryProblemMap={deliveryIssue.deliveryProblemMap}
                    />
                  )
                )}
              </div>
            ) : (
              <p>There aren't any delivery records to show you yet</p>
            )}
            {deliveryIssue && deliveryIssue.showProblemCredit ? (
              <div
                css={css`
                  margin: ${space[5]}px;
                `}
              >
                <PotentialHolidayStopsAsyncLoader
                  fetch={getPotentialHolidayStopsFetcher(
                    true,
                    deliveryIssue.subscriptionId,
                    moment(problemStartDate),
                    moment(problemEndDate),
                    deliveryIssue.isTestUser
                  )}
                  render={renderExpectedCredit}
                  loadingMessage="Calculating expected credit..."
                />
              </div>
            ) : (
              <>
                <span
                  css={css`
                    position: relative;
                    display: block;
                    margin: ${space[5]}px;
                    padding: 0 ${space[5]}px 0 ${space[5] + space[2]}px;
                    ${textSans.small()};
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
                  Your case will be marked as a high priority. Our customer
                  service team will try their best to contact you within 48
                  hours to resolve the issue.
                </span>
                {phoneNumbers && (
                  <UserPhoneNumber
                    existingPhoneNumber={phoneNumbers}
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
                (props.navigate || navigate)("confirmation", { replace: true });
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
                // (props.routeableStepProps.navigate || navigate)('review');
              }}
            >
              Cancel
            </Button>
          </div>
        </PageNavAndContentContainer>
      </WizardStep>
    </DeliveryRecordsProblemPostPayloadContext.Provider>
  );
};
