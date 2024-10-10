import { palette } from '@guardian/source/foundations';

export interface CheckboxProps {
	checked: boolean;
	required?: true;
	onChange: (newValue: boolean) => void;
	// A label should always be provided for accessibility reasons, it can be hidden with the hideLabel prop.
	label: string;
	hideLabel?: boolean;
	checkboxFill?: string;
	maxWidth?: string;
}

export const Checkbox = (props: CheckboxProps) => (
	<label
		css={{
			display: 'flex',
			maxWidth: props.maxWidth,
			cursor: 'pointer',
			userSelect: 'none',
			':hover .checkbox': {
				boxShadow: `0 0 0 3px ${palette.neutral[93]}`,
			},
		}}
	>
		<div
			className="checkbox"
			css={{
				transition: 'all .2s ease-in-out',
				border: props.checked
					? undefined
					: `1px solid ${palette.neutral[60]}`,
				minWidth: '18px',
				height: '18px',
				display: 'inline-block',
				margin: '3px',
				marginRight: '10px',
				background: props.checked
					? props.checkboxFill || palette.success[400]
					: palette.neutral[100],
				position: 'relative',
				outline: 0,
				':focus': {
					boxShadow: `0 0 0 3px ${palette.brandAlt[400]}`,
				},
			}}
			// accessibility props below
			role="checkbox"
			aria-label={props.label}
			aria-checked={props.checked}
			tabIndex={0}
			onKeyDown={(e) => {
				// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/checkbox_role
				// Space should toggle the checkbox
				// This is handled implicitly when using a native input[type="checkbox"]
				if (e.key === ' ') {
					// Prevent the page from jumping when the space key is pressed
					e.preventDefault();
					props.onChange(!props.checked);
				}
			}}
		>
			<div
				css={{
					position: 'absolute',
					left: '3px',
					top: '5px',
					width: '12px',
					height: '6px',
					transform: 'rotate(-45deg)',
					textAlign: 'right',
				}}
			>
				<div
					css={{
						width: props.checked ? '12px' : '2px',
						height: '6px',
						borderColor: palette.neutral[100],
						borderWidth: '0 0 2px 2px',
						borderStyle: 'solid',
						transition: 'all .2s ease-in-out',
						transitionDelay: '.1s',
					}}
				/>
			</div>
		</div>
		{!props.hideLabel && <span>{props.label}</span>}
	</label>
);
