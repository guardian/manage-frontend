import { palette } from '@guardian/source/foundations';
import type { ProductTypeKeys } from '@/shared/productTypes';
import type { NextPaymentDetails } from '../shared/NextPaymentDetails';

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
	recurringContribution: palette.brand[600],
	newspaper: palette.brand[400],
	digital: palette.brand[300],
	guardianWeekly: palette.brand[500],
	puzzleApp: palette.lifestyle[300],
	feastApp: palette.brand[800], // Same color as Live app (inAppPurchase)
};

interface ProductCardConfiguration {
	colour: string;
	invertText?: boolean;
	getBenefitsSectionCopy?: (nextPaymentDetails: NextPaymentDetails) => string;
}

const supporterBenefitsCopy = (npd: NextPaymentDetails) =>
	`You're supporting the Guardian with ${npd.currentPriceValue} per ${npd.paymentInterval}, and have access to exclusive extras.`;

const digitalBenefitsCopy = (npd: NextPaymentDetails) =>
	`You're supporting the Guardian with ${npd.currentPriceValue} per ${npd.paymentInterval}, and have unlocked the full digital experience:`;

const unlimitedDigitalBenefitsCopy = (npd: NextPaymentDetails) =>
	`You're subscribed to the Guardian for ${npd.currentPriceValue} per ${npd.paymentInterval}, unlocking unlimited digital benefits.`;

const guardianWeeklyBenefitsCopy = (npd: NextPaymentDetails) =>
	`You're subscribed to The Guardian Weekly for ${npd.currentPriceValue} per ${npd.paymentInterval} and receive a curated news magazine featuring our best global journalism in print, as well as unlimited access to our full suite of digital benefits.`;

/**
 * In-app purchases have their own dedicated product card component so are not
 * included in the configuration object.
 *
 * Patrons are exposed in MDAPI as a reader type rather than a distinct product
 * type, but is included in the config for completeness as it is currently part
 * of the product type definitions.
 */

export const productCardConfiguration: Record<
	ProductTypeKeys,
	ProductCardConfiguration
> = {
	contributions: {
		colour: productColour.recurringContribution,
	},
	supporterplus: {
		colour: productColour.supporterPlus,
		getBenefitsSectionCopy: supporterBenefitsCopy,
	},
	guardianadlite: {
		colour: productColour.supporterPlus,
	},
	tierthree: {
		colour: productColour.supporterPlus,
		getBenefitsSectionCopy: supporterBenefitsCopy,
	},
	digipack: {
		colour: productColour.digital,
		getBenefitsSectionCopy: unlimitedDigitalBenefitsCopy,
	},
	digitalvoucher: {
		colour: productColour.newspaper,
	},
	digitalvoucherplusdigital: {
		colour: productColour.newspaper,
		getBenefitsSectionCopy: digitalBenefitsCopy,
	},
	newspaper: {
		colour: productColour.newspaper,
	},
	homedelivery: {
		colour: productColour.newspaper,
	},
	homedeliveryplusdigital: {
		colour: productColour.newspaper,
		getBenefitsSectionCopy: digitalBenefitsCopy,
	},
	nationaldelivery: {
		colour: productColour.newspaper,
	},
	nationaldeliveryplusdigital: {
		colour: productColour.newspaper,
		getBenefitsSectionCopy: digitalBenefitsCopy,
	},
	voucher: {
		colour: productColour.newspaper,
	},
	voucherplusdigital: {
		colour: productColour.newspaper,
		getBenefitsSectionCopy: digitalBenefitsCopy,
	},
	guardianweekly: {
		colour: productColour.guardianWeekly,
		getBenefitsSectionCopy: guardianWeeklyBenefitsCopy,
	},
	membership: {
		colour: productColour.membership,
		getBenefitsSectionCopy: supporterBenefitsCopy,
	},
	guardianpatron: {
		colour: productColour.membership,
	},
	observer: {
		colour: productColour.newspaper,
	},
	digitalvoucherobserver: {
		colour: productColour.newspaper,
	},
	voucherobserver: {
		colour: productColour.newspaper,
	},
};
