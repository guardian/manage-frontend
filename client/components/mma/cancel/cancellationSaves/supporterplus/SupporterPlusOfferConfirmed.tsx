import { css } from '@emotion/react';
import {
	palette,
	space,
	textEgyptian17,
	textSans17,
	textSansBold17,
} from '@guardian/source/foundations';
import { Button, LinkButton } from '@guardian/source/react-components';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { measure } from '@/client/styles/typography';
import { fetchWithDefaultParameters } from '@/client/utilities/fetch';
import { TickInCircle } from '../../../shared/assets/TickInCircle';
import { DownloadAppCta } from '../../../shared/DownloadAppCta';
import { Heading } from '../../../shared/Heading';
import type {
	CancellationContextInterface,
	CancellationPageTitleInterface,
} from '../../CancellationContainer';
import {
	CancellationContext,
	CancellationPageTitleContext,
} from '../../CancellationContainer';

type PerformingDiscountStatus = 'pending' | 'success' | 'failed';

export const SupporterPlusOfferConfirmed = () => {
	const { productDetail } = useContext(
		CancellationContext,
	) as CancellationContextInterface;

	const pageTitleContext = useContext(
		CancellationPageTitleContext,
	) as CancellationPageTitleInterface;

	const [performingDiscountStatus, setPerformingDiscountStatus] =
		useState<PerformingDiscountStatus>('pending');

	useEffect(() => {
		(async () => {
			try {
				const response = await fetchWithDefaultParameters(
					'/api/discounts/apply-discount',
					{
						method: 'POST',
						body: JSON.stringify({
							subscriptionNumber:
								productDetail.subscription.subscriptionId,
						}),
					},
				);

				if (response.ok) {
					setPerformingDiscountStatus('success');
				} else {
					setPerformingDiscountStatus('failed');
				}
			} catch (e) {
				setPerformingDiscountStatus('failed');
			}
		})();
		pageTitleContext.setPageTitle('Confirmation');
	}, []);

	return (
		<>
			{performingDiscountStatus === 'pending' && <PendingState />}
			{performingDiscountStatus === 'success' && <SuccessState />}
			{performingDiscountStatus === 'failed' && <FailureState />}
		</>
	);
};

const BenefitListItem = ({ copy }: { copy: string }) => {
	const liCss = css`
		position: relative;
		padding-left: ${space[6]}px;
	`;

	const tickCss = css`
		position: absolute;
		top: 6px;
		left: 0;
		width: 13px;
		height: 13px;
	`;

	return (
		<li css={liCss}>
			<TickInCircle fill={palette.brand[400]} additionalCss={tickCss} />
			{copy}
		</li>
	);
};

const PendingState = () => {
	return <span>Arranging your offer...</span>;
};

const SuccessState = () => {
	const navigate = useNavigate();

	const standfirstCss = css`
		${textEgyptian17};
		color: ${palette.neutral[20]};
	`;

	const nextStepsCss = css`
		border-top: 1px solid ${palette.neutral[73]};
		border-bottom: 1px solid ${palette.neutral[73]};
		padding: ${space[5]}px 0;
		margin: ${space[5]}px 0;
		h4 {
			${textSansBold17};
			margin: 0;
		}
		ul {
			padding: 0;
			list-style-position: inside;
			margin: ${space[3]}px 0 0;
		}
	`;

	const benefitsCss = css`
		h4 {
			${textSansBold17};
			margin: 0;
		}
		ul {
			padding: 0;
			list-style: none;
			margin: ${space[3]}px 0 0;
			li + li {
				margin-top: ${space[1]}px;
			}
		}
	`;

	const appAdCss = css`
		margin-top: ${space[10]}px;
	`;

	const dontForgetCss = css`
		${textSans17};
		margin: ${space[6]}px 0 0;
	`;

	const buttonCentredCss = css`
		width: 100%;
		justify-content: center;
	`;

	return (
		<>
			<Heading
				borderless
				cssOverrides={[
					measure.heading,
					css`
						margin: ${space[8]}px 0 ${space[6]}px;
					`,
				]}
			>
				Thank you for choosing to stay with us
			</Heading>
			<h3 css={standfirstCss}>
				Your valued support powers independent journalism.
			</h3>
			<div css={nextStepsCss}>
				<h4>What happens next?</h4>
				<ul>
					<li>
						You will receive an email confirming the details of your
						offer
					</li>
					<li>
						You will continue enjoying all the benefits of your
						All-access digital subscription – for free
					</li>
					<li>You will not be billed until [DATE]</li>
				</ul>
			</div>
			<div css={benefitsCss}>
				<h4>With your offer, you will continue to enjoy</h4>
				<ul>
					<BenefitListItem copy="Unlimited access to the Guardian app" />
					<BenefitListItem copy="Ad-free reading across all your devices" />
					<BenefitListItem copy="Exclusive supporter newsletter" />
					<BenefitListItem copy="Far fewer asks for support when you're signed in" />
				</ul>
			</div>
			<DownloadAppCta additionalCss={appAdCss} />
			<p css={dontForgetCss}>
				Don’t forget to sign in on all your devices to enjoy your
				benefits.
			</p>
			<LinkButton
				href="https://theguardian.com"
				priority="primary"
				cssOverrides={[
					buttonCentredCss,
					css`
						margin-top: ${space[6]}px;
					`,
				]}
			>
				Continue reading the Guardian
			</LinkButton>
			<Button
				cssOverrides={[
					buttonCentredCss,
					css`
						margin-top: ${space[4]}px;
					`,
				]}
				priority="tertiary"
				onClick={() => navigate('/')}
			>
				Return to your account
			</Button>
		</>
	);
};

const FailureState = () => {
	return <span>uh ohh</span>;
};
