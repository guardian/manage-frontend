import { ReactNode } from 'react';

interface ProductBenefits {
	/**
	 * `key` represents product id returned from `available-products-move` API
	 */
	[key: string]: ReactNode[];
}

export const productBenefits: ProductBenefits = {
	'123': [
		<>Support independent journalism</>,
		<>
			Premium access to <strong>our award-winning news app</strong>, for
			the best mobile experience
		</>,
		<>
			<strong>Ad-free reading</strong> on all your devices
		</>,
		<>
			<strong>Off line reading</strong> in both of your apps
		</>,
		<>
			Play interactive <strong>crosswords</strong>
		</>,
	],
};