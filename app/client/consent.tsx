import React from "react";
import ReactDOM from "react-dom";
import { App } from "../client/components/consent/App";

const onPolyfilled = (): void => {
  const element = document.getElementById("app");

  ReactDOM.hydrate(<App />, element);
};

const run = (): void => {
  /*
      We want to run `onPolyfilled` only after polyfill.io has initialised
      By the time this script runs, if `window.guardian.polyfilled` is true,
      meaning that polyfill.io has initialised, then we run onPolyfilled(), otherwise
      we stick it in window.guardian.onPolyfilled to be ran later.
  */
  if (window.guardian.polyfilled) {
    onPolyfilled();
  } else {
    // tslint:disable-next-line:no-object-mutation
    window.guardian.onPolyfilled = onPolyfilled;
  }
};

run();
