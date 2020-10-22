import * as pathLib from "path";

// To avoid security vulnerabilities do no add public paths that do not end in a slash
const publicPaths = ["/contact-us/", "/contact-us-config/"];

export const requiresSignin = (path: string) => {
  const normalizedPath = pathLib.normalize(path + "/");
  return !publicPaths.some(publicPath => normalizedPath.startsWith(publicPath));
};
