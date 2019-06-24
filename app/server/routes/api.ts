import { Router } from "express";
import { conf } from "../config";
import {
  membersDataApiHandler,
  proxyApiHandler,
  sfCasesApiHandler
} from "../middleware/apiMiddleware";
import { withIdentity } from "../middleware/identityMiddleware";

const router = Router();

router.use(withIdentity(401));

router.get("/me", membersDataApiHandler("user-attributes/me"));

router.get(
  "/existing-payment-options",
  membersDataApiHandler("user-attributes/me/existing-payment-options")
);

router.get(
  "/me/mma/:subscriptionName?",
  membersDataApiHandler(
    "user-attributes/me/mma/:subscriptionName",
    true,
    "subscriptionName"
  )
);

router.post(
  "/cancel/:subscriptionName?",
  membersDataApiHandler(
    "/user-attributes/me/cancel/:subscriptionName",
    false,
    "subscriptionName"
  )
);

router.post(
  "/payment/card/:subscriptionName?",
  membersDataApiHandler(
    "/user-attributes/me/update-card/:subscriptionName",
    false,
    "subscriptionName"
  )
);
router.post(
  "/payment/dd/:subscriptionName?",
  membersDataApiHandler(
    "/user-attributes/me/update-direct-debit/:subscriptionName",
    false,
    "subscriptionName"
  )
);

router.post(
  "/validate/payment/dd",
  proxyApiHandler("https://payment." + conf.API_DOMAIN)(
    "direct-debit/check-account",
    true
  )
);

router.post("/case", sfCasesApiHandler("case"));

router.patch(
  "/case/:caseId",
  sfCasesApiHandler("case/:caseId", false, "caseId")
);

export default router;
