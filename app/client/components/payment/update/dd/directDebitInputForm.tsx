import React, { useState } from "react";
import { maxWidth, minWidth } from "../../../../styles/breakpoints";
import { sans, validationWarningCSS } from "../../../../styles/fonts";
import { Button } from "../../../buttons";
import { Checkbox } from "../../../checkbox";
import { cleanSortCode } from "../../directDebitDisplay";
import { FieldWrapper } from "../fieldWrapper";
import { NewPaymentMethodDetail } from "../newPaymentMethodDetail";
import { DirectDebitLegal } from "./directDebitLegal";
import { NewDirectDebitPaymentMethodDetail } from "./newDirectDebitPaymentMethodDetail";
import { processResponse } from "../../../../utils";

const inputBoxBaseStyle = {
  width: "100%",
  height: "100%",
  fontFamily: sans,
  fontSize: "18px",
  border: "none",
  outline: "none"
};

export const ddFormWidth = "450px";

interface DirectDebitValidationResponse {
  data: {
    accountValid: boolean;
    goCardlessStatusCode: null | number;
  };
}
interface DirectDebitUpdateFormProps {
  newPaymentMethodDetailUpdater: (ddDetails: NewPaymentMethodDetail) => void;
  testUser: boolean;
  executePaymentUpdate: (
    newPaymentMethodDetail: NewPaymentMethodDetail
  ) => Promise<unknown>;
}

export const DirectDebitInputForm = (props: DirectDebitUpdateFormProps) => {
  const [isValidating, setIsValidating] = useState<boolean>(false);

  const [soleAccountHolderConfirmed, setSoleAccountHolderConfirmed] = useState<
    boolean
  >(false);
  const [accountName, setAccountName] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [sortCode, setSortCode] = useState<string>("");
  const [error, setError] = useState<string | undefined>();

  async function validateDirectDebitDetails(
    newPaymentMethod: NewPaymentMethodDetail
  ) {
    try {
      const validateDirectDebitDetailsFetch = await fetch(
        `/api/validate/payment/dd?mode=${props.testUser ? "test" : "live"}`,
        {
          credentials: "include",
          method: "POST",
          body: JSON.stringify({
            accountNumber,
            sortCode: cleanSortCode(sortCode)
          }),
          headers: { "Content-Type": "application/json" }
        }
      );
      const response = await processResponse<DirectDebitValidationResponse>(
        validateDirectDebitDetailsFetch
      );

      if (response && response.data.accountValid) {
        setIsValidating(false);
        props.executePaymentUpdate(newPaymentMethod);
      } else if (response && response.data.goCardlessStatusCode === 429) {
        setIsValidating(false);
        setError(
          "We cannot currently validate your bank details. Please try again later."
        );
      } else {
        setIsValidating(false);
        setError(
          "Your bank details are invalid. Please check them and try again."
        );
      }
    } catch {
      setIsValidating(false);
      setError(
        "Could not validate your bank details, please check them and try again."
      );
    }
  }

  const startDirectDebitUpdate = async () => {
    const newPaymentMethod = new NewDirectDebitPaymentMethodDetail({
      accountName,
      accountNumber,
      sortCode
    });

    props.newPaymentMethodDetailUpdater(newPaymentMethod);

    setError(undefined);
    if (accountName.length < 3) {
      setError("Please enter a valid account name"); // TODO add field highlighting
      return;
    } else if (soleAccountHolderConfirmed) {
      setIsValidating(true);
    } else {
      setError("You need to confirm that you are the account holder"); // TODO highlight checkbox
      return;
    }

    validateDirectDebitDetails(newPaymentMethod);
  };

  return (
    <div
      css={{
        marginBottom: "20px"
      }}
    >
      <div
        css={{
          display: "flex",
          [minWidth.desktop]: {
            flexDirection: "row"
          },
          [maxWidth.desktop]: {
            flexDirection: "column",
            maxWidth: ddFormWidth
          }
        }}
      >
        <div
          css={{
            maxWidth: ddFormWidth,
            [minWidth.desktop]: {
              marginRight: "20px"
            }
          }}
        >
          <FieldWrapper
            width={ddFormWidth}
            label="Account Name"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setAccountName(event.target.value)
            }
          >
            <input
              type="text"
              css={inputBoxBaseStyle}
              pattern="[A-Za-z\s]{3,}"
              title="The name of the account holder must have at least 3 letters."
              required
            />
          </FieldWrapper>
          <div
            css={{
              display: "flex",
              justifyContent: "flex-start",
              marginBottom: "12px"
            }}
          >
            <FieldWrapper
              width="170px"
              label="Sort Code"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setSortCode(cleanSortCode(event.target.value))
              }
            >
              <input
                type="text"
                pattern="[0-9]{2}[\-\s]?[0-9]{2}[\-\s]?[0-9]{2}"
                title="Sort Code must contain 6 numbers (optionally separated by a - or space)"
                css={inputBoxBaseStyle}
                placeholder="e.g. 10-20-30"
                required
              />
            </FieldWrapper>
            <FieldWrapper
              width="260px"
              label="Account Number"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setAccountNumber(event.target.value)
              }
            >
              <input
                type="text"
                pattern="[0-9]{7,}"
                css={inputBoxBaseStyle}
                placeholder="e.g. 12345678"
                title="Account Number should typically be 8 digits"
                required
              />
            </FieldWrapper>{" "}
          </div>
          <Checkbox
            onChange={newValue => setSoleAccountHolderConfirmed(newValue)}
            checked={soleAccountHolderConfirmed}
            label="I confirm that I am the account holder and I am solely able to authorise debit from the account"
            maxWidth={ddFormWidth}
            required
          />

          <div
            css={{
              marginTop: "20px",
              textAlign: "right",
              width: ddFormWidth,
              [maxWidth.desktop]: {
                width: "100%"
              }
            }}
          >
            {!isValidating && (
              <>
                <Button
                  text="Update payment method"
                  onClick={startDirectDebitUpdate}
                  primary
                  right
                />
                {error ? (
                  <div
                    css={{
                      ...validationWarningCSS,
                      marginTop: "5px"
                    }}
                  >
                    {error}
                  </div>
                ) : (
                  undefined
                )}
              </>
            )}
          </div>
        </div>
        <DirectDebitLegal />
      </div>
    </div>
  );
};
