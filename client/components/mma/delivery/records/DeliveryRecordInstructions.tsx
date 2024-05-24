import { css } from '@emotion/react';
import { brand, from, textSans } from '@guardian/source/foundations';
import { useState } from 'react';

interface DeliveryRecordInstructionsProps {
	message: string;
}
export const DeliveryRecordInstructions = (
	props: DeliveryRecordInstructionsProps,
) => {
	const [showFullinstructions, setShowFullinstructions] = useState(false);
	const maxMessageLength = 33;
	return (
		<div>
			<p
				css={css`
					margin: 0;
					${from.tablet} {
						width: 240px;
					}
				`}
			>
				{props.message.length > maxMessageLength &&
				!showFullinstructions
					? `${props.message.substr(0, maxMessageLength)}...`
					: props.message}
			</p>
			<span
				css={css`
					display: ${props.message.length > maxMessageLength
						? 'block'
						: 'none'};
					text-align: left;
					${textSans.small({ fontStyle: 'italic' })};
					color: ${brand[500]};
					cursor: pointer;
				`}
				onClick={() => {
					setShowFullinstructions(!showFullinstructions);
				}}
			>
				Read {showFullinstructions ? 'less' : 'more'}
			</span>
		</div>
	);
};
