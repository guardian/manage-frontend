export interface ResponseProcessor {
	(resp: Response | Response[]): Promise<any>;
}
