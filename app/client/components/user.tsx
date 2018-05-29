import React from "react";
import { BrowserRouter, Route, StaticRouter, Switch } from "react-router-dom";
import { injectGlobal } from "../styles/emotion";
import fonts from "../styles/fonts";
import global from "../styles/global";
import { default as CancellationFlows } from "./cancel/cancellationFlows";
import StagesContainer from "./cancel/stagesContainer";
import { Main } from "./main";
import Membership from "./membership";

const User = () => (
  <Main>
    {injectGlobal`${global}`}
    {injectGlobal`${fonts}`}
    <Switch>
      <Route path="/" exact={true} component={Membership} />
      <Route
        path={`/cancel/:cancelType(${CancellationFlows.toCancelTypeRouteWhitelist()})/:requestedStageID?`}
        component={StagesContainer}
      />
      <Route render={() => <h1>Not Found</h1>} />
    </Switch>
  </Main>
);

const ServerUser = (location: string, context: object) => (
  <StaticRouter location={location} context={context}>
    <User />
  </StaticRouter>
);

const BrowserUser = (
  <BrowserRouter>
    <User />
  </BrowserRouter>
);

export { ServerUser, BrowserUser };
