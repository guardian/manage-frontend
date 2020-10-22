import { Request, Response } from "express";
import { contactUsConfig } from "./contactUsConfig";

export const contactUsConfigHandler = (_: Request, res: Response) =>
  res.json(contactUsConfig);
