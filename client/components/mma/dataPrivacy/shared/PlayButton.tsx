import { dataPrivacySvgImage } from '../DataPrivacy.styles';

export const PlayButton = () => {
	return (
		<svg
			css={dataPrivacySvgImage}
			tabIndex={0}
			viewBox={`0 0 60 60`}
			fill="none"
			preserveAspectRatio="xMaxYMid meet"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M0.790527 27.5139C0.790527 12.3198 13.1364 0.00244141 28.3659 0.00244141C43.5953 0.00244141 55.9412 12.3198 55.9412 27.5139C55.9412 42.7081 43.5953 55.0255 28.3659 55.0255C13.1364 55.0255 0.790527 42.7081 0.790527 27.5139Z"
				fill="#FFE500"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M43.9778 28.0419V26.8748L17.9067 16.1203L16.9458 16.8706V38.0461L17.9067 38.713L43.9778 28.0419Z"
				fill="#121212"
			/>
		</svg>
	);
};
