import { css } from "@emotion/core";
import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";
import {
  isProduct,
  MembersDataApiItem,
  MembersDatApiAsyncLoader,
  ProductDetail,
  Subscription
} from "../../../../shared/productResponse";
import {
  createProductDetailFetcher,
  ProductTypes
} from "../../../../shared/productTypes";
import AsyncLoader from "../../asyncLoader";
import { COUNTRIES } from "../../identity/models";
import { PageContainer } from "../../page";
import { RouteableStepProps, WizardStep } from "../../wizardRouterAdapter";

import { Button } from "@guardian/src-button";
import { palette } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
// @ts-ignore
import { SvgArrowRightStraight } from "@guardian/src-svgs";
import { Link } from "@reach/router";
import { DeliveryAddress } from "../../../../shared/productResponse";
import { CallCentreNumbers } from "../../callCentreNumbers";
import { momentiseDateStr } from "../../holiday/holidayStopApi";
import { navLinks } from "../../nav";
import { InfoIconDark } from "../../svgs/infoIconDark";
import { updateAddressFetcher } from "./deliveryAddressApi";
import { renderConfirmation } from "./DeliveryAddressEditConfirmed";
import {
  NewDeliveryAddressContext,
  SubscriptionsAffectedContext
} from "./deliveryAddressFormContext";
import { FormValidationResponse, isFormValid } from "./formValidation";
import { Input } from "./input";
import { Select } from "./select";

export interface ContactIdToArrayOfProductDetail {
  [contactId: string]: ProductDetail[];
}

interface ProductDetailWithContactId extends ProductDetail {
  subscription: Subscription & {
    contactId: string;
  };
}

function hasContactId(
  productDetail: ProductDetail
): productDetail is ProductDetailWithContactId {
  return !!productDetail.subscription.contactId;
}

export const getValidDeliveryAddressChangeEffectiveDates = (
  allProductDetail: ProductDetail[]
) =>
  allProductDetail.filter(hasContactId).reduce(
    (accumulator, productDetail) => ({
      ...accumulator,
      [productDetail.subscription.contactId]: [
        ...(accumulator[productDetail.subscription.contactId] || []),
        productDetail
      ]
    }),
    {} as ContactIdToArrayOfProductDetail
  );

interface FormStates {
  INIT: string;
  PENDING: string;
  VALIDATION_ERROR: string;
  VALIDATION_SUCCESS: string;
  SUCCESS: string;
  POST_ERROR: string;
}
export const formStates: FormStates = {
  INIT: "init",
  PENDING: "pending",
  VALIDATION_ERROR: "validationError",
  VALIDATION_SUCCESS: "validationSuccess",
  SUCCESS: "success",
  POST_ERROR: "postError"
};

const renderDeliveryAddressForm = (routeableStepProps: RouteableStepProps) => (
  allProductDetail: MembersDataApiItem[]
) => (
  <FormContainer
    contactIdToArrayOfProductDetail={getValidDeliveryAddressChangeEffectiveDates(
      allProductDetail.filter(isProduct)
    )}
    routeableStepProps={routeableStepProps}
  />
);
const clearState = (
  setFormStatus: Dispatch<SetStateAction<string>>,
  setFormErrors: Dispatch<SetStateAction<FormValidationResponse>>,
  setAddressLine1: Dispatch<SetStateAction<string>>,
  setAddressLine2: Dispatch<SetStateAction<string>>,
  setTown: Dispatch<SetStateAction<string>>,
  setRegion: Dispatch<SetStateAction<string>>,
  setPostcode: Dispatch<SetStateAction<string>>,
  setCountry: Dispatch<SetStateAction<string>>
) => () => {
  setFormStatus(formStates.INIT);
  setFormErrors({ isValid: false });
  setAddressLine1("");
  setAddressLine2("");
  setTown("");
  setRegion("");
  setPostcode("");
  setCountry("");
};

interface FormContainerProps {
  contactIdToArrayOfProductDetail: ContactIdToArrayOfProductDetail;
  routeableStepProps: RouteableStepProps;
}
const FormContainer = (props: FormContainerProps) => {
  const [formStatus, setFormStatus] = useState(formStates.INIT);
  const [formErrors, setFormErrors] = useState({ isValid: false });
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [town, setTown] = useState("");
  const [region, setRegion] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("");

  const subscriptionsNames = Object.values(
    props.contactIdToArrayOfProductDetail
  )
    .flat()
    .map(productDetail => {
      const friendlyProductName = ProductTypes.contentSubscriptions.mapGroupedToSpecific?.(
        productDetail
      ).friendlyName;
      return `${friendlyProductName}`;
    });

  const defaultFormProps = {
    formStatus,
    setFormStatus,
    formErrors,
    setFormErrors,
    addressLine1,
    setAddressLine1,
    addressLine2,
    setAddressLine2,
    town,
    setTown,
    region,
    setRegion,
    postcode,
    setPostcode,
    country,
    setCountry,
    subscriptionsNames
  };
  const evolvingAddressObject = {
    addressLine1,
    addressLine2,
    town,
    region,
    postcode,
    country
  };

  return (
    <NewDeliveryAddressContext.Provider
      value={{
        newDeliveryAddress: evolvingAddressObject,
        addressStateReset: clearState(
          setFormStatus,
          setFormErrors,
          setAddressLine1,
          setAddressLine2,
          setTown,
          setRegion,
          setPostcode,
          setCountry
        )
      }}
    >
      <SubscriptionsAffectedContext.Provider
        value={props.contactIdToArrayOfProductDetail}
      >
        <WizardStep
          routeableStepProps={props.routeableStepProps}
          hideBackButton
        >
          <div
            css={css`
              padding-left: 1.25rem;
              padding-right: 1.25rem;
            `}
          >
            <PageContainer>
              <h1>Manage delivery address</h1>
              {Object.keys(props.contactIdToArrayOfProductDetail).length ===
                0 && (
                <div>
                  <p>
                    No addresses available for update. If this doesn't seem
                    right please contact us
                  </p>
                  <CallCentreNumbers />
                </div>
              )}
              {Object.keys(props.contactIdToArrayOfProductDetail).length >
                1 && (
                <div>
                  <p>You will need to contact us to update your addresses</p>
                  <CallCentreNumbers />
                </div>
              )}
              {Object.keys(props.contactIdToArrayOfProductDetail).length ===
                1 && (
                <div>
                  {Object.values(props.contactIdToArrayOfProductDetail).flat()
                    .length > 1 && (
                    <p
                      css={css`
                        border-top: 1px solid ${palette.neutral["86"]};
                        padding: 14px 0;
                        ${textSans.medium()};
                      `}
                    >
                      Please note that changing your address here will update
                      the delivery address for all of your subscriptions.
                    </p>
                  )}
                  {(formStatus === formStates.INIT ||
                    formStatus === formStates.PENDING ||
                    formStatus === formStates.VALIDATION_ERROR) && (
                    <Form
                      {...defaultFormProps}
                      warning={
                        <>
                          <SubscriptionsAffectedList
                            title={
                              "This address change will affect the following subscriptions:"
                            }
                            contactIdDictOfProductDetails={
                              props.contactIdToArrayOfProductDetail
                            }
                          />
                        </>
                      }
                    />
                  )}
                </div>
              )}
              {formStatus === formStates.VALIDATION_SUCCESS && (
                <AsyncLoader
                  render={renderConfirmation(props.routeableStepProps.navigate)}
                  fetch={updateAddressFetcher(
                    evolvingAddressObject,
                    Object.keys(props.contactIdToArrayOfProductDetail)[0]
                  )}
                  readerOnOK={(resp: Response) => resp.text()}
                  loadingMessage={"Updating delivery address..."}
                />
              )}
            </PageContainer>
          </div>
        </WizardStep>
      </SubscriptionsAffectedContext.Provider>
    </NewDeliveryAddressContext.Provider>
  );
};

export interface SubscriptionsAffectedListProps {
  contactIdDictOfProductDetails: ContactIdToArrayOfProductDetail;
  title?: string;
}
export const SubscriptionsAffectedList = (
  props: SubscriptionsAffectedListProps
) => {
  return (
    <>
      {props.title && (
        <p
          css={css`
            ${textSans.medium()};
            margin-bottom: 12px;
          `}
        >
          <i
            css={css`
              display: inline-block;
              vertical-align: sub;
              width: 17px;
              height: 17px;
              margin-right: 5px;
            `}
          >
            <InfoIconDark />
          </i>
          {props.title}
        </p>
      )}
      <ul
        css={css`
          margin: 0;
          padding: 0;
          list-style: none;
          display: block;
          ${textSans.medium()};
          font-weight: bold;
          ${props.title ? "margin-left: 22px;" : ""}
        `}
      >
        {Object.values(props.contactIdDictOfProductDetails)
          .flat()
          .map(productDetail => {
            const friendlyProductName = ProductTypes.contentSubscriptions.mapGroupedToSpecific?.(
              productDetail
            ).friendlyName;
            return (
              <li
                key={productDetail.subscription.subscriptionId}
                css={css`
                  display: block;
                `}
              >
                {friendlyProductName} (
                {productDetail.subscription.subscriptionId})
                {productDetail.subscription.deliveryAddressChangeEffectiveDate
                  ? ` as of front cover dated ${momentiseDateStr(
                      productDetail.subscription
                        .deliveryAddressChangeEffectiveDate
                    ).format("dddd Do MMMM YYYY")}`
                  : ""}
              </li>
            );
          })}
      </ul>
    </>
  );
};

interface FormProps {
  formStatus: string;
  setFormStatus: Dispatch<SetStateAction<string>>;
  formErrors: FormValidationResponse;
  setFormErrors: Dispatch<SetStateAction<FormValidationResponse>>;
  addressLine1: string;
  setAddressLine1: Dispatch<SetStateAction<string>>;
  addressLine2: string;
  setAddressLine2: Dispatch<SetStateAction<string>>;
  town: string;
  setTown: Dispatch<SetStateAction<string>>;
  region: string;
  setRegion: Dispatch<SetStateAction<string>>;
  postcode: string;
  setPostcode: Dispatch<SetStateAction<string>>;
  country: string;
  setCountry: Dispatch<SetStateAction<string>>;
  warning?: ReactNode;
  subscriptionsNames: string[];
}

const Form = (props: FormProps) => {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    props.setFormStatus(formStates.PENDING);

    const formData: DeliveryAddress = {
      addressLine1: props.addressLine1,
      addressLine2: props.addressLine2,
      town: props.town,
      region: props.region,
      postcode: props.postcode,
      country: props.country
    };

    const isFormValidResponse = isFormValid(formData, props.subscriptionsNames);

    props.setFormErrors({
      addressLine1: isFormValidResponse.addressLine1,
      town: isFormValidResponse.town,
      postcode: isFormValidResponse.postcode,
      country: isFormValidResponse.country
    } as FormValidationResponse);

    props.setFormStatus(
      isFormValidResponse.isValid
        ? formStates.VALIDATION_SUCCESS
        : formStates.VALIDATION_ERROR
    );
  };

  return (
    <form action="#" onSubmit={handleFormSubmit}>
      {props.formStatus === formStates.POST_ERROR && (
        <span>Uh oh, something went wrong</span>
      )}
      {props.formStatus === formStates.SUCCESS && (
        <span>Form submitted successfully</span>
      )}
      <fieldset
        css={{
          border: `1px solid ${palette.neutral["86"]}`,
          padding: "48px 14px 14px",
          position: "relative",
          label: {
            marginTop: "10px"
          }
        }}
      >
        <legend
          css={css`
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            padding: 0 14px;
            ${textSans.medium()};
            font-weight: bold;
            line-height: 48px;
            background-color: ${palette.neutral["97"]};
            border-bottom: 1px solid ${palette.neutral["86"]};
          `}
        >
          Delivery address{" "}
        </legend>
        <Input
          label={"Address line 1"}
          width={30}
          value={props.addressLine1}
          changeSetState={props.setAddressLine1}
          inErrorState={
            !!(
              props.formStatus === formStates.VALIDATION_ERROR &&
              !props.formErrors.addressLine1?.isValid
            )
          }
          errorMessage={props.formErrors.addressLine1?.message}
        />
        <Input
          label="Address line 2"
          width={30}
          value={props.addressLine2}
          changeSetState={props.setAddressLine2}
          optional={true}
        />
        <Input
          label="Town or City"
          width={30}
          value={props.town}
          changeSetState={props.setTown}
          inErrorState={
            !!(
              props.formStatus === formStates.VALIDATION_ERROR &&
              !props.formErrors.town?.isValid
            )
          }
          errorMessage={props.formErrors.town?.message}
        />
        <Input
          label="County or State"
          width={30}
          value={props.region}
          optional={true}
          changeSetState={props.setRegion}
        />
        <Input
          label="Postcode/Zipcode"
          width={10}
          value={props.postcode}
          changeSetState={props.setPostcode}
          inErrorState={
            !!(
              props.formStatus === formStates.VALIDATION_ERROR &&
              !props.formErrors.postcode?.isValid
            )
          }
          errorMessage={props.formErrors.postcode?.message}
        />
        <Select
          label={"Country"}
          options={COUNTRIES}
          width={30}
          additionalcss={css`
            margin-top: 14px;
          `}
          value={props.country}
          changeSetState={props.setCountry}
          inErrorState={
            !!(
              props.formStatus === formStates.VALIDATION_ERROR &&
              !props.formErrors.country?.isValid
            )
          }
          errorMessage={props.formErrors.country?.message}
        />
        {props.warning && (
          <div
            css={css`
              margin-top: 24px;
            `}
          >
            {props.warning}
          </div>
        )}
        <div
          css={{
            marginTop: "14px",
            "*": {
              display: "inline-block"
            }
          }}
        >
          <Button
            type="submit"
            iconSide="right"
            icon={<SvgArrowRightStraight />}
          >
            Submit
          </Button>
          <Link
            to={navLinks.subscriptions.link}
            css={css`
              ${textSans.medium()};
              font-weight: bold;
              margin-left: 22px;
              color: ${palette.brand.main};
            `}
          >
            Go back
          </Link>
        </div>
      </fieldset>
    </form>
  );
};

export const DeliveryAddressForm = (props: RouteableStepProps) =>
  props.location &&
  props.location.state &&
  Array.isArray(props.location.state) ? (
    renderDeliveryAddressForm(props)(props.location.state)
  ) : (
    <MembersDatApiAsyncLoader
      render={renderDeliveryAddressForm(props)}
      fetch={createProductDetailFetcher(ProductTypes.contentSubscriptions)}
      loadingMessage={"Loading delivery address form..."}
    />
  );
