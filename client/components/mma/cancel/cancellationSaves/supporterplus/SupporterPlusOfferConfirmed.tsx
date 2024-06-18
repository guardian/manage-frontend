import { css } from '@emotion/react';
import {
	between,
	from,
	palette,
	space,
	textEgyptian17,
	textEgyptianBold17,
	textSansBold17,
} from '@guardian/source/foundations';
import { Button, LinkButton } from '@guardian/source/react-components';
import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { measure } from '@/client/styles/typography';
import type { DiscountPreviewResponse } from '@/client/utilities/discountPreview';
import { DATE_FNS_LONG_OUTPUT_FORMAT, parseDate } from '@/shared/dates';
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
import { getUpdateCasePromise } from '../../caseUpdate';

interface RouterState extends DiscountPreviewResponse {
	caseId: string;
}

const standfirstCss = css`
	${textEgyptian17};
	color: ${palette.neutral[7]};
	margin-top: 0;
`;

const nextStepsCss = css`
	border-top: 1px solid ${palette.neutral[86]};
	border-bottom: 1px solid ${palette.neutral[86]};
	padding: ${space[5]}px 0 ${space[6]}px;
	margin: ${space[5]}px 0 ${space[6]}px;
	h4 {
		${textEgyptianBold17};
		margin: 0;
	}
	ul {
		${textEgyptian17};
		padding: 0;
		padding-inline-start: 14px;
		margin: ${space[3]}px 0 0;
		line-height: 1.8rem;
	}
	${from.desktop} {
		padding-bottom: ${space[8]}px;
		margin-bottom: ${space[8]}px;
	}
`;

const benefitsCss = css`
	display: flex;
	flex-direction: column;
	background-color: ${palette.culture[800]};
	padding: ${space[1]}px ${space[3]}px ${space[3]}px;
	h4 {
		${textSansBold17};
		margin: 0;
	}
	ul {
		padding: 0;
		padding-inline-start: 14px;
		margin: ${space[3]}px 0 0;
		line-height: 1.8rem;
	}
	${from.desktop} {
		flex-direction: row;
		justify-content: space-between;
		padding: 0;
		picture {
			order: 2;
		}
	}
`;

const pictureAlignmentCss = css`
	display: flex;
	justify-content: center;
	align-items: flex-end;
	${between.desktop.and.leftCol} {
		align-items: center;
	}
	${from.leftCol} {
		max-width: 361px;
	}
`;

const benefitsLeftSideCss = css`
	${from.desktop} {
		padding: ${space[6]}px;
	}
`;

const mobileHeroHRCss = css`
	height: 1px;
	width: calc(100% - 40px);
	background-color: ${palette.neutral[60]};
	margin: 0 auto ${space[3]}px;
	${from.desktop} {
		display: none;
	}
`;

const appAdCss = css`
	margin-top: ${space[5]}px;
	${from.desktop} {
		margin-top: ${space[6]}px;
	}
`;

const dontForgetCss = css`
	${textEgyptian17};
	margin: ${space[6]}px 0 0;
	padding-top: ${space[5]}px;
	border-top: 1px solid ${palette.neutral[86]};
	${from.desktop} {
		margin-top: ${space[8]}px;
		padding-top: ${space[6]}px;
	}
`;

const onwardJourneyBtnsContainerCss = css`
	display: flex;
	flex-direction: column;
	gap: ${space[5]}px;
	margin-top: ${space[8]}px;
	${from.phablet} {
		flex-direction: row;
		gap: ${space[4]}px;
	}
`;

const buttonCentredCss = css`
	width: 100%;
	justify-content: center;
	margin: 0;
	${from.desktop} {
		width: fit-content;
	}
`;

const updateSalesforceCase = async (isTestUser: boolean, caseId: string) => {
	await getUpdateCasePromise(isTestUser, '_OFFER', caseId, {
		Description: 'User took offer instead of cancelling',
		Subject: 'Cancellation Save Discount - Free for 2 months',
	});
};

export const SupporterPlusOfferConfirmed = () => {
	const location = useLocation();
	const routerState = location.state as RouterState;
	const navigate = useNavigate();

	const pageTitleContext = useContext(
		CancellationPageTitleContext,
	) as CancellationPageTitleInterface;

	const cancellationContext = useContext(
		CancellationContext,
	) as CancellationContextInterface;

	const productDetail = cancellationContext.productDetail;

	useEffect(() => {
		pageTitleContext.setPageTitle('Confirmation');
		updateSalesforceCase(productDetail.isTestUser, routerState.caseId);
	}, []);

	const nextNonDiscountedPaymentDate = parseDate(
		routerState.nextNonDiscountedPaymentDate,
		'yyyy-MM-dd',
	).dateStr(DATE_FNS_LONG_OUTPUT_FORMAT);

	return (
		<>
			<Heading
				borderless
				cssOverrides={[
					measure.heading,
					css`
						margin: ${space[8]}px 0 ${space[2]}px;
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
					<li>
						You will not be billed until{' '}
						{nextNonDiscountedPaymentDate}
					</li>
				</ul>
			</div>
			<div css={benefitsCss}>
				<picture css={pictureAlignmentCss}>
					<source
						srcSet="https://media.guim.co.uk/4642d75e4282cf62980b6aa60eb5f710a6795e82/0_0_1444_872/1000.png"
						media="(min-width: 1140px)"
					/>
					<source
						srcSet="https://media.guim.co.uk/7a20e5ce7fd500ec7bac3ec372d7d1e041f5bfe5/0_0_1252_1100/500.png"
						media="(min-width: 980px) and (max-width: 1139px)"
					/>
					<img src="https://media.guim.co.uk/63d17ee19313703129fbbeacceaafcd6d1cc1014/0_0_1404_716/500.png" />
				</picture>
				<div css={mobileHeroHRCss}></div>
				<div css={benefitsLeftSideCss}>
					<h4>With your offer, you will continue to enjoy:</h4>
					<ul>
						<li>Unlimited access to the Guardian app</li>
						<li>Ad-free reading across all your devices</li>
						<li>Exclusive supporter newsletter</li>
						<li>
							Far fewer asks for support when you're signed in
						</li>
					</ul>
				</div>
			</div>
			<DownloadAppCta additionalCss={appAdCss} />
			<p css={dontForgetCss}>
				Don't forget to sign in on all your devices to enjoy your
				benefits.
			</p>
			<div css={onwardJourneyBtnsContainerCss}>
				<LinkButton
					href="https://theguardian.com"
					priority="primary"
					cssOverrides={buttonCentredCss}
				>
					Continue reading the Guardian
				</LinkButton>
				<Button
					cssOverrides={buttonCentredCss}
					priority="tertiary"
					onClick={() => navigate('/')}
				>
					Return to your account
				</Button>
			</div>
		</>
	);
};
