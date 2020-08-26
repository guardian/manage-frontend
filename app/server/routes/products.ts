import { Request, Response, Router } from "express";
import { PRODUCT_TYPES, ProductType } from "../../shared/productTypes";
import { membersDataApiHandler } from "../apiProxy";

const routeProvider = (apiPathPrefix: string) => {
  const router = Router();

  Object.values(PRODUCT_TYPES).forEach((productType: ProductType) => {
    router.use("/banner/" + productType.urlPart, (_, res: Response) => {
      res.redirect("/payment/" + productType.urlPart + "?INTCMP=BANNER");
    });

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

    if (productType.updateAmountMdaEndpoint) {
      router.post(
        `${apiPathPrefix}update/amount/` +
          productType.urlPart +
          "/:subscriptionName",
        membersDataApiHandler(
          "user-attributes/me/" +
            productType.updateAmountMdaEndpoint +
            "/:subscriptionName",
          "MDA_UPDATE_CONTRIBUTIONS_AMOUNT",
          ["subscriptionName"]
        )
      );
    }
  });

  return router;
};

export default routeProvider;
