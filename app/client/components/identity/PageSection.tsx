import { FC, ReactNode } from 'react';
import palette from '../../colours';
import { minWidth } from '../../styles/breakpoints';
import { sans } from '../../styles/fonts';

interface PageSectionProps {
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
	<p
		css={{
			fontFamily: sans,
			fontSize: '14px',
			marginBottom: '8px',
		}}
	>
		{description}
	</p>
);

const getSubtext = (subtext: PageSectionProps['subtext']) => (
	<p
		css={{
			fontSize: '13px',
			lineHeight: '18px',
			fontFamily: sans,
			color: palette.neutral['3'],
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
				[minWidth.desktop]: {
					display: 'flex',
				},
			}}
		>
			<div
				css={{
					[minWidth.desktop]: {
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
					[minWidth.desktop]: {
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
