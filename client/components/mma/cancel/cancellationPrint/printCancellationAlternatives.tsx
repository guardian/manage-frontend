import { css } from '@emotion/react';
import {
	from,
	headlineBold24,
	headlineBold28,
	palette,
	space,
	textSans15,
	textSans17,
	textSansBold15,
	textSansBold17,
	textSansBold20,
} from '@guardian/source/foundations';
import {
	Button,
	SvgArrowLeftStraight,
	SvgArrowRightStraight,
	SvgChevronLeftSingle,
} from '@guardian/source/react-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProductTypeWithCancellationFlowMandatoryReasons } from '../../../../../shared/productTypes';
import { usePrintCancellationStore } from '../../../../stores/PrintCancellationStore';
import { ProgressStepper } from '../../shared/ProgressStepper';
import { getUpdateCasePromise } from '../caseUpdate';
import { getAlternativesCopy } from './printCancellationCopy';

const getPatchUpdateCaseFunc =
	(isTestUser: boolean, caseId: string, feedback: string) => async () =>
		await getUpdateCasePromise(isTestUser, '_FEEDBACK', caseId, {
			Description: feedback,
			Subject: 'Online Cancellation Query',
		});

const printPauseBannerCss = css`
	background-color: ${palette.neutral[97]};
	display: flex;
	flex-direction: column-reverse;
	align-items: stretch;
	margin-bottom: ${space[6]}px;

	${from.tablet} {
		flex-direction: row;
		margin-bottom: ${space[10]}px;
	}
`;

const printPauseBannerContentCss = css`
	flex: 1;
	padding: ${space[3]}px;
	padding-bottom: ${space[6]}px;
`;

const printPauseBannerHeadingCss = css`
	${textSansBold20};
	margin: 0 0 ${space[1]}px;

	${from.tablet} {
		${textSansBold17};
	}
`;

const printPauseBannerBodyCss = css`
	${textSans15};
	max-width: 54ch;
	margin: 0 0 ${space[4]}px;

	${from.tablet} {
		margin: 0 0 ${space[6]}px;
		max-width: unset;
	}
`;

const printPauseBannerGraphicCss = css`
	display: flex;
	align-items: flex-end;
	justify-content: center;
	padding: ${space[3]}px ${space[3]}px ${space[3]}px;

	${from.tablet} {
		padding-top: 0;
	}

	img {
		height: auto;
		display: block;
		width: 100%;
		max-width: 237px;
		margin: auto;

		${from.tablet} {
			width: 204px;
		}
	}
`;

interface PrintCancellationAlternativesProps {
	productType: ProductTypeWithCancellationFlowMandatoryReasons;
	isTestUser: boolean;
}

const pauseTitleCss = css`
	${headlineBold24}
	margin: 0 0 ${space[5]}px;

	${from.tablet} {
		${headlineBold28}
	}
`;

const PauseCtaButtonCss = css`
	width: 100%;

	${from.tablet} {
		width: auto;
	}
`;

const contactSectionCss = css`
	margin-bottom: ${space[6]}px;
`;

const contactTitleCss = css`
	${headlineBold24}
	margin: 0 0 ${space[2]}px;

	${from.tablet} {
		${headlineBold28}
		margin: 0 0 ${space[3]}px;
	}
`;

const contactBodyCss = css`
	${textSans15};
	margin: 0 0 ${space[4]}px;

	${from.tablet} {
		${textSans17};
	}
`;

const contactDetailsCss = css`
	${textSans15};
	margin: 0;

	${from.tablet} {
		${textSans17};
	}
`;

const contactStrongCss = css`
	${textSansBold15};

	${from.tablet} {
		${textSansBold17};
	}
`;

const contactEmailLinkCss = css`
	color: ${palette.neutral[7]};
`;

const ctaContainerCss = css`
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	gap: ${space[3]}px;

	${from.tablet} {
		flex-direction: row;
	}
`;

const stepperCss = css`
	margin: ${space[2]}px 0;
	margin-bottom: ${space[8]}px;

	${from.tablet} {
		margin: ${space[10]}px 0;
	}
`;

const mobileOnlyPreviousButtonCss = css`
	margin-top: 0;
	text-decoration: none;

	${from.tablet} {
		display: none;
	}
`;

const tabletAndUpPreviousButtonCss = css`
	display: none;

	${from.tablet} {
		display: flex;
	}
`;

export const PrintCancellationAlternatives = ({
	productType,
	isTestUser,
}: PrintCancellationAlternativesProps) => {
	const navigate = useNavigate();
	const [isSubmittingFeedback, setIsSubmittingFeedback] =
		useState<boolean>(false);
	const productDetail = usePrintCancellationStore(
		(state) => state.productDetail,
	);
	const copy = getAlternativesCopy(productDetail);
	const cancellationFeedback = usePrintCancellationStore(
		(state) => state.cancellationFeedback,
	);
	const caseId = usePrintCancellationStore((state) => state.caseId);
	const pauseBannerImageSrc: { mobile: string; desktop: string } = {
		mobile: 'https://i.guim.co.uk/img/media/203dbadbd6e0fcd4eed01370f94bf3a67d747ebd/0_0_204_162/204.png?width=204&quality=100&s=e69f374f6154453c7442d39b22efcb56',
		desktop:
			'https://i.guim.co.uk/img/media/203dbadbd6e0fcd4eed01370f94bf3a67d747ebd/0_0_204_162/204.png?width=204&quality=100&s=e69f374f6154453c7442d39b22efcb56',
	};

	return (
		<>
			<Button
				priority="subdued"
				cssOverrides={mobileOnlyPreviousButtonCss}
				icon={<SvgChevronLeftSingle />}
				iconSide="left"
				onClick={() => navigate('..')}
			>
				{copy.previous}
			</Button>
			<ProgressStepper
				steps={[{}, { isCurrentStep: true }, {}]}
				additionalCSS={stepperCss}
			/>
			<h2 css={pauseTitleCss}>{copy.pauseTitle}</h2>
			<section css={printPauseBannerCss}>
				<div css={printPauseBannerContentCss}>
					<h3 css={printPauseBannerHeadingCss}>
						{copy.pauseHeading}
					</h3>
					<p css={printPauseBannerBodyCss}>{copy.pauseBody}</p>
					<Button
						priority="secondary"
						onClick={() =>
							navigate(`/suspend/${productType.urlPart}`)
						}
						cssOverrides={PauseCtaButtonCss}
					>
						{copy.pauseCta}
					</Button>
				</div>
				<picture css={printPauseBannerGraphicCss}>
					<source
						srcSet={pauseBannerImageSrc.desktop}
						media="(min-width: 740px)"
					/>
					<img src={pauseBannerImageSrc.mobile} alt="" />
				</picture>
			</section>
			<section css={contactSectionCss}>
				<h2 css={contactTitleCss}>{copy.advisorTitle}</h2>
				<p css={contactBodyCss}>{copy.advisorIntro}</p>
				<p css={contactBodyCss}>{copy.advisorBody}</p>
				<p css={contactDetailsCss}>
					<a href={copy.emailHref} css={contactEmailLinkCss}>
						<strong css={contactStrongCss}>{copy.emailCta}</strong>
					</a>
					{copy.callUs && (
						<>
							<br />
							{copy.callUs}
						</>
					)}
					{copy.chatHours && (
						<>
							<br />
							{copy.chatHours}
						</>
					)}
					{copy.chatCta && copy.chatHref && (
						<>
							<br />
							<a href={copy.chatHref} css={contactEmailLinkCss}>
								<strong css={contactStrongCss}>
									{copy.chatCta}
								</strong>
							</a>
						</>
					)}
				</p>
			</section>
			<div data-cy="cta_container" css={ctaContainerCss}>
				<Button
					priority="tertiary"
					icon={<SvgArrowLeftStraight />}
					iconSide="left"
					cssOverrides={tabletAndUpPreviousButtonCss}
					onClick={() => navigate('..')}
				>
					{copy.previous}
				</Button>
				<Button
					icon={<SvgArrowRightStraight />}
					iconSide="right"
					disabled={isSubmittingFeedback}
					onClick={async () => {
						if (cancellationFeedback.trim().length > 0 && caseId) {
							setIsSubmittingFeedback(true);
							try {
								await getPatchUpdateCaseFunc(
									isTestUser,
									caseId,
									cancellationFeedback,
								)();
							} catch {
								// Continue the journey even if feedback storage fails.
							} finally {
								setIsSubmittingFeedback(false);
							}
						}
						navigate('../confirm');
					}}
				>
					{copy.continueToCancel}
				</Button>
			</div>
		</>
	);
};
