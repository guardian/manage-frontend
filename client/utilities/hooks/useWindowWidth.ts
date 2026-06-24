import type { Breakpoint } from '@guardian/source/foundations';
import { breakpoints } from '@guardian/source/foundations';
import { useEffect, useState } from 'react';

export const useWindowWidth = () => {
	function getWindowWidth() {
		return window.innerWidth;
	}

	const [windowWidth, setWindowWidth] = useState(getWindowWidth);
	useEffect(() => {
		function handleResize() {
			setWindowWidth(getWindowWidth());
		}

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const windowWidthIsGreaterThan = (breakpoint: Breakpoint) =>
		windowWidth >= breakpoints[breakpoint];

	const windowWidthIsLessThan = (breakpoint: Breakpoint) =>
		windowWidth < breakpoints[breakpoint];

	return {
		windowWidthIsGreaterThan,
		windowWidthIsLessThan,
	};
};
