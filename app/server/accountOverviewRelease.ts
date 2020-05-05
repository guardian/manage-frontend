import express from "express";
import { isIdentityInAccountOverviewTest } from "../shared/accountOverviewRelease";

export const isInAccountOverviewTest = (res: express.Response) => {
  return isIdentityInAccountOverviewTest(res.locals?.identity?.userId);
};
