import { Elements } from '@stripe/react-stripe-js';
import { useStripeSDK } from '../../../../utilities/stripe';
import type { NewPaymentMethodDetail } from '../NewPaymentMethodDetail';
import { StripeCardInputForm } from './stripeCardInputForm';

export interface CardInputFormProps {
	stripeApiKey: string;
	userEmail?: string;
	newPaymentMethodDetailUpdater: (
		newPaymentMethodDetail: NewPaymentMethodDetail,
	) => void;
	executePaymentUpdate: (
		newPaymentMethodDetail: NewPaymentMethodDetail,
	) => Promise<unknown>;
}

export const CardInputForm = (props: CardInputFormProps) => {
	const stripePromise = useStripeSDK(props.stripeApiKey);

	return (
		<>
			<Elements
				stripe={stripePromise}
				options={{
					fonts: [
						{
							src: 'url(https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Regular.woff2)',
							family: 'Guardian Text Sans Web',
							style: 'normal',
						},
					],
				}}
			>
				<StripeCardInputForm {...props} />
			</Elements>
		</>
	);
};
