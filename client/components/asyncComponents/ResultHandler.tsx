export default interface ResultHandler {
	(resp: Response): Promise<any>;
}
