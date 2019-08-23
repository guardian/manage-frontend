import React from "react";
import { sans } from "../../styles/fonts";
import { Modal } from "../modal";
import { InfoIcon } from "../svgs/infoIcon";

export interface HolidayQuestionsModalProps {
  annualIssueLimit: number;
}

export const HolidayQuestionsModal = (props: HolidayQuestionsModalProps) => (
  <Modal
    title="We are here to help"
    instigator={
      <a
        css={{
          fontFamily: sans,
          fontSize: "14px",
          cursor: "pointer",
          textDecoration: "underline",
          margin: "10px"
        }}
      >
        <InfoIcon />Questions? Check here
      </a>
    }
  >
    <h3>Things to remember</h3>
    <ul>
      <li>
        You can suspend up to {props.annualIssueLimit} issues in one year.
      </li>
      <li>
        A new suspension cannot begin from today as there is a notice period.
      </li>
      <li>Notice period is for our printing and delivery schedule.</li>
      <li>
        You will be credited for each suspended issue on the next bill after the
        issue date.
      </li>
    </ul>
    <h3>You will need to contact us by phone or email if you...</h3>
    <ul>
      <li>
        You want to have your delivery redirected to a temporary address within
        the same country.
      </li>
      <li>
        You want to suspend more than {props.annualIssueLimit} issues in one
        year.
      </li>
    </ul>
  </Modal>
);
