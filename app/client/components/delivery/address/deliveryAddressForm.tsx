import { css } from "@emotion/core";
import { Checkbox, CheckboxGroup } from "@guardian/src-checkbox";
import { space } from "@guardian/src-foundations";
import { capitalize } from "lodash";
import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState
} from "react";
import {
  DeliveryAddress,
  isProduct,
  MembersDataApiItem,
  MembersDatApiAsyncLoader,
  ProductDetail,
  Subscription
} from "../../../../shared/productResponse";
import {
  createProductDetailFetcher,
  ProductFriendlyName,
  ProductTypes,
  ProductTypeWithMapGroupedToSpecific
} from "../../../../shared/productTypes";
import { COUNTRIES } from "../../identity/models";
import { PageHeaderContainer, PageNavAndContentContainer } from "../../page";
import { RouteableStepProps, WizardStep } from "../../wizardRouterAdapter";

import { Button } from "@guardian/src-button";
import { palette } from "@guardian/src-foundations";
import { headline, textSans } from "@guardian/src-foundations/typography";
import { Link, navigate } from "@reach/router";
import moment from "moment";
import { maxWidth, minWidth } from "../../../styles/breakpoints";
import { flattenEquivalent } from "../../../utils";
import { CallCentreEmailAndNumbers } from "../../callCenterEmailAndNumbers";
import { CallCentreNumbers } from "../../callCentreNumbers";
import { FlowStartMultipleProductDetailHandler } from "../../flowStartMultipleProductDetailHandler";
import { navLinks } from "../../nav";
import {
  ProductDescriptionListKeyValue,
  ProductDescriptionListTable
} from "../../productDescriptionListTable";
import { ProgressIndicator } from "../../progressIndicator";
import { InfoIconDark } from "../../svgs/infoIconDark";
import {
  AddressChangedInformationContext,
  ContactIdContext,
  convertToDescriptionListData,
  NewDeliveryAddressContext,
  ProductName,
  SubscriptionEffectiveData
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

export const addressChangeAffectedInfo = (
  contactIdToArrayOfProductDetail: ContactIdToArrayOfProductDetail
): SubscriptionEffectiveData[] =>
  Object.values(contactIdToArrayOfProductDetail)
    .flatMap<ProductDetail>(flattenEquivalent)
    .map(productDetail => ({
      productDetail,
      productType: ProductTypes.contentSubscriptions.mapGroupedToSpecific?.(
        productDetail
      )
    }))
    .filter(_ => _.productType && _.productType.delivery?.showAddress)
    .map(({ productDetail, productType }) => {
      const friendlyProductName = capitalize(
        productType?.shortFriendlyName || productType?.friendlyName
      )
        .replace("subscription", "")
        .trim();
      const effectiveDate = productDetail.subscription
        .deliveryAddressChangeEffectiveDate
        ? moment(productDetail.subscription.deliveryAddressChangeEffectiveDate)
        : undefined;
      return {
        friendlyProductName,
        subscriptionId: productDetail.subscription.subscriptionId,
        effectiveDate
      };
    });

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

const renderDeliveryAddressForm = (
  routeableStepProps: RouteableStepProps,
  productName: ProductFriendlyName,
  enableDeilveryInstructions: boolean,
  existingDeliveryAddress?: DeliveryAddress
) => (allProductDetails: MembersDataApiItem[]) => {
  return (
    <FormContainer
      contactIdToArrayOfProductDetail={getValidDeliveryAddressChangeEffectiveDates(
        allProductDetails
          .filter(isProduct)
          .filter(product => product.subscription.readerType !== "Gift")
      )}
      routeableStepProps={routeableStepProps}
      productName={productName}
      existingDeliveryAddress={existingDeliveryAddress}
      enableDeilveryInstructions={enableDeilveryInstructions}
    />
  );
};
const clearState = (
  setFormStatus: Dispatch<SetStateAction<string>>,
  setFormErrors: Dispatch<SetStateAction<FormValidationResponse>>,
  setAddressLine1: Dispatch<SetStateAction<string>>,
  setAddressLine2: Dispatch<SetStateAction<string>>,
  setTown: Dispatch<SetStateAction<string>>,
  setRegion: Dispatch<SetStateAction<string>>,
  setPostcode: Dispatch<SetStateAction<string>>,
  setCountry: Dispatch<SetStateAction<string>>,
  setInstructions: Dispatch<SetStateAction<string>>,
  setAcknowledgementState: Dispatch<SetStateAction<boolean>>
) => () => {
  setFormStatus(formStates.INIT);
  setFormErrors({ isValid: false });
  setAddressLine1("");
  setAddressLine2("");
  setTown("");
  setRegion("");
  setPostcode("");
  setCountry("");
  setInstructions("");
  setAcknowledgementState(false);
};

interface FormContainerProps {
  contactIdToArrayOfProductDetail: ContactIdToArrayOfProductDetail;
  routeableStepProps: RouteableStepProps;
  productName: ProductFriendlyName;
  existingDeliveryAddress?: DeliveryAddress;
  enableDeilveryInstructions: boolean;
}
const FormContainer = (props: FormContainerProps) => {
  const [formStatus, setFormStatus] = useState(formStates.INIT);
  const [formErrors, setFormErrors] = useState({ isValid: false });
  const [addressLine1, setAddressLine1] = useState(
    props.existingDeliveryAddress?.addressLine1 || ""
  );
  const [addressLine2, setAddressLine2] = useState(
    props.existingDeliveryAddress?.addressLine2 || ""
  );
  const [town, setTown] = useState(props.existingDeliveryAddress?.town || "");
  const [region, setRegion] = useState(
    props.existingDeliveryAddress?.region || ""
  );
  const [postcode, setPostcode] = useState(
    props.existingDeliveryAddress?.postcode || ""
  );

  const [country, setCountry] = useState(
    props.existingDeliveryAddress?.country
      ? COUNTRIES.find(
          countryObj =>
            props.existingDeliveryAddress?.country === countryObj.iso
        )?.name || props.existingDeliveryAddress?.country
      : ""
  );
  const [acknowledgementChecked, setAcknowledgementState] = useState<boolean>(
    false
  );
  const [instructions, setInstructions] = useState(
    props.existingDeliveryAddress?.instructions || ""
  );

  const subHeadingCss = `
    border-top: 1px solid ${palette.neutral["86"]};
    ${headline.small()};
    font-weight: bold;
    margin-top: 50px;
    ${maxWidth.tablet} {
      font-size: 1.25rem;
      line-height: 1.6;
    };
  `;

  const subscriptionsNames = Object.values(
    props.contactIdToArrayOfProductDetail
  )
    .flatMap(flattenEquivalent)
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
    instructions,
    setInstructions,
    subscriptionsNames,
    acknowledgementChecked,
    setAcknowledgementState
  };
  const evolvingAddressObject = {
    addressLine1,
    addressLine2,
    town,
    region,
    postcode,
    country,
    instructions
  };

  return (
    <ProductName.Provider value={props.productName}>
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
            setCountry,
            setInstructions,
            setAcknowledgementState
          )
        }}
      >
        <AddressChangedInformationContext.Provider
          value={addressChangeAffectedInfo(
            props.contactIdToArrayOfProductDetail
          )}
        >
          <ContactIdContext.Provider
            value={Object.keys(props.contactIdToArrayOfProductDetail)[0]}
          >
            <WizardStep
              routeableStepProps={props.routeableStepProps}
              hideBackButton
              fullWidth
            >
              <PageHeaderContainer
                selectedNavItem={navLinks.accountOverview}
                breadcrumbs={[
                  {
                    title: navLinks.accountOverview.title,
                    link: navLinks.accountOverview.link
                  },
                  {
                    title: "Edit delivery address",
                    currentPage: true
                  }
                ]}
                title={
                  <span
                    css={css`
                      ::first-letter {
                        text-transform: capitalize;
                      }
                    `}
                  >
                    <span
                      css={css`
                        display: none;
                        ${minWidth.tablet} {
                          display: inline;
                        }
                      `}
                    >
                      Update{" "}
                    </span>
                    delivery details
                  </span>
                }
              />
              <PageNavAndContentContainer
                selectedNavItem={navLinks.accountOverview}
              >
                <ProgressIndicator
                  steps={[
                    { title: "Update", isCurrentStep: true },
                    { title: "Review" },
                    { title: "Confirmation" }
                  ]}
                  additionalCSS={css`
                    margin-top: ${space[5]}px;
                  `}
                />
                <h2
                  css={css`
                    ${subHeadingCss}
                  `}
                >
                  Update address details
                </h2>
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
                    {Object.values(
                      props.contactIdToArrayOfProductDetail
                    ).flatMap(flattenEquivalent).length > 1 && (
                      <p
                        css={css`
                          ${textSans.medium()};
                          background-color: ${palette.neutral[97]};
                          padding: ${space[5]}px ${space[5]}px ${space[5]}px
                            49px;
                          margin-bottom: 12px;
                          position: relative;
                        `}
                      >
                        <i
                          css={css`
                            width: 17px;
                            height: 17px;
                            position: absolute;
                            top: ${space[5]}px;
                            left: ${space[5]}px;
                          `}
                        >
                          <InfoIconDark fillColor={palette.brand[500]} />
                        </i>
                        Please note that changing your address here will update
                        the delivery address for all of your subscriptions.
                      </p>
                    )}
                    {(formStatus === formStates.INIT ||
                      formStatus === formStates.PENDING ||
                      formStatus === formStates.VALIDATION_ERROR) && (
                      <Form
                        {...defaultFormProps}
                        routeableStepProps={props.routeableStepProps}
                        warning={convertToDescriptionListData(
                          addressChangeAffectedInfo(
                            props.contactIdToArrayOfProductDetail
                          )
                        )}
                        enableDeilveryInstructions={
                          props.enableDeilveryInstructions
                        }
                      />
                    )}
                  </div>
                )}
              </PageNavAndContentContainer>
            </WizardStep>
          </ContactIdContext.Provider>
        </AddressChangedInformationContext.Provider>
      </NewDeliveryAddressContext.Provider>
    </ProductName.Provider>
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
  instructions: string;
  setInstructions: Dispatch<SetStateAction<string>>;
  acknowledgementChecked: boolean;
  setAcknowledgementState: Dispatch<SetStateAction<boolean>>;
  warning?: ProductDescriptionListKeyValue[];
  subscriptionsNames: string[];
  routeableStepProps: RouteableStepProps;
  enableDeilveryInstructions: boolean;
}

const Form = (props: FormProps) => {
  const [
    showTopCallCentreNumbers,
    setTopCallCentreNumbersVisibility
  ] = useState<boolean>(false);

  const [
    instructionsRemainingCharacters,
    setInstructionsRemainingCharacters
  ] = useState<number>(250 - props.instructions.length);

  const handleFormSubmit = (e: FormEvent) => {
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

    if (isFormValidResponse.isValid && props.acknowledgementChecked) {
      // formStates.VALIDATION_SUCCESS`);
      (props.routeableStepProps.navigate || navigate)("review");
    } else {
      props.setFormStatus(formStates.VALIDATION_ERROR);
    }
  };

  return (
    <>
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
            marginBottom: `${space[5]}px`,
            label: {
              marginTop: `${space[3]}px`
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
            Delivery address and instructions
          </legend>
          <Input
            label={"Address line 1"}
            width={30}
            value={props.addressLine1}
            changeSetState={props.setAddressLine1}
            inErrorState={
              props.formStatus === formStates.VALIDATION_ERROR &&
              !props.formErrors.addressLine1?.isValid
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
              props.formStatus === formStates.VALIDATION_ERROR &&
              !props.formErrors.town?.isValid
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
            width={11}
            value={props.postcode}
            changeSetState={props.setPostcode}
            inErrorState={
              props.formStatus === formStates.VALIDATION_ERROR &&
              !props.formErrors.postcode?.isValid
            }
            errorMessage={props.formErrors.postcode?.message}
          />
          <Select
            label={"Country"}
            options={COUNTRIES.map(country => {
              return {
                name: country.name,
                value: country.name
              };
            })}
            width={30}
            additionalCSS={css`
              margin-top: 14px;
            `}
            value={props.country}
            changeSetState={props.setCountry}
            inErrorState={
              props.formStatus === formStates.VALIDATION_ERROR &&
              !props.formErrors.country?.isValid
            }
            errorMessage={props.formErrors.country?.message}
          />
          {props.enableDeilveryInstructions && (
            <label
              css={css`
                display: block;
                color: ${palette.neutral["7"]};
                ${textSans.medium()};
                font-weight: bold;
              `}
            >
              Instructions
              <div>
                <div
                  css={css`
                    display: inline-block;
                    vertical-align: top;
                    margin-top: 4px;
                    width: 100%;
                    max-width: 30ch;
                  `}
                >
                  <textarea
                    id="delivery-instructions"
                    name="instructions"
                    rows={2}
                    maxLength={250}
                    value={props.instructions}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                      props.setInstructions(e.target.value);
                      setInstructionsRemainingCharacters(
                        250 - e.target.value.length
                      );
                    }}
                    css={css`
                      width: 100%;
                      border: 2px solid ${palette.neutral["60"]};
                      padding: 12px;
                      resize: vertical;
                      ${textSans.medium()};
                    `}
                  />
                  <span
                    css={css`
                      display: block;
                      text-align: right;
                      ${textSans.small()};
                      color: ${palette.neutral[46]};
                    `}
                  >
                    {instructionsRemainingCharacters} characters remaining
                  </span>
                </div>
                <p
                  css={css`
                    display: block;
                    vertical-align: top;
                    ${textSans.medium()};
                    border: 4px solid ${palette.brand[500]};
                    padding: ${space[5]}px ${space[5]}px ${space[5]}px 49px;
                    margin: ${space[3]}px 0;
                    position: relative;
                    ${minWidth.tablet} {
                      display: inline-block;
                      margin: 2px 0 ${space[3]}px ${space[3]}px;
                      width: calc(100% - (30ch + ${space[3]}px + 2px));
                    }
                  `}
                >
                  <i
                    css={css`
                      width: 17px;
                      height: 17px;
                      position: absolute;
                      top: ${space[5]}px;
                      left: ${space[5]}px;
                    `}
                  >
                    <InfoIconDark fillColor={palette.brand[500]} />
                  </i>
                  Delivery instructions are only applicable for newspaper
                  deliveries. They do not apply to Guardian Weekly.
                </p>
              </div>
            </label>
          )}
        </fieldset>
        <CheckboxGroup
          name="instructions-checkbox"
          error={
            props.formStatus === formStates.VALIDATION_ERROR &&
            !props.acknowledgementChecked
              ? "Please indicate that you understand which subscriptions this change will affect."
              : undefined
          }
        >
          <Checkbox
            value="acknowledged"
            label="I understand that this address change will affect the following subscriptions"
            checked={props.acknowledgementChecked}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              props.setAcknowledgementState(e.target.checked);
            }}
          />
        </CheckboxGroup>
        {props.warning && (
          <ProductDescriptionListTable
            content={props.warning}
            seperateEachRow
          />
        )}
        <div
          css={css`
            margin-top: ${space[5]}px;
            * {
              display: inline-block;
            }
            ${minWidth.tablet} {
              margin-top: ${space[6]}px;
            }
          `}
        >
          <Button type="submit">Review details</Button>
          <Link
            to={navLinks.accountOverview.link}
            css={css`
              ${textSans.medium()};
              font-weight: bold;
              margin-left: 22px;
              color: ${palette.brand.main};
            `}
          >
            Cancel
          </Link>
        </div>
      </form>
      <p
        css={css`
          ${textSans.medium()};
          margin-top: ${space[12]}px;
          color: ${palette.neutral[46]};
        `}
      >
        If you need seperate delivery addresses for each of your subscriptions,
        please{" "}
        <span
          css={css`
            cursor: pointer;
            color: ${palette.brand[500]};
            text-decoration: underline;
          `}
          onClick={() =>
            setTopCallCentreNumbersVisibility(!showTopCallCentreNumbers)
          }
        >
          contact us
        </span>
        .
      </p>
      {showTopCallCentreNumbers && <CallCentreEmailAndNumbers />}
    </>
  );
};

export const DeliveryAddressForm = (props: RouteableStepProps) => {
  if (props.location?.state?.productDetail?.subscription.deliveryAddress) {
    const productType = ProductTypes.contentSubscriptions.mapGroupedToSpecific?.(
      props.location?.state?.productDetail
    );
    const enableDeliveryInstructions = !!productType?.delivery
      ?.enableDeliveryInstructionsUpdate;
    const friendlyProductName = productType?.friendlyName || "subscription";
    return renderDeliveryAddressForm(
      props,
      friendlyProductName,
      enableDeliveryInstructions,
      props.location?.state?.productDetail.subscription.deliveryAddress
    )(props.location.state.allProductDetails);
  }
  return (
    <FlowStartMultipleProductDetailHandler
      {...props}
      overrideProductTypeForFetch={
        ProductTypes.contentSubscriptions as ProductTypeWithMapGroupedToSpecific
      }
      headingPrefix={"View delivery address"}
      hideHeading
      hasLeftNav={{
        pageTitle: "",
        selectedNavItem: navLinks.accountOverview
      }}
      supportRefererSuffix="delivery_address_flow"
      loadingMessagePrefix="Retrieving details of your"
      cancelledExplainer={`This ${props.productType.friendlyName} has been cancelled. You cannot view any of its delivery history.
    Please contact us if you would like to re-start this ${props.productType.friendlyName}, make any amendments or need further help.`}
      singleProductDetailRenderer={(
        routeableStepProps: RouteableStepProps,
        productDetail: ProductDetail
      ) => {
        const productType = ProductTypes.contentSubscriptions.mapGroupedToSpecific?.(
          productDetail
        );
        const friendlyProductName = productType?.friendlyName || "subscription";
        const enableDeliveryInstructions = !!productType?.delivery
          ?.enableDeliveryInstructionsUpdate;
        return (
          <MembersDatApiAsyncLoader
            render={renderDeliveryAddressForm(
              props,
              friendlyProductName,
              enableDeliveryInstructions,
              productDetail.subscription.deliveryAddress
            )}
            fetch={createProductDetailFetcher(
              ProductTypes.contentSubscriptions
            )}
            loadingMessage={"Loading delivery details..."}
          />
        );
      }}
    />
  );
};
