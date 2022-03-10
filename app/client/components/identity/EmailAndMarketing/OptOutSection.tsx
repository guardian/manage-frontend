import { FC } from 'react';
import { Lines } from '../Lines';
import { WithStandardTopMargin } from '../../WithStandardTopMargin';
import { MarketingToggle } from '../MarketingToggle';
import { ConsentOption, ConsentOptionType } from '../models';
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
const optOutFinderAndInverter =
	(consents: ConsentOption[], clickHandler: ClickHandler) => (id: string) => {
		const consent = consents.find((c) => c.id === id);

		return (
			consent && (
				<MarketingToggle
					id={consent.id}
					title={consent.name}
					description={consent.description} // Not all consents from IDAPI have a description
					selected={!consent.subscribed} // Opt Out consent value is inverted
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

	// TODO: Replace consentsHardcoded with props.consents once API Change released
	const consentsHardcoded: ConsentOption[] = consents.map((consent) => {
		const match = consentsFixture.find(
			(hardConsent) => hardConsent.id === consent.id,
		);
		if (match) {
			return {
				id: consent.id,
				isChannel: consent.isChannel,
				isProduct: consent.isProduct,
				type: consent.type,
				subscribed: consent.subscribed,
				name: match.name,
				...('description' in match && {
					description: match.description,
				}),
			};
		}
		return consent;
	});

	const addMarketingToggle = optOutFinderAndInverter(
		consentsHardcoded,
		clickHandler,
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
				{addMarketingToggle('post_optout')}
				{addMarketingToggle('phone_optout')}
				{addMarketingToggle('market_research_optout')}
			</PageSection>
			<WithStandardTopMargin>
				<Lines n={1} />
			</WithStandardTopMargin>
			<WithStandardTopMargin>
				<PageSection
					title="Your data"
					description={<YourDataDescription />}
				>
					{addMarketingToggle('profiling_optout')}
				</PageSection>
			</WithStandardTopMargin>
		</>
	);
};

// TODO Replace with IDAPI model values once released
const consentsFixture: ConsentOption[] = [
	{
		id: 'market_research_optout',
		description:
			'From time to time we may contact you for market research purposes inviting you to complete a survey, or take part in a group discussion. Normally, this invitation would be sent via email, but we may also contact you by phone.',
		name: 'Allow the Guardian to contact me for market research purposes',
		isProduct: false,
		isChannel: false,
		type: ConsentOptionType.OPT_OUT,
		subscribed: false,
	},
	{
		id: 'post_optout',
		name: 'Allow the Guardian to send communications by post',
		isProduct: false,
		isChannel: false,
		type: ConsentOptionType.OPT_OUT,
		subscribed: true,
	},
	{
		id: 'profiling_optout',
		name: 'Allow the Guardian to analyse this data to improve marketing content',
		isProduct: false,
		isChannel: false,
		type: ConsentOptionType.OPT_OUT,
		subscribed: true,
	},
	{
		id: 'phone_optout',
		name: 'Allow the Guardian to send communications by telephone',
		isProduct: false,
		isChannel: true,
		type: ConsentOptionType.OPT_OUT,
		subscribed: false,
	},
];
