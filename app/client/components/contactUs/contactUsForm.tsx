import { css, SerializedStyles } from "@emotion/core";
import { Button } from "@guardian/src-button";
import { palette, space } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  base64FromFile,
  MAX_FILE_ATTACHMENT_SIZE_KB,
  VALID_IMAGE_FILE_EXTENSIONS,
  VALID_IMAGE_FILE_MIME_TYPES
} from "../../../shared/fileUploadUtils";
import { isEmail } from "../../../shared/validationUtils";
import { minWidth } from "../../styles/breakpoints";
import { CallCentreEmailAndNumbers } from "../callCenterEmailAndNumbers";
import { FormError } from "../FormError";
import { Input } from "../input";
import { Spinner } from "../spinner";
import { ErrorIcon } from "../svgs/errorIcon";
import { UploadFileInput } from "./uploadFileInput";

interface ContactUsFormProps {
  submitCallback: (payload: FormPayload) => Promise<boolean>;
  title: string;
  subjectLine: string;
  editableSubjectLine?: boolean;
  additionalCss?: SerializedStyles;
}

export interface FormPayload {
  fullName: string;
  email: string;
  subjectLine: string;
  details: string;
  captchaToken: string;
  attachment?: { name: string; contents: string };
}

interface FormElemValidationObject {
  isValid: boolean;
  message: string;
}

interface FormValidationState {
  inValidationMode: boolean;
  fullName: FormElemValidationObject;
  email: FormElemValidationObject;
  subjectLine: FormElemValidationObject;
  details: FormElemValidationObject;
  captcha: FormElemValidationObject;
  fileAttachment: FormElemValidationObject;
}

type ContactUsFormStatus = "form" | "submitting" | "failure";

declare const window: Window & {
  grecaptcha: any;
  v2ReCaptchaOnLoadCallback: () => void;
};

export const ContactUsForm = (props: ContactUsFormProps) => {
  const [captchaToken, setCaptchaToken] = useState<string>("");
  const [subjectLine, setSubjectLine] = useState<string>(props.subjectLine);
  const [fullName, setFullName] = useState<string>(
    (typeof window !== "undefined" &&
      window?.guardian?.identityDetails?.displayName) ||
      ""
  );
  const [email, setEmail] = useState<string>(
    (typeof window !== "undefined" &&
      window.guardian?.identityDetails?.email) ||
      ""
  );
  const [details, setDetails] = useState<string>("");
  const [detailsRemainingCharacters, setDetailsRemainingCharacters] = useState<
    number
  >(2500);

  const [fileAttachment, setFileAttachment] = useState<File | undefined>();

  const [status, setStatus] = useState<ContactUsFormStatus>("form");

  const [showCustomerServiceInfo, setShowCustomerServiceInfo] = useState<
    boolean
  >(false);

  const mandatoryFieldMessage = "You cannot leave this field empty";

  const [formValidationState, setFormValidationState] = useState<
    FormValidationState
  >({
    inValidationMode: false,
    fullName: {
      isValid: true,
      message: mandatoryFieldMessage
    },
    email: {
      isValid: true,
      message: "Please insert a valid email address."
    },
    subjectLine: {
      isValid: true,
      message: mandatoryFieldMessage
    },
    details: {
      isValid: true,
      message: mandatoryFieldMessage
    },
    captcha: {
      isValid: !!captchaToken.length,
      message: "Please confirm you are not a robot"
    },
    fileAttachment: {
      isValid: true,
      message: "There is a maximum file size limit of 5mb"
    }
  });

  useEffect(() => {
    if (window.grecaptcha) {
      renderReCaptcha();
    } else {
      const script = document.createElement("script");
      script.setAttribute(
        "src",
        "https://www.google.com/recaptcha/api.js?onload=v2ReCaptchaOnLoadCallback&render=explicit"
      );
      // tslint:disable-next-line:no-object-mutation
      window.v2ReCaptchaOnLoadCallback = renderReCaptcha;
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (!formValidationState.fileAttachment.isValid) {
      validateForm();
    }
  }, [fileAttachment]);

  const renderReCaptcha = () => {
    window.grecaptcha.render("recaptcha", {
      sitekey: window.guardian?.recaptchaPublicKey,
      callback: (token: string) => setCaptchaToken(token)
    });
  };

  const validateForm = () => {
    const isFullNameValid = !!fullName.length;
    const isEmailValid = isEmail(email);
    const isSubjectLineValid = !!subjectLine.length;
    const isDetailsValid = !!details.length;
    const isFileAttachmentValid =
      fileAttachment === undefined ||
      fileAttachment.size / 1024 <= MAX_FILE_ATTACHMENT_SIZE_KB;
    const isFormInValidState =
      isFullNameValid &&
      isEmailValid &&
      isSubjectLineValid &&
      isDetailsValid &&
      !!captchaToken.length &&
      isFileAttachmentValid;
    setFormValidationState({
      ...formValidationState,
      inValidationMode: !isFormInValidState,
      fullName: { ...formValidationState.fullName, isValid: isFullNameValid },
      email: { ...formValidationState.email, isValid: isEmailValid },
      subjectLine: {
        ...formValidationState.subjectLine,
        isValid: isSubjectLineValid
      },
      details: { ...formValidationState.details, isValid: isDetailsValid },
      fileAttachment: {
        ...formValidationState.fileAttachment,
        isValid: isFileAttachmentValid
      },
      captcha: {
        ...formValidationState.captcha,
        isValid: !!captchaToken.length
      }
    });
    return isFormInValidState;
  };

  return (
    <form
      onSubmit={async (event: FormEvent) => {
        event.preventDefault();
        if (validateForm()) {
          setStatus("submitting");
          props
            .submitCallback({
              fullName,
              subjectLine,
              email,
              details,
              captchaToken,
              attachment: fileAttachment && {
                name: fileAttachment.name,
                contents: (await base64FromFile(fileAttachment)) as string
              }
            })
            .then(success => {
              if (!success) {
                setStatus("failure");
              }
            });
        }
      }}
      css={css`
        margin-top: ${space[9]}px;
      `}
    >
      <fieldset
        onChange={() => {
          if (formValidationState.inValidationMode) {
            validateForm();
          }
          if (status === "failure") {
            setStatus("form");
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
          changeSetState={newFullName => setFullName(newFullName.substr(0, 50))}
          value={fullName}
          additionalCss={css`
            margin: ${space[5]}px;
          `}
          inErrorState={
            formValidationState.inValidationMode &&
            !formValidationState.fullName.isValid
          }
          errorMessage={formValidationState.fullName.message}
        />
        <Input
          label="Email address"
          secondaryLabel="If you are contacting us regarding an account you hold with us you must use the email you registered with"
          width={50}
          changeSetState={newEmail => setEmail(newEmail.substr(0, 50))}
          value={email}
          additionalCss={css`
            margin: ${space[5]}px;
          `}
          inErrorState={
            formValidationState.inValidationMode &&
            !formValidationState.email.isValid
          }
          errorMessage={formValidationState.email.message}
        />
        {props.editableSubjectLine ? (
          <Input
            label="Subject of enquiry"
            type="text"
            width={50}
            changeSetState={newSubjectLine =>
              setSubjectLine(newSubjectLine.substr(0, 50))
            }
            value={subjectLine}
            additionalCss={css`
              margin: ${space[5]}px;
            `}
            inErrorState={
              formValidationState.inValidationMode &&
              !formValidationState.subjectLine.isValid
            }
            errorMessage={formValidationState.subjectLine.message}
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
              {subjectLine}
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
          {formValidationState.inValidationMode &&
            !formValidationState.details.isValid && (
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
                {formValidationState.details.message}
              </span>
            )}
          <textarea
            id="contact-us-details"
            name="details"
            rows={2}
            maxLength={2500}
            value={details}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              setDetails(e.target.value);
              setDetailsRemainingCharacters(2500 - e.target.value.length);
            }}
            css={css`
              width: 100%;
              border: ${formValidationState.inValidationMode &&
              !formValidationState.details.isValid
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
            {detailsRemainingCharacters} characters remaining
          </span>
        </label>
        <UploadFileInput
          title="Upload image"
          optional
          description={`File must be in ${VALID_IMAGE_FILE_EXTENSIONS.join(
            ", "
          ).replace(/,(?=[^,]*$)/, " or ")} format and less than 5MB`}
          allowedFileFormats={VALID_IMAGE_FILE_MIME_TYPES}
          changeSetState={setFileAttachment}
          inErrorState={
            formValidationState.inValidationMode &&
            !formValidationState.fileAttachment.isValid
          }
          errorMessage={formValidationState.fileAttachment.message}
          additionalCss={css`
            margin: ${space[5]}px;
          `}
        />
      </fieldset>
      {status === "failure" && (
        <FormError
          title="Something went wrong when submitting your form"
          messages={[
            <>
              Please try again or if the problem persists please contact{" "}
              <Button
                priority="subdued"
                cssOverrides={css`
                  font-weight: normal;
                  text-decoration: underline;
                `}
                onClick={() => setShowCustomerServiceInfo(true)}
              >
                Customer Service
              </Button>
            </>
          ]}
        />
      )}
      {showCustomerServiceInfo && <CallCentreEmailAndNumbers />}
      <div
        css={css`
          margin: ${space[5]}px 0;
        `}
      >
        {formValidationState.inValidationMode &&
          !formValidationState.captcha.isValid && (
            <span
              css={css`
                display: block;
                color: ${palette.news[400]};
                ${textSans.medium({ fontWeight: "bold" })};
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
              {formValidationState.captcha.message}
            </span>
          )}
        <div id="recaptcha" />
      </div>
      <Button
        type="submit"
        iconSide="right"
        icon={status === "submitting" ? <Spinner scale={0.5} /> : undefined}
        disabled={status === "submitting"}
      >
        Submit
      </Button>
    </form>
  );
};
