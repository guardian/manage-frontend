import React from "react";
import { BrowserRouter, Route, StaticRouter, Switch } from "react-router-dom";
import { injectGlobal } from "../styles/emotion";
import fonts from "../styles/fonts";
import global from "../styles/global";
import { Main } from "./main";
import {
  loadMembershipData,
  Membership,
  renderMembershipData
} from "./membership";

const User = () => (
  <Main>
    {injectGlobal`${global}`}
    {injectGlobal`${fonts}`}
    <Switch>
      <Route
        path="/"
        exact={true}
        render={() => (
          <div>
            <h1>Membership</h1>
            <Membership
              fetch={loadMembershipData}
              render={renderMembershipData}
            />
          </div>
        )}
      />
      <Route
        path="/cancel/:cancelType(membership)" //TODO change to .join('|') based on config file keys
        render={({ match }) => (
          <h1>{match.params.cancelType} Cancellation Flow</h1>
        )}
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
