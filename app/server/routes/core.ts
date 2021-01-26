import { Request, Response, Router } from "express";
import { log } from "../log";
import { withIdentity } from "../middleware/identityMiddleware";

const router = Router();

router.get(
  "/_healthcheck",
  withIdentity(200), // healthcheck needs identity redirect service to be accessible (returns 200 if redirect required)
  (_: Request, res: Response) => {
    log.info("healthcheck ok");
    res.send("OK - signed in");
  }
);

router.get("/_prout", (_, res: Response) => {
  res.send(`<pre>${GIT_COMMIT_HASH}</pre>`);
});

export default router;
