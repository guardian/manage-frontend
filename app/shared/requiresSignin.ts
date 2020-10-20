const publicPaths = [
  "/contact-us-form",
  "/contact-us-form/*",
  "/contact-us-form/*/*",
  "/contact-us-form/*/*/*"
];

export const requiresSignin = (path: string) => {
  const pathSplit = path.split("/");
  return !publicPaths.some(publicPath => {
    if (path === publicPath) {
      return true;
    }
    const publicPathSplit = publicPath.split("/");
    if (publicPathSplit.length === pathSplit.length) {
      const isGlobPublic = publicPathSplit.every(
        (pathPart, index) => pathPart === pathSplit[index] || pathPart === "*"
      );
      return isGlobPublic;
    }
    return false;
  });
};
