import { Link, Router } from "@reach/router";
import React from "react";
import { RouteableProps, WizardStep } from "../wizardRouterAdapter";

export const MembershipReasons = (props: RouteableProps) => (
  <WizardStep routeableProps={props}>
    <span>Please tell us your reason...</span>
    <ul>
      {props.children.props.children.map((child: { props: RouteableProps }) => (
        <li key={child.props.path}>
          <Link to={child.props.path}>
            {child.props.linkLabel ? child.props.linkLabel : child.props.path}
          </Link>
        </li>
      ))}
    </ul>
  </WizardStep>
);
