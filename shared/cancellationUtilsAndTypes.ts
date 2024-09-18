import type { ProductTypeKeys } from './productTypes';

export const cancelAlternativeUrlPartLookup: Partial<
	Record<ProductTypeKeys, string>
> = {
	supporterplus: 'offer',
	contributions: 'pause',
};
