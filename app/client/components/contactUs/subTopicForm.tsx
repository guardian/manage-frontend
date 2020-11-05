import { css } from "@emotion/core";
import { Button } from "@guardian/src-button";
import { palette, space } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import { Radio, RadioGroup } from "@guardian/src-radio";
import React, { FormEvent, useState } from "react";
import { SubTopic } from "../../../shared/contactUsTypes";
import { minWidth } from "../../styles/breakpoints";

interface SubTopicFormProps {
  submitCallback: (subTopicId: string) => void;
  title: string;
  submitButonText: string;
  data: SubTopic[];
  preSelectedId?: string;
}

export const SubTopicForm = (props: SubTopicFormProps) => {
  const [selectedId, setSelectedId] = useState<string>(
    props.preSelectedId || props.data[0].id
  );

  const [requiresSubmitButton, setRequiresSubmitButton] = useState<boolean>(
    true
  );

  return (
    <form
      onSubmit={(event: FormEvent) => {
        event.preventDefault();
        setRequiresSubmitButton(false);
        props.submitCallback(selectedId);
      }}
      css={css`
        margin-top: ${space[9]}px;
      `}
    >
      <fieldset
        onChange={(event: FormEvent<HTMLFieldSetElement>) => {
          const target: HTMLInputElement = event.target as HTMLInputElement;
          setSelectedId(target.value);
          if (!requiresSubmitButton) {
            props.submitCallback(target.value);
          }
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
            {props.data.map((subTopic, index) => (
              <li
                key={`deliveryProblemRadio-${index}`}
                css={css`
                  ${textSans.medium()};
                `}
              >
                <Radio
                  value={subTopic.id}
                  label={subTopic.name}
                  checked={subTopic.id === selectedId}
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
      {requiresSubmitButton && (
        <Button type="submit">{props.submitButonText}</Button>
      )}
    </form>
  );
};
