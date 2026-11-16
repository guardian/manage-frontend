export type SelfServeCancellationMode = 'soft' | 'hard';

export const cancellationModeFromEffectiveDate = (
	cancellationEffectiveDate?: string | null,
): SelfServeCancellationMode => {
	const value = cancellationEffectiveDate?.trim();
	if (!value || value === 'now') {
		return 'hard';
	}
	return 'soft';
};
