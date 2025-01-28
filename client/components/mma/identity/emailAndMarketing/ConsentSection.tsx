import type { FC } from 'react';
import { WithStandardTopMargin } from '../../../shared/WithStandardTopMargin';
import { ConsentOptions } from '../identity';
import { Lines } from '../Lines';
import { MarketingCheckbox } from '../MarketingCheckbox';
import { MarketingToggle } from '../MarketingToggle';
import type { ConsentOption } from '../models';
import { PageSection } from '../PageSection';

type ClickHandler = (id: string) => unknown;

interface ConsentSectionProps {
	clickHandler: ClickHandler;
	consents: ConsentOption[];
}

const supportReminderConsent = (consents: ConsentOption[]): ConsentOption[] =>
	ConsentOptions.findByIds(consents, ['support_reminder']);

const marketingEmailConsents = (consents: ConsentOption[]): ConsentOption[] => {
	const ids = [
		'similar_guardian_products',
		'supporter',
		'jobs',
		'events',
		'offers',
	];
	return ConsentOptions.findByIds(consents, ids);
};

const smsConsent = (consents: ConsentOption[]): ConsentOption[] =>
	ConsentOptions.findByIds(consents, ['sms']);

const softOptInSupporterEmailConsents = (
	consents: ConsentOption[],
): ConsentOption[] => consents.filter((consent) => !!consent.isProduct);

const shouldDisplay = (consents: ConsentOption[]): boolean => !!consents.length;

type MarketingPreference = 'checkbox' | 'toggle';

const consentPreference = (
	consent: ConsentOption,
	uxType: MarketingPreference,
	clickHandler: ClickHandler,
) => {
	const { id, name, description, subscribed } = consent;
	const props = {
		id,
		title: name,
		description,
		selected: subscribed,
	};
	switch (uxType) {
		case 'checkbox': {
			return (
				<MarketingCheckbox
					key={`${id}-marketting-checkbox`}
					{...props}
					onClick={clickHandler}
				/>
			);
		}
		case 'toggle': {
			return (
				<MarketingToggle
					key={`${id}-marketting-toggle`}
					{...props}
					onClick={clickHandler}
				/>
			);
		}
	}
};

const consentPreferences = (
	consents: ConsentOption[],
	uxType: MarketingPreference,
	clickHandler: ClickHandler,
) =>
	consents.map((consent) => consentPreference(consent, uxType, clickHandler));

export const ConsentSection: FC<ConsentSectionProps> = (props) => {
	const { consents, clickHandler } = props;
	return (
		<>
			<PageSection
				title="What else would you like to hear about by email?"
				description={`
        From time to time, we'd love to be able to send you information about
        our products, services and events.
      `}
			>
				{consentPreferences(
					supportReminderConsent(consents),
					'checkbox',
					clickHandler,
				)}
				{consentPreferences(
					marketingEmailConsents(consents),
					'checkbox',
					clickHandler,
				)}
				<h2
					css={{
						fontSize: '17px',
						fontWeight: 'bold',
					}}
				>
					Would you also like to hear about the above by SMS?
				</h2>
				{consentPreferences(
					smsConsent(consents),
					'checkbox',
					clickHandler,
				)}
			</PageSection>
			{shouldDisplay(softOptInSupporterEmailConsents(consents)) && (
				<>
					<WithStandardTopMargin>
						<Lines n={1} />
					</WithStandardTopMargin>
					<WithStandardTopMargin>
						<PageSection title="Supporter exclusive">
							{consentPreferences(
								softOptInSupporterEmailConsents(consents),
								'toggle',
								clickHandler,
							)}
						</PageSection>
					</WithStandardTopMargin>
				</>
			)}
		</>
	);
};
