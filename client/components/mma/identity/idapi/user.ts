import { get } from 'lodash';
import {
	addCSRFToken,
	fetchWithDefaultParameters,
	putRequest,
} from '@/client/utilities/fetch';
import type { User, UserError } from '../models';
import { ErrorTypes } from '../models';

type UserPublicFields = Partial<Pick<User, 'username'>> & {
	displayName?: string;
};

type UserPrivateFields = Partial<
	Pick<
		User,
		| 'title'
		| 'firstName'
		| 'secondName'
		| 'address1'
		| 'address2'
		| 'address3'
		| 'address4'
		| 'postcode'
		| 'country'
		| 'registrationLocation'
	>
> & {
	telephoneNumber?: {
		countryCode: string;
		localNumber: string;
	};
};

// The api error message is displayed directly to the user unless
// you create an MMA specific error message here per field.
const userErrorMessageMap = new Map([
	[
		'user.privateFields.registrationLocation',
		'Please select a location from the list or "I prefer not to say"',
	],
]);

export interface UserAPIResponse {
	user: IdapiUserDetails;
}

interface IdapiUserDetails {
	id: string;
	consents: [
		{
			id: string;
			consented: boolean;
		},
	];
	publicFields: UserPublicFields;
	privateFields: UserPrivateFields;
	primaryEmailAddress: User['primaryEmailAddress'];
	statusFields: {
		userEmailValidated: boolean;
	};
}

interface UserAPIRequest {
	publicFields: UserPublicFields;
	privateFields: UserPrivateFields;
	primaryEmailAddress?: User['primaryEmailAddress'];
}

interface UserAPIErrorResponse {
	status: string;
	errors: Array<{
		context: string;
		description: string;
		[key: string]: string;
	}>;
}

const getOrEmpty = (user: IdapiUserDetails) => (path: string) =>
	get(user, path, '');

const isErrorResponse = (error: any): error is UserAPIErrorResponse => {
	return error.status && error.status === 'error';
};

const toUserApiRequest = (user: Partial<User>): UserAPIRequest => {
	const { countryCode: countryCode, localNumber: localNumber } = user;
	const telephoneNumber =
		countryCode && localNumber
			? { countryCode, localNumber: `${localNumber}` }
			: undefined;

	return {
		publicFields: {
			username: user.username,
			// Currently displayname and username must be set to the same value, but this is not enforced on IDAPI
			// and clients are expected to implement this logic for the time being.
			displayName: user.username,
		},
		privateFields: {
			title: user.title,
			firstName: user.firstName,
			secondName: user.secondName,
			address1: user.address1,
			address2: user.address2,
			address3: user.address3,
			address4: user.address4,
			postcode: user.postcode,
			country: user.country,
			telephoneNumber,
			registrationLocation: user.registrationLocation,
		},
		primaryEmailAddress: user.primaryEmailAddress,
	};
};

export const toUser = (response: UserAPIResponse): User => {
	const consents = getConsentedTo(response);
	const { user } = response;
	const getFromUser = getOrEmpty(user);
	return {
		id: user.id,
		primaryEmailAddress: user.primaryEmailAddress,
		username: getFromUser('publicFields.username'),
		title: getFromUser('privateFields.title'),
		firstName: getFromUser('privateFields.firstName'),
		secondName: getFromUser('privateFields.secondName'),
		address1: getFromUser('privateFields.address1'),
		address2: getFromUser('privateFields.address2'),
		address3: getFromUser('privateFields.address3'),
		address4: getFromUser('privateFields.address4'),
		postcode: getFromUser('privateFields.postcode'),
		country: getFromUser('privateFields.country'),
		countryCode: getFromUser('privateFields.telephoneNumber.countryCode'),
		localNumber: getFromUser('privateFields.telephoneNumber.localNumber'),
		registrationLocation: getFromUser('privateFields.registrationLocation'),
		consents,
		validated: user.statusFields.userEmailValidated,
	};
};

const getConsentedTo = (response: UserAPIResponse) => {
	if ('consents' in response.user) {
		return response.user.consents
			.filter((consent) => consent.consented)
			.map((consent) => consent.id);
	} else {
		return [];
	}
};

const getFieldNameFromContext = (context: string): string => {
	const fieldname = context.split('.').pop() as string;
	return fieldname === 'telephoneNumber' ? 'localNumber' : fieldname;
};

const toUserError = (response: UserAPIErrorResponse): UserError => {
	const error = response.errors.reduce((a, e) => {
		return {
			...a,
			[getFieldNameFromContext(e.context)]:
				userErrorMessageMap.get(e.context) || e.description,
		};
	}, {} as UserError['error']);

	return {
		type: ErrorTypes.VALIDATION,
		error,
	};
};

export const write = async (user: Partial<User>): Promise<User> => {
	const url = '/idapi/user';
	const body = toUserApiRequest(user);
	try {
		const response = await fetchWithDefaultParameters(
			url,
			addCSRFToken(putRequest(body)),
		).then((response) => response.json());
		if (isErrorResponse(response)) {
			throw toUserError(response);
		}
		return toUser(response);
	} catch (e) {
		throw isErrorResponse(e) ? toUserError(e) : e;
	}
};

export const read = async (): Promise<User> => {
	const url = '/idapi/user';
	const response: UserAPIResponse = await fetchWithDefaultParameters(
		url,
	).then((response) => response.json());
	return toUser(response);
};
