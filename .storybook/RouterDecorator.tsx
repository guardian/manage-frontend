import { DecoratorFn } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

export const RouterDecorator: DecoratorFn = (Story) => (
	<MemoryRouter>
		<Routes>
			<Route path="*" element={<Story />} />
		</Routes>
	</MemoryRouter>
);
