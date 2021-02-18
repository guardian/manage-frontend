import { captureMessage } from "@sentry/node";
import { Request, Response } from "express";
import fetch from "node-fetch";
import { conf } from "./config";

export const reminderHandler = (req: Request, res: Response) =>
  setReminder(req.body).then(response => {
    if (!response.ok) {
      captureMessage("Reminder sign up failed at the point of request");
    }
    res.sendStatus(response.status);
  });

const isProd = conf.STAGE === "PROD";

const reminderEndpoint = isProd
  ? "https://support.theguardian.com/reminders/create/one-off"
  : "https://support.code.dev-theguardian.com/reminders/create/one-off";

const setReminder = (body: any) =>
  fetch(reminderEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body
  });
