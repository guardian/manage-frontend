import type { DeliveryAddress } from '../../../../../shared/productResponse';
import { PRODUCT_TYPES } from '../../../../../shared/productTypes';
import { ukPhoneNumberWithoutPrefix } from '../../../shared/CallCentreNumbers';

interface ErrorState {
	isValid: boolean;
	message: string;
}

export interface FormValidationResponse {
	isValid: boolean;
	addressLine1?: ErrorState;
	town?: ErrorState;
	postcode?: ErrorState;
	country?: ErrorState;
}

export const isFormValid = (
	formData: DeliveryAddress,
	subscriptionsNames: string[],
): FormValidationResponse => {
	const addressLine1 = {
		isValid: formData.addressLine1?.length ?? 0 > 0,
		message: 'Please enter an address',
	};
	const town = {
		isValid: !!(formData.town && formData.town.length > 0),
		message: 'Please enter a town/city',
	};

	const postcodeEnteredCheck =
		(formData.postcode?.length ?? 0 > 0) &&
		(formData.postcode?.length ?? 0 < 20);

	const enteredPostcodeIsInM25 =
		postcodeEnteredCheck &&
		!isPostcodeOptional('GB') &&
		isPostcodeInM25(formData.postcode || '');

	const enteredPostcodeIsInValidArea =
		!subscriptionsNames.includes(PRODUCT_TYPES.homedelivery.friendlyName) ||
		enteredPostcodeIsInM25;

	const postcode = {
		isValid: postcodeEnteredCheck && enteredPostcodeIsInValidArea,
		message:
			!enteredPostcodeIsInValidArea && postcodeEnteredCheck
				? `This postcode is outside of our home delivery area of Greater London. If you have moved, you can still subscribe to our newspaper using our voucher scheme. Please contact us to discuss further: ${ukPhoneNumberWithoutPrefix}`
				: 'Please enter a postcode',
	};

	const userHasVoucherSubscription = subscriptionsNames.includes(
		PRODUCT_TYPES.voucher.friendlyName,
	);

	const country = {
		isValid: userHasVoucherSubscription
			? formData.country === 'GB' || formData.country === 'United Kingdom'
			: true,
		message:
			userHasVoucherSubscription && (formData.country?.length ?? 0) > 0
				? `Voucher subscriptions must be delivered in the UK. Please contact us to discuss further: ${ukPhoneNumberWithoutPrefix}`
				: 'Please select a country',
	};

	return {
		isValid:
			addressLine1.isValid &&
			town.isValid &&
			postcode.isValid &&
			country.isValid,
		addressLine1,
		town,
		postcode,
		country,
	} as FormValidationResponse;
};

const isPostcodeOptional = (country: string): boolean =>
	country !== 'GB' &&
	country !== 'AU' &&
	country !== 'US' &&
	country !== 'CA';

const postcodeHasPrefix = (
	postcode: string,
	expectedPrefix: string,
): boolean => {
	const formattedPostcode = postcode.replace(' ', '').toUpperCase();
	const actualPrefix = formattedPostcode.slice(0, -3);

	return actualPrefix === expectedPrefix;
};
const isPostcodeInM25 = (postcode: string) =>
	M25_POSTCODE_PREFIXES.filter((prefix) =>
		postcodeHasPrefix(postcode, prefix),
	).length > 0;

const M25_POSTCODE_PREFIXES = [
	'BR1',
	'BR2',
	'BR3',
	'BR4',
	'BR5',
	'BR6',
	'BR7',
	'BR8',
	'CR0',
	'CR2',
	'CR3',
	'CR4',
	'CR5',
	'CR6',
	'CR7',
	'CR8',
	'DA1',
	'DA14',
	'DA15',
	'DA16',
	'DA17',
	'DA5',
	'DA7',
	'DA8',
	'E1',
	'E10',
	'E11',
	'E12',
	'E13',
	'E14',
	'E15',
	'E16',
	'E17',
	'E18',
	'E1W',
	'E2',
	'E3',
	'E4',
	'E5',
	'E6',
	'E7',
	'E8',
	'E9',
	'EC1A',
	'EC1R',
	'EC1V',
	'EC1Y',
	'EC2A',
	'EC2Y',
	'EC4A',
	'EN1',
	'EN2',
	'EN3',
	'EN4',
	'EN5',
	'GU1',
	'GU2',
	'GU22',
	'HA0',
	'HA1',
	'HA2',
	'HA3',
	'HA4',
	'HA5',
	'HA6',
	'HA7',
	'HA8',
	'HA9',
	'IG1',
	'IG10',
	'IG11',
	'IG2',
	'IG3',
	'IG4',
	'IG5',
	'IG6',
	'IG7',
	'IG8',
	'IG9',
	'KT1',
	'KT10',
	'KT11',
	'KT12',
	'KT13',
	'KT14',
	'KT15',
	'KT16',
	'KT17',
	'KT18',
	'KT19',
	'KT2',
	'KT20',
	'KT21',
	'KT3',
	'KT4',
	'KT5',
	'KT6',
	'KT7',
	'KT8',
	'KT9',
	'N1',
	'N10',
	'N11',
	'N12',
	'N13',
	'N14',
	'N15',
	'N16',
	'N17',
	'N18',
	'N19',
	'N2',
	'N20',
	'N21',
	'N22',
	'N3',
	'N4',
	'N5',
	'N6',
	'N7',
	'N8',
	'N9',
	'NW1',
	'NW10',
	'NW11',
	'NW2',
	'NW3',
	'NW4',
	'NW5',
	'NW6',
	'NW7',
	'NW8',
	'NW9',
	'RM1',
	'RM11',
	'RM12',
	'RM14',
	'RM2',
	'RM3',
	'RM5',
	'RM6',
	'RM7',
	'RM8',
	'SE1',
	'SE10',
	'SE11',
	'SE12',
	'SE13',
	'SE14',
	'SE15',
	'SE16',
	'SE17',
	'SE18',
	'SE19',
	'SE2',
	'SE20',
	'SE21',
	'SE22',
	'SE23',
	'SE24',
	'SE25',
	'SE26',
	'SE27',
	'SE28',
	'SE3',
	'SE4',
	'SE5',
	'SE6',
	'SE7',
	'SE8',
	'SE9',
	'SM1',
	'SM2',
	'SM3',
	'SM4',
	'SM5',
	'SM6',
	'SM7',
	'SW10',
	'SW11',
	'SW12',
	'SW13',
	'SW14',
	'SW15',
	'SW16',
	'SW17',
	'SW18',
	'SW19',
	'SW1A',
	'SW1E',
	'SW1H',
	'SW1P',
	'SW1V',
	'SW1W',
	'SW1X',
	'SW1Y',
	'SW2',
	'SW20',
	'SW3',
	'SW4',
	'SW5',
	'SW6',
	'SW7',
	'SW8',
	'SW9',
	'TN16',
	'TW1',
	'TW10',
	'TW11',
	'TW12',
	'TW13',
	'TW14',
	'TW15',
	'TW16',
	'TW17',
	'TW18',
	'TW2',
	'TW3',
	'TW4',
	'TW5',
	'TW7',
	'TW8',
	'TW9',
	'UB1',
	'UB10',
	'UB2',
	'UB5',
	'UB6',
	'UB7',
	'UB8',
	'UB9',
	'W10',
	'W11',
	'W12',
	'W13',
	'W14',
	'W1D',
	'W1G',
	'W1H',
	'W1K',
	'W1T',
	'W1U',
	'W2',
	'W3',
	'W4',
	'W5',
	'W6',
	'W7',
	'W8',
	'W9',
	'WC1E',
	'WC1H',
	'WC1N',
	'WC1R',
	'WC1X',
	'WC2E',
	'WD17',
	'WD18',
	'WD19',
	'WD23',
	'WD24',
	'WD25',
	'WD3',
	'WD5',
	'WD6',
	'WD7',
];
