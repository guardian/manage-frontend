import { cleanSortCode } from '../../../components/payment/DirectDebitDisplay';

test('should strip out non-digits', () => {
	expect(cleanSortCode('20-00-00')).toEqual('200000');
	expect(cleanSortCode('20=00=00')).toEqual('200000');
	expect(cleanSortCode('20 00 00')).toEqual('200000');
	expect(cleanSortCode('20,00,00')).toEqual('200000');
});
