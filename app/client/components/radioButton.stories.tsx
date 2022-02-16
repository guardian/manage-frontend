import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { RadioButton } from './radioButton';

export default {
	title: 'Components/RadioButton',
	component: RadioButton,
	parameters: {
		controls: { disabled: true },
	},
} as ComponentMeta<typeof RadioButton>;

export const Default: ComponentStory<typeof RadioButton> = () => (
	<>
		<RadioButton
			value="directdebit"
			label="Direct debit"
			checked={true}
			groupName="payment"
			onChange={() => undefined}
		/>
		<RadioButton
			value="creditcard"
			label="Credit/Debit card"
			checked={false}
			groupName="payment"
			onChange={() => undefined}
		/>
		<RadioButton
			value="paypal"
			label="PayPal"
			checked={false}
			groupName="payment"
			onChange={() => undefined}
		/>
	</>
);
