type Theme = 'light' | 'dark';
type Size = 'normal' | 'compact';

export interface Grecaptcha {
	render: (
		container: string,
		options: {
			sitekey?: string;
			theme?: Theme;
			size?: Size;
			tabindex?: number;
			callback?: (token: string) => void;
			'expired-callback'?: () => void;
			'error-callback'?: () => void;
		},
	) => void;
}
