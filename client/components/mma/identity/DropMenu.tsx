import { css } from '@emotion/react';
import { palette } from '@guardian/source/foundations';
import type { FC, ReactNode } from 'react';
import { useId, useState } from 'react';
import { serif } from '../../../styles/fonts';

interface DropMenuProps {
	children?: ReactNode;
	title: string;
	color: string;
}

const rootStyles = css({
	borderColor: palette.neutral[60],
	borderTop: `1px solid ${palette.neutral[93]}`,
	cursor: 'pointer',
	padding: '3px 0 12px',
	position: 'relative',
});

const headerStyles = css({
	fontSize: '17px',
	fontFamily: serif,
	fontWeight: 'bold',
	lineHeight: '24px',
	textTransform: 'capitalize',
	display: 'block',
	':after': {
		content: "''",
		border: '2px solid currentColor',
		borderLeft: 'transparent',
		borderTop: 'transparent',
		boxSizing: 'content-box',
		display: 'inline-block',
		height: '5px',
		color: 'inherit',
		transform: 'translateY(-2px) rotate(45deg)',
		transition: 'transform 250ms ease-out',
		verticalAlign: 'middle',
		width: '5px',
		marginLeft: '4px',
	},
	'&.open:after': {
		transform: 'rotate(225deg)',
	},
});

export const DropMenu: FC<DropMenuProps> = (props) => {
	const { children, color, title } = props;
	const [open, setOpen] = useState(false);

	const dropDownId = useId();

	return (
		<div role="heading" css={rootStyles}>
			<a
				id={dropDownId}
				href="#"
				role="button"
				aria-expanded={open}
				aria-controls={dropDownId}
				className={open ? 'open' : undefined}
				css={[headerStyles, { color }]}
				onKeyDown={(e) => {
					// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role
					// Space and Enter should toggle the dropdown. Enter is already handled implicitly by anchors.
					// This is handled implicitly when using a native input[type="button"] or button.
					if (e.key === ' ') {
						// Prevent the page from jumping when the space key is pressed
						e.preventDefault();
						setOpen(!open);
					}
				}}
				onClick={() => setOpen(!open)}
			>
				{title}
			</a>
			<div id={dropDownId}>{open && children}</div>
		</div>
	);
};
