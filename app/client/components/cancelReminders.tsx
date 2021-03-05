import { css } from "@emotion/core";
import { RouteComponentProps } from "@reach/router";
import React, { useEffect } from "react";
import parse from "url-parse";

const containerStyle = css`
  width: 100%;
  margin-left: 20%;

  max-width: 400px;
  display: flex;
  // align-items: center;
  flex-direction: column;
  margin-bottom: 80px;

  > * {
    // margin: auto;
  }
`;
const headingStyle = css`
  border-bottom: 1px solid #c4c4c4;
  font-size: 28px;
  margin-bottom: 0;
  padding-bottom: 10px;
`;
const linkStyle = css`
  margin-top: 20px;
`;

const CancelReminders = (props: RouteComponentProps) => {
  useEffect(() => {
    console.log(props);
    if (props.location?.href) {
      const queryParams = parse(props.location.href, true).query;
      if (queryParams.reminderCode) {
      }
    }
  });

  return (
    <div css={containerStyle}>
      <h3 css={headingStyle}>You've been unsubscribed</h3>
      <div>
        We will no longer send you contribution reminder emails. Please note
        this may take 24/48 hours to take effect.
      </div>
      <div css={linkStyle}>
        <a href="">Manage your email preferences</a>
      </div>
    </div>
  );
};

export default CancelReminders;
