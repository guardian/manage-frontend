import { css } from "@emotion/core";
import { space } from "@guardian/src-foundations";
import React from "react";
import {
  isProduct,
  MembersDataApiItemContext,
  ProductDetail
} from "../../../shared/productResponse";
import { ProductTypeWithHolidayStopsFlow } from "../../../shared/productTypes";
import { LinkButton } from "../buttons";
import { GenericErrorScreen } from "../genericErrorScreen";
import { ProgressIndicator } from "../progressIndicator";
import { visuallyNavigateToParent, WizardStep } from "../wizardRouterAdapter";
import {
  buttonBarCss,
  HolidayDateChooserStateContext,
  isSharedHolidayDateChooserState,
  SharedHolidayDateChooserState
} from "./holidayDateChooser";
import { creditExplainerSentence } from "./holidayQuestionsModal";
import { HolidayStopsRouteableStepProps } from "./holidaysOverview";
import {
  HolidayStopsResponseContext,
  isHolidayStopsResponse
} from "./holidayStopApi";
import { SummaryTable } from "./summaryTable";

const innerContent = (
  productType: ProductTypeWithHolidayStopsFlow,
  productDetail: ProductDetail,
  dateChooserState: SharedHolidayDateChooserState
) => (
  <>
    <h1>Your schedule has been set</h1>
    <p>
      We will send an email to confirm the details.{" "}
      {creditExplainerSentence(productType.holidayStops.issueKeyword)}{" "}
      {productType.holidayStops.additionalHowAdvice}
    </p>
    <SummaryTable
      data={dateChooserState}
      isTestUser={productDetail.isTestUser}
      subscription={productDetail.subscription}
      issueKeyword={productType.holidayStops.issueKeyword}
    />
    <div css={{ ...buttonBarCss, justifyContent: "flex-end" }}>
      <div css={{ marginBottom: "10px" }}>
        <LinkButton
          to={"/suspend/" + productType.urlPart + "/create"}
          text="Schedule another suspension"
          right
        />
      </div>
      <div css={{ marginBottom: "10px", marginLeft: "20px" }}>
        <LinkButton
          to={"/" + productType.urlPart}
          text="Manage your subscriptions"
          primary
          right
        />
      </div>
    </div>
  </>
);

export const HolidayConfirmed = (props: HolidayStopsRouteableStepProps) => (
  <HolidayStopsResponseContext.Consumer>
    {holidayStopsResponse =>
      isHolidayStopsResponse(holidayStopsResponse) ? (
        <MembersDataApiItemContext.Consumer>
          {productDetail => (
            <HolidayDateChooserStateContext.Consumer>
              {dateChooserState =>
                isSharedHolidayDateChooserState(dateChooserState) &&
                isProduct(productDetail) ? (
                  <WizardStep routeableStepProps={props}>
                    <ProgressIndicator
                      steps={[
                        { title: "Choose dates" },
                        { title: "Review" },
                        {
                          title: "Confirmation",
                          isCurrentStep: true
                        }
                      ]}
                      additionalCSS={css`
                        margin: ${space[5]}px 0 ${space[12]}px;
                      `}
                    />
                    {innerContent(
                      props.productType,
                      productDetail,
                      dateChooserState
                    )}
                  </WizardStep>
                ) : (
                  visuallyNavigateToParent(props)
                )
              }
            </HolidayDateChooserStateContext.Consumer>
          )}
        </MembersDataApiItemContext.Consumer>
      ) : (
        <GenericErrorScreen loggingMessage="No holiday stop response" />
      )
    }
  </HolidayStopsResponseContext.Consumer>
);
