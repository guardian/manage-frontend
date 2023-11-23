import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	brand,
	neutral,
	palette,
	space,
	textSans,
} from '@guardian/source-foundations';
import type { ProductDetail } from '../../../../shared/productResponse';
import { ErrorIcon } from './assets/ErrorIcon';
import { LinkButton } from './Buttons';

type ProblemAlertState = {
	productDetail: ProductDetail;
	isFromApp?: boolean;
};

interface AlertButtonProps {
	title: string;
	link: string;
	state?: ProblemAlertState;
}

interface ProblemAlertProps {
	title: string;
	message: string;
	button?: AlertButtonProps;
	additionalcss?: SerializedStyles;
}

export const ProblemAlert = (props: ProblemAlertProps) => (
	<div
		id="errorMessage"
		css={css`
			border: 4px solid ${palette.error[400]};
			padding: ${space['5']}px ${space['5']}px ${space['5']}px 50px;
			position: relative;
			${props.additionalcss && props.additionalcss}
		`}
	>
		<i
			css={css`
				position: absolute;
				top: ${space['5']}px;
				left: ${space['5']}px;
			`}
		>
			<ErrorIcon />
		</i>
		<h4
			css={css`
				${textSans.medium({ fontWeight: 'bold' })};
				margin: 0;
			`}
		>
			{props.title}
		</h4>
		<p
			css={css`
				margin: ${space[2]}px 0 ${props.button ? `${space[3]}px` : '0'}
					0;
				${textSans.medium()};
			`}
		>
			{props.message}
		</p>
		{props.button && (
			<LinkButton
				to={props.button.link}
				state={props.button.state}
				text={props.button.title}
				fontWeight={'bold'}
				colour={brand[400]}
				textColour={neutral[100]}
			/>
		)}
	</div>
);
