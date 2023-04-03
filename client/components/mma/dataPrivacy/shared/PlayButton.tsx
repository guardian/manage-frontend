import { dataPrivacySvgImage } from '../DataPrivacy.styles';

export const PlayButton = () => {
	return (
		<svg
			width="60"
			height="60"
			viewBox="0 0 60 60"
			fill="none"
			tabIndex={0}
			css={dataPrivacySvgImage}
			preserveAspectRatio="xMaxYMid meet"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect width="60" height="60" rx="30" fill="#FFE500" />
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M46.9847 30.5756V29.3029L18.6211 17.5757L17.5757 18.3939V41.4847L18.6211 42.212L46.9847 30.5756Z"
				fill="#121212"
			/>
		</svg>
	);
};
