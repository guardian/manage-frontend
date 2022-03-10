import { FC } from 'react';
import { sans } from '../../styles/fonts';
import { css } from '@emotion/core';
import { ToggleSwitch } from './ToggleSwitch';

interface MarketingToggleProps {
	id: string;
	description?: string;
	title?: string;
	selected?: boolean;
	onClick: (id: string) => {};
}

const standardText = {
	fontFamily: sans,
	fontSize: '14px',
	lineHeight: '1.333',
};

const getDescription = (description: MarketingToggleProps['description']) => (
	<p
		css={[
			standardText,
			{
				margin: '0',
				padding: '2.88px 90px 0 0',
			},
		]}
	>
		{description}
	</p>
);

export const MarketingToggle: FC<MarketingToggleProps> = (props) => {
	const { id, description, selected, title, onClick } = props;
	return (
		<div
			css={[
				standardText,
				{
					marginTop: '12px',
					position: 'relative',
				},
			]}
		>
			<div css={{ left: 0 }}>
				<ToggleSwitch
					cssOverrides={css`
						${standardText};
						padding-right: 20px;
						font-weight: bold;
						justify-content: space-between;
						button {
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
