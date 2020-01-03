import { Router } from "express";
import Raven from "raven";
import {
  isProduct,
  MDA_TEST_USER_HEADER,
  MembersDataApiItem
} from "../../shared/productResponse";
import { apiGatewayHandler } from "../apiGatewayHandler";
import { conf } from "../config";
import { augmentProductDetailWithDeliveryAddressChangeEffectiveDateForToday } from "../fulfilmentDateCalculatorReader";
import { log } from "../log";
import {
  customMembersDataApiHandler,
  membersDataApiHandler,
  proxyApiHandler,
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
    const augmentedWithTestUser = (JSON.parse(
      body
    ) as MembersDataApiItem[]).map(mdaItem => ({
      ...mdaItem,
      isTestUser
    }));
    Promise.all(
      augmentedWithTestUser
        .filter(isProduct)
        .map(augmentProductDetailWithDeliveryAddressChangeEffectiveDateForToday)
    )
      .then(_ => {
        response.json(_);
      })
      .catch(error => {
        const errorMessage =
          "Unexpected error when augmenting members-data-api response with 'deliveryAddressChangeEffectiveDate'";
        log.error(errorMessage, error);
        Raven.captureMessage(errorMessage);
        response.json(augmentedWithTestUser); // fallback to sending sending the response augmented with just isTestUser
      });
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

router.use(
  "/case/:caseId?",
  apiGatewayHandler(
    "cancellation-sf-cases-api",
    pathParams => `/case/${pathParams.caseId || ""}`
  )
);

router.use(
  "/holidays/:subscriptionName?/:sfId?",
  apiGatewayHandler("holiday-stop-api", pathParams => {
    const isPotentialCall = pathParams.sfId === "potential";
    const basePathPart = isPotentialCall ? "potential" : "hsr";
    const maybeActualExistingSfId = isPotentialCall
      ? undefined
      : pathParams.sfId;
    return pathParams && pathParams.subscriptionName
      ? `/${basePathPart}/${
          pathParams.subscriptionName
        }/${maybeActualExistingSfId || ""}`
      : "/hsr";
  })
);

router.use(
  "/delivery-records/:subscriptionName",
  apiGatewayHandler(
    "delivery-records-api",
    pathParams => `/delivery-records/${pathParams.subscriptionName}`
  )
);

router.put(
  "/delivery/address/update/:contactId",
  membersDataApiHandler(
    "/user-attributes/me/delivery-address/:contactId",
    false,
    "contactId"
  )
);

export default router;
