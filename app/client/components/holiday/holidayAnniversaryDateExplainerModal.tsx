import React from "react";
import palette from "../../colours";
import { Modal } from "../modal";

interface HolidayAnniversaryDateExplainerModalProps {
  dateElement: JSX.Element;
  issueKeyword: string;
}

export const HolidayAnniversaryDateExplainerModal = (
  props: HolidayAnniversaryDateExplainerModalProps
) => (
  <Modal
    instigator={
      <a
        css={{
          textDecoration: "underline",
          color: palette.blue.medium,
          cursor: "pointer"
        }}
      >
        What is this date?
      </a>
    }
    title="What is this date?"
  >
    <p>
      {props.dateElement} is the anniversary of your subscription. The number of{" "}
      {props.issueKeyword}s you can suspend per year is reset on this date.
    </p>
  </Modal>
);
