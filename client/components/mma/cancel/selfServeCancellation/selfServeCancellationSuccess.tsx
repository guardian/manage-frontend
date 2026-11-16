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
import { LinkButton } from '@guardian/source/react-components';
import { useAccountStore } from '@/client/stores/AccountStore';
import { useSelfServeCancellationStore } from '@/client/stores/SelfServeCancellationStore';
import { cancellationFormatDate } from '@/shared/dates';
import type { ProductDetail } from '../../../../../shared/productResponse';
import type { ProductType } from '../../../../../shared/productTypes';
import { getSuccessCopy } from './selfServeCancellationCopy';

const successBodyCss = css`
	${textSans15};

	margin: 0;
	margin-bottom: ${space[8]}px;

	p {
		margin: 0;
	}

	p + p {
		margin-top: ${space[2]}px;
	}

	${from.tablet} {
		${textSans17};
		margin-bottom: ${space[10]}px;
	}
`;

const successBannerCss = css`
	background-color: ${palette.culture[800]};
	display: flex;
	flex-direction: column-reverse;
	align-items: stretch;

	${from.tablet} {
		flex-direction: row;
	}
`;

const successBannerContentCss = css`
	flex: 1;
	padding: ${space[3]}px 0 ${space[6]}px ${space[3]}px;
`;

const successBannerHeadingCss = css`
	${textSansBold17};
	margin: 0 0 ${space[1]}px;

	${from.tablet} {
		${textSansBold20};
	}
`;

const successBannerBodyCss = css`
	${textSans15};
	margin: 0 0 ${space[4]}px;

	${from.tablet} {
		${textSans17};
		margin: 0 0 ${space[6]}px;
	}
`;

const successBannerGraphicCss = css`
	display: flex;
	align-items: center;
	justify-content: center;
	align-self: center;
	padding: ${space[3]}px;
	max-width: 191px;

	${from.tablet} {
		padding: ${space[3]}px ${space[10]}px ${space[1]}px ${space[10]}px;
		max-width: 245px;
	}
`;

interface SelfServeCancellationSuccessProps {
	productType: ProductType;
	productDetail: ProductDetail;
}

export const SelfServeCancellationSuccess = ({
	productDetail,
}: SelfServeCancellationSuccessProps) => {
	const { getUser } = useAccountStore();
	const user = getUser();
	const cancellationMode =
		useSelfServeCancellationStore((state) => state.cancellationMode) ??
		'hard';
	const cancellationEffectiveDate = useSelfServeCancellationStore(
		(state) => state.cancellationEffectiveDate,
	);
	const copy = getSuccessCopy(productDetail, cancellationMode);
	const supporterName = user?.firstName?.trim() || copy.fallbackSupporterName;
	const cancellationDate =
		cancellationMode === 'soft' &&
		cancellationEffectiveDate &&
		cancellationEffectiveDate !== 'now'
			? cancellationFormatDate(cancellationEffectiveDate)
			: copy.fallbackCancellationDate;
	const confirmationEmail = user?.email || copy.fallbackEmail;

	return (
		<>
			<section>
				<h2
					css={css`
						${headlineBold24}
						margin: ${space[5]}px 0 ${space[2]}px;

						${from.tablet} {
							${headlineBold28}
							margin: ${space[10]}px 0 ${space[3]}px;
						}
					`}
				>
					{copy.heading}
				</h2>
				<div css={successBodyCss}>
					<p>
						{cancellationMode === 'hard' ? (
							copy.effectiveImmediately
						) : (
							<>
								{copy.effectiveLeadIn}{' '}
								<strong
									css={css`
										${textSansBold15};

										${from.tablet} {
											${textSansBold17};
										}
									`}
								>
									{cancellationDate}.
								</strong>
							</>
						)}
					</p>
					<p>
						{copy.confirmationEmailLeadIn} {confirmationEmail}{' '}
						{copy.confirmationEmailTail}
					</p>
				</div>
			</section>

			<section css={successBannerCss}>
				<div css={successBannerContentCss}>
					<h3 css={successBannerHeadingCss}>
						{copy.thankYou(supporterName)}
					</h3>
					<p css={successBannerBodyCss}>{copy.thankYouBody}</p>
					<LinkButton
						href="https://theguardian.com"
						cssOverrides={css`
							width: 100%;

							${from.tablet} {
								width: auto;
							}
						`}
					>
						{copy.continueReading}
					</LinkButton>
				</div>
				<picture css={successBannerGraphicCss}>
					<source
						srcSet="https://i.guim.co.uk/img/media/498a685af6226b7b1b4361a447ad042231d3315b/0_0_586_580/586.png?width=586&quality=100&s=164dd39f999b91d6a913ecdcd6641ec7"
						media="(min-width: 740px)"
					/>
					<img
						src="https://i.guim.co.uk/img/media/498a685af6226b7b1b4361a447ad042231d3315b/0_0_586_580/586.png?width=586&quality=100&s=164dd39f999b91d6a913ecdcd6641ec7"
						alt=""
					/>
				</picture>
			</section>
		</>
	);
};
