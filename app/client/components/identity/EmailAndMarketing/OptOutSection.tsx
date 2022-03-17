import { FC } from 'react';
import { Lines } from '../Lines';
import { WithStandardTopMargin } from '../../WithStandardTopMargin';
import { MarketingToggle } from '../MarketingToggle';
import { ConsentOption } from '../models';
import { PageSection } from '../PageSection';

type ClickHandler = (id: string) => {};

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
const consentSubscribedValueInverter = (
	consent: ConsentOption,
): ConsentOption => {
	return {
		...consent,
		subscribed: !consent.subscribed, // Opt Out consent value is inverted
	};
};

const optOutFinder =
	(
		consents: ConsentOption[],
		clickHandler: ClickHandler,
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
				/>
			)
		);
	};

const YourDataDescription: FC = () => (
	<>
		<p
			css={{
				marginBottom: '6px',
			}}
		>
			What we mean by your data:
		</p>
		<ul
			css={{
				paddingInlineStart: '20px',
				marginBlockStart: '0',
			}}
		>
			<li>Information you provide e.g. email address</li>
			<li>Products or services you buy from us</li>
			<li>
				Pages you view on theguardian.com or other Guardian websites
				when signed in
			</li>
		</ul>
	</>
);

export const OptOutSection: FC<OptOutSectionProps> = (props) => {
	const { consents, clickHandler } = props;

	const addInvertedMarketingToggle = optOutFinder(
		consents,
		clickHandler,
		consentSubscribedValueInverter,
	);
	const addMarketingToggle = optOutFinder(consents, clickHandler);

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
			<WithStandardTopMargin>
				<PageSection
					title="Your data"
					description={<YourDataDescription />}
				>
					{addInvertedMarketingToggle('profiling_optout')}
					{addMarketingToggle('advertising_optin')}
				</PageSection>
			</WithStandardTopMargin>
		</>
	);
};
