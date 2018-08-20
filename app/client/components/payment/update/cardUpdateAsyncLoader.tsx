import AsyncLoader from "../../asyncLoader";

export interface CardUpdateResponse {
  type: string;
  last4: string;
  expiryMonth: number;
  expiryYear: number;
}

export class CardUpdateAsyncLoader extends AsyncLoader<CardUpdateResponse> {}
