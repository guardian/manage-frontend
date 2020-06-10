import React from "react";
import { InlineContactUs } from "../../inlineContactUs";
import { InPageFooter } from "./inPageFooter";

interface QuestionsFooterProps {
  topic: string;
}

export const QuestionsFooter = (props: QuestionsFooterProps) => (
  <InPageFooter title="Questions?">
    If you have any questions about {props.topic}, please <InlineContactUs />
  </InPageFooter>
);
