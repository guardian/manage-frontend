import { css } from '@emotion/react';
import { textSans15 } from '@guardian/source/foundations';

type GiftArrowAlign = 'left' | 'right';

interface GiftIconProps {
	alignArrowToThisSide: GiftArrowAlign;
}

export const GiftIcon = (props: GiftIconProps) => (
	<i
		css={css`
			padding: ${props.alignArrowToThisSide === 'left'
				? '0 25px 0 35px'
				: '0 30px 0 15px'};
			background-color: #eacca0;
			display: inline-block;
			clip-path: ${props.alignArrowToThisSide === 'left'
				? 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 10px 50%)'
				: 'polygon(0 0, 100% 0, calc(100% - 10px) 50%, 100% 100%, 0 100%)'};
			height: 28px;
		`}
	>
		<svg
			width="15"
			height="19"
			viewBox="0 0 15 19"
			fill="none"
			css={css`
				margin-top: 3px;
				vertical-align: top;
			`}
		>
			<path
				d="M4.84301 0L3.52393 1.2713L6.7703 4.13171H7.69784H8.62537L11.8717 1.27129L10.5527 0L7.69784 3.36282L4.84301 0Z"
				fill="#333333"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M13.3172 4.13232L15.0003 5.93995V16.7856L13.3172 18.5933H8.60876V12.3958H15V10.3299H8.60876V4.13232H13.3172ZM6.78267 10.3299L6.78267 4.13232H2.07462L0.391602 5.93995V10.3299H6.78267ZM6.78267 12.3958H0.391602V16.7856L2.04657 18.5933H6.78267L6.78267 12.3958Z"
				fill="#333333"
			/>
		</svg>
		<span
			css={css`
				${textSans15};
				font-size: 17px;
				font-weight: bold;
				font-style: normal;
				color: #333;
				display: inline-block;
				vertical-align: top;
				line-height: 26px;
				margin: 2px 0 0 5px;
			`}
		>
			Gift
		</span>
	</i>
);
