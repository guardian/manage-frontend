export const isEmail = (email: string) => {
	// Based on https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
	const emailFormat =
		/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i;
	return emailFormat.test(email);
};
