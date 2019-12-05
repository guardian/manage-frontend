import { Router } from "express";
import {
  MDA_TEST_USER_HEADER,
  MembersDataApiItem
} from "../../shared/productResponse";
import { conf } from "../config";
import {
  customMembersDataApiHandler,
  membersDataApiHandler,
  proxyApiHandler,
  sfCasesApiHandler,
  straightThroughBodyHandler
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
  customMembersDataApiHandler((response, body) => {
    const isTestUser = response.getHeader(MDA_TEST_USER_HEADER) === "true";
    response.json(
      (JSON.parse(body) as MembersDataApiItem[]).map(mdaItem => ({
        ...mdaItem,
        isTestUser
      }))
    );
  })("user-attributes/me/mma/:subscriptionName", true, "subscriptionName")
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
    straightThroughBodyHandler
  )("direct-debit/check-account", true)
);

router.post("/case", sfCasesApiHandler("case"));

router.patch(
  "/case/:caseId",
  sfCasesApiHandler("case/:caseId", false, "caseId")
);

export default router;
