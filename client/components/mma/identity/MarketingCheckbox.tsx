import type { FC } from 'react';
import { Checkbox } from '../shared/Checkbox';
import { standardSansText } from './sharedStyles';

interface MarketingCheckboxProps {
	id: string;
	description?: string;
	title?: string;
	selected?: boolean;
	onClick: (id: string) => {};
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
			data-cy={id}
			onClick={(e) => {
				// Checkboxes inside labels will trigger click events twice.
				// Ignore the input click event
				if (
					e.target instanceof Element &&
					e.target.nodeName === 'INPUT'
				) {
					return;
				}
				onClick(id);
			}}
			css={[
				standardSansText,
				{
					marginTop: '12px',
					paddingLeft: '30px',
					position: 'relative',
				},
			]}
		>
			<div css={{ position: 'absolute', left: 0 }}>
				<Checkbox
					checked={!!selected}
					onChange={(_) => {
						return;
					}}
				/>
			</div>
			{title && getTitle(title)}
			{description && getDescription(description)}
		</div>
	);
};
