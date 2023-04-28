import { from, palette } from '@guardian/source-foundations';
import type { FC, ReactNode } from 'react';
import { sans } from '../../../styles/fonts';

interface PageSectionProps {
	children?: React.ReactNode;
	title?: string;
	description?: string | ReactNode;
	subtext?: string;
}

const getTitle = (title: PageSectionProps['title']) => (
	<h2
		css={{
			fontSize: '17px',
			lineHeight: '24px',
			fontWeight: 'bold',
			margin: '0 0 6px 0',
		}}
	>
		{title}
	</h2>
);

const getDescription = (description: PageSectionProps['description']) => (
	<div
		css={{
			fontFamily: sans,
			fontSize: '14px',
			marginBottom: '8px',
		}}
	>
		{description}
	</div>
);

const getSubtext = (subtext: PageSectionProps['subtext']) => (
	<p
		css={{
			fontSize: '13px',
			lineHeight: '18px',
			fontFamily: sans,
			color: palette.neutral[46],
			marginBottom: '12px',
			marginTop: '0',
		}}
	>
		{subtext}
	</p>
);

export const PageSection: FC<PageSectionProps> = (props) => {
	const { children, description, title, subtext } = props;
	return (
		<div
			css={{
				[from.desktop]: {
					display: 'flex',
				},
			}}
		>
			<div
				css={{
					[from.desktop]: {
						paddingRight: '100px',
						boxSizing: 'content-box',
						flexBasis: '220px',
						minWidth: '220px',
					},
				}}
			>
				{title && getTitle(title)}
				{description && getDescription(description)}
				{subtext && getSubtext(subtext)}
			</div>
			<div
				css={{
					[from.desktop]: {
						maxWidth: '460px',
						flexGrow: 1,
					},
				}}
			>
				{children}
			</div>
		</div>
	);
};
