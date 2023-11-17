import {
	Accordion,
	AccordionRow,
	Stack,
} from '@guardian/source-react-components';

export type PhoneRegionKey = 'US' | 'AUS' | 'UK & ROW';

type PhoneRegion = {
	key: PhoneRegionKey;
	title: string;
	openingHours: string[];
	phoneNumbers: Array<{ phoneNumber: string; suffix?: string }>;
	additionalOpeningHoursInfo?: string;
};

const emailAddress = 'customer.help@theguardian.com';

const phoneData: PhoneRegion[] = [
	{
		key: 'UK & ROW',
		title: 'United Kingdom, Europe and rest of world',
		openingHours: [
			'8am - 6pm Monday - Friday (GMT/BST)',
			'9am - 6pm Saturday - Sunday (GMT/BST)',
		],
		phoneNumbers: [
			{
				phoneNumber: '+44 (0) 330 333 6767',
			},
		],
	},
	{
		key: 'AUS',
		title: 'Australia, New Zealand, and Asia Pacific',
		openingHours: ['9am - 5pm Monday - Friday (AEDT)'],
		phoneNumbers: [
			{
				phoneNumber: '1800 773 766',
				suffix: '(within Australia)',
			},
			{
				phoneNumber: '+61 28076 8599',
				suffix: '(outside Australia)',
			},
		],
	},
	{
		key: 'US',
		title: 'Canada and USA',
		openingHours: ['9am - 5pm on weekdays (EST/EDT)'],
		phoneNumbers: [
			{
				phoneNumber: '1-844-632-2010',
				suffix: '(toll free USA)',
			},
			{
				phoneNumber: '+1 917-900-4663',
				suffix: '(outside USA)',
			},
		],
	},
];

type CallCentreAccordionProps = {
	showEmailAddress: boolean;
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
						key={phoneRegion.key}
						label={phoneRegion.title}
					>
						<Stack space={2}>
							{showEmailAddress && (
								<>
									<div>Email:</div>
									<strong>{emailAddress}</strong>
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
