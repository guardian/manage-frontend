import React, { FC } from "react";
import palette from "../../colours";
import { sans } from "../../styles/fonts";
import { Button } from "../buttons";
import { PageSection } from "./PageSection";

interface EmailSettingsSectionProps {
  actionHandler: () => void;
  removed: boolean;
  email: string;
}

const successMessage = (
  <div
    css={{
      fontSize: "0.8125rem",
      lineHeight: "1.125rem",
      fontFamily: sans,
      borderBottom: `0.0625rem solid ${palette.green.light}`,
      borderTop: `0.0625rem solid ${palette.green.light}`,
      color: palette.green.medium,
      marginTop: "0.375rem",
      padding: "0.4375rem 0.5rem"
    }}
  >
    You've been unsubscribed from all Guardian marketing newsletters and emails.
  </div>
);
const unsubscribeButton = (clickHandler: () => void) => (
  <Button text="Unsubscribe from all emails" onClick={clickHandler} />
);
export const EmailSettingsSection: FC<EmailSettingsSectionProps> = props => {
  const { actionHandler, email, removed } = props;
  return (
    <PageSection title={"Email settings"}>
      <p>
        You are recieving newsletters, notifications an all other emails to{" "}
        <strong>{email}</strong>
      </p>
      <p>Change your email address</p>
      <p>Manage your Jobs alerts</p>
      {removed ? successMessage : unsubscribeButton(actionHandler)}
    </PageSection>
  );
};
