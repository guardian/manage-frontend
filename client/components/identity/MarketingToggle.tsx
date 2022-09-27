import { FC, useState } from 'react';
import { css } from '@emotion/react';
import { ToggleSwitch } from './ToggleSwitch';
import { standardSansText, toggleDescriptionPadding } from './sharedStyles';

interface MarketingToggleProps {
	id: string;
	description?: string;
	title?: string;
	selected?: boolean;
	onClick: (id: string) => {};
	canOnlyUnsubscribe?: boolean;
}

const getDescription = (description: MarketingToggleProps['description']) => (
	<p css={[standardSansText, toggleDescriptionPadding]}>{description}</p>
);

export const MarketingToggle: FC<MarketingToggleProps> = (props) => {
	const {
		id,
		description,
		selected,
		title,
		onClick,
		canOnlyUnsubscribe = false,
	} = props;

	const [wasInitiallySelected] = useState(selected);
	const disabled = canOnlyUnsubscribe && !selected;
	if (canOnlyUnsubscribe && !wasInitiallySelected) {
		return null;
	}
	return (
		<div
			css={[
				standardSansText,
				{
					marginTop: '12px',
					position: 'relative',
				},
			]}
		>
			<div css={{ left: 0 }}>
				<ToggleSwitch
					cssOverrides={css`
						${standardSansText};
						font-weight: bold;
						justify-content: space-between;
						button {
							margin-left: 20px;
							align-self: flex-start;
							cursor: pointer;
						}
					`}
					label={title}
					labelPosition="left"
					id={id}
					checked={!!selected}
					onClick={() => {
						if (canOnlyUnsubscribe && !selected) {
							return;
						}
						onClick(id);
					}}
					disabled={disabled}
				/>
			</div>
			{description && getDescription(description)}
		</div>
	);
};
