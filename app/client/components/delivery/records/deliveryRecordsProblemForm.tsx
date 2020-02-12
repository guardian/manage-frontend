import { css } from "@emotion/core";
import { Button } from "@guardian/src-button";
import { space } from "@guardian/src-foundations";
import { palette } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import { Radio, RadioGroup } from "@guardian/src-radio";
import React, { FormEvent, useEffect, useState } from "react";
import { ErrorIcon } from "../../svgs/errorIcon";

interface DeliveryRecordProblemFormProps {
  showNextStepButton: boolean;
  onResetDeliveryRecordsPage?: () => void;
  onFormSubmit?: (selectedValue?: string, selectedMessage?: string) => void;
  inValidationState: boolean;
  updateValidationStatusCallback: (isValid: boolean, message?: string) => void;
}

interface SelectedDeliveryProblem {
  value: string;
  message?: string;
}

interface ProblemRadioOption {
  label: string;
  messageIsMandatory: boolean;
}

interface ValidateDetails {
  isValid: boolean;
  message?: string;
}

export const deliveryProblemsRadioArr: ProblemRadioOption[] = [
  { label: "Damaged Paper", messageIsMandatory: false },
  { label: "Delivered Despite Holiday", messageIsMandatory: false },
  { label: "Instructions Not Followed", messageIsMandatory: false },
  { label: "No Delivery", messageIsMandatory: false },
  { label: "Other", messageIsMandatory: true }
];

export const DeliveryRecordProblemForm = (
  props: DeliveryRecordProblemFormProps
) => {
  const [
    selectedDeliveryProblem,
    setSelectedDeliveryProblem
  ] = useState<SelectedDeliveryProblem | null>(null);
  useEffect(() => {
    const validateDetails: ValidateDetails = validateForm();
    props.updateValidationStatusCallback(
      validateDetails.isValid,
      validateDetails.message
    );
  }, [selectedDeliveryProblem]);
  const validateForm = () => {
    if (!selectedDeliveryProblem) {
      return {
        isValid: false,
        message: "Please select an option"
      };
    } else {
      const deliveryProblem = deliveryProblemsRadioArr.find(
        issue =>
          issue.label ===
          deliveryProblemsRadioArr[Number(selectedDeliveryProblem?.value)].label
      );
      const isValid =
        deliveryProblem?.messageIsMandatory && !selectedDeliveryProblem?.message
          ? false
          : true;
      return {
        isValid,
        ...(!isValid && {
          message: "The message is mandatory for other option"
        })
      };
    }
  };
  return (
    <form
      onSubmit={(event: FormEvent) => {
        event.preventDefault();
        props.onFormSubmit?.(
          selectedDeliveryProblem?.value,
          selectedDeliveryProblem?.message
        );
      }}
    >
      <fieldset
        onChange={(event: FormEvent<HTMLFieldSetElement>) => {
          const target: HTMLInputElement = event.target as HTMLInputElement;
          if (target.type === "radio") {
            const deliveryProblemObj = {
              value: target.value
            };
            setSelectedDeliveryProblem(deliveryProblemObj);
          } else if (target.type === "textarea" && selectedDeliveryProblem) {
            setSelectedDeliveryProblem({
              ...selectedDeliveryProblem,
              message: target.value
            });
          }
        }}
        css={css`
          border: 1px solid ${palette.neutral["86"]};
          margin: 0 0 20px;
          padding: 0;
        `}
      >
        <legend
          css={css`
            display: block;
            width: 100%;
            margin: 0;
            padding: 14px;
            float: left;
            background-color: ${palette.neutral["97"]};
            border-bottom: 1px solid ${palette.neutral["86"]};
            ${textSans.medium({ fontWeight: "bold" })};
          `}
        >
          Step 1. What type of problem are you experiencing?
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
              padding: 14px;
              margin: 6px 0 0;
              clear: left;
            `}
          >
            {deliveryProblemsRadioArr.map(
              (deliveryProblemRadioOption, index) => (
                <li
                  key={`deliveryProblemRadio-${index}`}
                  css={css`
                    ${textSans.medium()};
                    margin: 4px 9px;
                  `}
                >
                  <Radio
                    value={`${index}`}
                    label={deliveryProblemRadioOption.label}
                    checked={selectedDeliveryProblem?.value === `${index}`}
                    css={css`
                      vertical-align: top;
                      :checked + div label:first-of-type {
                        font-weight: bold;
                      }
                    `}
                  />
                  {selectedDeliveryProblem?.value === `${index}` && (
                    <div
                      css={css`
                        display: inline-block;
                        width: 100%;
                        max-width: 460px;
                        margin-left: 32px;
                      `}
                    >
                      <>
                        <label
                          htmlFor="issue1Message"
                          css={css`
                            display: block;
                          `}
                        >
                          Please specify
                          <span
                            css={css`
                              font-style: italic;
                              ${textSans.small()};
                              color: ${palette.neutral["60"]};
                            `}
                          >
                            {!deliveryProblemRadioOption.messageIsMandatory &&
                              ` (Optional)`}
                          </span>
                          {props.inValidationState &&
                            deliveryProblemRadioOption.messageIsMandatory &&
                            !selectedDeliveryProblem.message && (
                              <span
                                css={css`
                                  display: block;
                                  color: ${palette.news.main};
                                `}
                              >
                                <i
                                  css={css`
                                    margin-right: 4px;
                                  `}
                                >
                                  <ErrorIcon />
                                </i>
                                This detail is required
                              </span>
                            )}
                        </label>
                        <textarea
                          id="issue1Message"
                          name="message"
                          rows={2}
                          css={css`
                            border: ${props.inValidationState &&
                              deliveryProblemRadioOption.messageIsMandatory &&
                              !selectedDeliveryProblem.message
                                ? "4"
                                : "2"}px
                              solid
                              ${props.inValidationState &&
                              deliveryProblemRadioOption.messageIsMandatory &&
                              !selectedDeliveryProblem.message
                                ? palette.news.main
                                : palette.neutral["60"]};
                            width: 100%;
                            max-width: 460px;
                            padding: 12px;
                            ${textSans.medium()};
                          `}
                        />
                      </>
                    </div>
                  )}
                </li>
              )
            )}
          </ul>
        </RadioGroup>
      </fieldset>
      {props.inValidationState && !selectedDeliveryProblem && (
        <span
          css={css`
            display: block;
            position: relative;
            padding: ${space[5]}px ${space[5]}px ${space[5]}px 50px;
            border: 4px solid ${palette.news.main};
            margin-bottom: ${space[5]}px;
          `}
        >
          <i
            css={css`
              position: absolute;
              top: ${space[5]}px;
              left: ${space[5]}px;
            `}
          >
            <ErrorIcon />
          </i>
          Please make a selection
        </span>
      )}
      {props.showNextStepButton && (
        <>
          <Button type="submit">Continue</Button>
          <Button
            css={css`
              ${textSans.medium()};
              background-color: transparent;
              font-weight: bold;
              margin-left: 22px;
              padding: 0;
              color: ${palette.brand.main};
              :hover {
                background-color: transparent;
              }
            `}
            onClick={() => {
              props.onResetDeliveryRecordsPage?.();
            }}
          >
            Go back
          </Button>
        </>
      )}
    </form>
  );
};
