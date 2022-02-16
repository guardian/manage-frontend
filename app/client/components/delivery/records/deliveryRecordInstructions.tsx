import { css } from '@emotion/react';
import { brand } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import React, { useState } from 'react';
import { minWidth } from '../../../styles/breakpoints';

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
					${minWidth.tablet} {
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
