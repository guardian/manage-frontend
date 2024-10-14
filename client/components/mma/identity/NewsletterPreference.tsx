import { css } from '@emotion/react';
import { palette } from '@guardian/source/foundations';
import { Checkbox } from '@guardian/source/react-components';
import type { FC } from 'react';
import { sans } from '../../../styles/fonts';

interface NewsletterPreferenceProps {
	id: string;
	description: string;
	identityName: string;
	frequency: string;
	title: string;
	selected?: boolean;
	onClick: (id: string) => {};
}

const standardText = {
	fontSize: '14px',
	fontFamily: sans,
};

const clockSVG = (
	<svg
		css={{ fill: palette.neutral[86] }}
		width="11px"
		height="11px"
		viewBox="0 0 11 11"
	>
		<path d="M5.4 0C2.4 0 0 2.4 0 5.4s2.4 5.4 5.4 5.4 5.4-2.4 5.4-5.4S8.4 0 5.4 0zm3 6.8H4.7V1.7h.7L6 5.4l2.4.6v.8z" />
	</svg>
);

const getTitle = (title: NewsletterPreferenceProps['title']) => (
	<p
		css={[
			standardText,
			{
				cursor: 'pointer',
				fontSize: '14px',
				lineHeight: '22px',
				fontFamily: sans,
				fontWeight: 'bold',
				margin: '0',
			},
		]}
	>
		{title}
	</p>
);

const getDescription = (
	description: NewsletterPreferenceProps['description'],
) => (
	<p
		css={{
			padding: '2.88px 0 0 0',
		}}
	>
		{description}
	</p>
);

const getFrequency = (frequency: NewsletterPreferenceProps['frequency']) => (
	<p
		css={{
			fontSize: '12px',
			lineHeight: '16px',
			margin: '3px 0 0 0',
			opacity: 0.75,
		}}
	>
		<span
			css={{
				display: 'inline-block',
				marginRight: '8px',
				verticalAlign: 'middle',
			}}
		>
			{clockSVG}
		</span>
		{frequency}
	</p>
);

export const NewsletterPreference: FC<NewsletterPreferenceProps> = (props) => {
	const {
		id,
		description,
		frequency,
		selected,
		title,
		identityName,
		onClick,
	} = props;
	const accessibleLabel = `${title} (${frequency})`;

	const interact = () => {
		onClick(id);
		// If we have an identityName id then this is a newsletter subscription event
		// and we want to log it in Ophan
		if (identityName) {
			window?.guardian?.ophan?.record({
				componentEvent: {
					component: {
						componentType: 'NEWSLETTER_SUBSCRIPTION',
						id: identityName,
					},
					action: 'CLICK',
					value: selected ? 'untick' : 'tick',
				},
			});
		}
	};

	return (
		<div
			key={id}
			data-cy={id}
			onClick={interact}
			css={[
				standardText,
				{
					lineHeight: '1.333',
					marginTop: '12px',
					paddingLeft: '30px',
				},
			]}
		>
			<Checkbox
				checked={!!selected}
				onChange={interact}
				label={title && getTitle(title)}
				aria-label={accessibleLabel}
				supporting={
					<div>
						{getDescription(description)}
						{frequency && getFrequency(frequency)}
					</div>
				}
				cssOverrides={css`
					align-items: start;
				`}
			/>
		</div>
	);
};
