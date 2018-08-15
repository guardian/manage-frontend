import { Router } from "@reach/router";
import React from "react";
import { conf } from "../../server/config";
import palette from "../colours";
import { Button, LinkButton } from "./buttons";
import { PageContainer, PageContainerSection } from "./page";
import { ProgressCounter } from "./progressCounter";

export interface RouteableProps {
  path: string;
}

export interface RouteableStepProps extends RouteableProps {
  currentStep: number;
  children?: any; // TODO ReactElement<RouteableProps> | ReactElement<MultiRouteableProps>[];
}

export interface MultiRouteableProps extends RouteableStepProps {
  // TODO refactor this out by adding type params to Children
  linkLabel: string;
}

interface RootComponentProps {
  routeableStepProps: RouteableStepProps;
  thisStageChildren: any;
  path: string;
}

const estimateTotal = (currentStep: number, child: any) => {
  // if(child && Array.isArray(child)) {
  //   child = child[0];
  // }
  // if (child){
  //   child.hasOwnProperty()
  // }
  // return currentStep;
  return 3; // TODO dynamically estimate total steps by recursively exploring children
};

export const ReturnToYourAccountButton = () => (
  <div css={{ marginTop: "15px" }}>
    <a
      href={
        "https://profile." +
        (typeof window !== "undefined" ? window.guardian.domain : conf.DOMAIN) +
        "/membership/edit"
      }
    >
      <Button
        text="Return to your account"
        textColor={palette.white}
        left
        color={palette.neutral["2"]}
      />
    </a>
  </div>
);

const RootComponent = (props: RootComponentProps) => (
  <PageContainer>
    <PageContainerSection>
      <ProgressCounter
        current={props.routeableStepProps.currentStep}
        total={estimateTotal(
          props.routeableStepProps.currentStep,
          props.routeableStepProps.children
        )}
      />
    </PageContainerSection>

    {props.thisStageChildren}

    <ReturnToYourAccountButton />
  </PageContainer>
);

const ThisStageContent = (props: WizardStepProps) => (
  <Router>
    <RootComponent
      path="/"
      thisStageChildren={props.children}
      routeableStepProps={props.routeableStepProps}
    />
  </Router>
);

const getForwardNavigationIfApplicable = (
  routeableStepProps: RouteableStepProps
) => {
  if (
    routeableStepProps.children &&
    routeableStepProps.children.props.children &&
    !Array.isArray(routeableStepProps.children.props.children)
  ) {
    const childProps: RouteableStepProps =
      routeableStepProps.children.props.children.props;
    return (
      <LinkButton
        to={childProps.path}
        text={
          childProps.children && childProps.children.props.children
            ? "Continue Cancellation"
            : "Confirm Cancellation"
        }
        textColor={palette.white}
        color={palette.neutral["2"]}
      />
    );
  }
};

export interface WizardStepProps {
  routeableStepProps: RouteableStepProps;
  children: any;
}

export const WizardStep = (props: WizardStepProps) => (
  <>
    <ThisStageContent
      children={props.children}
      routeableStepProps={props.routeableStepProps}
    />
    {props.routeableStepProps.children}
  </>
);
