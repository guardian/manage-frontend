import { http, HttpResponse } from 'msw';
import { toMembersDataApiResponse } from './mdapiResponse';
import { digitalPackPaidByDirectDebit } from './productBuilder/testProducts';

export const DIGITAL_PACK_SUBSCRIPTION_ID = 'A-S00278175';

interface MmaPrimaryInvitation {
	subscriptionName: string;
	invitationCode: string;
	primaryIdentityId: string;
	secondaryUserEmail: string;
	secondaryIdentityId: string;
	invitedDate: string;
	expiryDate: number;
}

interface MmaPrimarySecondaryUser {
	subscriptionName: string;
	secondaryIdentityId: string;
	primaryIdentityId: string;
	acceptedDate: string;
	email: string;
	displayName: string;
}

export interface MmaPrimaryResponse {
	invitations: MmaPrimaryInvitation[];
	secondaryUsers: MmaPrimarySecondaryUser[];
}

export const emptyMmaPrimaryResponse: MmaPrimaryResponse = {
	invitations: [],
	secondaryUsers: [],
};

export const mixedMmaPrimaryResponse: MmaPrimaryResponse = {
	invitations: [
		{
			subscriptionName: DIGITAL_PACK_SUBSCRIPTION_ID,
			invitationCode: 'INV-PENDING-001',
			primaryIdentityId: 'primary-1',
			secondaryUserEmail: 'pending.user@example.com',
			secondaryIdentityId: 'secondary-pending',
			invitedDate: '2026-01-15',
			expiryDate: 1739577600,
		},
	],
	secondaryUsers: [
		{
			subscriptionName: DIGITAL_PACK_SUBSCRIPTION_ID,
			secondaryIdentityId: 'secondary-active',
			primaryIdentityId: 'primary-1',
			acceptedDate: '2026-02-01',
			email: 'active.user@example.com',
			displayName: 'Alex Active',
		},
	],
};

export const extraAccountsMswHandlers = (
	mmaPrimaryResponse: MmaPrimaryResponse,
) => [
	http.get('/api/me/mma', () =>
		HttpResponse.json(
			toMembersDataApiResponse(digitalPackPaidByDirectDebit()),
		),
	),
	http.get('/api/cancelled/', () => HttpResponse.json([])),
	http.get('/mpapi/user/mobile-subscriptions', () =>
		HttpResponse.json({ subscriptions: [] }),
	),
	http.get('/api/me/one-off-contributions', () => HttpResponse.json([])),
	http.get('/api/user-subscriptions/me', () =>
		HttpResponse.json({ subscriptions: [] }),
	),
	http.get('/api/extra-accounts/:subscriptionName/mma-primary', () =>
		HttpResponse.json(mmaPrimaryResponse),
	),
	http.post(
		'/api/extra-accounts/invitation',
		() => new HttpResponse(null, { status: 200 }),
	),
	http.delete(
		'/api/extra-accounts/invitation/:invitationCode',
		() => new HttpResponse(null, { status: 200 }),
	),
];
