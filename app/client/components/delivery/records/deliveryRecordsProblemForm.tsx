import { css } from "@emotion/core";
import { Button } from "@guardian/src-button";
import { space } from "@guardian/src-foundations";
import { palette } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import { Radio, RadioGroup } from "@guardian/src-radio";
import React, { FormEvent, useEffect, useState } from "react";
import { DeliveryProblemType } from "../../../../shared/productTypes";
import { minWidth } from "../../../styles/breakpoints";
import { ErrorIcon } from "../../svgs/errorIcon";

interface DeliveryRecordProblemFormProps {
  showNextStepButton: boolean;
  onResetDeliveryRecordsPage?: () => void;
  onFormSubmit?: (selectedValue?: string, selectedMessage?: string) => void;
  inValidationState: boolean;
  updateValidationStatusCallback: (isValid: boolean, message?: string) => void;
  problemTypes: DeliveryProblemType[];
}

export interface SelectedDeliveryProblem {
  value: string;
  message?: string;
}

interface ValidateDetails {
  isValid: boolean;
  message?: string;
}

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
        message: "Please select the type of problem"
      };
    } else {
      const deliveryProblem = props.problemTypes.find(
        issue =>
          issue.label ===
          props.problemTypes[Number(selectedDeliveryProblem?.value)].label
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
              padding: ${space[3]}px;
              margin: 0;
              clear: left;
              ${minWidth.tablet} {
                padding: ${space[5]}px;
              }
            `}
          >
            {props.problemTypes.map((deliveryProblemRadioOption, index) => (
              <li
                key={`deliveryProblemRadio-${index}`}
                css={css`
                  ${textSans.medium()};
                `}
              >
                <Radio
                  value={`${index}`}
                  label={
                    deliveryProblemRadioOption.label.charAt(0).toUpperCase() +
                    deliveryProblemRadioOption.label.slice(1).toLowerCase()
                  }
                  checked={selectedDeliveryProblem?.value === `${index}`}
                  css={css`
                    vertical-align: top;
                    text-transform: lowercase;
                    :checked + div label:first-of-type {
                      font-weight: bold;
                    }
                  `}
                />
                {selectedDeliveryProblem?.value === `${index}` && (
                  <div
                    css={css`
                      display: inline-block;
                      margin-left: 32px;
                      ${minWidth.tablet} {
                        display: block;
                      }
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
                          max-width: 230px;
                          padding: 12px;
                          ${textSans.medium()};
                          ${minWidth.tablet} {
                            max-width: 460px;
                          }
                        `}
                      />
                    </>
                  </div>
                )}
              </li>
            ))}
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
          Please select the type of problem
        </span>
      )}
      {props.showNextStepButton && (
        <>
          <Button type="submit">Continue to Step 2</Button>
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
            Cancel
          </Button>
        </>
      )}
    </form>
  );
};
