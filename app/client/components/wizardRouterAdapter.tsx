import { RouteComponentProps, Router } from "@reach/router";
import React from "react";
import { ProductType } from "../../shared/productTypes";
import { Button, LinkButton } from "./buttons";
import { PageContainer, PageContainerSection } from "./page";
import { ProgressBreadcrumb } from "./progressBreadcrumb";
import { ProgressCounter } from "./progressCounter";

export interface RouteableProps extends RouteComponentProps {
  path: string;
}

export interface RouteableStepProps extends RouteableProps {
  currentStep: number;
  stepLabels?: string[];
  children?: any; // TODO ReactElement<RouteableProps> | ReactElement<MultiRouteableProps>[];
}

export interface RouteableProductStepProps extends RouteableStepProps {
  productType: ProductType;
}

export interface MultiRouteableProps extends RouteableStepProps {
  // TODO refactor this out by adding type params to children
  linkLabel: string;
}

export interface ButtonStyleModifierProps {
  hideReturnButton?: true;
  hollowReturnButton?: true;
}

export interface CommonProps extends ButtonStyleModifierProps {
  backButtonLevelsUp?: true;
  extraFooterComponents?: JSX.Element | JSX.Element[];
}

interface RootComponentProps extends CommonProps {
  routeableStepProps: RouteableStepProps;
  thisStageChildren: any;
  path: string;
  children: null;
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

export const ReturnToYourAccountButton = (props: ButtonStyleModifierProps) => (
  <div css={{ marginTop: "15px" }}>
    <a href="/membership">
      <Button
        text="Return to your account"
        hide={props.hideReturnButton}
        hollow={props.hollowReturnButton}
        left
      />
    </a>
  </div>
);

const RootComponent = (props: RootComponentProps) => (
  <>
    <PageContainer>
      {props.routeableStepProps.stepLabels ? (
        <ProgressBreadcrumb
          current={props.routeableStepProps.currentStep}
          labels={props.routeableStepProps.stepLabels}
        />
      ) : (
        <PageContainerSection>
          <ProgressCounter
            current={props.routeableStepProps.currentStep}
            total={estimateTotal(
              props.routeableStepProps.currentStep,
              props.routeableStepProps.children
            )}
          />
        </PageContainerSection>
      )}

      {props.thisStageChildren}

      {props.backButtonLevelsUp ? (
        <LinkButton
          hide={props.hideReturnButton}
          text="Back"
          to=".."
          hollow={props.hollowReturnButton}
          left
        />
      ) : (
        <ReturnToYourAccountButton {...props} />
      )}
    </PageContainer>
    {props.extraFooterComponents}
  </>
);

const ThisStageContent = (props: WizardStepProps) => (
  <Router>
    <RootComponent
      {...props}
      children={null} // override passed prop from spread
      path="/"
      thisStageChildren={props.children}
    />
  </Router>
);

export interface WizardStepProps extends CommonProps {
  routeableStepProps: RouteableStepProps;
  children: any;
}

export const WizardStep = (props: WizardStepProps) => (
  <>
    <ThisStageContent {...props} />
    {props.routeableStepProps.children}
  </>
);
