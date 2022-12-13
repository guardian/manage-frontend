interface ArrowIconProps {
	pointingLeft?: true;
}

export const ArrowIcon = (props: ArrowIconProps) => (
	<svg viewBox="0 0 30 30">
		<path
			transform={
				props.pointingLeft ? 'scale(-1, 1) translate(-30 0)' : undefined
			}
			d="M22.8 14.6L15.2 7l-.7.7 5.5 6.6H6v1.5h14l-5.5 6.6.7.7 7.6-7.6v-.9"
		/>
	</svg>
);
