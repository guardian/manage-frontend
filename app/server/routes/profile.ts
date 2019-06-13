import { Response, Router } from "express";
import { conf } from "../config";
import { apiHandler, JsonHandler } from "../middleware/apiMiddleware";
import { withIdentity } from "../middleware/identityMiddleware";

const router = Router();

const profileRedirectHandler: JsonHandler = (
  res: Response,
  meJsonString: string
) => {
  const userId = JSON.parse(meJsonString).userId;
  res.redirect(`https://profile.${conf.DOMAIN}/user/id/${userId}`);
};

router.get(
  "/user",
  withIdentity(),
  apiHandler(profileRedirectHandler)("https://members-data-api." + conf.DOMAIN)(
    "user-attributes/me"
  )
);

export default router;
