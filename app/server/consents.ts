import express from "express";

export const consentsUI = (req: express.Request, res: express.Response) => {
  res.status(200).send("Consents UI");
};

export const consentsPOST = (req: express.Request, res: express.Response) => {
  res.status(200).send("Consents POST");
};
