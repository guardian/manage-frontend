import { Link, Router } from "@reach/router";
import React from "react";

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
    <div>
      {getBackwardNavigationIfApplicable(props.routeableProps)}
      {getForwardNavigationIfApplicable(props.routeableProps)}
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
    return <button onClick={() => window.history.back()}>Back</button>;
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
      <Link css={{ float: "right" }} to={childProps.path}>
        {childProps.linkLabel ? childProps.linkLabel : "Continue Cancellation"}
      </Link>
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
