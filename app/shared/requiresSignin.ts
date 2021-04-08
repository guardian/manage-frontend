import * as pathLib from "path";

// To avoid security vulnerabilities do not add public paths that do not end in a slash
const publicPaths = [
  "/api/contact-us/",
  "/api/known-issues/",
  "/api/reminders/cancel/",
  "/api/help-centre/",
  "/cancel-reminders/",
  "/help-centre/"
];

export const requiresSignin = (path: string) => {
  const normalizedPath = pathLib.normalize(path + "/");
  return !publicPaths.some(publicPath => normalizedPath.startsWith(publicPath));
};
