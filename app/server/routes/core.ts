import { Request, Response, Router } from "express";
import { authKeysAreFetchableMemoisedHealthcheck } from "../apiGatewayDiscovery";
import { conf, Environments } from "../config";
import { withIdentity } from "../middleware/identityMiddleware";

const router = Router();

/**
 * In some cases withIdentity might not call its next middleware so if you add a new healthcheck to the sequence
 * you might have to add it above withIdentity.
 */
router.get(
  "/_healthcheck",
  authKeysAreFetchableMemoisedHealthcheck(),
  withIdentity(200), // healthcheck needs identity redirect service to be accessible (returns 200 if redirect required)
  (_: Request, res: Response) => {
    res.send("OK - signed in");
  }
);

router.get("/_prout", (_, res: Response) => {
  res.send(`<pre>${GIT_COMMIT_HASH}</pre>`);
});

router.get("/robots.txt", (_, res: Response) => {
  const disallowAll = "UserAgent: *\n" + "Disallow: /\n\n";
  const allowHelpCentre =
    "UserAgent: *\n" +
    "Allow: /help-centre\n" +
    "Allow: /help-centre/\n" +
    "Disallow: /\n\n";
  const disallowGoogleAdsBots =
    "User-agent: AdsBot-Google\n" +
    "User-agent: AdsBot-Google-Mobile\n" +
    "Disallow: /\n\n";
  const prodAccessList = allowHelpCentre + disallowGoogleAdsBots;
  const preProdAccessList = disallowAll;
  const accessList =
    conf.ENVIRONMENT === Environments.PRODUCTION
      ? prodAccessList
      : preProdAccessList;
  res.contentType("text/plain").send(accessList);
});

export default router;
