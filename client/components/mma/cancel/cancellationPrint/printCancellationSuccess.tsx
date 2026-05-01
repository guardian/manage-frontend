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
import { Button } from '@guardian/source/react-components';
import { useNavigate } from 'react-router-dom';
import { useAccountStore } from '@/client/stores/AccountStore';
import { cancellationFormatDate } from '@/shared/dates';
import type { ProductDetail } from '../../../../../shared/productResponse';
import type { ProductType } from '../../../../../shared/productTypes';

const printSuccessBodyCss = css`
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

const printSuccessBannerCss = css`
	background-color: ${palette.culture[800]};
	display: flex;
	flex-direction: column-reverse;
	align-items: stretch;

	${from.tablet} {
		flex-direction: row;
	}
`;

const printSuccessBannerContentCss = css`
	flex: 1;
	padding: ${space[3]}px 0 ${space[6]}px ${space[3]}px;
`;

const printSuccessBannerHeadingCss = css`
	${textSansBold17};
	margin: 0 0 ${space[1]}px;

	${from.tablet} {
		${textSansBold20};
	}
`;

const printSuccessBannerBodyCss = css`
	${textSans15};
	margin: 0 0 ${space[4]}px;

	${from.tablet} {
		${textSans17};
		margin: 0 0 ${space[6]}px;
	}
`;

const printSuccessBannerGraphicCss = css`
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

interface PrintCancellationSuccessProps {
	productType: ProductType;
	productDetail: ProductDetail;
}

export const PrintCancellationSuccess = ({
	productType,
	productDetail,
}: PrintCancellationSuccessProps) => {
	const navigate = useNavigate();
	const { getUser } = useAccountStore();
	const user = getUser();
	const supporterName = user?.firstName?.trim() || 'supporter';
	const cancellationDate = productDetail.subscription
		.cancellationEffectiveDate
		? cancellationFormatDate(
				productDetail.subscription.cancellationEffectiveDate,
		  )
		: 'the end of your current billing period';
	const confirmationEmail = user?.email || 'your registered email address';

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
					Your subscription to {productType.productTitle()} has been
					cancelled.
				</h2>
				<div css={printSuccessBodyCss}>
					<p>
						Your cancellation will take effect on{' '}
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
					</p>
					<p>
						You will receive a confirmation email to{' '}
						{confirmationEmail} in the next 24 hours.
					</p>
				</div>
			</section>

			<section css={printSuccessBannerCss}>
				<div css={printSuccessBannerContentCss}>
					<h3 css={printSuccessBannerHeadingCss}>
						Thank you, {supporterName}
					</h3>
					<p css={printSuccessBannerBodyCss}>
						Your support has played a vital role in keeping
						independent journalism open to all.
					</p>
					<Button
						onClick={() => navigate('/')}
						cssOverrides={css`
							width: 100%;

							${from.tablet} {
								width: auto;
							}
						`}
					>
						Continue reading the Guardian
					</Button>
				</div>
				<picture css={printSuccessBannerGraphicCss}>
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
