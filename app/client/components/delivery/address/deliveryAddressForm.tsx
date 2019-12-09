import { css, SerializedStyles } from "@emotion/core";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  isProduct,
  MembersDataApiItem,
  MembersDatApiAsyncLoader,
  ProductDetail
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
import { focusHalo } from "@guardian/src-foundations/accessibility";
import { textSans } from "@guardian/src-foundations/typography";
// @ts-ignore
import { SvgArrowRightStraight } from "@guardian/src-svgs";
import { Link, NavigateFn } from "@reach/router";
import { DeliveryAddress } from "../../../../shared/productResponse";
import { GenericErrorScreen } from "../../genericErrorScreen";
import { navLinks } from "../../nav";
import { EditIcon } from "../../svgs/editIcon";
import { updateAddressFetcher } from "./deliveryAddressApi";

type setStateFunc = (value: string) => void;

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
    .map(product => product.subscription.contactId);
  if (allContactIds.length === 1) {
    return CONTACT_ID_STATES.singular;
  } else if ([...new Set(allContactIds)].length === allContactIds.length) {
    return CONTACT_ID_STATES.unique;
  }
  return CONTACT_ID_STATES.duplicates;
};

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

const renderDeliveryAddressForm = (navigate: NavigateFn | undefined) => (
  allProductDetail: MembersDataApiItem[]
) => (
  <FormContainer
    contactIdsState={getContactIdsState(allProductDetail.filter(isProduct))}
    navigate={navigate}
  />
);

interface FormContainerProps {
  contactIdsState: string;
  navigate: NavigateFn | undefined;
}
const FormContainer = (props: FormContainerProps) => {
  const [formState, setFormState] = useState(formStates.INIT);
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [town, setTown] = useState("");
  const [region, setRegion] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("");

  const form = (
    <Form
      formState={formState}
      setFormState={setFormState}
      addressLine1={addressLine1}
      setAddressLine1={setAddressLine1}
      addressLine2={addressLine2}
      setAddressLine2={setAddressLine2}
      town={town}
      setTown={setTown}
      region={region}
      setRegion={setRegion}
      postcode={postcode}
      setPostcode={setPostcode}
      country={country}
      setCountry={setCountry}
    />
  );

  return (
    <PageContainer>
      <h1>Manage delivery address</h1>
      <h2>{formState}</h2>
      {props.contactIdsState === CONTACT_ID_STATES.singular && (
        <div>
          {(formState === formStates.INIT ||
            formState === formStates.PENDING ||
            formState === formStates.VALIDATION_ERROR) &&
            form}
        </div>
      )}
      {props.contactIdsState === CONTACT_ID_STATES.unique && (
        <span>there are unique contact ID's</span>
      )}
      {props.contactIdsState === CONTACT_ID_STATES.duplicates && (
        <div>
          <p
            css={{
              borderTop: `1px solid ${palette.neutral["86"]}`,
              padding: "14px 0"
            }}
          >
            Please note that changing your address here will update the delivery
            address for all of your subscriptions.
          </p>
          {(formState === formStates.INIT ||
            formState === formStates.PENDING ||
            formState === formStates.VALIDATION_ERROR) &&
            form}
        </div>
      )}
      {formState === formStates.VALIDATION_SUCCESS && (
        <AsyncLoader
          render={renderConfirmation(props.navigate)}
          fetch={updateAddressFetcher({
            addressLine1,
            addressLine2,
            town,
            region,
            postcode,
            country
          })}
          loadingMessage={"Updating delivery address..."}
        />
      )}
    </PageContainer>
  );
};

const renderConfirmation = (navigate: NavigateFn | undefined) => (
  apiResponse: any
) => {
  if (navigate) {
    navigate("confirmed", { replace: true });
  }
  return (
    <GenericErrorScreen loggingMessage="No navigate function - very odd" />
  );
};

const isFormValid = (formData: DeliveryAddress) => {
  return true;
};

interface FormProps {
  formState: string;
  setFormState: Dispatch<SetStateAction<string>>;
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
}

const Form = (props: FormProps) => {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    props.setFormState(formStates.PENDING);

    const formData: DeliveryAddress = {
      addressLine1: props.addressLine1,
      addressLine2: props.addressLine2,
      town: props.town,
      region: props.region,
      postcode: props.postcode,
      country: props.country
    };

    props.setFormState(
      isFormValid(formData)
        ? formStates.VALIDATION_SUCCESS
        : formStates.VALIDATION_ERROR
    );
    /*
    fetch("/api/delivery/address/update", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        const locationHeaderValue = response.headers.get("Location");
        if (response.status === 401 && locationHeaderValue) {
          window.location.replace(locationHeaderValue);
          return;
        } else {
          throw new Error(
            `Failed to load/post delivery/address/update : ${response.status} ${
              response.statusText
            } : ${response.text()}`
          );
        }
      })
      .then((responseJson: object) => {
        navigate && navigate("confirmed");
        props.setFormState(formStates.SUCCESS);
      })
      .catch(error => {
        // Raven.captureException(error);
        props.setFormState(formStates.POST_ERROR);
      });
    */
  };

  return (
    <form action="#" onSubmit={handleFormSubmit}>
      {props.formState === formStates.POST_ERROR && (
        <span>Uh oh, something went wrong</span>
      )}
      {props.formState === formStates.SUCCESS && (
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
          Home address{" "}
          <span
            css={{
              display: "inline-block",
              verticalAlign: "text-top",
              marginLeft: "8px",
              width: "19px",
              height: "19px",
              svg: {
                display: "block"
              }
            }}
          >
            {<EditIcon />}
          </span>
        </legend>
        <Input
          label={"Address line 1"}
          width={30}
          value={props.addressLine1}
          changeSetState={props.setAddressLine1}
        />
        <Input
          label="Address line 2"
          width={30}
          value={props.addressLine2}
          changeSetState={props.setAddressLine2}
          optional={true}
        />
        <Input
          label="Town"
          width={30}
          value={props.town}
          changeSetState={props.setTown}
        />
        <Input
          label="County or State"
          width={30}
          value={props.region}
          changeSetState={props.setRegion}
        />
        <Input
          label="Postcode/Zipcode"
          width={10}
          value={props.postcode}
          changeSetState={props.setPostcode}
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
        />
        <div
          css={{
            marginTop: "14px",
            "*": {
              display: "inline-block",
              verticalAlign: "middle"
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

interface SelectProps {
  label: string;
  options: string[];
  width: number;
  value: string;
  additionalcss?: SerializedStyles;
  changeSetState?: setStateFunc;
}

const Select = (props: SelectProps) => (
  <label
    css={css`
      display: block;
      color: ${palette.neutral["7"]};
      ${textSans.medium()} ${props.additionalcss};
    `}
  >
    {props.label}
    <select
      name="country"
      id="delivery-address-country"
      css={css`
        display: block;
        width: ${props.width}ch;
        ${textSans.medium()}
        color: ${palette.neutral["7"]};
        box-sizing: border-box;
        margin-top: 4px;
        padding: 8px 0 8px 4px;
        border: 2px solid ${palette.neutral["60"]};
        &:focus {
          ${focusHalo};
        }
        & option {
          line-height: "40px";
          font-size: 1.0625rem;
        }
      `}
    >
      <option value="" key="init-value">
        &nbsp;
      </option>
      {props.options.map((option, index) => (
        <option value={option} key={`country-${index}`}>
          {option}
        </option>
      ))}
    </select>
  </label>
);

interface InputProps {
  label: string;
  width: number;
  value: string;
  optional?: boolean;
  name?: string;
  id?: string;
  changeSetState?: setStateFunc;
}

const Input = (props: InputProps) => (
  <label
    css={css`
      display: block;
      color: ${palette.neutral["7"]};
      ${textSans.medium()};
    `}
  >
    {props.label}
    <input
      type="text"
      name={name}
      id={props.id}
      value={props.value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
        props.changeSetState && props.changeSetState(`${e.target.value}`)
      }
      css={css`
        display: block;
        width: ${props.width}ch;
        height: 44px;
        ${textSans.medium()}
        color: ${palette.neutral["7"]};
        margin-top: 4px;
        padding: 0 8px;
        background-color: ${palette.neutral["100"]}
        border: 2px solid ${palette.neutral["60"]};
        &:focus {
          ${focusHalo};
        }
      `}
    />
  </label>
);

export const DeliveryAddressForm = (props: RouteableStepProps) => (
  <WizardStep routeableStepProps={props} hideBackButton>
    {props.location &&
    props.location.state &&
    Array.isArray(props.location.state) ? (
      renderDeliveryAddressForm(props.navigate)(props.location.state)
    ) : (
      <MembersDatApiAsyncLoader
        render={renderDeliveryAddressForm(props.navigate)}
        fetch={createProductDetailFetcher(ProductTypes.contentSubscriptions)}
        loadingMessage={"Loading delivery address form..."}
      />
    )}
  </WizardStep>
);
