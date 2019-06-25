interface IdentityDetails {
  userId?: string;
  displayName?: string;
}

declare namespace Express {
  export interface Response {
    locals: {
      identity: IdentityDetails;
    };
  }
}
