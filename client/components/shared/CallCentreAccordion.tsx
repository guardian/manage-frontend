import { css } from '@emotion/react';
import { textSans } from '@guardian/source-foundations';
import {
	Accordion,
	AccordionRow,
	Stack,
} from '@guardian/source-react-components';
import type { PhoneRegionKey } from '@/shared/productResponse';
import { customerHelpEmailAddress, phoneData } from './callCentreData';

type CallCentreAccordionProps = {
	showEmailAddress?: boolean;
	phoneRegionFilterKeys?: PhoneRegionKey[];
};

export const CallCentreAccordion = ({
	showEmailAddress,
	phoneRegionFilterKeys,
}: CallCentreAccordionProps) => {
	const filteredPhoneData = phoneData.filter(
		(phoneRegion) =>
			!phoneRegionFilterKeys ||
			phoneRegionFilterKeys.includes(phoneRegion.key),
	);

	return (
		<Accordion>
			{filteredPhoneData.map((phoneRegion) => {
				return (
					<AccordionRow
						cssOverrides={css`
							> button {
								> strong {
									${textSans.medium()};
								}
							}
						`}
						key={phoneRegion.key}
						label={phoneRegion.title}
					>
						<Stack
							space={2}
							css={css`
								${textSans.medium()};
							`}
						>
							{showEmailAddress && (
								<>
									<div>Email:</div>
									<strong>{customerHelpEmailAddress}</strong>
								</>
							)}
							<div>Phone:</div>
							{phoneRegion.phoneNumbers.map(
								({ phoneNumber, suffix }) => (
									<div key={phoneNumber}>
										<strong>{phoneNumber}</strong>
										{suffix && <span> {suffix}</span>}
									</div>
								),
							)}
							{phoneRegion.openingHours.map(
								(openingHourLine, openingHoursLineKey) => (
									<div key={openingHoursLineKey}>
										{openingHourLine}
									</div>
								),
							)}
							{phoneRegion.additionalOpeningHoursInfo && (
								<div>
									{phoneRegion.additionalOpeningHoursInfo}
								</div>
							)}
						</Stack>
					</AccordionRow>
				);
			})}
		</Accordion>
	);
};
