import React from "react";
import { InlineContactUs } from "../../inlineContactUs";
import { InPageFooter } from "./inPageFooter";

export const QuestionsFooter = () => (
  <InPageFooter title="Questions?">
    If you have any questions about updating your payment details, please{" "}
    <InlineContactUs />
  </InPageFooter>
);
