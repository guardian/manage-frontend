import { css } from "@emotion/core";
import { Button } from "@guardian/src-button";
import { Checkbox } from "@guardian/src-checkbox";
import { palette, space } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { SuccessMessage } from "../delivery/address/deliveryAddressEditConfirmation";
import { ConsentOptions } from "../identity/identity";
import { ConsentOption, FRONT_PAGE_NEWSLETTER_ID } from "../identity/models";
import { ProblemAlert } from "../ProblemAlert";
import { ClockIcon } from "../svgs/clockIcon";
import { TickIcon } from "../svgs/tickIcon";

interface UpdateMsgStatus {
  isSuccessful: boolean;
}
export const NewsletterOptinForm = () => {
  const [showUpdateMsg, setShowUpdateMsg] = useState<UpdateMsgStatus | false>(
    false
  );
  const [newsletter, setNewsletter] = useState<ConsentOption>();
  useEffect(() => {
    const makeInitialAPICalls = async () => {
      try {
        const consentOptions = await ConsentOptions.getAll();
        const specificNewsletter = ConsentOptions.findById(
          consentOptions,
          FRONT_PAGE_NEWSLETTER_ID
        );
        if (specificNewsletter) {
          setNewsletter(specificNewsletter);
        }
      } catch (e) {
        // doing nothing here will render nothing
      }
    };
    makeInitialAPICalls();
  }, []);
  return newsletter ? (
    <>
      <p
        css={css`
          ${textSans.medium()}
        `}
      >
        {newsletter.description}
      </p>
      {showUpdateMsg &&
        (showUpdateMsg.isSuccessful ? (
          <SuccessMessage
            additionalCss={css`
              margin-bottom: ${space[5]}px;
            `}
            message={"Your newsletter preferences have been updated"}
          />
        ) : (
          <ProblemAlert
            title="Something went wrong"
            message="We couldn't update your preferences. Please try again later"
            additionalcss={css`
              margin-bottom: ${space[5]}px;
            `}
          />
        ))}
      <form
        onSubmit={(event: FormEvent) => {
          event.preventDefault();
          const updatePreference = newsletter.subscribed
            ? ConsentOptions.subscribe(newsletter)
            : ConsentOptions.unsubscribe(newsletter);
          updatePreference.then(
            () => setShowUpdateMsg({ isSuccessful: true }),
            () => {
              setShowUpdateMsg({ isSuccessful: false });
              setNewsletter({
                ...newsletter,
                subscribed: !newsletter.subscribed
              });
            }
          );
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
            label={
              <CheckboxLabel
                title={newsletter.name}
                frequency={newsletter.frequency}
              />
            }
            checked={newsletter.subscribed}
            cssOverrides={css`
              font-weight: bold;
            `}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setNewsletter({ ...newsletter, subscribed: e.target.checked });
              setShowUpdateMsg(false);
            }}
          />
        </fieldset>
        <Button icon={<TickIcon />} type="submit">
          Confirm preferences
        </Button>
      </form>
    </>
  ) : null;
};

interface CheckboxLabelProps {
  title: string;
  frequency?: string;
}
const CheckboxLabel = (props: CheckboxLabelProps) => (
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
      {props.title}
    </strong>
    {props.frequency && (
      <>
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
          {props.frequency}
        </span>
      </>
    )}
  </div>
);
