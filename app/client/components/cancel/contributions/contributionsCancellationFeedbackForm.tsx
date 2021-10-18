import { css } from "@emotion/core";
import { Button } from "@guardian/src-button";
import React, { useState } from "react";
import {getUpdateCaseEndpoint} from "../caseUpdate";
import ContributionsCancellationFeedbackFormThankYou from "./contributionsCancellationFeedbackFormThankYou";
import DataFetcher from "../../DataFetcher";

const textAreaStyles = css`
  width: 100%;
  font-size: inherit;
  font-family: inherit;
  border: 1px solid black;
`;

const buttonContainerStyles = css`
  margin-top: 18px;
`;

interface ContributionsFeedbackFormProps {
  isTestUser: boolean;
  caseId: string;
}

type Status = "EDITING" | "SUBMITTED";

const CHARACTER_LIMIT = 2_500;
const NUM_ROWS = 8;

export const getPatchUpdateCaseEndpoint = (
  isTestUser: boolean,
  caseId: string,
  feedback: string
) =>
  getUpdateCaseEndpoint(isTestUser, "_FEEDBACK", caseId, {
    Description: feedback,
    Subject: "Online Cancellation Query"
  });

const ContributionsFeedbackForm: React.FC<ContributionsFeedbackFormProps> = ({
  isTestUser,
  caseId
}: ContributionsFeedbackFormProps) => {
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState<Status>("EDITING");

  const updateFeedback = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setFeedback(event.target.value);

  const submit = () => {
    setStatus("SUBMITTED");
  };

  return status === "SUBMITTED" ? (
    <div>
      <DataFetcher loadingMessage="Storing your feedback">
        <ContributionsCancellationFeedbackFormThankYou isTestUser={isTestUser} caseId={caseId} feedback={feedback} />
      </DataFetcher>
    </div>
  ) : (
    <div>
      <p>
        Please share any further thoughts you have about cancelling – you can
        help us improve. Thank you.
      </p>
      <textarea
        css={textAreaStyles}
        maxLength={CHARACTER_LIMIT}
        rows={NUM_ROWS}
        value={feedback}
        onChange={updateFeedback}
      />
      <div css={buttonContainerStyles}>
        <Button priority="secondary" onClick={submit}>
          Submit the form
        </Button>
      </div>
    </div>
  );
};

export default ContributionsFeedbackForm;
