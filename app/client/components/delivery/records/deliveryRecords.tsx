import { css } from "@emotion/core";
import { Button } from "@guardian/src-button";
import { Checkbox, CheckboxGroup } from "@guardian/src-checkbox";
import { palette } from "@guardian/src-foundations";
import { space } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import { headline } from "@guardian/src-foundations/typography";
import { navigate } from "@reach/router";
import React, { useState } from "react";
import {
  DeliveryRecordApiItem,
  PaidSubscriptionPlan,
  ProductDetail
} from "../../../../shared/productResponse";
import { getMainPlan } from "../../../../shared/productResponse";
import {
  ProductTypeKeys,
  ProductTypes,
  ProductTypeWithDeliveryRecordsProperties,
  ProductUrlPart,
  WithProductType
} from "../../../../shared/productTypes";
import { maxWidth } from "../../../styles/breakpoints";
import { LinkButton } from "../../buttons";
import { FlowStartMultipleProductDetailHandler } from "../../flowStartMultipleProductDetailHandler";
import { navLinks } from "../../nav";
import { PageHeaderContainer, PageNavAndContentContainer } from "../../page";
import { ErrorIcon } from "../../svgs/errorIcon";
import { RouteableStepProps, WizardStep } from "../../wizardRouterAdapter";
import { DeliveryRecordCard } from "./deliveryRecordCard";
import {
  createDeliveryRecordsFetcher,
  DeliveryRecordsApiAsyncLoader,
  DeliveryRecordsResponse
} from "./deliveryRecordsApi";
import { PaginationNav } from "./deliveryRecordsPaginationNav";
import {
  DeliveryRecordsProblemContext,
  DeliveryRecordsProblemType
} from "./deliveryRecordsProblemContext";
import { DeliveryRecordProblemForm } from "./deliveryRecordsProblemForm";

export enum PageStatus {
  READ_ONLY,
  REPORT_ISSUE_STEP_1,
  REPORT_ISSUE_STEP_2,
  STEP_2_VALIDATION_ERRORS,
  CONTINUE_TO_REVIEW,
  REPORT_ISSUE_CONFIRMATION
}

export type DeliveryRecordsRouteableStepProps = RouteableStepProps &
  WithProductType<ProductTypeWithDeliveryRecordsProperties>;

interface DeliveryRecordsFCProps {
  data: DeliveryRecordsResponse;
  routeableStepProps: DeliveryRecordsRouteableStepProps;
  subscriptionId: string;
  subscriptionCurrency: string;
  isTestUser: boolean;
}

interface Step1FormValidationDetails {
  isValid: boolean;
  message?: string;
}

const renderDeliveryRecords = (
  props: DeliveryRecordsRouteableStepProps,
  productDetail: ProductDetail
) => (data: DeliveryRecordsResponse) => {
  const mainPlan = getMainPlan(
    productDetail.subscription
  ) as PaidSubscriptionPlan;

  return (
    <DeliveryRecordsFC
      data={data}
      routeableStepProps={props}
      subscriptionId={productDetail.subscription.subscriptionId}
      subscriptionCurrency={mainPlan.currency}
      isTestUser={productDetail.isTestUser}
    />
  );
};

export const DeliveryRecordsFC = (props: DeliveryRecordsFCProps) => {
  const [pageStatus, setPageStatus] = useState<PageStatus>(
    PageStatus.READ_ONLY
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedProblemRecords, setSelectedProblemRecords] = useState<
    string[]
  >([]);
  const [step1formValidationState, setStep1formValidationState] = useState<
    boolean
  >(false);
  const [step1FormValidationDetails, setStep1FormValidationDetails] = useState<
    Step1FormValidationDetails
  >({ isValid: true });
  const [step2formValidationState, setStep2formValidationState] = useState<
    boolean
  >(false);
  const [step2FormValidationDetails, setStep2FormValidationDetails] = useState<
    Step1FormValidationDetails
  >({ isValid: true });
  const [deliveryProblem, setDeliveryProblem] = useState<
    DeliveryRecordsProblemType
  >();
  const step1FormUpdateCallback = (isValid: boolean, message?: string) => {
    setStep1formValidationState(false);
    setStep1FormValidationDetails({ isValid, message });
  };
  const step1FormSubmitListener = (
    selectedValue: string | undefined,
    selectedMessage: string | undefined
  ) => {
    setDeliveryProblem({ category: selectedValue, message: selectedMessage });
    setStep1formValidationState(true);
    if (step1FormValidationDetails.isValid) {
      setPageStatus(PageStatus.REPORT_ISSUE_STEP_2);
    }
  };

  const addRecordToDeliveryProblem = (id: string) =>
    setSelectedProblemRecords([...selectedProblemRecords, id]);
  const removeRecordFromDeliveryProblem = (id: string) =>
    setSelectedProblemRecords(
      selectedProblemRecords.filter((existingId: string) => existingId !== id)
    );
  const resultsPerPage = 7;
  const totalPages = Math.ceil(props.data.results.length / resultsPerPage);
  const scrollToTop = () => window.scrollTo(0, 0);
  const resetDeliveryRecordsPage = () => setPageStatus(PageStatus.READ_ONLY);

  const filterData = (productPartName: ProductUrlPart) => {
    const NumOfRecordsToShow =
      ProductTypes[productPartName as ProductTypeKeys].delivery?.records
        ?.numberOfProblemRecordsToShow || props.data.results.length;

    if (pageStatus !== PageStatus.READ_ONLY) {
      return props.data.results
        .filter(record => !record.problemCaseId)
        .slice(0, NumOfRecordsToShow - 1);
    }
    return props.data.results.filter((element, index) =>
      isRecordInCurrentPage(
        index,
        currentPage * resultsPerPage,
        currentPage * resultsPerPage + resultsPerPage - 1
      )
    );
  };

  const capatalize = (input: string) =>
    input.charAt(0).toUpperCase() + input.slice(1);

  const isRecordInCurrentPage = (
    index: number,
    currentPageStartIndex: number,
    currentPageEndIndex: number
  ) => index >= currentPageStartIndex && index <= currentPageEndIndex;

  const hasExistingDeliveryProblem =
    props.data.results.findIndex(
      deliveryRecord => deliveryRecord.problemCaseId
    ) > -1;

  return (
    <DeliveryRecordsProblemContext.Provider
      value={{
        subscriptionId: props.subscriptionId,
        subscriptionCurrency: props.subscriptionCurrency,
        productName: capatalize(
          props.routeableStepProps.productType.shortenedFriendlyName ||
            props.routeableStepProps.productType.friendlyName
        ),
        apiProductName:
          props.routeableStepProps.productType.fulfilmentDateCalculator
            ?.productFilenamePart,
        problemType: deliveryProblem,
        affectedRecords: props.data.results.filter(record =>
          selectedProblemRecords.includes(record.id)
        ),
        deliveryProblemMap: props.data.deliveryProblemMap,
        isTestUser: props.isTestUser,
        showProblemCredit:
          !ProductTypes[
            props.routeableStepProps.productType.urlPart as ProductTypeKeys
          ].delivery?.records?.contactUserOnExistingProblemReport &&
          !hasExistingDeliveryProblem,
        repeatDeliveryProblem: hasExistingDeliveryProblem,
        contactPhoneNumbers: props.data.contactPhoneNumbers,
        resetDeliveryRecordsPage
      }}
    >
      <WizardStep
        routeableStepProps={props.routeableStepProps}
        hideBackButton
        fullWidth
      >
        <PageHeaderContainer selectedNavItem={navLinks.subscriptions}>
          <h1>Delivery problem</h1>
        </PageHeaderContainer>
        <PageNavAndContentContainer selectedNavItem={navLinks.subscriptions}>
          {props.data.results.find(record => !record.problemCaseId) && (
            <>
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
                Report delivery problems
              </h2>
              <div
                css={css`
                  margin-bottom: ${pageStatus !== PageStatus.REPORT_ISSUE_STEP_2
                    ? space[12]
                    : space[5]}px;
                `}
              >
                <p>
                  Have you been experiencing problems with your delivery? Report
                  it and we will take care of it for you. Depending on the type
                  of problem, you will be credited or contacted by our customer
                  service team.
                </p>
                {pageStatus === PageStatus.READ_ONLY && (
                  <LinkButton
                    colour={palette.brand.main}
                    to={""}
                    text={"Report a problem"}
                    onClick={() => {
                      setSelectedProblemRecords([]);
                      setPageStatus(PageStatus.REPORT_ISSUE_STEP_1);
                    }}
                  />
                )}
                {(pageStatus === PageStatus.REPORT_ISSUE_STEP_1 ||
                  pageStatus === PageStatus.REPORT_ISSUE_STEP_2) && (
                  <DeliveryRecordProblemForm
                    showNextStepButton={
                      pageStatus !== PageStatus.REPORT_ISSUE_STEP_2
                    }
                    onResetDeliveryRecordsPage={resetDeliveryRecordsPage}
                    onFormSubmit={step1FormSubmitListener}
                    inValidationState={step1formValidationState}
                    updateValidationStatusCallback={step1FormUpdateCallback}
                    problemTypes={
                      props.routeableStepProps.productType.delivery.records
                        .availableProblemTypes
                    }
                  />
                )}
              </div>
            </>
          )}
          <h2
            css={css`
              border-top: 1px solid ${palette.neutral["86"]};
              ${headline.small()};
              font-weight: bold;
              opacity: ${pageStatus === PageStatus.REPORT_ISSUE_STEP_1
                ? "0.5"
                : "1"};
              ${pageStatus === PageStatus.REPORT_ISSUE_STEP_2
                ? `
              background-color: ${palette.neutral["97"]};
              border-left: 1px solid ${palette.neutral["86"]};
              border-right: 1px solid ${palette.neutral["86"]};
              margin: 0;
              padding: 14px 14px 0;
              ${textSans.medium({ fontWeight: "bold" })};
            `
                : ""}
              ${maxWidth.tablet} {
                ${pageStatus === PageStatus.REPORT_ISSUE_STEP_2
                  ? ``
                  : `
              font-size: 1.25rem;
              line-height: 1.6;
              `}
              }
            `}
          >
            {pageStatus === PageStatus.REPORT_ISSUE_STEP_2
              ? "Step 2. Select the date you have experienced the issue above"
              : "Delivery History"}
          </h2>
          {pageStatus === PageStatus.REPORT_ISSUE_STEP_2 && (
            <div
              css={css`
                display: block;
                background-color: ${palette.neutral["97"]};
                border-left: 1px solid ${palette.neutral["86"]};
                border-right: 1px solid ${palette.neutral["86"]};
                padding: 0 14px;
              `}
            >
              <CheckboxGroup name="selectalldeliveryrecords">
                <Checkbox
                  value="selectalldeliveryrecords"
                  label="Select all below"
                />
              </CheckboxGroup>
            </div>
          )}
          {props.data.results.length ? (
            filterData(
              props.routeableStepProps.productType.urlPart
            ).map((deliveryRecord: DeliveryRecordApiItem, listIndex) => (
              <DeliveryRecordCard
                key={deliveryRecord.id}
                deliveryRecord={deliveryRecord}
                listIndex={listIndex}
                pageStatus={pageStatus}
                deliveryProblemMap={props.data.deliveryProblemMap}
                addRecordToDeliveryProblem={addRecordToDeliveryProblem}
                removeRecordFromDeliveryProblem={
                  removeRecordFromDeliveryProblem
                }
                recordCurrency={props.subscriptionCurrency}
              />
            ))
          ) : (
            <p>There aren't any delivery records to show you yet</p>
          )}
          {totalPages > 1 && pageStatus === PageStatus.READ_ONLY && (
            <PaginationNav
              resultsPerPage={resultsPerPage}
              totalNumberOfResults={props.data.results.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              changeCallBack={scrollToTop}
            />
          )}
          {pageStatus === PageStatus.REPORT_ISSUE_STEP_2 && (
            <div
              css={css`
                margin-top: ${space[6]}px;
              `}
            >
              {(step1formValidationState || step2formValidationState) &&
                ((!step1FormValidationDetails.isValid &&
                  step1FormValidationDetails.message) ||
                  (!step2FormValidationDetails.isValid &&
                    step2FormValidationDetails.message)) && (
                  <dl
                    css={css`
                      position: relative;
                      padding: ${space[5]}px ${space[5]}px ${space[5]}px 50px;
                      ${textSans.medium()};
                      border: 4px solid ${palette.news.main};
                    `}
                  >
                    <i
                      css={css`
                        position: absolute;
                        top: ${space[5]}px;
                        left: ${space[5]}px;
                      `}
                    >
                      <ErrorIcon />
                    </i>
                    <dt
                      css={css`
                        font-weight: bold;
                      `}
                    >
                      Some information is missing
                    </dt>
                    <dd
                      css={css`
                        margin: 0;
                      `}
                    >
                      <ul
                        css={css`
                          list-style: none;
                          margin: 0;
                          padding: 0;
                        `}
                      >
                        {!step1FormValidationDetails.isValid &&
                          step1FormValidationDetails.message && (
                            <li>{step1FormValidationDetails.message}</li>
                          )}
                        {!step2FormValidationDetails.isValid &&
                          step2FormValidationDetails.message && (
                            <li>{step2FormValidationDetails.message}</li>
                          )}
                      </ul>
                    </dd>
                  </dl>
                )}
              <Button
                onClick={() => {
                  setStep1formValidationState(true);
                  const isStep2Valid = !!selectedProblemRecords.length;
                  setStep2FormValidationDetails({
                    isValid: isStep2Valid,
                    message: "Please select an affected delivery record"
                  });
                  setStep2formValidationState(!isStep2Valid);
                  if (step1FormValidationDetails.isValid && isStep2Valid) {
                    setPageStatus(PageStatus.CONTINUE_TO_REVIEW);
                    (props.routeableStepProps.navigate || navigate)("review");
                  }
                }}
              >
                Review your report
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
                  setPageStatus(PageStatus.READ_ONLY);
                }}
              >
                Go back
              </Button>
            </div>
          )}
        </PageNavAndContentContainer>
      </WizardStep>
    </DeliveryRecordsProblemContext.Provider>
  );
};

export const DeliveryRecords = (props: DeliveryRecordsRouteableStepProps) => {
  return (
    <FlowStartMultipleProductDetailHandler
      {...props}
      headingPrefix={"View delivery history"}
      hideHeading
      hasLeftNav={{
        pageTitle: "Delivery history",
        selectedNavItem: navLinks.subscriptions
      }}
      supportRefererSuffix="delivery_records_flow"
      loadingMessagePrefix="Retrieving details of your"
      cancelledExplainer={`This ${props.productType.friendlyName} has been cancelled. You cannot view any of its delivery history.
    Please contact us if you would like to re-start this ${props.productType.friendlyName}, make any amendments or need further help.`}
      singleProductDetailRenderer={(
        routeableStepProps: RouteableStepProps,
        productDetail: ProductDetail
      ) => (
        <DeliveryRecordsApiAsyncLoader
          render={renderDeliveryRecords(props, productDetail)}
          fetch={createDeliveryRecordsFetcher(
            productDetail.subscription.subscriptionId
          )}
          loadingMessage={"Loading delivery history..."}
        />
      )}
    />
  );
};
