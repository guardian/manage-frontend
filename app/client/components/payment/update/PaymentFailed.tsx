import {
  isProduct,
  MembersDataApiItemContext,
} from "../../../../shared/productResponse";
import {
  RouteableStepProps,
  visuallyNavigateToParent,
} from "../../wizardRouterAdapter";
import {
  isNewPaymentMethodDetail,
  NewPaymentMethodContext,
} from "./newPaymentMethodDetail";
import { CallCentreNumbers } from "../../callCentreNumbers";

export default function PaymentFailed(props: RouteableStepProps) {
  return (
    <MembersDataApiItemContext.Consumer>
      {(previousProductDetail) => (
        <NewPaymentMethodContext.Consumer>
          {(newPaymentMethodDetail) =>
            isNewPaymentMethodDetail(newPaymentMethodDetail) &&
            isProduct(previousProductDetail) ? (
              <div css={{ textAlign: "left", marginTop: "10px" }}>
                <h2>
                  Sorry, the {newPaymentMethodDetail.friendlyName} update
                  failed.
                </h2>
                <p>
                  To try again please go back and re-enter your new{" "}
                  {newPaymentMethodDetail.friendlyName} details.
                </p>
                <CallCentreNumbers prefixText="Alternatively, to contact us" />
              </div>
            ) : (
              visuallyNavigateToParent(props)
            )
          }
        </NewPaymentMethodContext.Consumer>
      )}
    </MembersDataApiItemContext.Consumer>
  );
}
