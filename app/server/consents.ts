import express from "express";
import { renderToString } from "react-dom/server";
import { ConsentManagementPortal } from "../client/components/consents/ConsentMangementPortal";
import html from "./consents/html";

export const consentsUI = (req: express.Request, res: express.Response) => {
  try {
    const body = renderToString(ConsentManagementPortal());
    const title = "Consent Management Platform | The Guardian";

    const resp = html({
      body,
      title
    });

    res.status(200).send(resp);
  } catch (e) {
    res.status(500).send(`<pre>${e.stack}</pre>`);
  }
};

export const consentsPOST = (req: express.Request, res: express.Response) => {
  res.status(200).send("Consents POST");
};
