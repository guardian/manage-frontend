import bunyan from "bunyan";
import cookieParser from "cookie-parser";
import { renderStylesToString } from "emotion-server";
import express from "express";
import helmet from "helmet";
import fetch from "node-fetch";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import User from "../client/components/user";
import html from "./html";
import { IdentityUser, withIdentity } from "./identity/identityMiddleware";

const port = 9233;

const server = express();
const log = bunyan.createLogger({ name: "af" });

server.use(helmet());

server.get("/_healthcheck", (req: express.Request, res: express.Response) => {
  res.send("OK");
});

server.use(cookieParser());
server.use("/api/membership", withIdentity);
server.use("/", withIdentity);

server.use("/static", express.static("dist/static"));

server.get("/api/membership", (req: express.Request, res: express.Response) => {
  if (res.locals.identity == null) {
    // Check if the identity middleware is loaded for this route.
    // Refactor this.
    log.error("Identity not present in locals.");
    res.status(500).send("Something broke!");
    return;
  }

  const identity: IdentityUser = res.locals.identity;

  fetch(
    "https://members-data-api.thegulocal.com/user-attributes/me/mma-membership",
    {
      headers: {
        Cookie: `GU_U=${identity.GU_U}; SC_GU_U=${identity.SC_GU_U}`
      }
    }
  )
    .then(_ => _.text())
    .then(_ => res.send(_))
    .catch(e => {
      log.info(e);
      res.status(500).send("Something broke!");
    });
});

server.get("/", (req: express.Request, res: express.Response) => {
  /**
   * renderToString() will take our React app and turn it into a string
   * to be inserted into our Html template function.
   */
  const body = renderStylesToString(renderToString(User));
  const title = "Server side Rendering with Styled Components";
  const src = "static/user.js";

  res.send(
    html({
      body,
      title,
      src
    })
  );
});

server.listen(port);
// tslint:disable-next-line:no-console
log.info(`Serving at http://localhost:${port}`);
