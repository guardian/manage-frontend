export type PrintCancellationMode = 'soft' | 'hard';

export const cancellationModeFromEffectiveDate = (
	cancellationEffectiveDate?: string | null,
): PrintCancellationMode => {
	const value = cancellationEffectiveDate?.trim();
	if (!value || value === 'now') {
		return 'hard';
	}
	return 'soft';
};
