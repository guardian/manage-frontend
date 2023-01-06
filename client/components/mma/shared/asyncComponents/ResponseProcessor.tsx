export default interface ResponseProcessor {
	(resp: Response | Response[]): Promise<any>;
}
