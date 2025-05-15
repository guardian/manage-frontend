import { css } from '@emotion/react';
import {
	from,
	neutral,
	palette,
	space,
	textEgyptian17,
	textSans15,
	textSans17,
	textSansBold20,
} from '@guardian/source/foundations';
import { Button } from '@guardian/source/react-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { measure } from '@/client/styles/typography';
import type { DeliveryRecordDetail } from '../../delivery/records/deliveryRecordsApi';
import type { OutstandingHolidayStop } from '../../holiday/HolidayStopApi';
import { Heading } from '../../shared/Heading';
import { ProgressStepper } from '../../shared/ProgressStepper';
import type { OptionalCancellationReasonId } from '../cancellationReason';

interface RouterSate {
	selectedReasonId: OptionalCancellationReasonId;
	cancellationPolicy: string;
	caseId: string;
	holidayStops?: OutstandingHolidayStop[];
	deliveryCredits?: DeliveryRecordDetail[];
}

const standfirstCss = css`
	${textEgyptian17};
	color: ${neutral[7]};
	margin: 0 0 ${space[8]}px;
`;

const availableOfferBoxCss = css`
	${textSans17};
	border: 1px solid ${palette.neutral[86]};
	position: relative;
	display: flex;
	flex-wrap: wrap;
	margin: ${space[5]}px 0 ${space[8]}px;
	width: 100%;
	${from.tablet} {
		border: none;
	}
`;

const offerBoxWithoutImageCss = css`
	${from.tablet} {
		border: 1px solid ${palette.neutral[93]};
	}
`;

const availableOfferBoxInnerCss = css`
	padding: ${space[4]}px ${space[4]}px ${space[5]}px;
	width: 100%;
	position: relative;
	${from.tablet} {
		background-color: ${palette.neutral[100]};
		width: 366px;
		padding: ${space[5]}px ${space[6]}px ${space[5]}px;
		margin: ${space[6]}px;
	}
`;

const offerBoxInnerWithoutImageCss = css`
	padding: ${space[4]}px;
	${from.tablet} {
		width: 410px;
		padding: ${space[6]}px;
		margin: 0;
	}
`;

const contactUsTitleCss = css`
	${textSansBold20}
	margin: 0;
`;

const contactUsBodyCopyCss = css`
	${textSans15};
	margin: 0;
`;

const contactUsDescriptionCss = css`
	margin: ${space[2]}px 0 ${space[5]}px;
	${from.tablet} {
		margin: ${space[2]}px 0 ${space[6]}px;
	}
`;

const contactUsPhoneNumber = css`
	padding-top: ${space[3]}px;
	border-top: 1px solid ${palette.neutral[86]};
`;

const contactUsOpeningTimes = css`
	margin-top: ${space[3]}px;
	line-height: 1.5;
`;

const headerImageCss = css`
	display: flex;
	justify-content: center;
	width: 100%;
	height: auto;
	background-color: ${palette.culture[800]};
	${from.tablet} {
		position: absolute;
		z-index: -1;
		height: 100%;
		overflow: hidden;
		justify-content: flex-start;
		img {
			height: 100%;
			margin-left: 389px;
			transform: scale(150%) translate(15%, 17%);
		}
	}
`;

const cancelBtnHolderCss = css`
	${from.phablet} {
		display: flex;
		justify-content: space-between;
	}
`;

const cancelButtonCss = css`
	margin: 0 0 ${space[3]}px;
	width: 100%;
	justify-content: center;
	${from.tablet} {
		width: fit-content;
	}
`;

export const CancelAlternativeContactUs = () => {
	const location = useLocation();
	const routerState = location.state as RouterSate;
	const navigate = useNavigate();

	const standfirstCopy: string =
		'Consider staying a Guardian supporter and continue making great impact in support of open, independent journalism.';

	const heroImageSrc: { mobile: string; desktop: string } = {
		mobile: 'https://media.guim.co.uk/63d17ee19313703129fbbeacceaafcd6d1cc1014/0_0_1404_716/500.png',
		desktop:
			'https://i.guim.co.uk/img/media/02c17de8ea17126fbd87f6567ce5cd80f128546d/0_0_2212_1869/2000.png?width=1000&quality=75&s=492edad637979aa4e57e957cb12cd4f1',
	};

	const withHeroImage =
		Boolean(heroImageSrc.mobile) && Boolean(heroImageSrc.desktop);

	return (
		<>
			<ProgressStepper
				steps={[{}, {}, { isCurrentStep: true }, {}]}
				additionalCSS={css`
					margin: ${space[8]}px 0 ${space[9]}px;
				`}
			/>
			<Heading
				borderless
				cssOverrides={[
					measure.heading,
					css`
						margin-bottom: ${space[2]}px;
					`,
				]}
			>
				Before you go...
			</Heading>
			<h3 css={standfirstCss}>{standfirstCopy}</h3>
			<div
				css={[
					availableOfferBoxCss,
					!withHeroImage && offerBoxWithoutImageCss,
				]}
			>
				{withHeroImage && (
					<picture css={headerImageCss}>
						<source
							srcSet={heroImageSrc.desktop}
							media="(min-width: 740px)"
						/>
						<img src={heroImageSrc.mobile} />
					</picture>
				)}

				<div
					css={[
						availableOfferBoxInnerCss,
						!withHeroImage && offerBoxInnerWithoutImageCss,
					]}
				>
					<h4 css={contactUsTitleCss}>
						Can we help with anything? Contact us.
					</h4>
					<p css={[contactUsBodyCopyCss, contactUsDescriptionCss]}>
						Get in touch with our customer service team for
						technical assistance, help managing your subscription,
						and special offers.
					</p>
					<h4 css={[contactUsTitleCss, contactUsPhoneNumber]}>
						+44 (0) 330 333 6790
					</h4>
					<p css={[contactUsBodyCopyCss, contactUsOpeningTimes]}>
						9am - 6pm, Monday to Friday (GMT/BST)
						<br />
						9am - 6pm Saturday - Sunday (GMT/BST)
					</p>
				</div>
			</div>
			<div css={cancelBtnHolderCss}>
				<Button
					priority="tertiary"
					cssOverrides={cancelButtonCss}
					onClick={() => {
						navigate('../confirm', {
							state: {
								...routerState,
								eligibleForFreePeriodOffer: false,
								eligibleForPause: false,
							},
						});
					}}
				>
					No thanks, continue to cancel
				</Button>
				<Button
					priority="subdued"
					cssOverrides={cancelButtonCss}
					onClick={() => {
						navigate('/');
					}}
				>
					Return to your account
				</Button>
			</div>
		</>
	);
};
