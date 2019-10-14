import { Request, Response, Router } from "express";
import {
  hasProductPageRedirect,
  ProductType,
  ProductTypes
} from "../../shared/productTypes";
import { holidayStopApiHandler } from "../holidayStopApiHandlers";
import { membersDataApiHandler } from "../middleware/apiMiddleware";

const routeProvider = (apiPathPrefix: string) => {
  const router = Router();

  Object.values(ProductTypes).forEach((productType: ProductType) => {
    if (productType.legacyUrlPart) {
      router.use(
        `*/${productType.legacyUrlPart}*`,
        (req: Request, res: Response) => {
          res.redirect(
            req.originalUrl.replace(
              `/${productType.legacyUrlPart}`,
              `/${productType.urlPart}`
            )
          );
        }
      );
    }
  });

  Object.values(ProductTypes).forEach((productType: ProductType) => {
    router.use(
      "/banner/" + productType.urlPart,
      (req: Request, res: Response) => {
        res.redirect("/payment/" + productType.urlPart + "?INTCMP=BANNER");
      }
    );

    if (productType.updateAmountMdaEndpoint) {
      router.post(
        `${apiPathPrefix}update/amount/` +
          productType.urlPart +
          "/:subscriptionName",
        membersDataApiHandler(
          "user-attributes/me/" +
            productType.updateAmountMdaEndpoint +
            "/:subscriptionName",
          false,
          "subscriptionName"
        )
      );
    }
    if (hasProductPageRedirect(productType)) {
      router.get("/" + productType.urlPart, (req: Request, res: Response) => {
        res.redirect("/" + productType.productPage);
      });
    }
  });

  router.use(
    `${apiPathPrefix}holidays/:subscriptionName?/:sfId?`,
    holidayStopApiHandler
  );

  return router;
};

export default routeProvider;
