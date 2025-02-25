import { css } from '@emotion/react';
import { palette, textSans12 } from '@guardian/source/foundations';
import { ButtonLink, SvgSpinner } from '@guardian/source/react-components';
import { useState } from 'react';
import { fetchWithDefaultParameters } from '@/client/utilities/fetch';

type CurrentStatus = 'PRE' | 'PENDING' | 'POST_SUCCESS' | 'POST_ERROR';

export const TmpLinkDiscount = ({ userEmail }: { userEmail: string }) => {
	const discountMessageContainer = css`
		position: relative;
	`;

	const pendingOverlayContainer = css`
		position: absolute;
		z-index: 2;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(255, 255, 255, 0.8);
		display: flex;
		justify-content: center;
		align-items: center;
	`;

	const termsCss = css`
		${textSans12};
		color: ${palette.neutral[46]};
	`;

	const handleLinkClick = async () => {
		setCurrentStatus('PENDING');
		const response = await fetchWithDefaultParameters(
			'/api/discounts/send-email',
			{
				method: 'POST',
				body: JSON.stringify({
					emailAddress: userEmail,
				}),
			},
		);

		if (response.ok) {
			document.cookie =
				'gu_tmp_discount_dec_4-5th_2024=true; expires=Mon, 6 Dec 2024 00:0:01 GMT;';

			setCurrentStatus('POST_SUCCESS');
		} else {
			setCurrentStatus('POST_ERROR');
		}
	};

	const [currentStatus, setCurrentStatus] = useState<CurrentStatus>('PRE');

	if (currentStatus === 'POST_SUCCESS') {
		return (
			<p>Thank you, you should receive a confirmation email shortly.</p>
		);
	}
	if (currentStatus === 'POST_ERROR') {
		return (
			<p>
				Uh oh, something went wrong, please refresh or try again later.
			</p>
		);
	}

	return (
		<div css={discountMessageContainer}>
			{currentStatus === 'PENDING' && (
				<div css={pendingOverlayContainer}>
					<SvgSpinner size="xsmall" />
				</div>
			)}
			<p>
				If you wish to request a refund for your digital subscription
				during the period of industrial action; Wednesday 4th and
				Thursday 5th December, please click{' '}
				<ButtonLink
					iconSide="left"
					priority="primary"
					onClick={handleLinkClick}
				>
					here
				</ButtonLink>
				.
			</p>
			<p css={termsCss}>
				Refunds will be deducted from your next payment. If your payment
				is due in the next 14 days, the refund will appear in the
				payment after.
			</p>
		</div>
	);
};
