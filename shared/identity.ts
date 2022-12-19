export const X_GU_ID_FORWARDED_SCOPE = 'X-GU-ID-FORWARDED-SCOPE';

export const getScopeFromRequestPathOrEmptyString = (requestPath: string) => {
	if (requestPath.includes('/payment/')) {
		return 'payment-flow';
	}
	return '';
};
