export interface ResponseProcessor {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any -- assume we don't know the final output of the promise
	(resp: Response | Response[]): Promise<any>;
}
