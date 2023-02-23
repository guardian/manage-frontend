export const typeCheckObject =
	<T>(guard: (o: unknown) => o is T) =>
	(object: unknown): T | undefined => {
		return guard(object) ? object : undefined;
	};
