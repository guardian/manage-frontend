import { getObfuscatedPayPalId } from '../../../components/payment/paypalDisplay';

test('obfuscate email id', () => {
	expect(getObfuscatedPayPalId('username@email.com')).toEqual(
		'u******e@email.com',
	);
	expect(getObfuscatedPayPalId('last.first@guardian.com')).toEqual(
		'l********t@guardian.com',
	);
	expect(getObfuscatedPayPalId('j@guardian.com')).toEqual('j@guardian.com');
	expect(getObfuscatedPayPalId('jm@guardian.com')).toEqual('jm@guardian.com');
	expect(getObfuscatedPayPalId('jim@guardian.com')).toEqual(
		'j*m@guardian.com',
	);
	expect(getObfuscatedPayPalId('james@guardian.com')).toEqual(
		'j***s@guardian.com',
	);
});

test('obfuscate string id', () => {
	expect(getObfuscatedPayPalId('username')).toEqual('u******e');
	expect(getObfuscatedPayPalId('j')).toEqual('j');
	expect(getObfuscatedPayPalId('jm')).toEqual('jm');
	expect(getObfuscatedPayPalId('jim')).toEqual('j*m');
	expect(getObfuscatedPayPalId('james')).toEqual('j***s');
});
