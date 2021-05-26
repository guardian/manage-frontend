import { Request, Response, Router } from "express";
import { defaultPageTitle } from "../../client/components/helpCentre/helpCentrePageTitle";
import { conf } from "../config";
import html from "../html";
import { withIdentity } from "../middleware/identityMiddleware";
import { clientDSN, getRecaptchaPublicKey } from "./frontendCommon";

const router = Router();

router.use(withIdentity(), async (_: Request, res: Response) => {
  const title = defaultPageTitle;
  const src = "/static/helpcentre.js";

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
