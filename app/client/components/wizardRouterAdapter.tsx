import { neutral } from "@guardian/src-foundations/palette";
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
    colour={neutral[100]}
    textColour={neutral[0]}
    hollow
    left
  />
);

interface CurrentStepProps {
  path: "/";
  content: React.ReactNode;
}

const CurrentStep = (props: CurrentStepProps) => <div>{props.content}</div>;

interface WizardStepProps {
  routeableStepProps: RouteableStepProps;
  children: React.ReactNode;
}

export const WizardStep = (props: WizardStepProps) => (
  <>
    <Router>
      <CurrentStep path="/" content={props.children} />
    </Router>
    {props.routeableStepProps.children}
  </>
);
