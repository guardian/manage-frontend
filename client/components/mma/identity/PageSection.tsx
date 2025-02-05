import { css } from '@emotion/react';
import { from, palette, space, textSans14 } from '@guardian/source/foundations';
import type { FC, ReactNode } from 'react';

interface PageSectionProps {
	children?: React.ReactNode;
	title?: string;
	description?: string | ReactNode;
	subtext?: string;
}

const getTitle = (title: PageSectionProps['title']) => (
	<h2
		css={css`
			font-size: 17px;
			line-height: 24px;
			font-weight: bold;
			margin: 0 0 6px 0;
		`}
	>
		{title}
	</h2>
);

const getDescription = (description: PageSectionProps['description']) => (
	<div
		css={css`
			${textSans14};
			margin-bottom: ${space[2]}px;
		`}
	>
		{description}
	</div>
);

const getSubtext = (subtext: PageSectionProps['subtext']) => (
	<p
		css={css`
			${textSans14};
			line-height: 18px;
			color: ${palette.neutral[46]};
			margin-bottom: ${space[3]}px;
			margin-top: 0;
		`}
	>
		{subtext}
	</p>
);

export const PageSection: FC<PageSectionProps> = (props) => {
	const { children, description, title, subtext } = props;
	return (
		<div
			css={css`
				${from.desktop} {
					display: flex;
				}
			`}
		>
			<div
				css={css`
					${from.desktop} {
						padding-right: 100px;
						box-sizing: content-box;
						flex-basis: 220px;
						min-width: 220px;
					},
				`}
			>
				{title && getTitle(title)}
				{description && getDescription(description)}
				{subtext && getSubtext(subtext)}
			</div>
			<div
				css={css`
					${from.desktop} {
						max-width: 460px;
						flex-grow: 1;
					},
				`}
			>
				{children}
			</div>
		</div>
	);
};
