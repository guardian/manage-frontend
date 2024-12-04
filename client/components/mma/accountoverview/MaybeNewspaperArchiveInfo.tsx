import { InfoSummary } from '@guardian/source-development-kitchen/react-components';

export function MaybeNewspaperArchiveInfo() {
	const urlSearchParams = new URLSearchParams(window.location.search);
	const missingNewspaperArchiveEntitlement = urlSearchParams.get(
		'missingNewspaperArchiveEntitlement',
	);

	return missingNewspaperArchiveEntitlement ? (
		<InfoSummary
			message="You do not have access to the Guardian's newspaper archive"
			context="Subscribe to Digital + Print to get access"
		/>
	) : null;
}
