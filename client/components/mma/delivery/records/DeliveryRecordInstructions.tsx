import { css } from '@emotion/react';
import { from, palette, textSansItalic15 } from '@guardian/source/foundations';
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
					? `${props.message.substring(0, maxMessageLength)}...`
					: props.message}
			</p>
			<span
				css={css`
					display: ${props.message.length > maxMessageLength
						? 'block'
						: 'none'};
					text-align: left;
					${textSansItalic15};
					color: ${palette.brand[500]};
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
