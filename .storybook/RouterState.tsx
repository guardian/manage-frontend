import { ReactNode } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

interface RouterStateProps {
	initialState: {};
	container?: ReactNode;
	children: ReactNode;
}

export const RouterState = (props: RouterStateProps) => (
	<MemoryRouter initialEntries={[{ state: props.initialState }]}>
		{props.container ? (
			<Routes>
				<Route path="*" element={props.container}>
					<Route index element={props.children} />
				</Route>
			</Routes>
		) : (
			props.children
		)}
	</MemoryRouter>
);
