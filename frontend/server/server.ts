import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import User from "../client/components/user";
import html from "./html";
import { renderStylesToString } from "emotion-server";

const port = 3000;
const server = express();
server.use("/static", express.static("static"));

server.get("/", (req, res) => {
  /**
   * renderToString() will take our React app and turn it into a string
   * to be inserted into our Html template function.
   */
  const body = renderStylesToString(renderToString(User));
  const title = "Server side Rendering with Styled Components";

  res.send(
    html({
      body,
      title
    })
  );
});

server.listen(port);
console.log(`Serving at http://localhost:${port}`);
