import { css } from '@emotion/react';
import {
	brand,
	from,
	palette,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';
import {
	Stack,
	SvgClock,
	SvgEnvelope,
} from '@guardian/source-react-components';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import type { PaidSubscriptionPlan } from '../../../../shared/productResponse';
import { getMainPlan } from '../../../../shared/productResponse';
import { calculateMonthlyOrAnnualFromBillingPeriod } from '../../../../shared/productTypes';
import { sectionSpacing } from '../../../styles/spacing';
import { InverseStarIcon } from '../shared/assets/InverseStarIcon';
import { Heading } from '../shared/Heading';
import type {
	SwitchContextInterface,
	SwitchRouterState,
} from './SwitchContainer';
import { SwitchContext } from './SwitchContainer';

export const SwitchComplete = () => {
	const switchContext = useContext(SwitchContext) as SwitchContextInterface;
	const productDetail = switchContext.productDetail;
	const mainPlan = getMainPlan(
		productDetail.subscription,
	) as PaidSubscriptionPlan;

	// ToDo: hardcoding this for now; need to find out where to get this from for each currency
	const monthlyThreshold = 10;
	const annualThreshold = 95;
	const monthlyOrAnnual = calculateMonthlyOrAnnualFromBillingPeriod(
		mainPlan.billingPeriod,
	);

	const threshold =
		monthlyOrAnnual == 'Monthly' ? monthlyThreshold : annualThreshold;
	const newAmount = Math.max(threshold, mainPlan.price / 100);

	const location = useLocation();
	const routerState = location.state as SwitchRouterState;
	const amountPayableToday = routerState?.amountPayableToday;

	if (!amountPayableToday) {
		return <Navigate to="/switch" />;
	}

	return (
		<>
			<section css={sectionSpacing}>
				<Stack space={3}>
					{!switchContext.isFromApp && (
						<ThankYouMessaging
							mainPlan={mainPlan}
							newAmount={newAmount}
						/>
					)}
				</Stack>
			</section>
			<section css={sectionSpacing}>
				<WhatHappensNext
					currency={mainPlan.currency}
					amountPayableToday={amountPayableToday}
					email={switchContext.user?.email ?? ''}
				/>
			</section>
			<section css={sectionSpacing}>
				<SignInPrompt />
			</section>
		</>
	);
};

const extrasStyling = css`
	${from.tablet} {
		color: ${palette.brand['500']};

		::before {
			content: '\\a';
			white-space: pre;
		}
	}
`;

const whatHappensNextTextCss = css`
	width: 100%;
	margin-left: 0.5rem;

	p {
		${textSans.medium()}
		margin-top: 0;
		margin-bottom: ${space[2]}px;
	}
`;

const WhatHappensNext = (props: {
	currency: string;
	amountPayableToday: number;
	email: string;
}) => {
	return (
		<Stack space={4}>
			<Heading sansSerif>What happens next?</Heading>
			<div
				css={css`
					svg {
						fill: ${brand[500]};
						flex-shrink: 0;
					}
				`}
			>
				<div
					css={css`
						display: flex;
						align-items: start;
					`}
				>
					<SvgEnvelope size="medium" />
					<div css={whatHappensNextTextCss}>
						<p>
							You will receive a confirmation email to{' '}
							{props.email}
						</p>
					</div>
				</div>
				<div
					css={css`
						display: flex;
						align-items: start;
					`}
				>
					<SvgClock size="medium" />
					<div css={whatHappensNextTextCss}>
						<p>
							Your first billing date is today and you will be
							charge a reduced rate of {props.currency}
							{props.amountPayableToday}.
						</p>
					</div>
				</div>
				<div
					css={css`
						display: flex;
						align-items: start;
					`}
				>
					<InverseStarIcon size="medium" />
					<div css={whatHappensNextTextCss}>
						<p>
							Your new support will start today. It can take up to
							an hour for your support to be activated.
						</p>
					</div>
				</div>
			</div>
		</Stack>
	);
};

const ThankYouMessaging = (props: {
	mainPlan: PaidSubscriptionPlan;
	newAmount: number;
}) => {
	return (
		<>
			<Heading
				cssOverrides={css`
					${until.mobile} {
						max-width: 350px;
					}
				`}
				noDivider
			>
				Thank you for upgrading to {props.mainPlan.currency}
				{props.newAmount} per {props.mainPlan.billingPeriod}.{' '}
				<span css={extrasStyling}>Enjoy your exclusive extras.</span>
			</Heading>
		</>
	);
};

const SignInPromptBanner = () => (
	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 290 100">
		<mask
			id="sign-in-prompt-a"
			width="290"
			height="100"
			x="0"
			y="0"
			maskUnits="userSpaceOnUse"
			style={{ maskType: 'alpha' }}
		>
			<path
				fill="#D9D9D9"
				stroke="#000"
				d="M133.673.818 1.703 98.972l286.82.308-.381-98.462H133.673Z"
			/>
		</mask>
		<g mask="url(#sign-in-prompt-a)">
			<path
				fill="url(#sign-in-prompt-b)"
				d="M-5.566.621h310.769v104.921H-5.566z"
			/>
		</g>
		<path
			fill="#66ADD3"
			d="M88.918 11.674a4.406 4.406 0 0 1 4.406-4.406h105.964a4.406 4.406 0 0 1 4.406 4.406v75.121a4.406 4.406 0 0 1-4.406 4.406H93.324a4.406 4.406 0 0 1-4.406-4.406V11.674Z"
		/>
		<path
			fill="#0E2633"
			fillRule="evenodd"
			d="M199.288 9.47H93.324a2.203 2.203 0 0 0-2.203 2.204v75.121c0 1.217.986 2.203 2.203 2.203h105.964a2.203 2.203 0 0 0 2.203-2.203V11.674a2.203 2.203 0 0 0-2.203-2.203ZM93.324 7.269a4.406 4.406 0 0 0-4.406 4.406v75.121a4.406 4.406 0 0 0 4.406 4.406h105.964a4.406 4.406 0 0 0 4.406-4.406V11.674a4.406 4.406 0 0 0-4.406-4.406H93.324Z"
			clipRule="evenodd"
		/>
		<path
			fill="#0E2633"
			d="M90.473 84.96H201.6v3.068c0 .973-.789 1.762-1.763 1.762H92.235a1.762 1.762 0 0 1-1.762-1.763v-3.066ZM201.59 13.459H90.463v-3.067c0-.973.789-1.762 1.762-1.762h107.602c.974 0 1.763.789 1.763 1.762v3.067Z"
		/>
		<path fill="#046395" d="M81.809 89.797h127.174v.888H81.809v-.888Z" />
		<path
			fill="#046395"
			d="M81.809 90.629h127.167a2.49 2.49 0 0 1-2.491 2.49H84.299a2.49 2.49 0 0 1-2.49-2.49Z"
		/>
		<path
			fill="#0E2633"
			d="M136.082 88.644h20.212v1.246c0 .73-.591 1.322-1.321 1.322h-17.569c-.73 0-1.322-.592-1.322-1.322v-1.246Z"
		/>
		<mask
			id="sign-in-prompt-c"
			width="95"
			height="72"
			x="93"
			y="13"
			maskUnits="userSpaceOnUse"
			style={{ maskType: 'alpha' }}
		>
			<path fill="#F6F6F6" d="M93.445 13.416h93.878v71.448H93.445z" />
		</mask>
		<g mask="url(#sign-in-prompt-c)">
			<path
				fill="#0077B6"
				fillRule="evenodd"
				d="m184.806 37.831-4.824 5.593 13.716 27.732c-1.872 4.86-8.235 14.055-15.841 19.783l-.993-2.017-1.872-3.781-16.077-32.516-7.656.83-.828-1.677 33.47-15.802.905 1.855ZM131.285 6.12s-.127.06-.188.087c-13.876 6.552-12.772 28.578-.182 53.047 11.839 24.939 28.816 39.474 42.692 32.92.061-.026.188-.091.188-.091l.938 1.899c-20.129 11.18-56.021 9.448-70.979-21.8-15.796-30.946 5.117-59.498 26.592-67.96l.939 1.898Zm3.201-3.958c8.737-2.627 20.615-1.796 25.93.264l8.461 17.113-2.003.944-31.455-16.434-.933-1.887Z"
				clipRule="evenodd"
			/>
		</g>
		<path
			fill="#66ADD3"
			d="M184.457 24.942a3.084 3.084 0 0 1 3.084-3.085h46.06a3.084 3.084 0 0 1 3.084 3.085v64.534a3.084 3.084 0 0 1-3.084 3.084h-46.06a3.084 3.084 0 0 1-3.084-3.084V24.942Z"
		/>
		<path
			fill="#0E2633"
			fillRule="evenodd"
			d="M233.601 24.942h-46.06v64.534h46.06V24.942Zm-46.06-3.085a3.084 3.084 0 0 0-3.084 3.085v64.534a3.084 3.084 0 0 0 3.084 3.084h46.06a3.084 3.084 0 0 0 3.084-3.084V24.942a3.084 3.084 0 0 0-3.084-3.085h-46.06Z"
			clipRule="evenodd"
		/>
		<mask
			id="sign-in-prompt-d"
			width="47"
			height="52"
			x="189"
			y="31"
			maskUnits="userSpaceOnUse"
			style={{ maskType: 'alpha' }}
		>
			<rect
				width="45.822"
				height="50.669"
				x="189.289"
				y="31.68"
				fill="#F6F6F6"
				rx="8"
			/>
		</mask>
		<g mask="url(#sign-in-prompt-d)">
			<path
				fill="#0077B6"
				fillRule="evenodd"
				d="m228.886 50.857-2.035 2.36 5.786 11.7c-.789 2.05-3.474 5.93-6.683 8.346l-.419-.85-.79-1.596-6.783-13.718-3.23.35-.349-.708 14.121-6.667.382.783Zm-22.581-13.38-.079.037c-5.855 2.764-5.389 12.057-.077 22.381 4.995 10.522 12.158 16.654 18.012 13.89.026-.012.079-.04.079-.04l.396.802c-8.493 4.717-23.636 3.986-29.947-9.198-6.664-13.056 2.159-25.103 11.22-28.673l.396.801Zm1.35-1.67c3.687-1.108 8.698-.758 10.94.111l3.57 7.22-.845.399-13.271-6.934-.394-.796Z"
				clipRule="evenodd"
			/>
		</g>
		<path
			fill="#66ADD3"
			d="M73.813 24.555a3.084 3.084 0 0 1 3.083-3.084h22.03a3.084 3.084 0 0 1 3.084 3.084v50.422a3.084 3.084 0 0 1-3.084 3.084h-22.03a3.084 3.084 0 0 1-3.084-3.084V24.556Z"
		/>
		<path
			fill="#0E2633"
			fillRule="evenodd"
			d="M98.926 23.321h-22.03c-.68 0-1.233.552-1.233 1.233v50.424c0 .68.552 1.233 1.233 1.233h22.03c.681 0 1.234-.552 1.234-1.233V24.555c0-.682-.552-1.234-1.234-1.234Zm-22.03-1.85a3.084 3.084 0 0 0-3.084 3.084v50.422a3.084 3.084 0 0 0 3.084 3.084h22.03a3.084 3.084 0 0 0 3.084-3.084V24.556a3.084 3.084 0 0 0-3.084-3.084h-22.03Z"
			clipRule="evenodd"
		/>
		<path
			fill="#0E2633"
			d="M80.77 22.36H95.05v1.674c0 .68-.552 1.233-1.233 1.233H82.003a1.234 1.234 0 0 1-1.234-1.233v-1.675Z"
		/>
		<mask
			id="sign-in-prompt-e"
			width="25"
			height="41"
			x="75"
			y="29"
			maskUnits="userSpaceOnUse"
			style={{ maskType: 'alpha' }}
		>
			<rect
				width="24.087"
				height="39.388"
				x="75.867"
				y="29.914"
				fill="#F6F6F6"
				rx="8"
			/>
		</mask>
		<g mask="url(#sign-in-prompt-e)">
			<path
				fill="#0077B6"
				fillRule="evenodd"
				d="m96.24 45.133-1.055 1.225 3.003 6.072c-.41 1.064-1.803 3.078-3.469 4.332l-.217-.441-.41-.828-3.52-7.12-1.677.181-.181-.367 7.329-3.46.198.406Zm-11.719-6.944-.041.019c-3.038 1.435-2.797 6.258-.04 11.616 2.593 5.46 6.31 8.644 9.349 7.209l.04-.02.206.415c-4.408 2.448-12.267 2.07-15.542-4.773-3.46-6.777 1.12-13.029 5.823-14.882l.205.416Zm.701-.867c1.913-.575 4.514-.393 5.678.058l1.853 3.747-.439.207-6.888-3.599-.204-.413Z"
				clipRule="evenodd"
			/>
		</g>
		<defs>
			<linearGradient
				id="sign-in-prompt-b"
				x1="310.382"
				x2="145.437"
				y1="87.442"
				y2="-83.31"
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#0077B6" />
				<stop offset="1" stopColor="#7EC4EA" />
			</linearGradient>
		</defs>
	</svg>
);

const signInPromptCss = css`
	display: grid;
	background-color: ${palette.brand[500]};
	border-radius: 8px;
	${from.tablet} {
		border-radius: 0;
	}
	> * {
		grid-area: 1 / 1;
	}
	> svg {
		display: block;
		max-height: 100px;
		place-self: end;
	}
`;

const signInContainerCss = css`
	padding: ${space[3]}px;
	color: ${palette.neutral[100]};
`;

const signInHeadingCss = css`
	${textSans.medium({ fontWeight: 'bold', lineHeight: 'regular' })};
	margin: 0;
`;

const signInParaCss = css`
	${textSans.medium({ lineHeight: 'regular' })};
	margin: 0;
	max-width: 64%;
`;

const SignInPrompt = () => (
	<div css={signInPromptCss}>
		<div css={signInContainerCss}>
			<h2 css={signInHeadingCss}>Sign in on all your devices</h2>
			<p css={signInParaCss}>
				To access your extras on all your digital devices, please sign
				in. It takes less than a minute.
			</p>
		</div>
		<SignInPromptBanner />
	</div>
);
