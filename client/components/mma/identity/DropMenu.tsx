import { css } from '@emotion/react';
import { palette } from '@guardian/source/foundations';
import type { FC, ReactNode } from 'react';
import { useState } from 'react';
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
	return (
		<div css={rootStyles}>
			<div
				className={open ? 'open' : undefined}
				css={[headerStyles, { color }]}
				onClick={() => setOpen(!open)}
			>
				{title}
			</div>
			{open && children}
		</div>
	);
};
