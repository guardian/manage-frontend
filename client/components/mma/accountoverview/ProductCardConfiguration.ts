import { palette } from '@guardian/source-foundations';
import type { ProductTypeKeys } from '../../../../shared/productTypes';

interface ProductCardConfiguration {
	headerColor: string;
	showBenefitsSection?: boolean;
}

export const productCardConfiguration: {
	[productType in ProductTypeKeys]: ProductCardConfiguration;
} = {
	contributions: {
		headerColor: palette.brand[600],
	},
	supporterplus: {
		headerColor: palette.brand[500],
		showBenefitsSection: true,
	},
	digipack: {
		headerColor: palette.brand[500],
	},
	digitalvoucher: {
		headerColor: '#ff5943',
	},
	newspaper: {
		headerColor: '#ff5943',
	},
	homedelivery: {
		headerColor: '#ff5943',
	},
	voucher: {
		headerColor: '#ff5943',
	},
	guardianweekly: {
		headerColor: '#5f8085',
	},
	membership: {
		headerColor: palette.brand[500],
	},
	guardianpatron: {
		headerColor: palette.brand[500],
	},
};
