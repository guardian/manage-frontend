import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { FC } from 'react';
import { standardSansText, toggleDescriptionPadding } from './sharedStyles';
import { ToggleSwitch } from './ToggleSwitch';

interface MarketingToggleProps {
	id: string;
	description?: string;
	title?: string;
	selected?: boolean;
	divCss?: SerializedStyles;
	onClick: (id: string) => {};
}

const getDescription = (description: MarketingToggleProps['description']) => (
	<p css={[standardSansText, toggleDescriptionPadding]}>{description}</p>
);

export const MarketingToggle: FC<MarketingToggleProps> = (props) => {
	const { id, description, selected, title, onClick } = props;
	return (
		<div
			css={[
				standardSansText,
				props.divCss ??
					css`
						margin-top: 12px;
						position: relative;
					`,
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
						onClick(id);
					}}
				/>
			</div>
			{description && getDescription(description)}
		</div>
	);
};
