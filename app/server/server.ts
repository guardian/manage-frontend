import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import User from "../client/components/user";
import html from "./html";
import { renderStylesToString } from "emotion-server";
import path from "path"
const port = 9233;

const server = express();
server.use("/static", express.static("dist/static"));

server.get("/", (req, res) => {
  /**
   * renderToString() will take our React app and turn it into a string
   * to be inserted into our Html template function.
   */
  const body = renderStylesToString(renderToString(User));
  const title = "Server side Rendering with Styled Components";
  const src= "static/user.js"

  res.send(
    html({
      body,
      title,
      src
    })
  );
});

server.listen(port);
console.log(`Serving at http://localhost:${port}`);
