import * as pathLib from "path";
import parse from "url-parse";

// To avoid security vulnerabilities do not add public paths that do not end in a slash
const publicPaths = [
  "/api/contact-us/",
  "/api/known-issues/",
  "/api/reminders/cancel/",
  "/cancel-reminders/",
  "/help-centre/"
];

export const requiresSignin = (path: string) => {
  const parsed = parse(path);
  const normalizedPath = pathLib.normalize(
    parsed.pathname + "/" + parsed.query
  );
  return !publicPaths.some(publicPath => normalizedPath.startsWith(publicPath));
};
