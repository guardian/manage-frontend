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
} from '@guardian/source/react-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProductTypeWithCancellationFlowMandatoryReasons } from '../../../../../shared/productTypes';
import { usePrintCancellationStore } from '../../../../stores/PrintCancellationStore';
import { getUpdateCasePromise } from '../caseUpdate';

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

export const PrintCancellationAlternatives = ({
	productType,
	isTestUser,
}: PrintCancellationAlternativesProps) => {
	const navigate = useNavigate();
	const [isSubmittingFeedback, setIsSubmittingFeedback] =
		useState<boolean>(false);
	const { setEligibleForFreePeriodOffer, cancellationFeedback, caseId } =
		usePrintCancellationStore();
	const pauseBannerImageSrc: { mobile: string; desktop: string } = {
		mobile: 'https://i.guim.co.uk/img/media/203dbadbd6e0fcd4eed01370f94bf3a67d747ebd/0_0_204_162/204.png?width=204&quality=100&s=e69f374f6154453c7442d39b22efcb56',
		desktop:
			'https://i.guim.co.uk/img/media/203dbadbd6e0fcd4eed01370f94bf3a67d747ebd/0_0_204_162/204.png?width=204&quality=100&s=e69f374f6154453c7442d39b22efcb56',
	};

	return (
		<>
			<h2
				css={css`
					${headlineBold24}
					margin: 0 0 ${space[5]}px;

					${from.tablet} {
						${headlineBold28}
					}
				`}
			>
				Pause your subscription
			</h2>
			<section css={printPauseBannerCss}>
				<div css={printPauseBannerContentCss}>
					<h3 css={printPauseBannerHeadingCss}>
						Do you need a break?
					</h3>
					<p css={printPauseBannerBodyCss}>
						Put your print deliveries on hold for up to five weeks
						and we will apply a credit for the suspended issues to
						your next bill date. If you have digital benefits you
						will still receive and be charged for those during this
						time.
					</p>
					<Button
						priority="secondary"
						onClick={() =>
							navigate(`/suspend/${productType.urlPart}`)
						}
						cssOverrides={css`
							width: 100%;

							${from.tablet} {
								width: auto;
							}
						`}
					>
						Pause subscription
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
			<section
				css={css`
					margin-bottom: ${space[6]}px;
				`}
			>
				<h2
					css={css`
						${headlineBold24}
						margin: 0 0 ${space[2]}px;

						${from.tablet} {
							${headlineBold28}
							margin: 0 0 ${space[3]}px;
						}
					`}
				>
					Speak with an advisor
				</h2>
				<p
					css={css`
						${textSans15};
						margin: 0 0 ${space[4]}px;

						${from.tablet} {
							${textSans17};
						}
					`}
				>
					Get in touch with our customer care team if you require any
					assistance or simply wish to discuss other subscription
					options.
				</p>
				<p
					css={css`
						${textSans15};
						margin: 0;

						${from.tablet} {
							${textSans17};
						}
					`}
				>
					Email{' '}
					<strong
						css={css`
							${textSansBold15};

							${from.tablet} {
								${textSansBold17};
							}
						`}
					>
						<a
							href="mailto:customer.help@theguardian.com"
							css={css`
								color: ${palette.neutral[7]};
							`}
						>
							customer.help@theguardian.com
						</a>
					</strong>
					<br />
					Call us at{' '}
					<strong
						css={css`
							${textSansBold15};

							${from.tablet} {
								${textSansBold17};
							}
						`}
					>
						+44 (0) 330 333 6767
					</strong>{' '}
					9am to 6pm, Monday to Sunday
				</p>
			</section>
			<div
				data-cy="cta_container"
				css={{
					display: 'flex',
					justifyContent: 'space-between',
					flexDirection: 'column',
					gap: `${space[3]}px`,

					[from.tablet]: {
						flexDirection: 'row',
					},
				}}
			>
				<Button
					priority="tertiary"
					icon={<SvgArrowLeftStraight />}
					iconSide="left"
					onClick={() => navigate('..')}
				>
					Previous
				</Button>
				<Button
					icon={<SvgArrowRightStraight />}
					iconSide="right"
					disabled={isSubmittingFeedback}
					onClick={async () => {
						setEligibleForFreePeriodOffer(false);
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
					Continue to cancel
				</Button>
			</div>
		</>
	);
};
