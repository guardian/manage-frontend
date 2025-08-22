import type { SerializedStyles } from '@emotion/react';
import type { FC } from 'react';
import { WithStandardTopMargin } from '../../../shared/WithStandardTopMargin';
import { Lines } from '../Lines';
import { MarketingToggle } from '../MarketingToggle';
import type { ConsentOption } from '../models';
import { PageSection } from '../PageSection';

export type ClickHandler = (id: string) => unknown;

interface OptOutSectionProps {
	consents: ConsentOption[];
	clickHandler: ClickHandler;
}

/**
 * NOTE:
 * Only use this method for an OPT OUT consent, eg. "post_optout"
 * The description of Opt Out consents have changed so for UX/UI purposes they are now opt INs
 * The backend model remains an opt OUT, so we invert the consented/subscribed value here.
 */
export const consentSubscribedValueInverter = (
	consent: ConsentOption,
): ConsentOption => {
	return {
		...consent,
		subscribed: !consent.subscribed, // Opt Out consent value is inverted
	};
};

export const optOutFinder =
	(
		consents: ConsentOption[],
		clickHandler: ClickHandler,
		customCSS?: SerializedStyles,
		invertSubscribedValue?: (c: ConsentOption) => ConsentOption,
	) =>
	(id: string) => {
		let consent = consents.find((c) => c.id === id);
		if (consent && !!invertSubscribedValue) {
			consent = invertSubscribedValue(consent);
		}

		return (
			consent && (
				<MarketingToggle
					id={consent.id}
					title={consent.name}
					description={consent.description} // Not all consents from IDAPI have a description
					selected={consent.subscribed}
					onClick={clickHandler}
					divCss={customCSS}
				/>
			)
		);
	};

export const OptOutSection: FC<OptOutSectionProps> = (props) => {
	const { consents, clickHandler } = props;

	const addInvertedMarketingToggle = optOutFinder(
		consents,
		clickHandler,
		undefined,
		consentSubscribedValueInverter,
	);

	return (
		<>
			<PageSection
				title="Other ways we may contact you about our products and services"
				description={`
        From time to time, we’d love to be able to update you about our products
        and services via telephone and post.
      `}
			>
				{addInvertedMarketingToggle('post_optout')}
				{addInvertedMarketingToggle('phone_optout')}
				{addInvertedMarketingToggle('market_research_optout')}
			</PageSection>
			<WithStandardTopMargin>
				<Lines n={1} />
			</WithStandardTopMargin>
		</>
	);
};
