import { css } from '@emotion/react';
import { palette, space, textSans17 } from '@guardian/source/foundations';
import type { ReactElement } from 'react';
import { ErrorIcon } from '../mma/shared/assets/ErrorIcon';

const dlStyles = css`
	position: relative;
	padding: ${space[5]}px ${space[5]}px ${space[5]}px 50px;
	${textSans17};
	border: 4px solid ${palette.error[400]};
`;

const iStyles = css`
	position: absolute;
	top: ${space[5]}px;
	left: ${space[5]}px;
`;

const dtStyles = css`
	font-weight: bold;
`;

const ddStyles = css`
	margin: 0;
`;

const ulStyles = css`
	list-style: none;
	margin: 0;
	padding: 0;
`;

export interface FormErrorProps {
	title?: string;
	messages: Array<string | ReactElement>;
}

export const FormError = (props: FormErrorProps) => (
	<dl css={dlStyles}>
		<i css={iStyles}>
			<ErrorIcon />
		</i>
		<dt css={dtStyles}>{props.title}</dt>
		<dd css={ddStyles}>
			<ul css={ulStyles}>
				{props.messages.map((msg, index) => (
					<li key={`feli-${index}`}>{msg}</li>
				))}
			</ul>
		</dd>
	</dl>
);
