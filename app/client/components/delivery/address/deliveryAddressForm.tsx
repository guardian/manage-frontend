import React from "react";
import {
  annotateMdaResponseWithTestUserFromHeaders,
  hasProduct,
  MembersDataApiResponse,
  MembersDatApiAsyncLoader,
  ProductDetail
} from "../../../../shared/productResponse";
import {
  createProductDetailFetcher,
  ProductTypes
} from "../../../../shared/productTypes";
import { PageContainer } from "../../page";
import { RouteableStepProps } from "../../wizardRouterAdapter";

type ContactIdState = "singular" | "duplicates" | "unique";
interface ContactIdStates {
  [key: string]: ContactIdState;
}

const CONTACT_ID_STATES: ContactIdStates = {
  singular: "singular",
  duplicates: "duplicates",
  unique: "unique"
};

const getContactIdsState = (
  allProductDetail: ProductDetail[]
): ContactIdState => {
  const allContactIds = allProductDetail
    .filter(product => product.subscription.contactId)
    .map(product => JSON.stringify(product.subscription.contactId));
  if (allContactIds.length === 1) {
    return CONTACT_ID_STATES.singular;
  } else if ([...new Set(allContactIds)].length === allContactIds.length) {
    return CONTACT_ID_STATES.unique;
  }
  return CONTACT_ID_STATES.duplicates;
};

const renderAllProductDetails = (
  allProductDetail: MembersDataApiResponse[]
) => {
  const contactIdsState = getContactIdsState(
    allProductDetail.filter(hasProduct)
  );
  return (
    <PageContainer>
      <h1>Manage delivery address</h1>
      {contactIdsState === CONTACT_ID_STATES.singular && (
        <span>singular contact ID</span>
      )}
      {contactIdsState === CONTACT_ID_STATES.unique && (
        <span>there are unique contact ID's</span>
      )}
      {contactIdsState === CONTACT_ID_STATES.duplicates && (
        <span>ALL contact ID's are duplicates</span>
      )}
    </PageContainer>
  );
};

export const DeliveryAddressForm = (props: RouteableStepProps) =>
  props.location && props.location.state ? (
    renderAllProductDetails(props.location.state)
  ) : (
    <MembersDatApiAsyncLoader
      render={renderAllProductDetails}
      fetch={createProductDetailFetcher(ProductTypes.contentSubscriptions)}
      readerOnOK={annotateMdaResponseWithTestUserFromHeaders}
      loadingMessage={"Loading your delivery address..."}
    />
  );
