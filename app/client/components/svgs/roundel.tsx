import { from } from '@guardian/source-foundations';

export interface RoundelProps {
	size?: number;
	fillMain?: string;
	fillG?: string;
}

export const Roundel = (props: RoundelProps) => (
	<a
		css={{
			display: 'block',
			margin: 'auto 0 auto auto',
			height: `${props.size || 39}px`,
			textAlign: 'right',
			[from.desktop]: {
				width: `${props.size || 51}px`,
				height: `${props.size || 51}px`,
			},
		}}
		href="https://www.theguardian.com"
		title="The Guardian - Back to home"
	>
		<svg
			viewBox="0 0 56 56"
			xmlns="http://www.w3.org/2000/svg"
			css={{
				width: `${props.size || 39}px`,
				height: `${props.size || 39}px`,
				[from.desktop]: {
					width: `${props.size || 51}px`,
					height: `${props.size || 51}px`,
				},
			}}
		>
			<path
				d="M28 0a28 28 0 1 0 28 28A28 28 0 0 0 28 0"
				fill={props.fillMain || '#121212'}
			/>
			<path
				d="M33 6.92c3.63.58 8.24 3.06 9.89 4.83v8h-1L33 7.82zm-3.34.5h-.09c-6.35 0-9.8 8.8-9.8 20.66 0 11.87 3.45 20.66 9.8 20.66h.09v.91c-9.56.65-22.42-6.63-22.09-21.58C7.23 13.14 20.09 5.86 29.66 6.51zm16.16 22.53l-3 1.3v13.44A24.26 24.26 0 0 1 33 49.52V31l-3.3-1.09V29h16.12z"
				fill={props.fillG || '#fff'}
			/>
		</svg>
	</a>
);
