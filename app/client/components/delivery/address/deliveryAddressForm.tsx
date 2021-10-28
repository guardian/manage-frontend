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
  ProductDetail,
  Subscription
} from "../../../../shared/productResponse";
import {
  GROUPED_PRODUCT_TYPES,
  ProductType
} from "../../../../shared/productTypes";
import { COUNTRIES } from "../../identity/models";
import { RouteableStepProps, WizardStep } from "../../wizardRouterAdapter";

import { Button } from "@guardian/src-button";
import { brand, neutral } from "@guardian/src-foundations/palette";
import { headline, textSans } from "@guardian/src-foundations/typography";
import { Link, navigate } from "@reach/router";
import { parseDate } from "../../../../shared/dates";
import { maxWidth, minWidth } from "../../../styles/breakpoints";
import { flattenEquivalent } from "../../../utils";
import { CallCentreEmailAndNumbers } from "../../callCenterEmailAndNumbers";
import { CallCentreNumbers } from "../../callCentreNumbers";
import { InfoSection } from "../../infoSection";
import { Input } from "../../input";
import { NAV_LINKS } from "../../nav/navConfig";
import { PageContainer } from "../../page";
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
  SubscriptionEffectiveData
} from "./deliveryAddressFormContext";
import { FormValidationResponse, isFormValid } from "./formValidation";
import { Select } from "./select";
import DataFetcher from "../../DataFetcher";
import useSWR from "swr";
import { fetcher } from "../../../fetchClient";
import { createProductDetailEndpoint } from "../../../productUtils";
import {
  getScopeFromRequestPathOrEmptyString,
  X_GU_ID_FORWARDED_SCOPE
} from "../../../../shared/identity";

interface ProductDetailAndProductType {
  productDetail: ProductDetail;
  productType: ProductType;
}

interface ContactIdToArrayOfProductDetailAndProductType {
  [contactId: string]: ProductDetailAndProductType[];
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
  allProductDetail
    .filter(hasContactId)
    .map(productDetail => ({
      productDetail,
      productType: GROUPED_PRODUCT_TYPES.subscriptions.mapGroupedToSpecific(
        productDetail
      )
    }))
    .filter(_ => _.productType.delivery?.showAddress)
    .reduce(
      (accumulator, { productDetail, productType }) => ({
        ...accumulator,
        [productDetail.subscription.contactId]: [
          ...(accumulator[productDetail.subscription.contactId] || []),
          { productDetail, productType }
        ]
      }),
      {} as ContactIdToArrayOfProductDetailAndProductType
    );

export const addressChangeAffectedInfo = (
  contactIdToArrayOfProductDetailAndProductType: ContactIdToArrayOfProductDetailAndProductType
): SubscriptionEffectiveData[] =>
  Object.values(contactIdToArrayOfProductDetailAndProductType)
    .flatMap<ProductDetailAndProductType>(flattenEquivalent)
    .map(({ productDetail, productType }) => {
      const friendlyProductName = capitalize(
        productType.shortFriendlyName || productType.friendlyName
      ).trim();
      const effectiveDate = productDetail.subscription
        .deliveryAddressChangeEffectiveDate
        ? parseDate(
            productDetail.subscription.deliveryAddressChangeEffectiveDate
          ).date
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
const formStates: FormStates = {
  INIT: "init",
  PENDING: "pending",
  VALIDATION_ERROR: "validationError",
  VALIDATION_SUCCESS: "validationSuccess",
  SUCCESS: "success",
  POST_ERROR: "postError"
};

interface RenderDeliveryAddressFormProps {
  routeableStepProps: RouteableStepProps;
}

const headers = {
  [X_GU_ID_FORWARDED_SCOPE]: getScopeFromRequestPathOrEmptyString(
    window.location.href
  )
};

const RenderDeliveryAddressForm = ({
  routeableStepProps
}: RenderDeliveryAddressFormProps) => {
  const { endpoint } = createProductDetailEndpoint(
    GROUPED_PRODUCT_TYPES.subscriptions
  );

  const allProductDetails = useSWR([endpoint, headers], fetcher, {
    suspense: true
  }).data as MembersDataApiItem[];

  return (
    <FormContainer
      contactIdToArrayOfProductDetailAndProductType={getValidDeliveryAddressChangeEffectiveDates(
        allProductDetails
          .filter(isProduct)
          .filter(_ => _.subscription.readerType !== "Gift")
      )}
      routeableStepProps={routeableStepProps}
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
  contactIdToArrayOfProductDetailAndProductType: ContactIdToArrayOfProductDetailAndProductType;
  routeableStepProps: RouteableStepProps;
}
const FormContainer = (props: FormContainerProps) => {
  const existingDeliveryAddress = Object.values(
    props.contactIdToArrayOfProductDetailAndProductType
  )[0][0].productDetail.subscription.deliveryAddress;

  const [formStatus, setFormStatus] = useState(formStates.INIT);
  const [formErrors, setFormErrors] = useState({ isValid: false });
  const [addressLine1, setAddressLine1] = useState(
    existingDeliveryAddress?.addressLine1 || ""
  );
  const [addressLine2, setAddressLine2] = useState(
    existingDeliveryAddress?.addressLine2 || ""
  );
  const [town, setTown] = useState(existingDeliveryAddress?.town || "");
  const [region, setRegion] = useState(existingDeliveryAddress?.region || "");
  const [postcode, setPostcode] = useState(
    existingDeliveryAddress?.postcode || ""
  );

  const [country, setCountry] = useState(
    existingDeliveryAddress?.country
      ? COUNTRIES.find(
          countryObj => existingDeliveryAddress?.country === countryObj.iso
        )?.name || existingDeliveryAddress?.country
      : ""
  );
  const [acknowledgementChecked, setAcknowledgementState] = useState<boolean>(
    false
  );
  const [instructions, setInstructions] = useState(
    existingDeliveryAddress?.instructions || ""
  );

  const subHeadingCss = `
    border-top: 1px solid ${neutral["86"]};
    ${headline.small()};
    font-weight: bold;
    margin-top: 50px;
    ${maxWidth.tablet} {
      font-size: 1.25rem;
      line-height: 1.6;
    };
  `;

  const subscriptionsNames = Object.values(
    props.contactIdToArrayOfProductDetailAndProductType
  )
    .flatMap(flattenEquivalent)
    .map(({ productDetail }) => {
      const friendlyProductName = GROUPED_PRODUCT_TYPES.subscriptions.mapGroupedToSpecific(
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
          props.contactIdToArrayOfProductDetailAndProductType
        )}
      >
        <ContactIdContext.Provider
          value={
            Object.keys(props.contactIdToArrayOfProductDetailAndProductType)[0]
          }
        >
          <WizardStep routeableStepProps={props.routeableStepProps}>
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
            {Object.keys(props.contactIdToArrayOfProductDetailAndProductType)
              .length === 0 && (
              <div>
                <p>
                  No addresses available for update. If this doesn't seem right
                  please contact us
                </p>
                <CallCentreNumbers />
              </div>
            )}
            {Object.keys(props.contactIdToArrayOfProductDetailAndProductType)
              .length > 1 && (
              <div>
                <p>You will need to contact us to update your addresses</p>
                <CallCentreNumbers />
              </div>
            )}
            {Object.keys(props.contactIdToArrayOfProductDetailAndProductType)
              .length === 1 && (
              <div>
                {Object.values(
                  props.contactIdToArrayOfProductDetailAndProductType
                ).flatMap(flattenEquivalent).length > 1 && (
                  <InfoSection>
                    Please note that changing your address here will update the
                    delivery address for all of your subscriptions.
                  </InfoSection>
                )}
                {(formStatus === formStates.INIT ||
                  formStatus === formStates.PENDING ||
                  formStatus === formStates.VALIDATION_ERROR) && (
                  <Form
                    {...defaultFormProps}
                    routeableStepProps={props.routeableStepProps}
                    warning={convertToDescriptionListData(
                      addressChangeAffectedInfo(
                        props.contactIdToArrayOfProductDetailAndProductType
                      )
                    )}
                  />
                )}
              </div>
            )}
          </WizardStep>
        </ContactIdContext.Provider>
      </AddressChangedInformationContext.Provider>
    </NewDeliveryAddressContext.Provider>
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
      (props.routeableStepProps.navigate || navigate)("review", {
        state: props.routeableStepProps.location?.state
      });
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
            border: `1px solid ${neutral["86"]}`,
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
              background-color: ${neutral["97"]};
              border-bottom: 1px solid ${neutral["86"]};
            `}
          >
            Delivery address
            {props.routeableStepProps.productType.delivery
              ?.enableDeliveryInstructionsUpdate && " and instructions"}
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
          {props.routeableStepProps.productType.delivery
            ?.enableDeliveryInstructionsUpdate && (
            <label
              css={css`
                display: block;
                color: ${neutral["7"]};
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
                      border: 2px solid ${neutral["60"]};
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
                      color: ${neutral[46]};
                    `}
                  >
                    {instructionsRemainingCharacters} characters remaining
                  </span>
                </div>
                <p
                  css={css`
                    display: block;
                    ${textSans.medium()};
                    border: 4px solid ${brand[500]};
                    padding: ${space[5]}px ${space[5]}px ${space[5]}px 49px;
                    margin: ${space[3]}px 0;
                    position: relative;
                    ${minWidth.tablet} {
                      display: inline-block;
                      vertical-align: top;
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
                    <InfoIconDark fillColor={brand[500]} />
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
            to={NAV_LINKS.accountOverview.link}
            css={css`
              ${textSans.medium()};
              font-weight: bold;
              margin-left: 22px;
              color: ${brand[400]};
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
          color: ${neutral[46]};
        `}
      >
        If you need seperate delivery addresses for each of your subscriptions,
        please{" "}
        <span
          css={css`
            cursor: pointer;
            color: ${brand[500]};
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

const DeliveryAddressForm = (props: RouteableStepProps) => {
  // const ProductDetailContext = React.createContext(props.location?.state);
  return (
    <PageContainer
      selectedNavItem={NAV_LINKS.accountOverview}
      pageTitle={
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
      breadcrumbs={[
        {
          title: NAV_LINKS.accountOverview.title,
          link: NAV_LINKS.accountOverview.link
        },
        {
          title: "Edit delivery address",
          currentPage: true
        }
      ]}
    >
      <DataFetcher loadingMessage="Loading delivery details...">
        <RenderDeliveryAddressForm routeableStepProps={props} />
      </DataFetcher>
    </PageContainer>
  );
};

export default DeliveryAddressForm;
