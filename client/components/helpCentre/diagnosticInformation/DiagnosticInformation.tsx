import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import { Button } from '@guardian/source-react-components';
import { useRef, useState } from 'react';
import { h2Css } from '../HelpCentreStyles';
import { AccountInformation } from './AccountInformation';
import { BrowserInformation } from './BrowserInformation';
import { CookieInformation } from './CookieInformation';
import { SubscriptionInformation } from './SubscriptionInformation';

const pCss = css`
	margin: 0 0 ${space[4]}px;
	font-size: 17px;
`;

/**
 * DiagnosticInformation
 *
 * A page which contains various pieces of information a user can share with
 * userhelp in order to better diagnose a problem they might be experiencing
 * with our services.
 */
export const DiagnosticInformation = () => {
	const informationRef = useRef<HTMLDivElement>(null);
	const [copyButtonState, setCopyButtonState] = useState<
		'ready' | 'success' | 'failure'
	>('ready');

	const copyToClipboard = () => {
		if (informationRef.current !== null) {
			navigator.clipboard
				.writeText(informationRef.current.innerText)
				.then(() => {
					setCopyButtonState('success');
					setTimeout(() => {
						setCopyButtonState('ready');
					}, 3000);
				})
				.catch((e) => {
					console.error(e);
					setCopyButtonState('failure');
					setTimeout(() => {
						setCopyButtonState('ready');
					}, 3000);
				});
		} else {
			console.error('information element was not defined');
			setCopyButtonState('failure');
			setTimeout(() => {
				setCopyButtonState('ready');
			}, 3000);
		}
	};

	const getCopyButtonText = () => {
		switch (copyButtonState) {
			case 'ready':
				return 'Copy to clipboard';
			case 'success':
				return 'Copied!';
			case 'failure':
				return 'Copy failed :(';
		}
	};

	return (
		<div>
			<h2 css={h2Css}>Diagnostic Information</h2>
			<p css={pCss}>
				To report a bug, please copy the below information onto an
				email, with the url of the page if possible.
			</p>
			<p css={pCss}>
				We'll aim to get back to you within 48 hours and use technical
				feedback to improve our website/app.
			</p>
			<div ref={informationRef}>
				<BrowserInformation />
				<CookieInformation />
				<AccountInformation />
				<SubscriptionInformation />
			</div>
			<Button
				onClick={copyToClipboard}
				disabled={copyButtonState !== 'ready'}
				priority="tertiary"
				size="default"
			>
				{getCopyButtonText()}
			</Button>
		</div>
	);
};
