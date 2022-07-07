import { getObfuscatedPayPalId } from '../../../components/payment/paypalDisplay';

test('obfuscate email id', () => {
	expect(getObfuscatedPayPalId('username@email.com')).toEqual(
		'u******e@email.com',
	);
	expect(getObfuscatedPayPalId('last.first@thegulocal.com')).toEqual(
		'l********t@thegulocal.com',
	);
	expect(getObfuscatedPayPalId('j@thegulocal.com')).toEqual('j@thegulocal.com');
	expect(getObfuscatedPayPalId('jm@thegulocal.com')).toEqual('jm@thegulocal.com');
	expect(getObfuscatedPayPalId('jim@thegulocal.com')).toEqual(
		'j*m@thegulocal.com',
	);
	expect(getObfuscatedPayPalId('james@thegulocal.com')).toEqual(
		'j***s@thegulocal.com',
	);
});

test('obfuscate string id', () => {
	expect(getObfuscatedPayPalId('username')).toEqual('u******e');
	expect(getObfuscatedPayPalId('j')).toEqual('j');
	expect(getObfuscatedPayPalId('jm')).toEqual('jm');
	expect(getObfuscatedPayPalId('jim')).toEqual('j*m');
	expect(getObfuscatedPayPalId('james')).toEqual('j***s');
});
