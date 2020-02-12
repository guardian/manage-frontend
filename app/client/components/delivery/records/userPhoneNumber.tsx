import { css } from "@emotion/core";
import { Button } from "@guardian/src-button";
import { space } from "@guardian/src-foundations";
import { palette } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import { TextInput } from "@guardian/src-text-input";
import React, { FormEvent, useState } from "react";
import { ContactPhoneNumbers } from "./deliveryRecordsApi";

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
      phoneNumber => phoneNumber[0] !== "Id" && phoneNumber[1]
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
        padding: ${space[5]}px;
        margin: ${space[5]}px;
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
                    `}
                  >
                    {phoneNumber[0]}
                  </dt>
                  <dd
                    css={css`
                      margin: 0 0 0 ${space[6]}px;
                      display: inline-block;
                    `}
                  >
                    {phoneNumber[1]}
                  </dd>
                </div>
              ))}
          </dl>
        )}
        {showPhoneInput ? (
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
              currentPhoneNumbers.map(phoneNumber => (
                <TextInput
                  label={phoneNumber[0]}
                  supporting="Enter your phone number"
                  width={30}
                  onChange={handleInputChange(phoneNumber[0])}
                />
              ))
            ) : (
              <TextInput
                label="Phone number"
                supporting="Enter your phone number"
                width={30}
                onChange={handleInputChange("Phone")}
              />
            )}
            <Button
              priority="secondary"
              type="submit"
              css={css`
                display: block;
                margin-top: ${space[5]}px;
              `}
            >
              Update phone number
            </Button>
          </form>
        ) : (
          <Button
            priority="secondary"
            onClick={() => {
              setShowPhoneInput(true);
            }}
          >
            Update phone number
          </Button>
        )}
      </>
    </div>
  );
};
