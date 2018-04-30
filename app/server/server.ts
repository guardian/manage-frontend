import cookieParser from "cookie-parser"
import { renderStylesToString } from "emotion-server";
import express from "express";
import helmet from "helmet"
import path from "path"
import React from "react";
import { renderToString } from "react-dom/server";
import User from "../client/components/user";
import html from "./html";


const port = 9233;

const server = express();
server.use(helmet())
server.use(cookieParser())

server.use("/static", express.static("dist/static"));

server.get("/", (req: express.Request, res: express.Response) => {
  /**
   * renderToString() will take our React app and turn it into a string
   * to be inserted into our Html template function.
   */
  const body = renderStylesToString(renderToString(User));
  const title = "Server side Rendering with Styled Components";
  const src= "static/user.js"
  
  console.log(req.cookies)

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
console.log(`Serving at http://localhost:${port}`);
