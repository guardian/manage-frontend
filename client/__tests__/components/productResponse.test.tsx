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

it('mdapiResponseReader returns mdaResponse when MembersDataApiResponse is passed in', () => {
	expect(membersDataApiResponse).toEqual(membersDataApiResponse);
});
