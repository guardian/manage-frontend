import { getObfuscatedPayPalId } from '../../../components/payment/paypalDisplay';

test('obfuscate email id', () => {
	expect(getObfuscatedPayPalId('username@email.com')).toEqual(
		'u******e@email.com',
	);
	expect(getObfuscatedPayPalId('last.first@guardian.com')).toEqual(
		'l********t@guardian.com',
	);
	expect(getObfuscatedPayPalId('j@gu.com')).toEqual('j@gu.com');
	expect(getObfuscatedPayPalId('jm@gu.com')).toEqual('jm@gu.com');
	expect(getObfuscatedPayPalId('jim@gu.com')).toEqual('j*m@gu.com');
	expect(getObfuscatedPayPalId('james@gu.com')).toEqual('j***s@gu.com');
});

test('obfuscate string id', () => {
	expect(getObfuscatedPayPalId('username')).toEqual('u******e');
	expect(getObfuscatedPayPalId('j')).toEqual('j');
	expect(getObfuscatedPayPalId('jm')).toEqual('jm');
	expect(getObfuscatedPayPalId('jim')).toEqual('j*m');
	expect(getObfuscatedPayPalId('james')).toEqual('j***s');
});
