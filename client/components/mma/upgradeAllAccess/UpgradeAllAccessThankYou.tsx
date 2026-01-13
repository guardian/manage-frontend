import { css } from '@emotion/react';
import {
	from,
	space,
	textSansBold15,
	textSansBold17,
} from '@guardian/source/foundations';
import {
	Button,
	SvgClock,
	SvgEnvelope,
	SvgStar,
} from '@guardian/source/react-components';
import { useNavigate } from 'react-router-dom';
import { useUpgradeAllAccessStore } from '@/client/stores/UpgradeAllAccessStore';
import {
	subHeadingCss,
	subHeadingInformationTextCss,
	subHeadingWithInformationCss,
} from '@/client/styles/headings';
import { trackEvent } from '@/client/utilities/analytics';
import { DevicesSignInBanner } from '../shared/DevicesSignInBanner.tsx';
import {
	actionButtonsContainerCss,
	whatHappensNowItemCss,
	whatHappensNowItemInfoCss,
	whatHappensNowItemInformationBorderCss,
	whatHappensNowItemInformationTextCss,
} from './UpgradeAllAccessContainer';

const whatHappensNowItemInformationBoldTextCss = css`
	${textSansBold15};

	${from.tablet} {
		${textSansBold17};
	}
`;

export const UpgradeAllAccessThankYou = () => {
	const navigate = useNavigate();

	const { mainPlan, specificProductType } = useUpgradeAllAccessStore();

	if (!mainPlan || !specificProductType) {
		return null;
	}

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
						to EMAIL@gmail.com
					</p>
				</div>
			</div>

			<div css={whatHappensNowItemCss}>
				<SvgClock size="medium" />
				<div css={whatHappensNowItemInfoCss}>
					<p
						css={[
							whatHappensNowItemInformationTextCss,
							whatHappensNowItemInformationBorderCss,
						]}
					>
						<b css={whatHappensNowItemInformationBoldTextCss}>
							Your first payment will be DATE.
						</b>{' '}
						You will be charged £X. From DAY MONTH, your ongoing
						monthly payment will be £X
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
						It may take up to an hour for your full app access to
						become available
					</p>
				</div>
			</div>

			<DevicesSignInBanner />

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
							eventLabel: `/`,
						});
						navigate(`/`);
					}}
				>
					{`Continue reading the Guardian`}
				</Button>
			</div>
		</>
	);
};
