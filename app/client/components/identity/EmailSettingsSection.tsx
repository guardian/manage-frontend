import React, { FC } from "react";
import { Button } from "../buttons";
import { PageSection } from "./PageSection";

interface EmailSettingsSectionProps {
  email: string;
}

export const EmailSettingsSection: FC<EmailSettingsSectionProps> = props => {
  const { email } = props;
  return (
    <PageSection title={"Email settings"}>
      <p>
        You are recieving newsletters, notifications an all other emails to{" "}
        <strong>{email}</strong>
      </p>
      <p>Change your email address</p>
      <p>Manage your Jobs alerts</p>
      <Button text="Unsubscribe from all emails" />
    </PageSection>
  );
};
