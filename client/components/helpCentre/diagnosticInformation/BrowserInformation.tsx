import { isAdBlockInUse } from '@guardian/commercial';
import { useEffect, useState } from 'react';
import UAParser from 'ua-parser-js';

/**
 * BrowserInformation
 *
 * This component shows a series of information about the users browser and device
 * - Device information (OS, Model, etc)
 * - Browser information (name, version, screen size, etc)
 * - Ad block status
 */
export const BrowserInformation = () => {
	const ua = new UAParser();

	const [adblockstatus, setAdblockstatus] = useState<
		'On' | 'Off' | 'Failed' | 'Loading'
	>('Loading');

	useEffect(() => {
		isAdBlockInUse()
			.then((value: boolean) => setAdblockstatus(value ? 'On' : 'Off'))
			.catch(() => setAdblockstatus('Failed'));
	});
	return (
		<>
			<h3>Browser Information:</h3>
			<ul>
				<li>
					Device: {ua.getDevice().model} - {ua.getOS().name}{' '}
					{ua.getOS().version}
				</li>
				<li>
					Browser: {ua.getBrowser().name} {ua.getBrowser().version}
				</li>
				<li>
					Window Size: {window.innerWidth} x {window.innerHeight}
				</li>
				<li>
					Screen Size: {window.screen.width} x {window.screen.height}
				</li>
				<li>Adblocker status: {adblockstatus}</li>
			</ul>
		</>
	);
};
