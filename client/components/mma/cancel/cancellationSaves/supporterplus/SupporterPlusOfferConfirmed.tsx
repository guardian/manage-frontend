import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import { Button } from '@guardian/source-react-components';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { measure } from '@/client/styles/typography';
import { fetchWithDefaultParameters } from '@/client/utilities/fetch';
import { Heading } from '../../../shared/Heading';
import type { CancellationContextInterface } from '../../CancellationContainer';
import { CancellationContext } from '../../CancellationContainer';

type PerformingDiscountStatus = 'pending' | 'success' | 'failed';

export const SupporterPlusOfferConfirmed = () => {
	const { productDetail } = useContext(
		CancellationContext,
	) as CancellationContextInterface;

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
	}, []);

	return (
		<>
			{performingDiscountStatus === 'pending' && <PendingState />}
			{performingDiscountStatus === 'success' && <SuccessState />}
			{performingDiscountStatus === 'failed' && <FailureState />}
		</>
	);
};

const PendingState = () => {
	return <span>Arranging your offer...</span>;
};

const SuccessState = () => {
	const navigate = useNavigate();
	return (
		<>
			<Heading
				cssOverrides={[
					measure.heading,
					css`
						margin-bottom: ${space[6]}px;
					`,
				]}
			>
				Headline for the offer confirmation page
			</Heading>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				Praesent porttitor enim non semper lacinia. Curabitur
				scelerisque purus in dui iaculis fringilla. Donec placerat dolor
				ac leo tincidunt euismod.
			</p>
			<h3>Next steps</h3>
			<ul>
				<li>Lorem ipsum dolor sit</li>
				<li>Lorem ipsum dolor sit</li>
				<li>Lorem ipsum dolor sit</li>
			</ul>
			<p>
				You may opt out of this offer and cancel your subscription at
				any time.
			</p>
			<Button
				cssOverrides={css`
					margin-top: ${space[5]}px;
				`}
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
