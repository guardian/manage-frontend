// import { palette } from '@guardian/source/foundations';
import { forwardRef } from 'react';
import { errorMessageCss } from './sharedStyles';

export type GenericErrorMessageRef = HTMLDivElement;

/*
Addressing the error from Friday afternoon/evening (30th October)

I am keeping the previous code for reference and editing the element to prevent
users reloading the page and also giving the users a more friendly error message

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

*/

export const GenericErrorMessage = forwardRef<GenericErrorMessageRef>(
	(_, ref) => {
		return (
			<div ref={ref} css={errorMessageCss}>
				<p css={{ marginBottom: '10px' }}>
					This service is temporarily unavailable, we appreciate your
					patience while we bring it back to normal.
				</p>
			</div>
		);
	},
);
