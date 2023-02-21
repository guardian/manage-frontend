import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { featureSwitches } from '../../shared/featureSwitches';

export const darkModeCss = (
	styles: TemplateStringsArray,
	...placeholders: string[]
): SerializedStyles => {
	const darkStyles = featureSwitches['darkMode']
		? styles
				.map(
					(style, i) =>
						`${style}${placeholders[i] ? placeholders[i] : ''}`,
				)
				.join('')
		: '';

	let darkModeSetting = null;
	if (typeof window !== 'undefined') {
		darkModeSetting = localStorage.getItem('darkMode');
	}

	if (darkModeSetting === 'dark') {
		return css`
			${darkStyles}
		`;
	}
	if (darkModeSetting === 'light') {
		return css``;
	}

	return css`
		@media (prefers-color-scheme: dark) {
			${darkStyles}
		}
	`;
};
