import { css } from '@emotion/react';
import { palette, textSans12 } from '@guardian/source/foundations';
import * as React from 'react';

const hrefStyle = css`
	color: ${palette.neutral[46]};
	text-decoration: underline;
	cursor: pointer;
`;

const baseStyle = css`
	color: ${palette.neutral[46]};
	${textSans12};
	flex-grow: 1;
	margin-top: 10px;
`;

export class GoCardlessGuarantee extends React.Component<
	{ inner?: true },
	{ expanded: boolean }
> {
	public state = {
		expanded: false,
	};

	public render(): React.ReactNode {
		return (
			<div
				css={css`
					${this.props.inner ? `padding-top: 5px;` : baseStyle}
				`}
			>
				Your payments are protected by the{' '}
				<a
					css={hrefStyle}
					onClick={this.toggleGuaranteeDisplay}
					onKeyPress={this.toggleGuaranteeDisplay}
					tabIndex={0}
				>
					Direct&nbsp;Debit&nbsp;guarantee.
				</a>
				<ul
					css={css`
						display: ${this.state.expanded ? 'block' : 'none'};
						padding-left: 30px;
					`}
				>
					<li>
						The Guarantee is offered by all banks and building
						societies that accept instructions to pay Direct Debits
					</li>
					<li>
						If there are any changes to the amount, date or
						frequency of your Direct Debit Guardian News & Media Ltd
						will notify you at least three working days in advance
						of your account being debited or as otherwise agreed.
					</li>
					<li>
						If you ask Guardian News & Media Ltd to collect a
						payment, confirmation of the amount and date will be
						given to you at the time of the request.
					</li>
					<li>
						If an error is made in the payment of your Direct Debit
						by Guardian News & Media Ltd or your bank or building
						society, you are entitled to a full and immediate refund
						of the amount paid from your bank or building society.
					</li>
					<li>
						If you receive a refund you are not entitled to, you
						must pay it back when Guardian News & Media Ltd asks you
						to.
					</li>
					<li>
						You can cancel a Direct Debit at any time by contacting
						your bank or building society. Written confirmation may
						be required. Please also notify us.
					</li>
				</ul>
			</div>
		);
	}

	private toggleGuaranteeDisplay = () =>
		this.setState({
			expanded: !this.state.expanded,
		});
}

interface DirectDebitLegalProps {
	newDirectDebit?: true; // intended for use in a payment method 'switch' scenario
}

export const DirectDebitLegal = (props: DirectDebitLegalProps) => (
	<div
		css={css`
			${baseStyle};
			max-width: 590px;
		`}
	>
		<p>
			<strong>Payments by GoCardless </strong>
			<br />
			<a
				href="https://gocardless.com/legal/privacy"
				rel="noreferrer"
				css={hrefStyle}
				target="_blank"
			>
				Read the GoCardless privacy notice.
			</a>
		</p>

		<p>
			<strong>Advance notice</strong>
			<br />
			{props.newDirectDebit
				? 'The details of your Direct Debit instruction including payment schedule, due date, frequency and amount ' +
				  'will be sent to you within three working days. '
				: undefined}
			All the normal Direct Debit safeguards and guarantees apply.
		</p>
		<p>
			<strong>Direct Debit</strong>
			<br />
			The Guardian, Unit 16, Coalfield Way, Ashby Park, Ashby-De-La-Zouch,
			LE65 1JT United Kingdom.
			<br />
			Tel: 0330 333 6767 (within UK). Lines are open 8am-8pm on weekdays,
			8am-6pm at weekends (GMT/BST)
			<br />
			<a
				css={hrefStyle}
				href="mailto:contribution.support@theguardian.com"
			>
				contribution.support@theguardian.com
			</a>
		</p>
	</div>
);
