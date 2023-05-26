import { isAdBlockInUse } from '@guardian/commercial-core';
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

	const [adblockstatus, setAdblockstatus] = useState<boolean | 'failed'>(
		false,
	);
	useEffect(() => {
		isAdBlockInUse()
			.then((value: boolean) => setAdblockstatus(value))
			.catch(() => setAdblockstatus('failed'));
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
				<li>Adblocker status: {adblockstatus ? 'On' : 'Off'}</li>
			</ul>
		</>
	);
};
