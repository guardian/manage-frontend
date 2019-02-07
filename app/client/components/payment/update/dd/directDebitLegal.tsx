import React from "react";
import palette from "../../../../colours";
import { sans } from "../../../../styles/fonts";
import { DirectDebitLogo } from "../../directDebitLogo";

const hrefStyle = {
  color: palette.neutral["3"],
  textDecoration: "underline",
  cursor: "pointer"
};

const baseStyle = {
  background: palette.neutral["6"],
  padding: "11px",
  color: palette.neutral["3"],
  fontSize: "12px",
  fontFamily: sans,
  flexGrow: 1,
  marginTop: "25px"
};

export class GoCardlessGuarantee extends React.Component<
  { inner?: true },
  { expanded: boolean }
> {
  public state = {
    expanded: false
  };

  public render(): React.ReactNode {
    return (
      <div css={this.props.inner ? { paddingTop: "5px" } : baseStyle}>
        Your payments are protected by the{" "}
        <a
          css={hrefStyle}
          onClick={this.toggleGuaranteeDisplay}
          onKeyPress={this.toggleGuaranteeDisplay}
          tabIndex={0}
        >
          Direct&nbsp;Debit&nbsp;guarantee.
        </a>
        <ul
          css={{
            display: this.state.expanded ? "block" : "none",
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

  private toggleGuaranteeDisplay = () =>
    this.setState({
      expanded: !this.state.expanded
    });
}

export interface DirectDebitLegalProps {
  newDirectDebit?: true; // intended for use in a payment method 'switch' scenario
}

export const DirectDebitLegal = (props: DirectDebitLegalProps) => (
  <div
    css={{
      ...baseStyle,
      maxWidth: "470px"
    }}
  >
    <p>
      Payments by GoCardless. Read the{" "}
      <a
        href="https://gocardless.com/legal/privacy"
        css={hrefStyle}
        target="_blank"
      >
        GoCardless privacy notice.
      </a>
      <br />
      {props.newDirectDebit
        ? "The details of your Direct Debit instruction including payment schedule, due date, frequency and amount " +
          "will be sent to you within three working days. "
        : undefined}
      All the normal Direct Debit safeguards and guarantees apply.
    </p>
    <p>
      Direct Debit, The Guardian, Unit 16, Coalfield Way, Ashby Park,
      Ashby-De-La-Zouch
      <br />
      LE65 1JT, United Kingdom
    </p>
    <p>
      Tel: 0330 333 6767 (within UK).
      <br />
      Lines are open 8am-8pm on weekdays, 8am-6pm at weekends (GMT/BST)
    </p>
    <p>
      <a css={hrefStyle} href="mailto:customer.help@theguardian.com">
        customer.help@theguardian.com
      </a>
    </p>
    <DirectDebitLogo fill={palette.neutral["4"]} />
    <br />
    <GoCardlessGuarantee inner />
  </div>
);
