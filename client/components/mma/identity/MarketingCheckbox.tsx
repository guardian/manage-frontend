import { Checkbox } from '@guardian/source/react-components';
import type { FC } from 'react';
import { standardSansText } from './sharedStyles';

interface MarketingCheckboxProps {
	id: string;
	description?: string;
	title: string;
	selected?: boolean;
	onClick: (id: string) => unknown;
}

const getTitle = (title: MarketingCheckboxProps['title']) => (
	<p
		css={[
			standardSansText,
			{
				cursor: 'pointer',
				lineHeight: '22px',
				fontWeight: 'bold',
				margin: '0',
			},
		]}
	>
		{title}
	</p>
);

const getDescription = (description: MarketingCheckboxProps['description']) => (
	<p
		css={{
			padding: '2.88px 0 0 0',
		}}
	>
		{description}
	</p>
);

export const MarketingCheckbox: FC<MarketingCheckboxProps> = (props) => {
	const { id, description, selected, title, onClick } = props;

	return (
		<div
			key={id}
			data-cy={id}
			css={[
				standardSansText,
				{
					marginTop: '12px',
				},
			]}
		>
			<Checkbox
				checked={!!selected}
				onChange={() => onClick(id)}
				label={getTitle(title)}
				supporting={getDescription(description)}
			/>
		</div>
	);
};
