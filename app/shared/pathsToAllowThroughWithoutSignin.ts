export const pathsToAllowThroughWithoutSignin = [
  "/contact-us-form",
  "/contact-us-form/*",
  "/contact-us-form/*/*",
  "/contact-us-form/*/*/*"
];

export const allowPathThroughWithoutSignin = (path: string) => {
  const pathSplit = path.split("/");
  return pathsToAllowThroughWithoutSignin.some(whiteListedPath => {
    if (whiteListedPath === path) {
      return true;
    }
    const whiteListedPathSplit = whiteListedPath.split("/");
    if (whiteListedPathSplit.length === pathSplit.length) {
      const isGlobWhiteListed = whiteListedPathSplit.every(
        (pathPart, index) => pathPart === pathSplit[index] || pathPart === "*"
      );
      return isGlobWhiteListed;
    }
  });
};
