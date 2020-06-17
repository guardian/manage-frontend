import { palette } from "@guardian/src-foundations";
import { RouteComponentProps, Router } from "@reach/router";
import React from "react";
import {
  GroupedProductType,
  ProductType,
  WithGroupedProductType,
  WithProductType
} from "../../shared/productTypes";
import { LinkButton } from "./buttons";
import { GenericErrorScreen } from "./genericErrorScreen";
import { EmptyPageContainer } from "./page";

interface RouteableProps extends RouteComponentProps {
  path: string;
}

interface RoutablePropsWithChildren extends RouteableProps {
  children?: any; // TODO ReactElement<RouteableProps> | ReactElement<MultiRouteableProps>[];
}

export type RouteableStepProps = RoutablePropsWithChildren &
  WithProductType<ProductType>;

export type RouteableStepPropsForGrouped = RoutablePropsWithChildren &
  WithGroupedProductType<GroupedProductType>;

export interface MultiRouteableProps extends RouteableStepProps {
  // TODO refactor this out by adding type params to children
  linkLabel: string;
}

interface CommonProps {
  extraFooterComponents?: JSX.Element | JSX.Element[];
}

interface RootComponentProps extends CommonProps {
  routeableStepProps: RouteableStepProps;
  thisStageChildren: any;
  path: string;
  children: null;
}

export const visuallyNavigateToParent = (
  props: RouteableStepProps,
  toRoot?: boolean
) => {
  if (props.navigate) {
    props.navigate(toRoot ? "/" : "..", { replace: true }); // step back up a level
    return null;
  }
  return (
    <GenericErrorScreen loggingMessage="No navigate function - very odd" />
  );
};

export const ReturnToAccountOverviewButton = () => (
  <LinkButton
    to="/"
    text="Return to your account"
    colour={palette.neutral[100]}
    textColour={palette.neutral[0]}
    hollow
    left
  />
);

const RootComponent = (props: RootComponentProps) => (
  <>
    <EmptyPageContainer fullWidth>{props.thisStageChildren}</EmptyPageContainer>
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

interface WizardStepProps extends CommonProps {
  routeableStepProps: RouteableStepProps;
  children: any;
}

export const WizardStep = (props: WizardStepProps) => (
  <>
    <ThisStageContent {...props} />
    {props.routeableStepProps.children}
  </>
);
