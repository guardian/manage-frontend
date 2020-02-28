import { css } from "@emotion/core";
import { Button } from "@guardian/src-button";
import { space } from "@guardian/src-foundations";
import { palette } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import { TextInput } from "@guardian/src-text-input";
import React, { FormEvent, useState } from "react";
import { minWidth } from "../../../styles/breakpoints";
import { InfoIconDark } from "../../svgs/infoIconDark";
import {
  ContactPhoneNumbers,
  ContactPhoneNumbersType
} from "./deliveryRecordsApi";

interface UserPhoneNumberProps {
  existingPhoneNumbers: ContactPhoneNumbers;
  callback: (phoneNumber: ContactPhoneNumbers) => void;
}

type EditPhoneNumber = { [phoneType in ContactPhoneNumbersType]: boolean };

export const UserPhoneNumber = (props: UserPhoneNumberProps) => {
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState<
    ContactPhoneNumbers | undefined
  >(props.existingPhoneNumbers);
  const currentPhoneNumbers =
    props.existingPhoneNumbers &&
    Object.entries(props.existingPhoneNumbers).filter(
      phoneNumber => phoneNumber[0].toLowerCase() !== "id" && phoneNumber[1]
    );

  const initNumbersEditState = {};
  Object.keys(props.existingPhoneNumbers).map(phoneType =>
    Object.defineProperty(initNumbersEditState, phoneType, { value: false })
  );

  const [
    isPhoneInEditState,
    setPhoneEditState
  ] = useState<EditPhoneNumber | null>(initNumbersEditState as EditPhoneNumber);

  const handleInputChange = (whichPhoneNumber: string) => (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (newPhoneNumber) {
      setNewPhoneNumber({
        ...newPhoneNumber,
        [whichPhoneNumber]: evt.target.value
      });
    }
  };

  const putNumberInEditState = (phoneType: ContactPhoneNumbersType) => () => {
    setPhoneEditState({
      ...isPhoneInEditState,
      [phoneType]: true
    } as EditPhoneNumber);
  };

  const cancelNumberUpdate = (phoneType: ContactPhoneNumbersType) => () => {
    if (newPhoneNumber?.[phoneType]) {
      setNewPhoneNumber({
        ...newPhoneNumber,
        Phone: props.existingPhoneNumbers?.[phoneType]
      });
    }
    setPhoneEditState({
      ...isPhoneInEditState,
      [phoneType]: false
    } as EditPhoneNumber);
  };

  let titleCopy = currentPhoneNumbers?.length
    ? "Do we have the right number to contact you?"
    : "It looks like we don't have a phone number to contact you on.";
  if (showPhoneInput) {
    titleCopy = "Please provide your current phone number.";
  }
  return (
    <div
      css={css`
        background-color: ${palette.neutral["97"]};
        padding: ${space[3]}px;
        margin: ${space[3]}px;
        ${minWidth.tablet} {
          padding: ${space[5]}px;
          margin: ${space[5]}px;
        }
      `}
    >
      <>
        <p
          css={css`
            ${textSans.medium()};
            margin-bottom: ${space[5]}px;
          `}
        >
          {`${titleCopy} We will use this to get in touch with you about your subscription.`}
        </p>
        {currentPhoneNumbers?.length ? (
          <form
            css={css`
              display: block;
              margin-bottom: ${space[5]}px;
            `}
            onSubmit={(event: FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              if (newPhoneNumber) {
                props.callback(newPhoneNumber);
              }
            }}
          >
            {currentPhoneNumbers.map((phoneNumber, index) => (
              <React.Fragment key={`phone-number-${index}`}>
                {isPhoneInEditState?.[
                  phoneNumber[0] as ContactPhoneNumbersType
                ] ? (
                  <div
                    css={css`
                      ${index > 0 && `margin-top: ${space[3]}px;`}
                    `}
                  >
                    <TextInput
                      key={`phonenumberinput-${index}`}
                      pattern="[0-9]{1,11}"
                      label={phoneNumber[0]}
                      supporting="Enter your phone number"
                      width={30}
                      css={css`
                        max-width: 100%;
                      `}
                      value={
                        newPhoneNumber?.[
                          phoneNumber[0] as ContactPhoneNumbersType
                        ] || ""
                      }
                      onChange={handleInputChange(phoneNumber[0])}
                    />
                    <span
                      css={css`
                        ${textSans.medium()};
                        text-decoration: underline;
                        cursor: pointer;
                        color: ${palette.brand[500]};
                        margin-left: ${space[3]}px;
                      `}
                      onClick={cancelNumberUpdate(
                        phoneNumber[0] as ContactPhoneNumbersType
                      )}
                    >
                      Cancel
                    </span>
                  </div>
                ) : (
                  <div
                    css={css`
                      display: block;
                      ${textSans.medium()};
                      ${index > 0 && `margin-top:${space[3]}px;`}
                    `}
                  >
                    <span
                      css={css`
                        display: inline-block;
                        min-width: 15ch;
                      `}
                    >
                      {phoneNumber[0]}:
                    </span>
                    <span
                      css={css`
                        color: ${palette.neutral[46]};
                      `}
                    >
                      {phoneNumber[1]}
                    </span>
                    <span
                      css={css`
                        text-decoration: underline;
                        cursor: pointer;
                        color: ${palette.brand[500]};
                        margin-left: ${space[3]}px;
                      `}
                      onClick={putNumberInEditState(
                        phoneNumber[0] as ContactPhoneNumbersType
                      )}
                    >
                      Update
                    </span>
                  </div>
                )}
              </React.Fragment>
            ))}
          </form>
        ) : (
          <>
            {showPhoneInput ? (
              <>
                <TextInput
                  label="Phone number"
                  supporting="Enter your phone number"
                  width={30}
                  css={css`
                    max-width: 100%;
                    margin-bottom: ${space[5]}px;
                  `}
                  value={newPhoneNumber?.Phone || ""}
                  onChange={handleInputChange("Phone")}
                />
                <span
                  css={css`
                    ${textSans.medium()};
                    text-decoration: underline;
                    cursor: pointer;
                    color: ${palette.brand[500]};
                    margin-left: ${space[3]}px;
                  `}
                  onClick={() => {
                    if (newPhoneNumber?.Phone) {
                      setNewPhoneNumber({
                        ...newPhoneNumber,
                        Phone: props.existingPhoneNumbers?.Phone
                      });
                    }
                    setShowPhoneInput(false);
                  }}
                >
                  Cancel
                </span>
              </>
            ) : (
              <Button
                priority="secondary"
                onClick={() => {
                  setShowPhoneInput(true);
                }}
              >
                Add phone number
              </Button>
            )}
          </>
        )}
        {(showPhoneInput ||
          (isPhoneInEditState &&
            Object.values(isPhoneInEditState).some(
              numberInEditState => numberInEditState
            ))) && (
          <span
            css={css`
              position: relative;
              display: block;
              padding: 0 ${space[5]}px 0 ${space[5] + space[1]}px;
              ${textSans.small()};
            `}
          >
            <i
              css={css`
                position: absolute;
                top: 2px;
                left: 0;
              `}
            >
              <InfoIconDark fillColor={palette.brand.bright} />
            </i>
            Your number will be updated when you submit your report.
          </span>
        )}
      </>
    </div>
  );
};
