import { css } from "@emotion/core";
import { Button } from "@guardian/src-button";
import { Checkbox } from "@guardian/src-checkbox";
import { palette, space } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { SuccessMessage } from "../delivery/address/deliveryAddressEditConfirmation";
// import { ConsentOptions } from "../identity/identity";
// import { ConsentOptionCollection } from "../identity/models";
import { ClockIcon } from "../svgs/clockIcon";
import { TickIcon } from "../svgs/tickIcon";

export const NewsletterOptinForm = () => {
  const [isOptedIn, setOptinStatus] = useState<boolean>(false);
  const [showSuccessUpdateMsg, setShowSuccessUpdateMsg] = useState<boolean>(
    false
  );
  //   const [consentOptions, setConsentOptions] = useState<ConsentOptionCollection>();
  useEffect(() => {
    // const makeInitialAPICalls = async () => {
    //   try {
    //     const consentOptions = await ConsentOptions.getAll();
    //   } catch (e) {
    //     // uh oh
    //   }
    // };
    // makeInitialAPICalls();
  }, []);
  return (
    <>
      <p
        css={css`
          ${textSans.medium()}
        `}
      >
        Sign up to The Front Page email newsletter and receive the next day's
        newspaper front page in your email inbox the night before.
      </p>
      {showSuccessUpdateMsg && (
        <SuccessMessage
          additionalCss={css`
            margin-bottom: ${space[5]}px;
          `}
          message={"Your newsletter preferences have been updated"}
        />
      )}
      <form
        onSubmit={(event: FormEvent) => {
          event.preventDefault();
        }}
      >
        <fieldset
          css={css`
            padding: ${space[3]}px ${space[5]}px;
            border: 1px solid ${palette.neutral[86]};
            margin-bottom: ${space[5]}px;
          `}
        >
          <Checkbox
            value="frontPageNewsletterSignup"
            label={<CheckboxLabel />}
            checked={isOptedIn}
            cssOverrides={css`
              font-weight: bold;
            `}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setOptinStatus(e.target.checked);
              setShowSuccessUpdateMsg(false);
            }}
          />
        </fieldset>
        <Button icon={<TickIcon />} type="submit">
          Confirm preferences
        </Button>
      </form>
    </>
  );
};

const CheckboxLabel = () => (
  <div
    css={css`
      display: flex;
      align-items: center;
    `}
  >
    <strong
      css={css`
        margin-right: ${space[9]}px;
      `}
    >
      The Front Page
    </strong>
    <ClockIcon
      additionalCss={css`
        margin-bottom: 2px;
      `}
    />
    <span
      css={css`
        margin-left: ${space[1]}px;
      `}
    >
      Daily
    </span>
  </div>
);
