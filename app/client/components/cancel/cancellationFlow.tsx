import React, { ChangeEvent, ReactNode } from "react";
import {
  hasProduct,
  MembersDataApiResponse,
  MembersDataApiResponseContext,
  MembersDatApiAsyncLoader
} from "../../../shared/productResponse";
import { createProductDetailFetcher } from "../../../shared/productTypes";
import palette from "../../colours";
import { LinkButton } from "../buttons";
import { CheckFlowIsValid } from "../checkFlowIsValid";
import { PageContainer, PageContainerSection } from "../page";
import {
  MultiRouteableProps,
  ReturnToYourProductButton,
  RouteableStepProps,
  WizardStep
} from "../wizardRouterAdapter";
import { CancellationSummary } from "./cancellationSummary";

interface ReasonPickerProps {
  options: ReactNode[];
}

interface ReasonPickerState {
  reasonPath: string;
}

const cssInheritFont = {
  fontSize: "inherit",
  fontFamily: "inherit"
};

class ReasonPicker extends React.Component<
  ReasonPickerProps,
  ReasonPickerState
> {
  constructor(props: ReasonPickerProps) {
    super(props);
    this.state = {
      reasonPath: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  public handleChange(event: ChangeEvent<HTMLSelectElement>): void {
    this.setState({ reasonPath: event.target.value });
  }

  public render(): React.ReactNode {
    return (
      <>
        <select
          value={this.state.reasonPath}
          onChange={this.handleChange}
          css={{
            ...cssInheritFont,
            width: "100%",
            height: "32px",
            border: "1px black solid",
            color: this.state.reasonPath ? undefined : palette.neutral["4"]
            // TODO fix the clipping of font top/bottom because of font-size
          }}
        >
          <option disabled value="">
            please select a reason from this dropdown
          </option>
          {this.props.options}
        </select>
        <br />
        <br />
        <div css={{ textAlign: "right" }}>
          <LinkButton
            text="Continue"
            to={this.state.reasonPath}
            disabled={!this.state.reasonPath}
          />
        </div>
      </>
    );
  }
}

const childWithRouteablePropsToElement = (child: {
  props: MultiRouteableProps;
}) => (
  <option key={child.props.path} value={child.props.path} css={cssInheritFont}>
    {child.props.linkLabel || child.props.path}
  </option>
);

const getReasonsRenderer = (routeableStepProps: RouteableStepProps) => (
  data: MembersDataApiResponse
) => {
  if (hasProduct(data)) {
    if (data.subscription.cancelledAt) {
      return (
        <div>
          {CancellationSummary(routeableStepProps.productType.friendlyName)(
            data.subscription
          )}
          <ReturnToYourProductButton {...routeableStepProps} />
        </div>
      );
    }
    return (
      <MembersDataApiResponseContext.Provider value={data}>
        <WizardStep routeableStepProps={routeableStepProps}>
          {routeableStepProps.productType.cancellationStartPageBody}
          <PageContainerSection>
            <ReasonPicker
              options={routeableStepProps.children.props.children.map(
                childWithRouteablePropsToElement
              )}
            />
          </PageContainerSection>
        </WizardStep>
      </MembersDataApiResponseContext.Provider>
    );
  }

  return (
    <>
      {routeableStepProps.productType.noProductRenderer}
      <ReturnToYourProductButton {...routeableStepProps} />
    </>
  );
};

export const CancellationFlow = (props: RouteableStepProps) => (
  <div>
    <PageContainer>
      <h1 css={{ fontSize: "20px" }}>
        Cancel your Guardian {props.productType.friendlyName}
      </h1>
      <CheckFlowIsValid {...props.productType /*TODO use for the whole flow*/}>
        <MembersDatApiAsyncLoader
          fetch={createProductDetailFetcher(props.productType)}
          render={getReasonsRenderer(props)}
          loadingMessage={`Checking the status of your current ${
            props.productType.friendlyName
          }...`}
        />
      </CheckFlowIsValid>
    </PageContainer>
  </div>
);
