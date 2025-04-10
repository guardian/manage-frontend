import { css } from '@emotion/react';
import {
	between,
	from,
	neutral,
	palette,
	space,
	textEgyptian17,
	textEgyptianBold17,
	textSansBold17,
	until,
} from '@guardian/source/foundations';
import { Button, LinkButton } from '@guardian/source/react-components';
import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { measure } from '@/client/styles/typography';
import type { SwitchPreviewResponse } from '@/shared/productSwitchTypes';
import { BenefitsSection } from '../../shared/benefits/BenefitsSection';
import { DownloadAppCta } from '../../shared/DownloadAppCta';
import { Heading } from '../../shared/Heading';
import type {
	CancellationContextInterface,
	CancellationPageTitleInterface,
} from '../CancellationContainer';
import {
	CancellationContext,
	CancellationPageTitleContext,
} from '../CancellationContainer';
import { getUpdateCasePromise } from '../caseUpdate';

interface RouterState extends Required<SwitchPreviewResponse> {
	caseId: string;
}

const standfirstCss = css`
	${textEgyptian17};
	color: ${palette.neutral[7]};
	margin-top: 0;
`;

const nextStepsCss = css`
	margin: ${space[4]}px 0 ${space[8]}px;
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
	${from.tablet} {
		margin: ${space[6]}px 0 ${space[8]}px;
	}
`;

const benefitsCss = css`
	display: flex;
	flex-direction: column;
	background-color: ${palette.culture[800]};
	border: 1px solid ${neutral[86]};
	overflow: hidden;
	h4 {
		${textSansBold17};
		margin: 0;
	}
	ul {
		margin-top: ${space[4]}px;
	}
	${from.tablet} {
		flex-direction: row;
		justify-content: space-between;
		border: none;
		picture {
			order: 2;
		}
	}
`;

const pictureAlignmentCss = css`
	display: flex;
	justify-content: center;
	align-items: flex-end;
	${between.tablet.and.desktop} {
		transform: scale(125%) translate(8%, -6%);
	}
	${from.desktop} {
		transform: scale(150%) translate(8%, 15%);
	}
	${until.tablet} {
		border-bottom: 1px solid ${neutral[86]};
	}
	${between.desktop.and.leftCol} {
		align-items: center;
	}
	${from.leftCol} {
		max-width: 361px;
	}
`;

const benefitsLeftSideCss = css`
	${from.tablet} {
		padding: ${space[6]}px;
	}
	${between.tablet.and.desktop} {
		min-width: 408px;
	}
`;

const benefitsWhiteContainerCss = css`
	background-color: ${neutral[100]};
	padding: ${space[3]}px;
	${from.tablet} {
		padding: ${space[5]}px;
		border-radius: ${space[2]}px;
		max-width: 360px;
	}
`;

const appAdCss = css`
	margin-top: ${space[5]}px;
	${from.tablet} {
		margin-top: ${space[6]}px;
	}
`;

const dontForgetCss = css`
	${textEgyptian17};
	padding-top: ${space[5]}px;
	margin-top: ${space[6]}px;
	border-top: 1px solid ${palette.neutral[86]};
`;

const onwardJourneyBtnsContainerCss = css`
	display: flex;
	flex-direction: column;
	gap: ${space[5]}px;
	margin-top: ${space[9]}px;
	dontForgetCss${from.phablet} {
		flex-direction: row;
		gap: ${space[4]}px;
	}
`;

const buttonCentredCss = css`
	width: 100%;
	justify-content: center;
	margin: 0;
	${from.tablet} {
		width: fit-content;
	}
`;

const updateSalesforceCase = async (
	isTestUser: boolean,
	caseId: string,
	loggingCodeSuffix: string,
	description: string,
	subject: string,
) => {
	await getUpdateCasePromise(isTestUser, loggingCodeSuffix, caseId, {
		Description: description,
		Subject: subject,
	});
};

export const CancelSwitchConfirmed = () => {
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

	const sfCaseDebugSuffix = '_SWITCH_OFFER';
	const sfCaseDescription = 'User took switch discount instead of cancelling';
	const sfCaseSubject = `Online Cancellation Save Switch Discount - ${routerState.discount?.upToPeriods} ${routerState.discount?.upToPeriodsType}`;

	useEffect(() => {
		pageTitleContext.setPageTitle('Confirmation');
		updateSalesforceCase(
			productDetail.isTestUser,
			routerState.caseId,
			sfCaseDebugSuffix,
			sfCaseDescription,
			sfCaseSubject,
		);
	}, [
		pageTitleContext,
		productDetail.isTestUser,
		routerState.caseId,
		sfCaseDebugSuffix,
		sfCaseDescription,
		sfCaseSubject,
	]);

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
						Your existing support has been cancelled and you’re now
						a digital subscriber
					</li>
					<li>
						You will start enjoying all the benefits of your
						All-access digital subscription
					</li>
				</ul>
			</div>
			<div css={benefitsCss}>
				<picture css={pictureAlignmentCss}>
					<source
						srcSet={
							'https://i.guim.co.uk/img/media/02c17de8ea17126fbd87f6567ce5cd80f128546d/0_0_2212_1869/2000.png?width=1000&quality=75&s=492edad637979aa4e57e957cb12cd4f1'
						}
						media="(min-width: 740px)"
					/>
					<img src="https://media.guim.co.uk/63d17ee19313703129fbbeacceaafcd6d1cc1014/0_0_1404_716/500.png" />
				</picture>
				<div css={benefitsLeftSideCss}>
					<div css={benefitsWhiteContainerCss}>
						<h4>Enjoy your exclusive benefits:</h4>
						<BenefitsSection
							small
							benefits={[
								{
									description:
										'Unlimited access to the Guardian app',
								},
								{
									description:
										'Unlimited access to the Guardian Feast app',
								},
								{
									description:
										'Ad-free reading across all your devices',
								},
								{
									description:
										'Exclusive supporter newsletter',
								},
								{
									description:
										"Far fewer asks for support when you're signed in",
								},
							]}
						/>
					</div>
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
