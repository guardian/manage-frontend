import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import { trackEvent } from '@/client/utilities/analytics';
import { androidAppUrl } from '@/shared/externalLinks';

interface AndroidPlayStoreButtonProps {
	link: string;
	additionalCss?: SerializedStyles;
	overrideButtonHeight?: string;
}

export const AndroidPlayStoreButton = (props: AndroidPlayStoreButtonProps) => {
	const defaultStyles = css`
		height: ${props.overrideButtonHeight || '40px'};
		width: auto;
	`;

	const linkStyles = css``;

	return (
		<a
			href={androidAppUrl}
			target="blank"
			onClick={() => {
				trackEvent({
					eventCategory: 'cancellation_offer_confirmation',
					eventAction: 'click',
					eventLabel: 'android_app_cta_click',
				});
			}}
			css={linkStyles}
			aria-label="Download on the Play Store"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="180"
				height="53.33"
				viewBox="0 0 180 53.33"
				css={[defaultStyles, props.additionalCss]}
			>
				<path
					fill="#100f0d"
					d="M173.33 53.33H6.67C3 53.33 0 50.33 0 46.67v-40C0 3 3 0 6.67 0h166.66C177 0 180 3 180 6.67v40c0 3.66-3 6.66-6.67 6.66"
				/>
				<path
					fill="#a2a2a1"
					d="M173.33 0H6.67C3 0 0 3 0 6.67v40c0 3.66 3 6.66 6.67 6.66h166.66c3.67 0 6.67-3 6.67-6.66v-40C180 3 177 0 173.33 0zm0 1.07a5.6 5.6 0 0 1 5.6 5.6v40a5.6 5.6 0 0 1-5.6 5.6H6.67a5.6 5.6 0 0 1-5.6-5.6v-40a5.6 5.6 0 0 1 5.6-5.6h166.66"
				/>
				<path
					fill="#fff"
					d="M142.58 40h2.49V23.33h-2.49zm22.4-10.66-2.84 7.22h-.09l-2.96-7.22h-2.68l4.44 10.1-2.53 5.61h2.6l6.84-15.71zm-14.1 8.77c-.81 0-1.95-.41-1.95-1.42 0-1.29 1.41-1.78 2.64-1.78 1.09 0 1.6.24 2.27.56a3.02 3.02 0 0 1-2.96 2.64zm.3-9.14c-1.8 0-3.67.8-4.44 2.55l2.21.93c.47-.93 1.35-1.23 2.27-1.23 1.29 0 2.6.77 2.62 2.15v.17a5.5 5.5 0 0 0-2.6-.64c-2.38 0-4.8 1.3-4.8 3.75 0 2.23 1.95 3.67 4.14 3.67a3.5 3.5 0 0 0 3.17-1.63h.09v1.28h2.4v-6.39c0-2.96-2.2-4.6-5.06-4.6zm-15.38 2.4h-3.53v-5.72h3.53a2.89 2.89 0 0 1 2.92 2.86 2.9 2.9 0 0 1-2.92 2.86zm-.06-8.04h-5.96V40h2.49v-6.31h3.47c2.76 0 5.47-2 5.47-5.18 0-3.18-2.71-5.18-5.47-5.18zm-32.5 14.78c-1.73 0-3.16-1.44-3.16-3.42 0-2 1.43-3.45 3.15-3.45 1.7 0 3.03 1.46 3.03 3.45 0 1.98-1.33 3.42-3.03 3.42zm2.85-7.84H106a3.93 3.93 0 0 0-2.98-1.27 5.64 5.64 0 0 0-5.44 5.7c0 3.17 2.6 5.64 5.44 5.64 1.35 0 2.43-.6 2.98-1.29h.09v.82c0 2.17-1.16 3.33-3.03 3.33a3.14 3.14 0 0 1-2.86-2.02l-2.16.9a5.4 5.4 0 0 0 5.02 3.35c2.92 0 5.4-1.71 5.4-5.9V29.35h-2.37zm4.08 9.73h2.5V23.33h-2.5zm6.17-5.5a3.11 3.11 0 0 1 2.96-3.3c.99 0 1.83.49 2.1 1.2zm7.73-1.89c-.47-1.27-1.91-3.6-4.86-3.6-2.92 0-5.34 2.29-5.34 5.66 0 3.18 2.4 5.67 5.62 5.67 2.6 0 4.1-1.59 4.73-2.51l-1.93-1.29a3.24 3.24 0 0 1-2.8 1.57 2.88 2.88 0 0 1-2.74-1.72l7.58-3.14zm-60.41-1.87v2.4h5.76a5.02 5.02 0 0 1-1.31 3.04 5.9 5.9 0 0 1-4.45 1.76c-3.54 0-6.32-2.86-6.32-6.4A6.32 6.32 0 0 1 68 26.85l1.7-1.7a8.4 8.4 0 0 0-6.04-2.42 8.93 8.93 0 0 0-8.94 8.8c0 4.86 4.08 8.81 8.94 8.81 2.62 0 4.6-.86 6.14-2.47 1.6-1.59 2.09-3.82 2.09-5.62 0-.56-.05-1.08-.13-1.5zm14.77 7.37c-1.72 0-3.2-1.42-3.2-3.44 0-2.04 1.48-3.43 3.2-3.43 1.72 0 3.2 1.4 3.2 3.43 0 2.02-1.48 3.44-3.2 3.44zm0-9.1a5.59 5.59 0 0 0-5.7 5.66 5.6 5.6 0 0 0 5.7 5.67 5.6 5.6 0 0 0 5.7-5.67 5.59 5.59 0 0 0-5.7-5.67zm12.42 9.1c-1.72 0-3.2-1.42-3.2-3.44 0-2.04 1.48-3.43 3.2-3.43 1.72 0 3.2 1.4 3.2 3.43 0 2.02-1.48 3.44-3.2 3.44zm0-9.1a5.59 5.59 0 0 0-5.7 5.66 5.6 5.6 0 0 0 5.7 5.67 5.6 5.6 0 0 0 5.7-5.67 5.59 5.59 0 0 0-5.7-5.67"
				/>
				<path
					fill="#eb3131"
					d="m27.62 25.9-14.2 15.07h.01a3.83 3.83 0 0 0 5.65 2.32l.04-.03 15.98-9.22-7.48-8.14"
				/>
				<path
					fill="#f6b60b"
					d="M41.98 23.33h-.01l-6.9-4-7.77 6.91 7.8 7.8 6.86-3.96a3.84 3.84 0 0 0 .02-6.75"
				/>
				<path
					fill="#5778c5"
					d="M13.43 12.37c-.09.31-.13.64-.13.99v26.62c0 .34.04.67.13.99L28.1 26.28 13.43 12.37"
				/>
				<path
					fill="#3bad49"
					d="m27.73 26.67 7.34-7.35-15.96-9.25a3.84 3.84 0 0 0-5.68 2.3l14.3 14.3"
				/>
				<path
					fill="#fff"
					stroke="#fff"
					strokeMiterlimit="10"
					strokeWidth=".27"
					d="M63.2 13.04h-3.9V14h2.92c-.08.79-.4 1.4-.92 1.85-.53.45-1.2.68-2 .68-.87 0-1.6-.3-2.22-.91-.59-.62-.9-1.38-.9-2.3 0-.92.31-1.68.9-2.3.61-.6 1.35-.9 2.22-.9.45 0 .88.07 1.27.24.4.17.7.4.95.7l.74-.73a3.33 3.33 0 0 0-1.29-.89 4.4 4.4 0 0 0-1.67-.31c-1.16 0-2.15.4-2.95 1.21-.81.8-1.22 1.8-1.22 2.98s.4 2.18 1.22 2.98c.8.8 1.79 1.21 2.95 1.21 1.23 0 2.2-.39 2.95-1.18a3.95 3.95 0 0 0 .94-3.28zm1.5-3.73v8.02h4.68v-.98h-3.65V13.8h3.3v-.96h-3.3V10.3h3.65v-1zm11.25.99v-1h-5.51v1h2.24v7.03h1.03V10.3zm5-1h-1.03v8.03h1.03zm6.8 1v-1h-5.51v1h2.24v7.03h1.03V10.3zm10.41.05a3.92 3.92 0 0 0-2.94-1.22c-1.16 0-2.14.4-2.93 1.21-.8.8-1.19 1.8-1.19 2.98s.4 2.19 1.19 2.98c.8.8 1.77 1.21 2.93 1.21a4.05 4.05 0 0 0 4.12-4.2c0-1.17-.38-2.16-1.18-2.96zm-5.13.67c.59-.6 1.32-.9 2.2-.9.87 0 1.6.3 2.18.9.6.6.89 1.37.89 2.3 0 .93-.3 1.7-.89 2.3-.58.6-1.31.9-2.19.9-.87 0-1.6-.3-2.2-.9a3.18 3.18 0 0 1-.87-2.3c0-.93.3-1.69.88-2.3zm8.77 1.32-.05-1.55h.05l4.08 6.54h1.07V9.31h-1.03V14l.05 1.54h-.05l-3.9-6.24h-1.25v8.02h1.03z"
				/>
			</svg>
		</a>
	);
};
