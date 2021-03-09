import { captureMessage } from "@sentry/node";
import { Request, Response } from "express";
import fetch from "node-fetch";
import { conf } from "./config";

export const createReminderHandler = (req: Request, res: Response) =>
  createReminder(req.body).then(response => {
    if (!response.ok) {
      captureMessage("Reminder sign up failed at the point of request");
    }
    res.sendStatus(response.status);
  });

export const cancelReminderHandler = (req: Request, res: Response) =>
  cancelReminder(req.body).then(response => {
    if (!response.ok) {
      captureMessage("Cancel failed at the point of request");
    }
    res.sendStatus(response.status);
  });

export const reactivateReminderHandler = (req: Request, res: Response) =>
  reactivateReminder(req.body).then(response => {
    if (!response.ok) {
      captureMessage("Reactivate failed at the point of request");
    }
    res.sendStatus(response.status);
  });

const isProd = conf.STAGE === "PROD";

const baseReminderEndpoint = isProd
  ? "https://support.theguardian.com/reminders/"
  : "https://support.code.dev-theguardian.com/reminders/";

const createOneOffReminderEndpoint = baseReminderEndpoint + "create/one-off";
const cancelRemindersEndpoint = baseReminderEndpoint + "cancel";
const reactivateRemindersEndpoint = baseReminderEndpoint + "reactivate";

const createReminder = (body: any) =>
  fetch(createOneOffReminderEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body
  });

const cancelReminder = (body: any) =>
  fetch(cancelRemindersEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body
  });

const reactivateReminder = (body: any) =>
  fetch(reactivateRemindersEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body
  });
