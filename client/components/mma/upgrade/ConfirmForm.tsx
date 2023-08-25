import { css } from '@emotion/react';
import { from, palette, space, textSans } from '@guardian/source-foundations';
import {
	Button,
	Stack,
	SvgClock,
	SvgCreditCard,
	SvgReload,
} from '@guardian/source-react-components';
import type { Dispatch, SetStateAction } from 'react';
import { useContext, useState } from 'react';
import type { Subscription } from '../../../../shared/productResponse';
import { contributionPaidByCard } from '../../../fixtures/productBuilder/testProducts';
import { Heading } from '../shared/Heading';
import { PaymentDetails } from '../shared/PaymentDetails';
import { SupporterPlusTsAndCs } from '../shared/SupporterPlusTsAndCs';
import type { UpgradeSupportInterface } from './UpgradeSupportContainer';
import { UpgradeSupportContext } from './UpgradeSupportContainer';

const iconListCss = css`
	${textSans.medium()};
	list-style: none;
	padding: 0;
	margin-bottom: 0;

	li + li {
		margin-top: ${space[2]}px;
		${from.tablet} {
			margin-top: ${space[3]}px;
		}
	}

	li {
		display: flex;
		margin-left: -4px;
		align-items: flex-start;

		> svg {
			flex-shrink: 0;
			margin-right: 8px;
			fill: currentColor;
		}
	}
`;

const listWithDividersCss = css`
	li + li {
		> svg {
			padding-top: ${space[2]}px;
			${from.tablet} {
				padding-top: ${space[3]}px;
			}
		}
		> span {
			flex-grow: 1;
			padding-top: ${space[2]}px;
			border-top: 1px solid ${palette.neutral[86]};
			min-width: 0;
			${from.tablet} {
				padding-top: ${space[3]}px;
			}
		}
	}
`;

const WhatHappensNext = (props: {
	contributionPriceDisplay: string;
	subscription: Subscription;
}) => {
	return (
		<section>
			<Stack space={4}>
				<Heading sansSerif>What happens next?</Heading>
				<ul css={[iconListCss, listWithDividersCss]}>
					<li>
						<SvgClock size="medium" />
						<span>
							<strong>Price change will happen today</strong>
							<br />
							You can start enjoying your exclusive extras
							straight away
						</span>
					</li>
					<li>
						<SvgReload size="medium" />
						<span>
							<strong>Your first payment will be just £x</strong>
							<br />
							We will charge you...
						</span>
					</li>
					<li>
						<SvgCreditCard size="medium" />
						<span data-qm-masking="blocklist">
							<strong>Your payment method</strong>
							<br />
							The payment will be taken from{' '}
							<PaymentDetails subscription={props.subscription} />
						</span>
					</li>
				</ul>
			</Stack>
		</section>
	);
};

const RoundUp = ({
	setChosenAmount,
	chosenAmountPreRoundup,
}: {
	setChosenAmount: Dispatch<SetStateAction<number>>;
	chosenAmountPreRoundup: number;
}) => {
	const [hasRoundedUp, setHasRoundedUp] = useState<boolean>(false);

	return (
		<Stack space={2}>
			<p>Want to unlock all extras?</p>
			<section>
				<Button
					onClick={() => {
						const toggleRoundUp = !hasRoundedUp;
						setHasRoundedUp(toggleRoundUp);
						setChosenAmount(
							toggleRoundUp ? 10 : chosenAmountPreRoundup,
						);
					}}
				>
					{hasRoundedUp ? 'Rounded up' : 'Round up'}
				</Button>
			</section>
		</Stack>
	);
};

interface ConfirmFormProps {
	chosenAmount: number;
	setChosenAmount: Dispatch<SetStateAction<number>>;
	threshold: number;
}

export const ConfirmForm = ({
	chosenAmount,
	setChosenAmount,
	threshold,
}: ConfirmFormProps) => {
	const { mainPlan } = useContext(
		UpgradeSupportContext,
	) as UpgradeSupportInterface;

	const aboveThreshold = chosenAmount >= threshold;
	const [shouldShowRoundUp] = useState<boolean>(!aboveThreshold);
	const [chosenAmountPreRoundup] = useState<number>(chosenAmount);

	return (
		<Stack space={2}>
			<Heading>2. Confirm change</Heading>
			{shouldShowRoundUp && (
				<RoundUp
					setChosenAmount={setChosenAmount}
					chosenAmountPreRoundup={chosenAmountPreRoundup}
				/>
			)}
			{aboveThreshold && (
				<WhatHappensNext
					contributionPriceDisplay=""
					subscription={contributionPaidByCard().subscription}
				/>
			)}
			<section>
				<Button>Confirm support change</Button>
			</section>
			{aboveThreshold && (
				<section>
					<SupporterPlusTsAndCs
						currencyISO={mainPlan.currencyISO}
						billingPeriod={mainPlan.billingPeriod}
					/>{' '}
				</section>
			)}
		</Stack>
	);
};
