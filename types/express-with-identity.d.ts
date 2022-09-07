interface IdentityDetails {
	userId?: string;
	email?: string;
	displayName?: string;
}

declare namespace Express {
	export interface Response {
		locals: {
			identity: IdentityDetails;
		};
	}
}
