import { css } from '@emotion/react';
import {
	from,
	space,
	textSansBold15,
	textSansBold17,
} from '@guardian/source/foundations';
import {
	Button,
	SvgClockFilled,
	SvgEnvelope,
	SvgStar,
} from '@guardian/source/react-components';
import { useNavigate } from 'react-router-dom';
import { useAccountStore } from '@/client/stores/AccountStore';
import { useUpgradeProductStore } from '@/client/stores/UpgradeProductStore';
import {
	subHeadingCss,
	subHeadingInformationTextCss,
	subHeadingWithInformationCss,
} from '@/client/styles/headings';
import { trackEvent } from '@/client/utilities/analytics';
import { getThankYouPaymentConditionsText } from '@/client/utilities/upgradeProductPaymentCopy';
import { dateString } from '@/shared/dates';
import {
	signInContentContainerCss,
	signInCss,
	signInHeadingCss,
	signInParaCss,
} from '../../shared/SignIn';
import { SwitchSignInImage } from '../switch/complete/SwitchSignInImage';
import {
	actionButtonsContainerCss,
	whatHappensNowItemCss,
	whatHappensNowItemInfoCss,
	whatHappensNowItemInformationBorderCss,
	whatHappensNowItemInformationTextCss,
} from './UpgradeProductContainer';

const whatHappensNowItemInformationBoldTextCss = css`
	${textSansBold15};

	${from.tablet} {
		${textSansBold17};
	}
`;

export const UpgradeProductThankYou = () => {
	const navigate = useNavigate();

	const {
		mainPlan,
		specificProductType,
		subscription,
		previewResponse,
		isDiscountedOffer,
	} = useUpgradeProductStore();
	const { getUser } = useAccountStore();
	const user = getUser();

	if (
		!mainPlan ||
		!specificProductType ||
		!subscription ||
		!previewResponse
	) {
		return null;
	}

	const nextPaymentDateLong = dateString(
		new Date(previewResponse.nextPaymentDate),
		'MMMM do',
	);
	const nextPaymentDateDay = dateString(
		new Date(previewResponse.nextPaymentDate),
		'do',
	);

	const paymentConditionsText = getThankYouPaymentConditionsText({
		preview: previewResponse,
		isDiscountedOffer,
		currency: mainPlan.currency,
		billingPeriod: mainPlan.billingPeriod,
		nextPaymentDateLong,
	});

	return (
		<>
			<h2 css={subHeadingWithInformationCss}>Thank you</h2>
			<p css={subHeadingInformationTextCss}>
				You have successfully upgraded to a Digital plus subscription.
				You can start to enjoy your new rewards immediately.
			</p>

			<h2 css={subHeadingCss}>What happens next?</h2>
			<div css={whatHappensNowItemCss}>
				<SvgEnvelope size="medium" />
				<div css={whatHappensNowItemInfoCss}>
					<p
						css={[
							whatHappensNowItemInformationTextCss,
							whatHappensNowItemInformationBorderCss,
						]}
					>
						<b css={whatHappensNowItemInformationBoldTextCss}>
							You will receive a confirmation email
						</b>{' '}
						to {user?.email ?? 'your registered email address'}
					</p>
				</div>
			</div>

			<div css={whatHappensNowItemCss}>
				<SvgClockFilled size="medium" />
				<div css={whatHappensNowItemInfoCss}>
					<p
						css={[
							whatHappensNowItemInformationTextCss,
							whatHappensNowItemInformationBorderCss,
						]}
					>
						<b css={whatHappensNowItemInformationBoldTextCss}>
							{isDiscountedOffer
								? `Your new payment date will be the ${nextPaymentDateDay}.`
								: 'Your first payment will be today.'}
						</b>{' '}
						{paymentConditionsText}
					</p>
				</div>
			</div>

			<div css={whatHappensNowItemCss}>
				<SvgStar size="medium" />
				<div css={whatHappensNowItemInfoCss}>
					<p css={whatHappensNowItemInformationTextCss}>
						<b css={whatHappensNowItemInformationBoldTextCss}>
							Your new support plan starts today.
						</b>{' '}
						You can start to enjoy your new rewards immediately.
					</p>
				</div>
			</div>

			<div css={signInCss}>
				<SwitchSignInImage />
				<div css={signInContentContainerCss}>
					<h2 css={signInHeadingCss}>Sign in on all your devices</h2>
					<p css={signInParaCss}>
						To access your extras on all your digital devices,
						please sign in. It takes less than a minute.
					</p>
				</div>
			</div>

			<div
				css={[
					actionButtonsContainerCss,
					css`
						margin-top: 0px;

						${from.tablet} {
							margin-top: 0px;
						}
					`,
				]}
			>
				<Button
					aria-label={`Product Card Digital Plus Upsell Button`}
					data-cy={`digital-plus-upsell-button`}
					size="small"
					priority="primary"
					cssOverrides={css`
						justify-content: center;
						margin-top: ${space[4]}px;

						${from.tablet} {
							margin-top: ${space[6]}px;
						}
					`}
					onClick={() => {
						trackEvent({
							eventCategory: 'account_overview',
							eventAction: 'click',
							eventLabel: `https://www.theguardian.com/`,
						});
						navigate(`href="https://www.theguardian.com/`);
					}}
				>
					{`Continue reading the Guardian`}
				</Button>
			</div>
		</>
	);
};
