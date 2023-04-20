import { css } from '@emotion/react';
import { from, palette, space, textSans } from '@guardian/source-foundations';
import {
	Button,
	Radio,
	RadioGroup,
	Stack,
	SvgCalendar,
	SvgEnvelope,
} from '@guardian/source-react-components';
import { useNavigate } from 'react-router';
import { ProgressIndicator } from '../../shared/ProgressIndicator';
import type { CancellationReason } from '../cancellationReason';
import { membershipCancellationReasons } from '../membership/MembershipCancellationReasons';
import {
	buttonCentredCss,
	buttonLayoutCss,
	headingCss,
	sectionSpacing,
} from './SaveStyles';

const infoCss = css`
	${textSans.medium()}
	display: flex;
	> svg {
		flex-shrink: 0;
		margin-right: 8px;
		fill: currentColor;
	}
	> span {
		padding-top: ${space[1]}px;
	}
`;

const CancellationInfo = () => (
	<ul
		css={css`
			padding-inline-start: 0;
		`}
	>
		<Stack space={1}>
			<li css={infoCss}>
				<SvgCalendar size="medium" />
				<span>
					You'll continue to have access to your Membership benefits
					until xx
				</span>
			</li>
			<li css={infoCss}>
				<SvgEnvelope size="medium" />
				<span>We will send you a confirmation email at xx.com</span>
			</li>
		</Stack>
	</ul>
);

const ReasonSelection = () => {
	return (
		<fieldset
			// onChange={(event: FormEvent<HTMLFieldSetElement>) => {
			// 	const target: HTMLInputElement =
			// 		event.target as HTMLInputElement;
			// 	setSelectedReasonId(target.value);
			// }}
			css={css`
				border: 1px solid ${palette.neutral[86]};
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
					background-color: ${palette.neutral[97]};
					border-bottom: 1px solid ${palette.neutral[86]};
					${textSans.medium({ fontWeight: 'bold' })};
					${from.tablet} {
						padding: ${space[3]}px ${space[5]}px;
					}
				`}
			>
				Why did you cancel your Membership with us today?
			</legend>
			<RadioGroup
				name="issue_type"
				orientation="vertical"
				css={css`
					display: block;
					padding: ${space[5]}px;
				`}
			>
				{membershipCancellationReasons.map(
					(reason: CancellationReason) => (
						<Radio
							key={reason.reasonId}
							name="cancellation-reason"
							value={reason.reasonId}
							label={reason.linkLabel}
							css={css`
								vertical-align: top;
								text-transform: lowercase;
								:checked + div label:first-of-type {
									font-weight: bold;
								}
							`}
						/>
					),
				)}
			</RadioGroup>
		</fieldset>
	);
};

export const SelectReason = () => {
	const navigate = useNavigate();

	return (
		<>
			<ProgressIndicator
				steps={[
					{ title: '' },
					{ title: '' },
					{ title: 'Confirmation', isCurrentStep: true },
				]}
				additionalCSS={css`
					margin: ${space[5]}px 0 ${space[12]}px;
				`}
			/>
			<h2 css={headingCss}>Your Membership is cancelled</h2>
			<CancellationInfo />
			<p
				css={css`
					${textSans.medium()}
					border-top: 1px solid ${palette.neutral[86]};
					padding-top: ${space[5]}px;
				`}
			>
				We're always trying to improve our offering and welcome any
				feedback. If you can, please take a moment to tell us why you've
				cancelled your Membership.
			</p>
			<ReasonSelection />
			<section
				css={[sectionSpacing, buttonLayoutCss, { textAlign: 'right' }]}
			>
				<Button
					priority="tertiary"
					cssOverrides={[buttonCentredCss]}
					onClick={() => navigate('..')}
				>
					Skip
				</Button>
				<Button cssOverrides={buttonCentredCss}>Submit</Button>
			</section>
		</>
	);
};
