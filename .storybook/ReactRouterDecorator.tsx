import { Decorator } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

export const ReactRouterDecorator: Decorator = (Story, context) => {
	const params = context.parameters.reactRouter ?? {};

	const path = params.path ?? '*';

	const location = {
		...(params.location && { pathname: params.location }),
		...(params.state && { state: params.state }),
	};

	return (
		<MemoryRouter initialEntries={[location]}>
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
