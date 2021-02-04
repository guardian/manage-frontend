import { css } from "@emotion/core";
import { Accordion, AccordionRow } from "@guardian/src-accordion";
import React from "react";
import { helpCentreMoreQuestionsConfig } from "./helpCentreConfig";

const subTopicStyle = css`
  background-color: rgba(193, 216, 252, 0.3);
`;

const linkStyle = css`
  color: black !important;
`;

export const MoreQuestions = () => (
  <Accordion
    cssOverrides={css`
      border-style: none;
    `}
    hideToggleLabel={true}
  >
    {helpCentreMoreQuestionsConfig.map(topic => (
      <AccordionRow
        cssOverrides={css`
          border-style: none;
        `}
        label={topic.title}
        key={topic.id}
      >
        {topic.links.map(link => (
          <div css={subTopicStyle} key={link.id}>
            <a css={linkStyle} href={link.link} target="_blank">
              {link.title}
            </a>
          </div>
        ))}
      </AccordionRow>
    ))}
  </Accordion>
);
