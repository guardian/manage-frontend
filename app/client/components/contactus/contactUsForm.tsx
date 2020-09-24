import { css, SerializedStyles } from "@emotion/core";
import { Button } from "@guardian/src-button";
import { palette, space } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { minWidth } from "../../styles/breakpoints";
import { Input } from "../input";
import { ErrorIcon } from "../svgs/errorIcon";

interface ContactUsFormProps {
  submitCallback: (success: boolean) => void;
  title: string;
  subjectLine: string;
  editableSubjectLine?: boolean;
  additionalCss?: SerializedStyles;
}

interface FormElValidationObject {
  isValid: boolean;
  message: string;
}

interface FormValidationState {
  inValidationMode: boolean;
  fullName: FormElValidationObject;
  email: FormElValidationObject;
  subjectLine: FormElValidationObject;
  details: FormElValidationObject;
}

export const ContactUsForm = (props: ContactUsFormProps) => {
  const [fullName, setFullName] = useState<string>("");
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [subjectLine, setSubjectLine] = useState<string>(props.subjectLine);
  const [details, setDetails] = useState<string>("");
  const [
    instructionsRemainingCharacters,
    setInstructionsRemainingCharacters
  ] = useState<number>(250);

  const mandatoryFieldMessage = "You cannot leave this field empty";

  const [formValidationSate, setFormValidationState] = useState<
    FormValidationState
  >({
    inValidationMode: false,
    fullName: {
      isValid: true,
      message: mandatoryFieldMessage
    },
    email: {
      isValid: true,
      message: mandatoryFieldMessage
    },
    subjectLine: {
      isValid: true,
      message: mandatoryFieldMessage
    },
    details: {
      isValid: true,
      message: mandatoryFieldMessage
    }
  });

  const validateForm = () => {
    const isFullNameValid = !!fullName.length;
    const isEmailValid = !!emailAddress.length;
    const isSubjectLineValid = !!subjectLine.length;
    const isDetailsValid = !!details.length;
    const isFormInValidState =
      isFullNameValid && isEmailValid && isDetailsValid;
    setFormValidationState({
      inValidationMode: !isFormInValidState,
      fullName: { ...formValidationSate.fullName, isValid: isFullNameValid },
      email: { ...formValidationSate.fullName, isValid: isEmailValid },
      subjectLine: {
        ...formValidationSate.subjectLine,
        isValid: isSubjectLineValid
      },
      details: { ...formValidationSate.fullName, isValid: isDetailsValid }
    });
    return isFormInValidState;
  };

  return (
    <form
      onSubmit={(event: FormEvent) => {
        event.preventDefault();
        const isFormValid = validateForm();
        props.submitCallback(isFormValid);
      }}
      css={css`
        ${props.additionalCss}
      `}
    >
      <fieldset
        onChange={() => {
          if (formValidationSate.inValidationMode) {
            validateForm();
          }
        }}
        css={css`
          border: 1px solid ${palette.neutral["86"]};
          margin: 0 0 ${space[5]}px;
          padding: 0;
        `}
      >
        <legend
          css={css`
            display: block;
            width: 100%;
            margin: 0;
            padding: ${space[3]}px;
            float: left;
            background-color: ${palette.neutral["97"]};
            border-bottom: 1px solid ${palette.neutral["86"]};
            ${textSans.medium({ fontWeight: "bold" })};
            ${minWidth.tablet} {
              padding: ${space[3]}px ${space[5]}px;
            }
          `}
        >
          {props.title}
        </legend>
        <p
          css={css`
            ${textSans.medium()};
            margin: ${space[5]}px;
            :before {
              display: block;
              content: "";
              clear: both;
              padding-top: ${space[5]}px;
            }
          `}
        >
          Let us know the details of what you’d like to discuss and we will aim
          to get back to you as soon as possible. Please note if you are
          contacting us regarding an account you hold with us you will need to
          use the email you registered with.
        </p>
        <Input
          label="Full Name"
          width={50}
          changeSetState={setFullName}
          value={fullName}
          additionalCss={css`
            margin: ${space[5]}px;
          `}
          inErrorState={
            formValidationSate.inValidationMode &&
            !formValidationSate.fullName.isValid
          }
          errorMessage={formValidationSate.fullName.message}
        />
        <Input
          label="Email address"
          secondaryLabel="If you are contacting us regarding an account you hold with us you must use the email you registered with"
          type="email"
          width={50}
          changeSetState={setEmailAddress}
          value={emailAddress}
          additionalCss={css`
            margin: ${space[5]}px;
          `}
          inErrorState={
            formValidationSate.inValidationMode &&
            !formValidationSate.email.isValid
          }
          errorMessage={formValidationSate.email.message}
        />
        {props.editableSubjectLine ? (
          <Input
            label="Subject of enquiry"
            type="text"
            width={50}
            changeSetState={setSubjectLine}
            value={subjectLine}
            additionalCss={css`
              margin: ${space[5]}px;
            `}
            inErrorState={
              formValidationSate.inValidationMode &&
              !formValidationSate.subjectLine.isValid
            }
            errorMessage={formValidationSate.subjectLine.message}
          />
        ) : (
          <label
            css={css`
              display: block;
              color: ${palette.neutral["7"]};
              ${textSans.medium({ fontWeight: "bold" })};
              max-width: 50ch;
              margin: ${space[5]}px;
            `}
          >
            Subject of enquiry
            <span
              css={css`
                display: block;
                font-weight: normal;
              `}
            >
              {props.subjectLine}
            </span>
          </label>
        )}
        <label
          css={css`
            display: block;
            color: ${palette.neutral["7"]};
            ${textSans.medium({ fontWeight: "bold" })};
            max-width: 50ch;
            margin: ${space[5]}px;
          `}
        >
          Problem details
          {formValidationSate.inValidationMode &&
            !formValidationSate.details.isValid && (
              <span
                css={css`
                  display: block;
                  color: ${palette.news[400]};
                  font-weight: normal;
                `}
              >
                <i
                  css={css`
                    margin-right: 4px;
                  `}
                >
                  <ErrorIcon />
                </i>
                {formValidationSate.details.message}
              </span>
            )}
          <textarea
            id="delivery-instructions"
            name="instructions"
            rows={2}
            maxLength={250}
            value={details}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              setDetails(e.target.value);
              setInstructionsRemainingCharacters(250 - e.target.value.length);
            }}
            css={css`
              width: 100%;
              border: ${formValidationSate.inValidationMode &&
              !formValidationSate.details.isValid
                ? `4px solid ${palette.news[400]}`
                : `2px solid ${palette.neutral[60]}`};
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
        </label>
      </fieldset>
      <Button type="submit">Submit</Button>
    </form>
  );
};
