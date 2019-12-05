import { Router } from "express";
import { conf } from "../config";
import {
  membersDataApiHandler,
  proxyApiHandler,
  sfCasesApiHandler
} from "../middleware/apiMiddleware";
import { withIdentity } from "../middleware/identityMiddleware";
import { stripeSetupIntentHandler } from "../stripeSetupIntentsHandler";

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
  "/payment/card/:subscriptionName",
  membersDataApiHandler(
    "/user-attributes/me/update-card/:subscriptionName",
    false,
    "subscriptionName"
  )
);
router.post("/payment/card", stripeSetupIntentHandler);
router.post(
  "/payment/dd/:subscriptionName",
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

router.post("/delivery/address/update", (req, res) => {
  // tslint:disable-next-line:no-console
  console.log(`body json = ${JSON.stringify(req.body, null, " ")}`);
  if (!req.body.addressLine1) {
    return res.status(400).send({
      message: "Address line 1 is required"
    });
  }
  return res.status(201).send({
    ok: "true",
    message: "Delivery address updated"
  });
});

export default router;
