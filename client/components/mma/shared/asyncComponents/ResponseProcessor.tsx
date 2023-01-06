export default interface ResponseProcessor {
	(resp: Response): Promise<any>;
}
