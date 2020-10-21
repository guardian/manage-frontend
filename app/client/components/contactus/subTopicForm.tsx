import { css, SerializedStyles } from "@emotion/core";
import { Button } from "@guardian/src-button";
import { palette, space } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import { Radio, RadioGroup } from "@guardian/src-radio";
import React, { FormEvent } from "react";
import { minWidth } from "../../styles/breakpoints";
import { SubTopic } from "./contactUsConfig";

interface SubTopicFormProps {
  updateCallback: (subTopicId: string) => void;
  submitCallback: () => void;
  title: string;
  submitButonText: string;
  showSubmitButton: boolean;
  additionalCss?: SerializedStyles;
  data?: SubTopic[];
  preSelectedId?: string;
}

export const SubTopicForm = (props: SubTopicFormProps) => {
  return (
    <form
      onSubmit={(event: FormEvent) => {
        event.preventDefault();
        props.submitCallback();
      }}
      css={css`
        ${props.additionalCss}
      `}
    >
      <fieldset
        onChange={(event: FormEvent<HTMLFieldSetElement>) => {
          const target: HTMLInputElement = event.target as HTMLInputElement;
          props.updateCallback(target.value);
        }}
        css={css`
          border: 1px solid ${palette.neutral["86"]};
          margin: 0 0 ${space[5]}px;
          padding: 0;
        `}
      >
        <legend
          css={css`
            display: block;
            width: 100%;
            margin: 0;
            padding: ${space[3]}px;
            float: left;
            background-color: ${palette.neutral["97"]};
            border-bottom: 1px solid ${palette.neutral["86"]};
            ${textSans.medium({ fontWeight: "bold" })};
            ${minWidth.tablet} {
              padding: ${space[3]}px ${space[5]}px;
            }
          `}
        >
          {props.title}
        </legend>
        <RadioGroup
          name="issue_type"
          orientation="vertical"
          css={css`
            display: block;
          `}
        >
          <ul
            css={css`
              list-style: none;
              padding: ${space[3]}px;
              margin: 0;
              clear: left;
              ${minWidth.tablet} {
                padding: ${space[5]}px;
              }
            `}
          >
            {props.data?.map((subTopic, index) => (
              <li
                key={`deliveryProblemRadio-${index}`}
                css={css`
                  ${textSans.medium()};
                `}
              >
                <Radio
                  value={subTopic.id}
                  label={subTopic.name}
                  checked={
                    !!props.preSelectedId && subTopic.id === props.preSelectedId
                  }
                  css={css`
                    vertical-align: top;
                    text-transform: lowercase;
                    :checked + div label:first-of-type {
                      font-weight: bold;
                    }
                  `}
                />
              </li>
            ))}
          </ul>
        </RadioGroup>
      </fieldset>
      {props.showSubmitButton && (
        <Button type="submit">{props.submitButonText}</Button>
      )}
    </form>
  );
};
