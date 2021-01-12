import { css } from "@emotion/core";
import { Button } from "@guardian/src-button";
import { palette, space } from "@guardian/src-foundations";
import { headline, textSans } from "@guardian/src-foundations/typography";
import { navigate } from "@reach/router";
import { capitalize } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  DeliveryAddress,
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
import { maxWidth, minWidth } from "../../../styles/breakpoints";
import { trackEvent } from "../../analytics";
import { CallCentreEmailAndNumbers } from "../../callCenterEmailAndNumbers";
import { FlowWrapper } from "../../FlowWrapper";
import { NAV_LINKS } from "../../nav/navConfig";
import { ProductDescriptionListKeyValue } from "../../productDescriptionListTable";
import { ProgressIndicator } from "../../progressIndicator";
import { ErrorIcon } from "../../svgs/errorIcon";
import { InfoIconDark } from "../../svgs/infoIconDark";
import { RouteableStepProps, WizardStep } from "../../wizardRouterAdapter";
import { DeliveryAddressStep } from "./deliveryAddressStep";
import { DeliveryRecordCard } from "./deliveryRecordCard";
import {
  createDeliveryRecordsFetcher,
  DeliveryRecordDetail,
  DeliveryRecordsApiAsyncLoader,
  DeliveryRecordsResponse
} from "./deliveryRecordsApi";
import { PaginationNav } from "./deliveryRecordsPaginationNav";
import {
  DeliveryRecordsAddressContext,
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
  REPORT_ISSUE_CONFIRMATION,
  CANNOT_REPORT_PROBLEM
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
  const [step3formValidationState, setStep3formValidationState] = useState<
    boolean
  >(false);
  const [step3FormValidationDetails, setStep3FormValidationDetails] = useState<
    Step1FormValidationDetails
  >({ isValid: true });
  const [addressInValidState, setAddressValidationState] = useState<boolean>(
    true
  );
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
  const [address, setAddress] = useState<DeliveryAddress | undefined>(
    props.productDetail.subscription.deliveryAddress
  );
  const [productsAffected, setProductsAffected] = useState<
    ProductDescriptionListKeyValue[]
  >([]);
  useEffect(() => {
    if (addressInValidState) {
      setStep3FormValidationDetails({
        isValid: addressInValidState
      });
      setStep3formValidationState(!addressInValidState);
    }
  }, [addressInValidState]);
  const productType = props.routeableStepProps.productType;
  const enableDeliveryInstructions = !!productType.delivery
    ?.enableDeliveryInstructionsUpdate;
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

  const filterData = (overridePageStatusCheck?: boolean) => {
    if (
      (pageStatus !== PageStatus.READ_ONLY &&
        pageStatus !== PageStatus.CANNOT_REPORT_PROBLEM) ||
      overridePageStatusCheck
    ) {
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
    return props.data.results.filter((_, index) =>
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
      <DeliveryRecordsAddressContext.Provider
        value={{
          address,
          setAddress,
          productsAffected,
          setProductsAffected,
          enableDeliveryInstructions
        }}
      >
        <WizardStep routeableStepProps={props.routeableStepProps}>
          {pageStatus !== PageStatus.READ_ONLY &&
            pageStatus !== PageStatus.CANNOT_REPORT_PROBLEM && (
              <ProgressIndicator
                steps={[
                  { title: "Update", isCurrentStep: true },
                  { title: "Review" },
                  { title: "Confirmation" }
                ]}
                additionalCSS={css`
                  margin: ${space[5]}px 0 ${space[12]}px;
                `}
              />
            )}
          <div
            css={css`
              margin: ${space[6]}px 0 ${space[12]}px;
            `}
          >
            <ProductDetailsTable
              productName={capitalize(productType.friendlyName)}
              subscriptionId={props.productDetail.subscription.subscriptionId}
              isGift={isGift(props.productDetail.subscription)}
            />
          </div>
          {props.data.results.find(record => !record.problemCaseId) && (
            <>
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
                  it online and let us take care of it for you. Depending on the
                  problem you’re having, you’ll either be automatically credited
                  or escalated to customer service. It’s easy to use and only
                  takes a couple of minutes.
                </p>
                <p
                  css={css`
                    ${textSans.medium()};
                  `}
                >
                  Please remember, you can also{" "}
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
                    contact us
                  </span>{" "}
                  if you wish to speak to us in person.
                </p>
                {showTopCallCentreNumbers && <CallCentreEmailAndNumbers />}
                {pageStatus === PageStatus.CANNOT_REPORT_PROBLEM && (
                  <span
                    css={css`
                      position: relative;
                      display: block;
                      margin: ${space[3]}px 0;
                      padding: ${space[3]}px ${space[3]}px ${space[3]}px
                        ${space[3] * 2 + 17}px;
                      background-color: ${palette.neutral[97]};
                      ${textSans.small()};
                      ${minWidth.tablet} {
                        margin: ${space[5]}px 0;
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
                      <InfoIconDark fillColor={palette.brand[500]} />
                    </i>
                    You don't have any available delivery history to report.
                    Your deliveries may be too far in the past or have already
                    been reported.
                  </span>
                )}
                {(pageStatus === PageStatus.READ_ONLY ||
                  pageStatus === PageStatus.CANNOT_REPORT_PROBLEM) && (
                  <Button
                    onClick={() => {
                      const filteredDataAtPresent = filterData(true);
                      const canReportProblem = filteredDataAtPresent.length > 0;
                      trackEvent({
                        eventCategory: "delivery-problem",
                        eventAction: "report_delivery_problem_button_click",
                        product: {
                          productType,
                          productDetail: props.productDetail
                        },
                        eventLabel: productType.urlPart
                      });
                      if (canReportProblem) {
                        setSelectedProblemRecords([]);
                        setPageStatus(PageStatus.REPORT_ISSUE_STEP_1);
                      } else {
                        setPageStatus(PageStatus.CANNOT_REPORT_PROBLEM);
                      }
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
            pageStatus !== PageStatus.CANNOT_REPORT_PROBLEM &&
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
                showDeliveryInstructions={
                  productType.delivery.records.showDeliveryInstructions
                }
                recordCurrency={props.subscriptionCurrency}
                isChecked={selectedProblemRecords.includes(deliveryRecord.id)}
                productName={capitalize(
                  productType.shortFriendlyName || productType.friendlyName
                )}
              />
            )
          )}
          {totalPages > 1 &&
            (pageStatus === PageStatus.READ_ONLY ||
              pageStatus === PageStatus.CANNOT_REPORT_PROBLEM) && (
              <PaginationNav
                resultsPerPage={resultsPerPage}
                totalNumberOfResults={props.data.results.length}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                changeCallBack={scrollToTop}
              />
            )}
          {pageStatus === PageStatus.REPORT_ISSUE_STEP_2 && (
            <>
              <section
                css={css`
                  border: 1px solid ${palette.neutral["86"]};
                  margin: ${space[5]}px 0 ${space[5]}px;
                  padding: 0;
                `}
              >
                <h1
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
                  Step 3. Check your current delivery address
                  {enableDeliveryInstructions && " and instructions"}
                </h1>
                {props.productDetail.subscription.deliveryAddress && (
                  <DeliveryAddressStep
                    productDetail={props.productDetail}
                    enableDeliveryInstructions={enableDeliveryInstructions}
                    setAddressValidationState={setAddressValidationState}
                  />
                )}
              </section>
              <div
                css={css`
                  margin-top: ${space[6]}px;
                `}
              >
                {(step1formValidationState ||
                  step2formValidationState ||
                  step3formValidationState) &&
                  ((!step1FormValidationDetails.isValid &&
                    step1FormValidationDetails.message) ||
                    (!step2FormValidationDetails.isValid &&
                      step2FormValidationDetails.message) ||
                    (!step3FormValidationDetails.isValid &&
                      step3FormValidationDetails.message)) && (
                    <dl
                      css={css`
                        position: relative;
                        padding: ${space[5]}px ${space[5]}px ${space[5]}px 50px;
                        ${textSans.medium()};
                        border: 4px solid ${palette.news[400]};
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
                        {!step3FormValidationDetails.isValid &&
                        step1FormValidationDetails.isValid &&
                        step2FormValidationDetails.isValid
                          ? "Unfinished changes"
                          : "Some information is missing"}
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
                          {!step3FormValidationDetails.isValid &&
                            step3FormValidationDetails.message && (
                              <li>{step3FormValidationDetails.message}</li>
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
                    const isStep3Valid = addressInValidState;
                    setStep3FormValidationDetails({
                      isValid: isStep3Valid,
                      message:
                        "Step 3: Please save or discard your delivery address changes."
                    });
                    setStep3formValidationState(!isStep3Valid);
                    if (
                      step1FormValidationDetails.isValid &&
                      isStep2Valid &&
                      isStep3Valid
                    ) {
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
                    color: ${palette.brand[400]};
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
                  If your delivery is not shown above, or you’d like to talk to
                  someone,{" "}
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
                    contact us
                  </span>
                  .
                </p>
                {showBottomCallCentreNumbers && <CallCentreEmailAndNumbers />}
              </div>
            </>
          )}
        </WizardStep>
      </DeliveryRecordsAddressContext.Provider>
    </DeliveryRecordsProblemContext.Provider>
  );
};

export const DeliveryRecords = (props: DeliveryRecordsRouteableStepProps) => {
  return (
    <FlowWrapper
      {...props}
      loadingMessagePrefix="Retrieving details of your"
      allowCancelledSubscription
      selectedNavItem={NAV_LINKS.accountOverview}
      pageTitle="Delivery history"
      breadcrumbs={[
        {
          title: NAV_LINKS.accountOverview.title,
          link: NAV_LINKS.accountOverview.link
        },
        {
          title: "Delivery history",
          currentPage: true
        }
      ]}
    >
      {productDetail => (
        <DeliveryRecordsApiAsyncLoader
          render={renderDeliveryRecords(props, productDetail)}
          fetch={createDeliveryRecordsFetcher(
            productDetail.subscription.subscriptionId,
            productDetail.isTestUser
          )}
          loadingMessage={"Loading delivery history..."}
        />
      )}
    </FlowWrapper>
  );
};
