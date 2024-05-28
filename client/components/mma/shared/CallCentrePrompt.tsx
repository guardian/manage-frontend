import { ButtonLink, Stack } from '@guardian/source/react-components';
import { InfoSummary } from '@guardian/source-development-kitchen/react-components';
import { useState } from 'react';
import { CallCentreEmailAndNumbers } from '@/client/components/shared/CallCenterEmailAndNumbers';

export const CallCentrePrompt = () => {
	const [showCallCentreNumbers, setCallCentreNumbersVisibility] =
		useState<boolean>(false);

	return (
		<Stack space={3}>
			<InfoSummary
				message="Changed address?"
				context={
					<>
						Please{' '}
						<ButtonLink
							onClick={() =>
								setCallCentreNumbersVisibility(
									!showCallCentreNumbers,
								)
							}
						>
							call our customer support team
						</ButtonLink>{' '}
						to update your delivery details.
					</>
				}
			/>
			{showCallCentreNumbers && <CallCentreEmailAndNumbers />}
		</Stack>
	);
};
