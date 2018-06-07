import { Router } from "@reach/router";
import React from "react";
import palette from "../colours";
import { Button, LinkButton } from "./buttons";

export interface RouteableProps {
  path: string;
  linkLabel?: string;
  children?: any; // TODO ReactElement<RouteableProps> | ReactElement<MultiRouteableProps>[];
}

export interface MultiRouteableProps extends RouteableProps {
  linkLabel: string;
}

interface RootComponentProps {
  routeableProps: RouteableProps;
  thisStageChildren: any;
  path: string;
}

const RootComponent = (props: RootComponentProps) => (
  <div>
    {props.thisStageChildren}
    <div
      css={{
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      <div>{getBackwardNavigationIfApplicable(props.routeableProps)}</div>
      <div>{getForwardNavigationIfApplicable(props.routeableProps)}</div>
    </div>
  </div>
);

const ThisStageContent = (props: WizardStepProps) => (
  <Router>
    <RootComponent
      path="/"
      thisStageChildren={props.children}
      routeableProps={props.routeableProps}
    />
  </Router>
);

const getBackwardNavigationIfApplicable = (routeableProps: RouteableProps) => {
  if (routeableProps.children) {
    return (
      <Button
        onClick={() => window.history.back()}
        text="Back"
        textColor={palette.white}
        left
        color={palette.neutral["4"]}
      />
    );
  }
};

const getForwardNavigationIfApplicable = (routeableProps: RouteableProps) => {
  if (
    routeableProps.children &&
    routeableProps.children.props.children &&
    !Array.isArray(routeableProps.children.props.children)
  ) {
    const childProps: RouteableProps =
      routeableProps.children.props.children.props;
    return (
      <LinkButton
        to={childProps.path}
        text={
          childProps.linkLabel ? childProps.linkLabel : "Continue Cancellation"
        }
        textColor={palette.white}
        color={palette.neutral["4"]}
      />
    );
  }
};

export interface WizardStepProps {
  routeableProps: RouteableProps;
  children: any;
}

export const WizardStep = (props: WizardStepProps) => (
  <React.Fragment>
    <ThisStageContent
      children={props.children}
      routeableProps={props.routeableProps}
    />
    {props.routeableProps.children}
  </React.Fragment>
);
