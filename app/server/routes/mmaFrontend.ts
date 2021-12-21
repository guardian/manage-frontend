import { Request, Response, Router } from "express";
import { conf } from "../config";
import html from "../html";
import { withIdentity } from "../middleware/identityMiddleware";
import { clientDSN, getRecaptchaPublicKey } from "./frontendCommon";

const router = Router();

router.use(withIdentity(), async (_: Request, res: Response) => {
  const title = "My Account | The Guardian";
  const src = "/static/mma.js";

  res.send(
    html({
      title,
      src,
      globals: {
        domain: conf.DOMAIN,
        dsn: clientDSN,
        identityDetails: res.locals.identity,
        recaptchaPublicKey: await getRecaptchaPublicKey()
      }
    })
  );
});

export default router;
