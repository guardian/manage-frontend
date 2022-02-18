import { CSSObject } from '@emotion/core';
import { FC, useState } from 'react';
import palette from '../../colours';
import { serif } from '../../styles/fonts';
interface DropMenuProps {
	title: string;
	color: string;
}

const styles = {
	root: {
		borderColor: palette.neutral['4'],
		borderTop: `1px solid ${palette.neutral['6']}`,
		cursor: 'pointer',
		padding: '3px 0 12px',
		position: 'relative',
	} as CSSObject,
	header: {
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
	} as CSSObject,
};

export const DropMenu: FC<DropMenuProps> = (props) => {
	const { children, color, title } = props;
	const [open, setOpen] = useState(false);
	return (
		<div css={styles.root}>
			<div
				className={open ? 'open' : undefined}
				css={{ ...styles.header, color }}
				onClick={() => setOpen(!open)}
			>
				{title}
			</div>
			{open && children}
		</div>
	);
};
