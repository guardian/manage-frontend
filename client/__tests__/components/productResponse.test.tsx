/* eslint jest/no-standalone-expect: "off", jest/no-done-callback: "off" */
import { mdapiResponseReader } from '../../../shared/productResponse';
import { digitalDD, guardianWeeklyCard } from '../../fixtures/productDetail';

const membersDataApiItems = [guardianWeeklyCard, digitalDD];
const membersDataApiResponse = {
	user: {
		firstName: 'test',
		lastName: 'name',
		email: 'joe.bloggs@email.com',
	},
	products: membersDataApiItems,
};

describe('testing mdapiResponseReader', () => {
	it('mdapiResponseReader returns mdaResponse when MembersDataApiItems is passed in', () => {
		const mdaResponse = membersDataApiItems;
		expect(mdapiResponseReader(mdaResponse).products).toEqual(
			membersDataApiItems,
		);
	});

	it('mdapiResponseReader returns mdaResponse when MembersDataApiResponse is passed in', () => {
		const mdaResponse = membersDataApiResponse;
		expect(mdapiResponseReader(mdaResponse)).toEqual(
			membersDataApiResponse,
		);
	});

	it('throws validation error if MDAPI Response is in incorrect format', () => {
		const mdaResponse = '';
		expect(() => mdapiResponseReader(mdaResponse as any)).toThrow(
			'MDAPI Response is of invalid format',
		);
	});
});
