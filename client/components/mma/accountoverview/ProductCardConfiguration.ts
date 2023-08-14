import { palette } from '@guardian/source-foundations';
import type { ProductTypeKeys } from '../../../../shared/productTypes';

export const textColour = {
	light: palette.neutral[100],
	dark: palette.brand[300],
};

/**
 * Single contributions are not currently shown in MMA, but the product colour
 * is included in the palette for future use.
 */

export const productColour = {
	inAppPurchase: palette.brand[800],
	singleContribution: palette.sport[600],
	supporterPlus: palette.brand[500],
	membership: palette.sport[300],
	recurringContribution: palette.brand[400],
	newspaper: palette.brand[400],
	digital: palette.sport[100],
	guardianWeekly: '#cadbe8',
	puzzleApp: palette.lifestyle[300],
};

interface ProductCardConfiguration {
	colour: string;
	invertText?: boolean;
	showBenefitsSection?: boolean;
}

/**
 * In-app purchases have their own dedicated product card component so are not
 * included in the configuration object.
 *
 * Patrons are exposed in MDAPI as a reader type rather than a distinct product
 * type, but is included in the config for completeness as it is currently part
 * of the product type definitions.
 */

export const productCardConfiguration: {
	[productType in ProductTypeKeys]: ProductCardConfiguration;
} = {
	contributions: {
		colour: productColour.recurringContribution,
	},
	supporterplus: {
		colour: productColour.supporterPlus,
		showBenefitsSection: true,
	},
	digipack: {
		colour: productColour.digital,
	},
	digitalvoucher: {
		colour: productColour.newspaper,
	},
	newspaper: {
		colour: productColour.newspaper,
	},
	homedelivery: {
		colour: productColour.newspaper,
	},
	voucher: {
		colour: productColour.newspaper,
	},
	guardianweekly: {
		colour: productColour.guardianWeekly,
		invertText: true,
	},
	membership: {
		colour: productColour.membership,
		showBenefitsSection: true,
	},
	guardianpatron: {
		colour: productColour.membership,
	},
};
