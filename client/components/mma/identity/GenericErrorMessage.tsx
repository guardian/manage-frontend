import { palette } from '@guardian/source/foundations';
import { forwardRef } from 'react';
import { errorMessageCss } from './sharedStyles';

export type GenericErrorMessageRef = HTMLDivElement;
export const GenericErrorMessage = forwardRef<GenericErrorMessageRef>(
	(_, ref) => {
		return (
			<div ref={ref} css={errorMessageCss}>
				<p css={{ marginBottom: '10px' }}>
					Sorry, something went wrong!
				</p>
				<p css={{ marginBottom: '0' }}>
					<a
						css={{
							color: palette.sport[300],
							cursor: 'pointer',
						}}
						onClick={() => window.location.reload()}
					>
						Refresh this page
					</a>
				</p>
			</div>
		);
	},
);
