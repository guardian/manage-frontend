import { css } from "@emotion/core";
import { Button } from "@guardian/src-button";
import { palette } from "@guardian/src-foundations";
import { space } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import { headline } from "@guardian/src-foundations/typography";
import { navigate } from "@reach/router";
import { capitalize } from "lodash";
import moment from "moment";
import React, { useState } from "react";
import {
  DeliveryRecordApiItem,
  isGift,
  PaidSubscriptionPlan,
  ProductDetail
} from "../../../../shared/productResponse";
import { getMainPlan } from "../../../../shared/productResponse";
import {
  DeliveryProblemType,
  holidaySuspensionDeliveryProblem,
  ProductTypeWithDeliveryRecordsProperties,
  WithProductType
} from "../../../../shared/productTypes";
import { maxWidth } from "../../../styles/breakpoints";
import { trackEvent } from "../../analytics";
import { CallCentreEmailAndNumbers } from "../../callCenterEmailAndNumbers";
import { FlowStartMultipleProductDetailHandler } from "../../flowStartMultipleProductDetailHandler";
import { navLinks } from "../../nav";
import { PageHeaderContainer, PageNavAndContentContainer } from "../../page";
import { ErrorIcon } from "../../svgs/errorIcon";
import { RouteableStepProps, WizardStep } from "../../wizardRouterAdapter";
import { DeliveryRecordCard } from "./deliveryRecordCard";
import {
  createDeliveryRecordsFetcher,
  DeliveryRecordDetail,
  DeliveryRecordsApiAsyncLoader,
  DeliveryRecordsResponse
} from "./deliveryRecordsApi";
import { PaginationNav } from "./deliveryRecordsPaginationNav";
import {
  DeliveryRecordsProblemContext,
  DeliveryRecordsProblemType
} from "./deliveryRecordsProblemContext";
import { DeliveryRecordProblemForm } from "./deliveryRecordsProblemForm";
import { ProductDetailsTable } from "./productDetailsTable";

interface IdentityDetails {
  userId: string;
}
declare global {
  interface Window {
    identityDetails?: IdentityDetails;
  }
}

export enum PageStatus {
  READ_ONLY,
  REPORT_ISSUE_STEP_1,
  REPORT_ISSUE_STEP_2,
  CONTINUE_TO_REVIEW,
  REPORT_ISSUE_CONFIRMATION
}

export type DeliveryRecordsRouteableStepProps = RouteableStepProps &
  WithProductType<ProductTypeWithDeliveryRecordsProperties>;

interface DeliveryRecordsFCProps {
  data: DeliveryRecordsResponse;
  routeableStepProps: DeliveryRecordsRouteableStepProps;
  productDetail: ProductDetail;
  subscriptionCurrency: string;
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
      productDetail={productDetail}
      subscriptionCurrency={mainPlan.currency}
    />
  );
};

export const checkForExistingDeliveryProblem = (
  records: DeliveryRecordDetail[]
) =>
  records.findIndex(deliveryRecord => {
    const recordDateEpoch = moment(deliveryRecord.deliveryDate).unix();
    const fourteenDaysAgoEpoch = moment()
      .startOf("day")
      .subtract(14, "days")
      .unix();
    return (
      deliveryRecord.problemCaseId && recordDateEpoch >= fourteenDaysAgoEpoch
    );
  }) > -1;

const checkForRecentHolidayStop = (records: DeliveryRecordDetail[]) =>
  records.findIndex(record => record.hasHolidayStop) > -1;

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
  const [
    showTopCallCentreNumbers,
    setTopCallCentreNumbersVisibility
  ] = useState<boolean>(false);
  const [choosenDeliveryProblem, setChoosenDeliveryProblem] = useState<
    string
  >();
  const [
    showBottomCallCentreNumbers,
    setBottomCallCentreNumbersVisibility
  ] = useState<boolean>(false);
  const step1FormRadioOptionCallback = (value: string) =>
    setChoosenDeliveryProblem(value);
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
      trackEvent({
        eventCategory: "delivery-problem",
        eventAction: "continue_to_step_2_button_click",
        product: {
          productType: props.routeableStepProps.productType,
          productDetail: props.productDetail
        },
        eventLabel: props.routeableStepProps.productType.urlPart
      });
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

  const productType = props.routeableStepProps.productType;

  const filterData = () => {
    if (pageStatus !== PageStatus.READ_ONLY) {
      const numOfReportableRecords =
        productType.delivery.records.numberOfProblemRecordsToShow;

      const today = moment();

      const isNotHolidayProblem =
        choosenDeliveryProblem !== holidaySuspensionDeliveryProblem.label;

      return props.data.results
        .filter(_ => moment(_.deliveryDate).isSameOrBefore(today, "day"))
        .slice(0, numOfReportableRecords)
        .filter(_ => isNotHolidayProblem || _.hasHolidayStop)
        .filter(_ => !_.problemCaseId);
    }
    return props.data.results.filter((element, index) =>
      isRecordInCurrentPage(
        index,
        currentPage * resultsPerPage,
        currentPage * resultsPerPage + resultsPerPage - 1
      )
    );
  };

  const isRecordInCurrentPage = (
    index: number,
    currentPageStartIndex: number,
    currentPageEndIndex: number
  ) => index >= currentPageStartIndex && index <= currentPageEndIndex;

  const hasExistingDeliveryProblem = checkForExistingDeliveryProblem(
    props.data.results
  );

  const filteredData = filterData();

  const hasRecentHolidayStop = checkForRecentHolidayStop(filteredData);

  const problemTypes: DeliveryProblemType[] = [
    ...productType.delivery.records.availableProblemTypes,
    ...(hasRecentHolidayStop ? [holidaySuspensionDeliveryProblem] : [])
  ].sort((a, b) => a.label.localeCompare(b.label));

  return (
    <DeliveryRecordsProblemContext.Provider
      value={{
        subscription: props.productDetail.subscription,
        subscriptionCurrency: props.subscriptionCurrency,
        productName: capitalize(
          productType.shortFriendlyName || productType.friendlyName
        ),
        apiProductName:
          productType.delivery.records.productNameForProblemReport,
        problemType: deliveryProblem,
        affectedRecords: props.data.results.filter(record =>
          selectedProblemRecords.includes(record.id)
        ),
        deliveryProblemMap: props.data.deliveryProblemMap,
        isTestUser: props.productDetail.isTestUser,
        showProblemCredit:
          !(
            choosenDeliveryProblem === holidaySuspensionDeliveryProblem.label
          ) &&
          !props.productDetail.subscription.cancelledAt &&
          props.productDetail.subscription.autoRenew &&
          !(
            hasExistingDeliveryProblem &&
            productType.delivery?.records?.contactUserOnExistingProblemReport
          ),
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
          <h1>Delivery history</h1>
        </PageHeaderContainer>
        <PageNavAndContentContainer selectedNavItem={navLinks.subscriptions}>
          <div
            css={css`
              margin: ${space[6]}px 0 ${space[12]}px;
            `}
          >
            <ProductDetailsTable
              productName={capitalize(
                productType.shortFriendlyName || productType.friendlyName
              )}
              subscriptionId={props.productDetail.subscription.subscriptionId}
              isGift={isGift(props.productDetail.subscription)}
            />
          </div>
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
                  ${textSans.medium()};
                `}
              >
                <p
                  css={css`
                    ${textSans.medium()};
                  `}
                >
                  Have you been experiencing problems with your delivery? Report
                  it and we will take care of it for you. Depending on the type
                  of problem, you will be credited or contacted by our customer
                  service team.
                </p>
                <p
                  css={css`
                    ${textSans.medium()};
                  `}
                >
                  Is your problem urgent?{" "}
                  <span
                    css={css`
                      cursor: pointer;
                      color: ${palette.brand[500]};
                      text-decoration: underline;
                    `}
                    onClick={() =>
                      setTopCallCentreNumbersVisibility(
                        !showTopCallCentreNumbers
                      )
                    }
                  >
                    Contact us
                  </span>
                  .
                </p>
                {showTopCallCentreNumbers && <CallCentreEmailAndNumbers />}
                {pageStatus === PageStatus.READ_ONLY && (
                  <Button
                    onClick={() => {
                      trackEvent({
                        eventCategory: "delivery-problem",
                        eventAction: "report_delivery_problem_button_click",
                        product: {
                          productType,
                          productDetail: props.productDetail
                        },
                        eventLabel: productType.urlPart
                      });
                      setSelectedProblemRecords([]);
                      setPageStatus(PageStatus.REPORT_ISSUE_STEP_1);
                    }}
                  >
                    Report a problem
                  </Button>
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
                    updateRadioSelectionCallback={step1FormRadioOptionCallback}
                    problemTypes={problemTypes}
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
              opacity: ${pageStatus === PageStatus.REPORT_ISSUE_STEP_1 &&
              filteredData.length > 0
                ? "0.5"
                : "1"};
              ${pageStatus === PageStatus.REPORT_ISSUE_STEP_2
                ? `
              background-color: ${palette.neutral["97"]};
              border-left: 1px solid ${palette.neutral["86"]};
              border-right: 1px solid ${palette.neutral["86"]};
              margin: 0;
              padding: 14px 14px 14px;
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
              ? "Step 2. Select the date you have experienced the problem"
              : "Deliveries"}
          </h2>
          {filteredData.length === 0 &&
            (props.data.results.length === 0 ? (
              <p
                css={css`
                  ${textSans.medium()};
                `}
              >
                You haven't had a delivery for this subscription yet. In the
                future, details of your deliveries will appear here.
              </p>
            ) : (
              <>
                <p
                  css={css`
                    ${textSans.medium()};
                  `}
                >
                  You currently have no deliveries that you can report a problem
                  on based on the problem type that you have selected.
                </p>
                <p
                  css={css`
                    ${textSans.medium()};
                  `}
                >
                  If you are still having problems please{" "}
                  <span
                    css={css`
                      cursor: pointer;
                      color: ${palette.brand[500]};
                      text-decoration: underline;
                    `}
                    onClick={() =>
                      setBottomCallCentreNumbersVisibility(
                        !showBottomCallCentreNumbers
                      )
                    }
                  >
                    Contact us
                  </span>
                </p>
              </>
            ))}
          {filteredData.map(
            (deliveryRecord: DeliveryRecordApiItem, listIndex) => (
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
                isChecked={selectedProblemRecords.includes(deliveryRecord.id)}
              />
            )
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
                    message:
                      "Step 2: Please select an affected delivery record."
                  });
                  setStep2formValidationState(!isStep2Valid);
                  if (step1FormValidationDetails.isValid && isStep2Valid) {
                    trackEvent({
                      eventCategory: "delivery-problem",
                      eventAction: "review_report_button_click",
                      product: {
                        productType,
                        productDetail: props.productDetail
                      },
                      eventLabel: productType.urlPart
                    });
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
                Cancel
              </Button>
              <p
                css={css`
                  ${textSans.medium()};
                  color: ${palette.neutral[46]};
                  margin-top: ${space[6]}px;
                `}
              >
                Is your delivery problem urgent? Or want to report a problem
                older than the above?{" "}
                <span
                  css={css`
                    cursor: pointer;
                    color: ${palette.brand[500]};
                    text-decoration: underline;
                  `}
                  onClick={() =>
                    setBottomCallCentreNumbersVisibility(
                      !showBottomCallCentreNumbers
                    )
                  }
                >
                  Contact us
                </span>
                .
              </p>
              {showBottomCallCentreNumbers && <CallCentreEmailAndNumbers />}
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
      allowCancelledSubscription
      singleProductDetailRenderer={(
        routeableStepProps: RouteableStepProps,
        productDetail: ProductDetail
      ) => (
        <DeliveryRecordsApiAsyncLoader
          render={renderDeliveryRecords(props, productDetail)}
          fetch={createDeliveryRecordsFetcher(
            productDetail.subscription.subscriptionId,
            productDetail.isTestUser
          )}
          loadingMessage={"Loading delivery history..."}
        />
      )}
    />
  );
};
