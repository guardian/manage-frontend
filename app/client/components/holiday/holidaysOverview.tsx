import { navigate } from "@reach/router";
import * as React from "react";
import {
  DATE_FNS_LONG_OUTPUT_FORMAT,
  dateString,
  parseDate,
} from "../../../shared/dates";
import {
  getMainPlan,
  isPaidSubscriptionPlan,
  MDA_TEST_USER_HEADER,
  MembersDataApiItemContext,
  ProductDetail,
} from "../../../shared/productResponse";
import {
  ProductTypeWithHolidayStopsFlow,
  WithProductType,
} from "../../../shared/productTypes";
import { maxWidth, minWidth } from "../../styles/breakpoints";
import { sans } from "../../styles/fonts";
import { ReFetch } from "../asyncLoader";
import { Button } from "../buttons";
import { FlowWrapper } from "../FlowWrapper";
import { GenericErrorScreen } from "../genericErrorScreen";
import { NAV_LINKS } from "../nav/navConfig";
import { NavigateFnContext } from "../payment/update/updatePaymentFlow";
import { InfoIcon } from "../svgs/infoIcon";
import {
  ReturnToAccountOverviewButton,
  RouteableStepProps,
  WizardStep,
} from "../wizardRouterAdapter";
import { CollatedCredits } from "./collatedCredits";
import {
  creditExplainerSentence,
  HolidayQuestionsModal,
} from "./holidayQuestionsModal";
import {
  calculateIssuesImpactedPerYear,
  embellishExistingHolidayStops,
  GetHolidayStopsAsyncLoader,
  GetHolidayStopsResponse,
  HolidayStopRequest,
  HolidayStopsResponseContext,
  isNotBulkSuspension,
  isNotWithdrawn,
} from "./holidayStopApi";
import { SummaryTable } from "./summaryTable";

export type HolidayStopsRouteableStepProps = RouteableStepProps &
  WithProductType<ProductTypeWithHolidayStopsFlow>;

interface OverviewRowProps {
  heading: string;
  children: React.ReactFragment;
}

const OverviewRow = (props: OverviewRowProps) => (
  <div
    css={{
      display: "flex",
      flexWrap: "wrap",
      alignItems: "top",
      marginBottom: "20px",
    }}
  >
    <div css={{ flex: "1 1 180px" }}>
      <h3 css={{ marginTop: "0", paddingTop: "0" }}>{props.heading}</h3>
    </div>
    <div
      css={{
        flex: "4 4 350px",
      }}
    >
      {props.children}
    </div>
  </div>
);

const renderHolidayStopsOverview =
  (
    productDetail: ProductDetail,
    holidaysOverviewProps: HolidayStopsRouteableStepProps,
    existingHolidayStopToAmend: HolidayStopRequest | null,
    setExistingHolidayStopToAmend: (newValue: HolidayStopRequest | null) => void
  ) =>
  (holidayStopsResponse: GetHolidayStopsResponse, reload: ReFetch) => {
    const renewalDate = parseDate(productDetail.subscription.renewalDate).date;
    const combinedIssuesImpactedPerYear = calculateIssuesImpactedPerYear(
      holidayStopsResponse.existing
        .filter(isNotWithdrawn)
        .filter(isNotBulkSuspension)
        .flatMap((existing) => existing.publicationsImpacted),
      renewalDate
    );

    const mainPlan = getMainPlan(productDetail.subscription);
    const currency = isPaidSubscriptionPlan(mainPlan)
      ? mainPlan.currency
      : undefined;

    const createSuspensionButton = (
      <Button
        text="Create suspension"
        right
        primary
        onClick={() => {
          setExistingHolidayStopToAmend(null);
          (holidaysOverviewProps.navigate || navigate)("create");
        }}
      />
    );

    const reloadWhichAlsoClearsAnyExistingHolidayStopToAmend = () => {
      setExistingHolidayStopToAmend(null);
      reload();
    };

    const InnerContent = () => (
      <>
        <h1>Suspend {holidaysOverviewProps.productType.friendlyName}</h1>
        {productDetail.subscription.autoRenew ? (
          <OverviewRow heading="How">
            <>
              <div>
                You can suspend up to{" "}
                <strong>
                  {holidayStopsResponse.annualIssueLimit}{" "}
                  {holidaysOverviewProps.productType.holidayStops.issueKeyword}s
                </strong>{" "}
                per year of your subscription. <br />
              </div>
              {holidaysOverviewProps.productType.holidayStops
                .alternateNoticeString && (
                <div>
                  Please provide{" "}
                  <strong>
                    {
                      holidaysOverviewProps.productType.holidayStops
                        .alternateNoticeString
                    }
                  </strong>
                  .
                </div>
              )}
              <div>
                {creditExplainerSentence(
                  holidaysOverviewProps.productType.holidayStops.issueKeyword
                )}
              </div>
              {holidaysOverviewProps.productType.holidayStops
                .additionalHowAdvice && (
                <div>
                  {
                    holidaysOverviewProps.productType.holidayStops
                      .additionalHowAdvice
                  }
                </div>
              )}
              <div
                css={{
                  fontFamily: sans,
                  fontSize: "14px",
                  margin: "10px",
                  display: "flex",
                  alignItems: "top",
                }}
              >
                <InfoIcon />
                <div>
                  <strong>
                    {dateString(renewalDate, DATE_FNS_LONG_OUTPUT_FORMAT)}
                  </strong>{" "}
                  is the next anniversary of your subscription.
                  <br />
                  The number of{" "}
                  {holidaysOverviewProps.productType.holidayStops.issueKeyword}s
                  you can suspend per year is reset on this date.
                </div>
              </div>
              <HolidayQuestionsModal
                annualIssueLimit={holidayStopsResponse.annualIssueLimit}
                holidayStopFlowProperties={
                  holidaysOverviewProps.productType.holidayStops
                }
              />
            </>
          </OverviewRow>
        ) : (
          <h4>
            This subscription does not automatically renew, so unfortunately you{" "}
            {holidayStopsResponse.existing.length > 0
              ? "can no longer"
              : "cannot"}{" "}
            create a holiday suspension for this subscription.
          </h4>
        )}
        {(productDetail.subscription.autoRenew ||
          holidayStopsResponse.existing.length > 0) && (
          <>
            <OverviewRow heading="Summary">
              <>
                {holidayStopsResponse.existing.length > 0 ? (
                  <>
                    <div>
                      You have suspended{" "}
                      <strong>
                        {combinedIssuesImpactedPerYear.issuesThisYear.length}/
                        {holidayStopsResponse.annualIssueLimit}
                      </strong>{" "}
                      {
                        holidaysOverviewProps.productType.holidayStops
                          .issueKeyword
                      }
                      s until{" "}
                      {dateString(renewalDate, DATE_FNS_LONG_OUTPUT_FORMAT)}
                      {combinedIssuesImpactedPerYear.issuesNextYear.length >
                        0 && (
                        <span>
                          {" "}
                          and{" "}
                          <strong>
                            {
                              combinedIssuesImpactedPerYear.issuesNextYear
                                .length
                            }
                            /{holidayStopsResponse.annualIssueLimit}
                          </strong>{" "}
                          {
                            holidaysOverviewProps.productType.holidayStops
                              .issueKeyword
                          }
                          s the following year
                        </span>
                      )}
                      .
                    </div>
                  </>
                ) : (
                  <div>
                    You have{" "}
                    <strong>{holidayStopsResponse.annualIssueLimit}</strong>{" "}
                    {
                      holidaysOverviewProps.productType.holidayStops
                        .issueKeyword
                    }
                    s available to suspend until{" "}
                    {dateString(renewalDate, DATE_FNS_LONG_OUTPUT_FORMAT)}
                  </div>
                )}
                <div
                  css={{
                    textAlign: "right",
                    marginTop: "10px",
                    [minWidth.phablet]: {
                      display: "none",
                    },
                  }}
                >
                  {productDetail.subscription.autoRenew &&
                    createSuspensionButton}
                </div>
              </>
            </OverviewRow>
            {holidayStopsResponse.existing.length > 0 && (
              <OverviewRow heading="Expected Credits">
                <CollatedCredits
                  publicationsImpacted={holidayStopsResponse.existing
                    .filter(isNotWithdrawn)
                    .flatMap((_) => _.publicationsImpacted)}
                  currency={currency}
                />
              </OverviewRow>
            )}
            <OverviewRow heading="Details">
              {holidayStopsResponse.existing.length > 0 ? (
                <SummaryTable
                  data={holidayStopsResponse.existing}
                  isTestUser={productDetail.isTestUser}
                  subscription={productDetail.subscription}
                  issueKeyword={
                    holidaysOverviewProps.productType.holidayStops.issueKeyword
                  }
                  reloadParent={reload}
                  setExistingHolidayStopToAmend={setExistingHolidayStopToAmend}
                />
              ) : (
                "You currently don't have any scheduled suspensions."
              )}
            </OverviewRow>
          </>
        )}
        <div
          css={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "30px",
            [maxWidth.phablet]: {
              flexDirection: "column-reverse",
            },
          }}
        >
          <div css={{ marginTop: "10px", alignSelf: "flex-start" }}>
            <ReturnToAccountOverviewButton />
          </div>
          <div css={{ marginTop: "10px", alignSelf: "flex-end" }}>
            {productDetail.subscription.autoRenew && createSuspensionButton}
          </div>
        </div>
      </>
    );

    return (
      <HolidayStopsResponseContext.Provider
        value={{
          ...holidayStopsResponse,
          reload: reloadWhichAlsoClearsAnyExistingHolidayStopToAmend,
          existingHolidayStopToAmend: existingHolidayStopToAmend || undefined,
        }}
      >
        <MembersDataApiItemContext.Provider value={productDetail}>
          <WizardStep routeableStepProps={holidaysOverviewProps}>
            <InnerContent />
          </WizardStep>
        </MembersDataApiItemContext.Provider>
      </HolidayStopsResponseContext.Provider>
    );
  };

const createGetHolidayStopsFetcher =
  (subscriptionName: string, isTestUser: boolean) => () =>
    fetch(`/api/holidays/${subscriptionName}`, {
      headers: {
        [MDA_TEST_USER_HEADER]: `${isTestUser}`,
      },
    });

interface HolidaysOverviewState {
  existingHolidayStopToAmend: HolidayStopRequest | null;
}

class HolidaysOverview extends React.Component<
  HolidayStopsRouteableStepProps,
  HolidaysOverviewState
> {
  public state: HolidaysOverviewState = {
    existingHolidayStopToAmend: null,
  };

  public render = () => (
    <FlowWrapper
      {...this.props}
      loadingMessagePrefix="Retrieving details of your"
      selectedNavItem={NAV_LINKS.accountOverview}
      pageTitle="Manage suspensions"
      breadcrumbs={[
        {
          title: NAV_LINKS.accountOverview.title,
          link: NAV_LINKS.accountOverview.link,
        },
        {
          title: "Manage suspensions",
          currentPage: true,
        },
      ]}
    >
      {(productDetail) => (
        <MembersDataApiItemContext.Provider value={productDetail}>
          <NavigateFnContext.Provider value={{ navigate: this.props.navigate }}>
            {" "}
            {productDetail.subscription.start ? (
              <GetHolidayStopsAsyncLoader
                fetch={createGetHolidayStopsFetcher(
                  productDetail.subscription.subscriptionId,
                  productDetail.isTestUser
                )}
                render={renderHolidayStopsOverview(
                  productDetail,
                  this.props,
                  this.state.existingHolidayStopToAmend,
                  this.setExistingHolidayStopToAmend
                )}
                loadingMessage="Loading existing suspensions..."
                readerOnOK={embellishExistingHolidayStops}
              />
            ) : (
              <GenericErrorScreen loggingMessage="Subscription had no start date" />
            )}
          </NavigateFnContext.Provider>
        </MembersDataApiItemContext.Provider>
      )}
    </FlowWrapper>
  );

  private setExistingHolidayStopToAmend = (
    newValue: HolidayStopRequest | null
  ) => this.setState({ existingHolidayStopToAmend: newValue });
}

export default HolidaysOverview;
