import { DecoratorFn } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

export const RouterDecorator: DecoratorFn = (Story, context) => {
	const params = context.parameters.router ?? {};
	const path = params.path ?? '*';

	return (
		<MemoryRouter initialEntries={[params.initialEntry]}>
			<Routes>
				{params.container ? (
					<Route path={path} element={params.container}>
						<Route index element={<Story />} />
					</Route>
				) : (
					<Route path={path} element={<Story />} />
				)}
			</Routes>
		</MemoryRouter>
	);
};
