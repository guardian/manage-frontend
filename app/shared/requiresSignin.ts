import * as pathLib from "path";
import parse from "url-parse";

// To avoid security vulnerabilities do not add public paths that do not end in a slash
const publicPaths = [
  "/api/contact-us/",
  "/help-centre/",
  "/api/known-issues/",
  "/cancel-reminders/",
  "/api/reminders/cancel/"
];

export const requiresSignin = (path: string) => {
  const parsed = parse(path);
  const normalizedPath = pathLib.normalize(
    parsed.pathname + "/" + parsed.query
  );
  return !publicPaths.some(publicPath => normalizedPath.startsWith(publicPath));
};
