import { css, SerializedStyles } from "@emotion/core";
import React, { useState } from "react";
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
import { COUNTRIES } from "../../identity/models";
import { PageContainer } from "../../page";
import { RouteableStepProps } from "../../wizardRouterAdapter";

import { Button } from "@guardian/src-button";
import { palette } from "@guardian/src-foundations";
import { focusHalo } from "@guardian/src-foundations/accessibility";
import { textSans } from "@guardian/src-foundations/typography";
// @ts-ignore
import { SvgArrowRightStraight } from "@guardian/src-svgs";
import { Link } from "@reach/router";
import { navLinks } from "../../nav";
import { EditIcon } from "../../svgs/editIcon";

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
        <div>
          <Form />
        </div>
      )}
      {contactIdsState === CONTACT_ID_STATES.unique && (
        <span>there are unique contact ID's</span>
      )}
      {contactIdsState === CONTACT_ID_STATES.duplicates && (
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
          <Form />
        </div>
      )}
    </PageContainer>
  );
};

/*
interface FormStates {
  INIT: string;
  PENDING: string;
  VALIDATION_ERROR: string;
  VALIDATION_SUCCESS: string;
}
const formStates: FormStates = {
  INIT: 'pending',
  PENDING: 'pending',
  VALIDATION_ERROR: 'validationError',
  VALIDATION_SUCCESS: 'validationSuccess',
};
*/

const Form = () => {
  // const [formState, setFormState] = useState(formStates.INIT);
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [town, setTown] = useState("");
  const [region, setRegion] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("");

  return (
    <form action="#" onSubmit={handleFormSubmit}>
      <fieldset
        css={{
          border: `1px solid ${palette.neutral["86"]}`,
          padding: "48px 14px 14px",
          position: "relative",
          "label + label": {
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
          value={addressLine1}
          changeSetState={setAddressLine1}
        />
        <Input
          label="Address line 2"
          width={30}
          value={addressLine2}
          changeSetState={setAddressLine2}
          optional={true}
        />
        <Input label="Town" width={30} value={town} changeSetState={setTown} />
        <Input
          label="County or State"
          width={30}
          value={region}
          changeSetState={setRegion}
        />
        <Input
          label="Postcode/Zipcode"
          width={10}
          value={postcode}
          changeSetState={setPostcode}
        />
        <Select
          label={"Country"}
          options={COUNTRIES}
          width={30}
          additionalcss={css`
            margin-top: 14px;
          `}
          value={country}
          changeSetState={setCountry}
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

const handleFormSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  // tslint:disable-next-line:no-console
  console.log(`formData = ${JSON.stringify(formData, null, " ")}`);
};

/*
const postData = async (url:string = '', data:object = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    referrer: 'no-referrer',
    body: JSON.stringify(data)
  });
  return await response.json();
}
*/

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
