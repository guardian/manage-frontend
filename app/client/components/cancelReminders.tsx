import { css } from "@emotion/core";
import { RouteComponentProps } from "@reach/router";
import * as Sentry from "@sentry/browser";
import React, { useEffect, useState } from "react";
import parse from "url-parse";
import { cancelReminder } from "./identity/idapi/supportReminders";

const containerStyle = css`
  width: 100%;
  margin-left: 20%;

  max-width: 400px;
  display: flex;
  flex-direction: column;
  margin-bottom: 80px;
`;
const headingStyle = css`
  border-bottom: 1px solid #c4c4c4;
  font-size: 28px;
  margin-bottom: 0;
  margin-top: 10px;
  padding-bottom: 10px;
`;
const linkStyle = css`
  margin-top: 20px;
`;

type CancelStatus = "PENDING" | "SUCCESS" | "FAILURE";

const CancelReminders = (props: RouteComponentProps) => {
  const [cancelStatus, setCancelStatus] = useState<CancelStatus>("PENDING");

  useEffect(() => {
    if (props.location?.href) {
      const queryParams = parse(props.location.href, true).query;
      if (queryParams.reminderCode) {
        cancelReminder(queryParams.reminderCode).then(response => {
          if (!response.ok) {
            setCancelStatus("FAILURE");
            Sentry.captureMessage(
              `Failed to cancel reminders for code: ${queryParams.reminderCode}`
            );
          } else {
            setCancelStatus("SUCCESS");
          }
        });
      }
    }
  });

  return (
    <div css={containerStyle}>
      {cancelStatus === "PENDING" && (
        <h3 css={headingStyle}>Unsubscribing...</h3>
      )}

      {cancelStatus === "SUCCESS" && (
        <>
          <h3 css={headingStyle}>You've been unsubscribed</h3>
          <div>
            We will no longer send you contribution reminder emails. Please note
            this may take 24/48 hours to take effect.
          </div>
          <div css={linkStyle}>
            <a
              css={css`
                text-decoration: underline;
              `}
              href="/email-prefs"
            >
              Manage your email preferences
            </a>
          </div>
        </>
      )}

      {cancelStatus === "FAILURE" && (
        <>
          <h3 css={headingStyle}>Sorry, something went wrong</h3>
          <div>
            You're still subscribed to reminder emails.{" "}
            <a
              css={css`
                text-decoration: underline;
              `}
              href="/help-centre/contact-us/tech/s15"
            >
              Please report the issue
            </a>{" "}
            and we'll do our best to resolve it for you.
          </div>
        </>
      )}
    </div>
  );
};

export default CancelReminders;
