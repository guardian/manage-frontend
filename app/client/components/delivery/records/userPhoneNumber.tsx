import { css } from "@emotion/core";
import { Button } from "@guardian/src-button";
import { space } from "@guardian/src-foundations";
import { palette } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import { TextInput } from "@guardian/src-text-input";
import React, { FormEvent, useState } from "react";
import { minWidth } from "../../../styles/breakpoints";
import {
  ContactPhoneNumbers,
  ContactPhoneNumbersType
} from "./deliveryRecordsApi";

interface UserPhoneNumberProps {
  existingPhoneNumber?: ContactPhoneNumbers;
  callback: (phoneNumber: ContactPhoneNumbers) => void;
}

export const UserPhoneNumber = (props: UserPhoneNumberProps) => {
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState<
    ContactPhoneNumbers | undefined
  >(props.existingPhoneNumber);
  const currentPhoneNumbers =
    props.existingPhoneNumber &&
    Object.entries(props.existingPhoneNumber).filter(
      phoneNumber => phoneNumber[0].toLowerCase() !== "id" && phoneNumber[1]
    );

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

  const cancelPhoneNumberInput = (phoneType: ContactPhoneNumbersType) => () => {
    if (newPhoneNumber?.[phoneType]) {
      setNewPhoneNumber({
        ...newPhoneNumber,
        Phone: props.existingPhoneNumber?.[phoneType]
      });
    }
  };

  let titleCopy = currentPhoneNumbers?.length
    ? "Do we have the right number to contact you?"
    : "It looks like we don't have a phone number to contact you on";
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
        <span
          css={css`
            display: block;
            ${textSans.medium()};
            margin-bottom: ${space[5]}px;
          `}
        >
          {titleCopy}
        </span>
        {!!currentPhoneNumbers?.length && !showPhoneInput && (
          <dl
            css={css`
              ${textSans.medium({ fontWeight: "bold" })};
              margin: ${space[5]} 0;
            `}
          >
            {currentPhoneNumbers &&
              currentPhoneNumbers.map((phoneNumber, index) => (
                <div
                  key={`phonenumberentry-${index}`}
                  css={css`
                    display: block;
                  `}
                >
                  <dt
                    css={css`
                      display: inline-block;
                      min-width: 16ch;
                    `}
                  >
                    {`${phoneNumber[0]} number`}
                  </dt>
                  <dd
                    css={css`
                      margin: 0 0 0 ${space[6]}px;
                      display: inline-block;
                    `}
                  >
                    {`${phoneNumber[1]} `}
                    <span
                      css={css`
                        ${textSans.medium()};
                        text-decoration: underline;
                        cursor: pointer;
                        color: ${palette.brand[500]};
                        padding-left: ${space[3]};
                      `}
                      onClick={() => {
                        // const phoneNumberType = phoneNumber[0] as ContactPhoneNumbersType;
                        // if (newPhoneNumber?.[phoneNumberType]) {
                        //   setNewPhoneNumber({
                        //     ...newPhoneNumber,
                        //     Phone: props.existingPhoneNumber?.[phoneNumberType]
                        //   });
                        // }
                        setShowPhoneInput(true);
                      }}
                    >
                      Update
                    </span>
                  </dd>
                </div>
              ))}
          </dl>
        )}
        {showPhoneInput && (
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
            {currentPhoneNumbers?.length ? (
              currentPhoneNumbers.map((phoneNumber, index) => (
                <>
                  <TextInput
                    key={`phonenumberinput-${index}`}
                    label={`${phoneNumber[0]} number`}
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
                      margin-left: ${space[3]};
                    `}
                    onClick={cancelPhoneNumberInput(
                      phoneNumber[0] as ContactPhoneNumbersType
                    )}
                  >
                    Cancel
                  </span>
                </>
              ))
            ) : (
              <>
                <TextInput
                  label="Phone number"
                  supporting="Enter your phone number"
                  width={30}
                  css={css`
                    max-width: 100%;
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
                    padding-left: ${space[3]};
                  `}
                  onClick={() => {
                    if (newPhoneNumber?.Phone) {
                      setNewPhoneNumber({
                        ...newPhoneNumber,
                        Phone: props.existingPhoneNumber?.Phone
                      });
                    }
                  }}
                >
                  Cancel
                </span>
                <Button
                  priority="secondary"
                  onClick={() => {
                    setShowPhoneInput(true);
                  }}
                >
                  Add phone number
                </Button>
              </>
            )}
            <p
              css={css`
                ${textSans.medium()};
                margin-top: ${space[3]}px;
              `}
            >
              Your contact number will be updated once you submit your report.
            </p>
          </form>
        )}
      </>
    </div>
  );
};
