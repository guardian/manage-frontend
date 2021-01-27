import { Request, Response, Router } from "express";
import { log } from "../log";

const router = Router();

router.get("/_healthcheck", (_: Request, res: Response) => {
  log.info("processing healthcheck...");
  res.status(500).send("Boom boom boom");
});

router.get("/_prout", (_, res: Response) => {
  res.send(`<pre>${GIT_COMMIT_HASH}</pre>`);
});

export default router;
