import { Request, Response, Router } from "express";
import { authKeysAreFetchableMemoisedHealthcheck } from "../apiGatewayDiscovery";
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

export default router;
