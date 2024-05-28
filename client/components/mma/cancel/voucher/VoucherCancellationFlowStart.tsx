import { Stack } from '@guardian/source/react-components';
import type { ProductDetail } from '../../../../../shared/productResponse';
import { getMainPlan } from '../../../../../shared/productResponse';
import { measure } from '../../../../styles/typography';
import { trackEvent } from '../../../../utilities/analytics';
import { Heading } from '../../shared/Heading';
import { hrefStyle } from '../cancellationConstants';

const trackCancellationClickEvent = (eventLabel: string) => () =>
	trackEvent({
		eventCategory: 'cancellation',
		eventAction: 'click',
		eventLabel,
	});

export const voucherCancellationFlowStart = ({
	subscription,
}: ProductDetail) => {
	const mainPlan = getMainPlan(subscription);

	if (!mainPlan) {
		throw new Error(
			'mainPlan does not exist in voucherCancellationFlowStart',
		);
	}

	const isEligibleForFreeDigipackAccess =
		mainPlan.name?.includes('plus Digi');

	return (
		<Stack space={4}>
			<Heading cssOverrides={measure.heading}>
				We’re sorry to hear you’re thinking of cancelling your voucher
				subscription
			</Heading>
			<p>
				You can also opt for home delivery. Sign up to a free trial with{' '}
				<a
					css={hrefStyle}
					href="http://www.delivermynewspaper.com"
					onClick={trackCancellationClickEvent(
						'delivery_my_newspaper',
					)}
				>
					Deliver My Newspaper
				</a>{' '}
				and they will provide you with delivery vouchers, which you can
				use in combination with your newspaper vouchers to arrange a
				delivery service. You can also arrange delivery with your
				newsagent independently, if you wish.
			</p>

			{isEligibleForFreeDigipackAccess && (
				<p>
					We have also made our digital subscription temporarily
					available to all readers that hold a voucher subscription.
					This means you can enjoy ad-free reading, and two innovative
					Guardian apps -{' '}
					<a
						css={hrefStyle}
						href="https://www.theguardian.com/membership/2019/dec/07/guardian-daily-app-launch-new-edition"
						onClick={trackCancellationClickEvent(
							'the_guardian_daily',
						)}
					>
						The Guardian Daily
					</a>{' '}
					and premium access to{' '}
					<a
						css={hrefStyle}
						href="https://www.theguardian.com/technology/ng-interactive/2018/may/15/the-guardian-app"
						onClick={trackCancellationClickEvent(
							'the_guardian_live_app',
						)}
					>
						The Guardian Live
					</a>
					. Your access is already granted with the email you are
					subscribed with, all you need to do is download from the app
					store and sign in to enjoy.
				</p>
			)}

			<p>
				Please could you take a moment to tell us why you want to
				cancel?
			</p>
		</Stack>
	);
};
