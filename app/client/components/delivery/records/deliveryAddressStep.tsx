import { css } from "@emotion/core";
import { Button } from "@guardian/src-button";
import { Checkbox, CheckboxGroup } from "@guardian/src-checkbox";
import { palette, space } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import Color from "color";
import moment from "moment";
import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState
} from "react";
import {
  DeliveryAddress,
  isProduct,
  MembersDataApiItem,
  MembersDatApiAsyncLoader,
  ProductDetail
} from "../../../../shared/productResponse";
import {
  createProductDetailFetcher,
  ProductTypes
} from "../../../../shared/productTypes";
import { minWidth } from "../../../styles/breakpoints";
import { flattenEquivalent } from "../../../utils";
import AsyncLoader from "../../asyncLoader";
import { CallCentreEmailAndNumbers } from "../../callCenterEmailAndNumbers";
import { COUNTRIES } from "../../identity/models";
import {
  ProductDescriptionListKeyValue,
  ProductDescriptionListTable
} from "../../productDescriptionListTable";
import { InfoIconDark } from "../../svgs/infoIconDark";
import { updateAddressFetcher } from "../address/deliveryAddressApi";
import { SuccessMessage } from "../address/deliveryAddressEditConfirmation";
import {
  addressChangeAffectedInfo,
  getValidDeliveryAddressChangeEffectiveDates
} from "../address/deliveryAddressForm";
import { convertToDescriptionListData } from "../address/deliveryAddressFormContext";
import { FormValidationResponse, isFormValid } from "../address/formValidation";
import { Input } from "../address/input";
import { Select } from "../address/select";
import { DeliveryRecordsAddressContext } from "./deliveryRecordsProblemContext";
import { ReadOnlyAddressDisplay } from "./readOnlyAddressDisplay";

interface DeliveryAddressStepProps {
  productDetail: ProductDetail;
  enableDeliveryInstructions: boolean;
  setAddressValidationState: Dispatch<SetStateAction<boolean>>;
}

export const DeliveryAddressStep = (props: DeliveryAddressStepProps) => {
  enum Status {
    READ_ONLY,
    EDIT,
    VALIDATION_ERROR,
    PENDING,
    CONFIRMATION,
    ERROR
  }

  const [status, setStatus] = useState(Status.READ_ONLY);

  const deliveryAddressContext = useContext(DeliveryRecordsAddressContext);

  const newAddress: DeliveryAddress =
    deliveryAddressContext.address ||
    (props.productDetail.subscription.deliveryAddress as DeliveryAddress);

  const [
    instructionsRemainingCharacters,
    setInstructionsRemainingCharacters
  ] = useState<number>(250 - (newAddress.instructions?.length || 0));
  const [acknowledgementChecked, setAcknowledgementState] = useState<boolean>(
    false
  );
  const [formErrors, setFormErrors] = useState<FormValidationResponse>({
    isValid: false
  });

  const [showCallCentreNumbers, setCallCentreNumbersVisibility] = useState<
    boolean
  >(false);

  const [addressChangeInformation, setAddressChangeInformation] = useState<
    string
  >();

  const handleFormSubmit = (
    subscriptionsNames: string[],
    productsAffected: ProductDescriptionListKeyValue[]
  ) => (e: FormEvent) => {
    e.preventDefault();

    deliveryAddressContext.setProductsAffected?.(productsAffected);

    setStatus(Status.PENDING);

    const isFormValidResponse = isFormValid(newAddress, subscriptionsNames);

    setFormErrors({
      addressLine1: isFormValidResponse.addressLine1,
      town: isFormValidResponse.town,
      postcode: isFormValidResponse.postcode,
      country: isFormValidResponse.country
    } as FormValidationResponse);

    if (isFormValidResponse.isValid && acknowledgementChecked) {
      props.setAddressValidationState(true);
      setStatus(Status.CONFIRMATION);
    } else {
      setStatus(Status.VALIDATION_ERROR);
    }
  };

  const renderDeliveryAddressForm = (
    allProductDetails: MembersDataApiItem[]
  ) => {
    const contactIdToArrayOfProductDetail = getValidDeliveryAddressChangeEffectiveDates(
      allProductDetails
        .filter(isProduct)
        .filter(product => product.subscription.readerType !== "Gift")
    );

    const addressChangeAffectedInfoArray = addressChangeAffectedInfo(
      contactIdToArrayOfProductDetail
    );

    setAddressChangeInformation(
      [
        ...addressChangeAffectedInfoArray.map(
          element =>
            `${element.friendlyProductName} subscription (${
              element.subscriptionId
            })${
              element.effectiveDate
                ? ` as of front cover dated ${element.effectiveDate.format(
                    "dddd Do MMMM YYYY"
                  )}`
                : ""
            }`
        ),
        "",
        `(as displayed on confirmation page at ${moment().format(
          "H:mm:ss zz [on] Do MMMM YYYY"
        )})`
      ].join("\n")
    );

    const productsAffected: ProductDescriptionListKeyValue[] = convertToDescriptionListData(
      addressChangeAffectedInfoArray
    );

    const subscriptionNames = Object.values(contactIdToArrayOfProductDetail)
      .flatMap(flattenEquivalent)
      .map(productDetail => {
        const friendlyProductName = ProductTypes.subscriptions.mapGroupedToSpecific?.(
          productDetail
        ).friendlyName;
        return `${friendlyProductName}`;
      });

    return (
      <>
        {productsAffected.length > 1 && (
          <p
            css={css`
              ${textSans.medium()};
              background-color: ${palette.neutral[97]};
              padding: ${space[5]}px ${space[5]}px ${space[5]}px 49px;
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
            Please note that changing your address here will update the delivery
            address for all of your subscriptions.
          </p>
        )}
        <form
          action="#"
          onSubmit={handleFormSubmit(subscriptionNames, productsAffected)}
        >
          <fieldset
            css={css`
              margin: 0;
              padding: 0;
              border: 0;
              label {
                margin-top: ${space[3]}px;
              }
            `}
          >
            <Input
              label={"Address line 1"}
              width={30}
              value={newAddress.addressLine1}
              changeSetState={(value: string) =>
                deliveryAddressContext.setAddress?.({
                  ...newAddress,
                  addressLine1: value
                })
              }
              inErrorState={
                status === Status.VALIDATION_ERROR &&
                !formErrors.addressLine1?.isValid
              }
              errorMessage={formErrors.addressLine1?.message}
            />
            <Input
              label="Address line 2"
              width={30}
              value={newAddress.addressLine2 || ""}
              changeSetState={(value: string) =>
                deliveryAddressContext.setAddress?.({
                  ...newAddress,
                  addressLine2: value
                })
              }
              optional={true}
            />
            <Input
              label="Town or City"
              width={30}
              value={newAddress.town || ""}
              changeSetState={(value: string) =>
                deliveryAddressContext.setAddress?.({
                  ...newAddress,
                  town: value
                })
              }
              inErrorState={
                status === Status.VALIDATION_ERROR && !formErrors.town?.isValid
              }
              errorMessage={formErrors.town?.message}
            />
            <Input
              label="County or State"
              width={30}
              value={newAddress.region || ""}
              optional={true}
              changeSetState={(value: string) =>
                deliveryAddressContext.setAddress?.({
                  ...newAddress,
                  region: value
                })
              }
            />
            <Input
              label="Postcode/Zipcode"
              width={11}
              value={newAddress.postcode}
              changeSetState={(value: string) =>
                deliveryAddressContext.setAddress?.({
                  ...newAddress,
                  postcode: value
                })
              }
              inErrorState={
                status === Status.VALIDATION_ERROR &&
                !formErrors.postcode?.isValid
              }
              errorMessage={formErrors.postcode?.message}
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
              value={
                COUNTRIES.find(country => newAddress.country === country.iso)
                  ?.name || newAddress.country
              }
              changeSetState={(value: string) =>
                deliveryAddressContext.setAddress?.({
                  ...newAddress,
                  country: value
                })
              }
              inErrorState={
                status === Status.VALIDATION_ERROR &&
                !formErrors.country?.isValid
              }
              errorMessage={formErrors.country?.message}
            />
            {props.enableDeliveryInstructions && (
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
                      value={newAddress.instructions}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                        deliveryAddressContext.setAddress?.({
                          ...newAddress,
                          instructions: e.target.value
                        });
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
            css={css`
              margin-top: ${space[5]}px;
            `}
            name="instructions-checkbox"
            error={
              status === Status.VALIDATION_ERROR && !acknowledgementChecked
                ? "Please indicate that you understand which subscriptions this change will affect."
                : undefined
            }
          >
            <Checkbox
              value="acknowledged"
              label="I understand that this address change will affect the following subscriptions"
              checked={acknowledgementChecked}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setAcknowledgementState(e.target.checked);
              }}
            />
          </CheckboxGroup>
          {productsAffected.length && (
            <ProductDescriptionListTable
              content={productsAffected}
              seperateEachRow
            />
          )}
          <div
            css={css`
              * {
                display: inline-block;
              }
            `}
          >
            <Button
              type="submit"
              css={css`
                color: ${palette.brand.main};
                background-color: ${palette.brand.faded};
                :hover {
                  background-color: ${Color(palette.brand.faded, "hex")
                    .darken(0.1)
                    .string()};
                }
              `}
            >
              Save address
            </Button>
            <Button
              onClick={() => {
                deliveryAddressContext.setAddress?.(
                  props.productDetail.subscription.deliveryAddress
                );
                props.setAddressValidationState(true);
                setStatus(Status.READ_ONLY);
              }}
              css={css`
                margin-top: ${space[5]}px;
                color: ${palette.brand.main};
                background-color: transparent;
                :hover {
                  background-color: transparent;
                }
              `}
            >
              Discard changes
            </Button>
          </div>
        </form>
        {productsAffected.length > 1 && (
          <p
            css={css`
              ${textSans.medium()};
              background-color: ${palette.neutral[97]};
              padding: ${space[5]}px ${space[5]}px ${space[5]}px 49px;
              margin: ${space[5]}px 0 ${space[3]}px;
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
            If you need seperate delivery addresses for each of your
            subscriptions, please{" "}
            <span
              css={css`
                cursor: pointer;
                color: ${palette.brand[500]};
                text-decoration: underline;
              `}
              onClick={() =>
                setCallCentreNumbersVisibility(!showCallCentreNumbers)
              }
            >
              contact us
            </span>
            .
          </p>
        )}
        {showCallCentreNumbers && <CallCentreEmailAndNumbers />}
      </>
    );
  };

  const renderConfirmation = () => (
    <>
      <div
        css={css`
          padding: ${space[3]}px;
          ${minWidth.tablet} {
            padding: ${space[5]}px;
          }
        `}
      >
        <SuccessMessage
          additionalCss={css`
            margin-bottom: 0;
          `}
          message={`We have successfully updated your delivery details for your subscription${deliveryAddressContext.productsAffected &&
            deliveryAddressContext.productsAffected.length > 1 &&
            "s"}. You will shortly receive a confirmation email.`}
        />
      </div>
      <ReadOnlyAddressDisplay
        address={newAddress}
        instructions={
          (props.enableDeliveryInstructions &&
            deliveryAddressContext.address?.instructions) ||
          undefined
        }
      />
    </>
  );

  if (
    status === Status.EDIT ||
    status === Status.PENDING ||
    status === Status.VALIDATION_ERROR
  ) {
    return (
      <div
        css={css`
          padding: ${space[3]}px;
          ${minWidth.tablet} {
            padding: ${space[5]}px;
          }
        `}
      >
        <MembersDatApiAsyncLoader
          render={renderDeliveryAddressForm}
          fetch={createProductDetailFetcher(ProductTypes.subscriptions)}
          loadingMessage={"Loading delivery details..."}
        />
      </div>
    );
  } else if (
    status === Status.CONFIRMATION &&
    props.productDetail.subscription.contactId
  ) {
    return (
      <AsyncLoader
        render={renderConfirmation}
        fetch={updateAddressFetcher(
          {
            ...newAddress,
            addressChangeInformation
          },
          props.productDetail.subscription.contactId
        )}
        readerOnOK={(resp: Response) => resp.text()}
        loadingMessage={"Updating delivery address details..."}
      />
    );
  }
  return (
    <ReadOnlyAddressDisplay
      showEditButton
      editButtonCallback={() => {
        props.setAddressValidationState(false);
        setStatus(Status.EDIT);
      }}
      address={newAddress}
      instructions={
        (props.enableDeliveryInstructions &&
          deliveryAddressContext.address?.instructions) ||
        undefined
      }
    />
  );
};
