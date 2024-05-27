import { css } from '@emotion/react';
import { from, space, textSansBold17 } from '@guardian/source/foundations';
import type { Topic } from '../../../../shared/contactUsTypes';
import { TopicIcon } from './TopicIcon';

interface TopicButtonProps extends Topic {
	id: string;
	updateCallback: (topicId: string) => void;
	isSelected?: boolean;
}
export const TopicButton = (props: TopicButtonProps) => (
	<div
		onClick={() => {
			props.updateCallback(props.id);
		}}
		css={css`
			flex: 1 0 50%;
			max-width: calc(50% - ${space[3] / 2}px);
			${from.desktop} {
				flex: 1 0 25%;
				max-width: calc(25% - ${space[2]}px);
			}
			margin-bottom: ${space[3]}px;
			border-radius: 4px;
			background-color: ${props.isSelected ? '#e3f6ff' : '#F6F6F6'};
			padding: ${space[5]}px ${space[3]}px;
			${textSansBold17};
			color: #052962;
			text-align: center;
			cursor: ${props.isSelected ? 'auto' : 'pointer'};
			transition: background-color 0.5s;
			box-shadow: ${props.isSelected
				? 'inset 0px 0px 0px 3px #007ABC'
				: 'none'};
			:hover {
				background-color: #e3f6ff;
			}
		`}
	>
		<div
			css={css`
				display: flex;
				align-items: center;
				justify-content: center;
				width: 32px;
				height: 32px;
				margin: 0 auto ${space[2]}px;
				border-radius: 50%;
				background-color: #052962;
			`}
		>
			<TopicIcon id={props.id} />
		</div>
		{props.name}
	</div>
);
