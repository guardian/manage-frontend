import { css } from '@emotion/react';
import { space, textSans } from '@guardian/source-foundations';
import { Link } from 'react-router-dom';
import { calculateMonthlyOrAnnualFromBillingPeriod } from '../../../../shared/productTypes';
import {
	convertCurrencyToSymbol,
	isCurrencyIso,
} from '../../../utilities/currencyIso';
import { getBenefitsThreshold } from '../../../utilities/supporterPlusPricing';
import { formatAmount } from '../../../utilities/utils';

const smallPrintCss = css`
	${textSans.xxsmall()};
	margin-top: 0;
	margin-bottom: 0;
	color: #606060;
	> a {
		color: inherit;
		text-decoration: underline;
	}
	& + & {
		margin-top: ${space[1]}px;
	}
`;

export const SupporterPlusTsAndCs = ({
	currencyISO,
	billingPeriod,
}: {
	currencyISO: string;
	billingPeriod: string;
}) => {
	if (!isCurrencyIso(currencyISO)) {
		throw new Error('Invalid currency');
	}

	const currencySymbol = convertCurrencyToSymbol(currencyISO);
	const monthlyOrAnnual =
		calculateMonthlyOrAnnualFromBillingPeriod(billingPeriod);
	const monthlyThreshold = getBenefitsThreshold(currencyISO, 'month');
	const annualThreshold = getBenefitsThreshold(currencyISO, 'year');

	return (
		<>
			<p css={smallPrintCss}>
				If you pay at least {currencySymbol}
				{formatAmount(monthlyThreshold)} per month or {currencySymbol}
				{formatAmount(annualThreshold)} per year, you will receive the
				Supporter Plus benefits on a subscription basis. If you pay more
				than {currencySymbol}
				{formatAmount(
					monthlyOrAnnual === 'Annual'
						? annualThreshold
						: monthlyThreshold,
				)}{' '}
				per {billingPeriod}, these additional amounts will be separate{' '}
				{monthlyOrAnnual.toLowerCase()} voluntary financial
				contributions to the Guardian. The Supporter Plus subscription
				and any contributions will auto-renew each {billingPeriod}. You
				will be charged the subscription and contribution amounts using
				your chosen payment method at each renewal unless you cancel.
				You can cancel your subscription or change your contributions at
				any time before your next renewal date. If you cancel within 14
				days of taking out a Supporter Plus subscription, you’ll receive
				a full refund (including of any contributions) and your
				subscription and any contribution will stop immediately.
				Cancellation of your subscription (which will also cancel any
				contribution) or cancellation of your contribution made after 14
				days will take effect at the end of your current{' '}
				{monthlyOrAnnual.toLowerCase()} payment period. To cancel,{' '}
				<Link to="/recurringsupport">go to Manage My Account</Link> or{' '}
				<a href="https://www.theguardian.com/info/2022/oct/28/the-guardian-supporter-plus-terms-and-conditions">
					see our Terms
				</a>
				.
			</p>
			<p css={smallPrintCss}>
				By proceeding, you are agreeing to our{' '}
				<a href="https://www.theguardian.com/info/2022/oct/28/the-guardian-supporter-plus-terms-and-conditions">
					Terms and Conditions
				</a>
				.
			</p>
			<p css={smallPrintCss}>
				To find out what personal data we collect and how we use it,
				please visit our{' '}
				<a href="https://www.theguardian.com/help/privacy-policy">
					Privacy Policy
				</a>
				.
			</p>
		</>
	);
};
