import React from "react";
import palette from "../../../../colours";
import { sans } from "../../../../styles/fonts";
import { DirectDebitLogo } from "../../directDebitLogo";

const hrefStyle = {
  color: palette.neutral["3"],
  textDecoration: "underline",
  cursor: "pointer"
};

export class DirectDebitLegalStepOne extends React.Component<
  {},
  { guaranteeExpanded: boolean }
> {
  public state = {
    guaranteeExpanded: false
  };

  public render(): React.ReactNode {
    return (
      <div
        css={{
          background: palette.neutral["6"],
          padding: "8px",
          color: palette.neutral["3"],
          fontSize: "12px",
          fontFamily: sans,
          flexGrow: "1",
          marginTop: "25px"
        }}
      >
        Payments by GoCardless,{" "}
        <a
          href="https://gocardless.com/legal/privacy"
          css={hrefStyle}
          target="_blank"
        >
          read the GoCardless privacy notice.
        </a>
        <br />
        The details of your Direct Debit instruction including payment schedule,
        due date, frequency and amount will be sent to you within three working
        days. All the normal Direct Debit safeguards and guarantees apply.
        <br />
        Direct Debit
        <br />
        The Guardian, Unit 16, Coalfield Way, Ashby Park, Ashby-De-La-Zouch,
        LE65 1JT United Kingdom
        <br />
        Tel: 0330 333 6767 (within UK). Lines are open 8am-8pm on weekdays,
        8am-6pm at weekends (GMT/BST)
        <br />
        contribution.support@theguardian.com {/*TODO change this email*/}
        <br />
        <br />
        <DirectDebitLogo fill={palette.neutral["4"]} />
        <br />
        Your payments are protected by the{" "}
        <a
          css={hrefStyle}
          onClick={() =>
            this.setState({
              guaranteeExpanded: !this.state.guaranteeExpanded
            })
          }
        >
          Direct Debit guarantee.
        </a>
        <ul
          css={{
            display: this.state.guaranteeExpanded ? "block" : "none",
            paddingLeft: "30px"
          }}
        >
          <li>
            The Guarantee is offered by all banks and building societies that
            accept instructions to pay Direct Debits
          </li>
          <li>
            If there are any changes to the amount, date or frequency of your
            Direct Debit Guardian News & Media Ltd will notify you at least
            three working days in advance of your account being debited or as
            otherwise agreed.
          </li>
          <li>
            If you ask Guardian News & Media Ltd to collect a payment,
            confirmation of the amount and date will be given to you at the time
            of the request.
          </li>
          <li>
            If an error is made in the payment of your Direct Debit by Guardian
            News & Media Ltd or your bank or building society, you are entitled
            to a full and immediate refund of the amount paid from your bank or
            building society.
          </li>
          <li>
            If you receive a refund you are not entitled to, you must pay it
            back when Guardian News & Media Ltd asks you to.
          </li>
          <li>
            You can cancel a Direct Debit at any time by contacting your bank or
            building society. Written confirmation may be required. Please also
            notify us.
          </li>
        </ul>
      </div>
    );
  }
}
