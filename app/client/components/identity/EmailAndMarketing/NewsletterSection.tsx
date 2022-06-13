import { FC } from 'react';
import palette from '../../../colours';
import { DropMenu } from '../DropMenu';
import { NewsletterPreference } from '../NewsletterPreference';
import { ConsentOption, Theme } from '../models';
import { PageSection } from '../PageSection';
import uniq from 'lodash/uniq';

type ClickHandler = (id: string) => {};

interface NewsletterSectionProps {
	newsletters: ConsentOption[];
	clickHandler: ClickHandler;
}

const newsletterPreference = (
	newsletter: ConsentOption,
	clickHandler: ClickHandler,
) => {
	const { id, name, description, frequency, subscribed, identityName } =
		newsletter;
	return (
		<NewsletterPreference
			id={id}
			key={id}
			title={name}
			// A newsletter always has identityName & frequency (see interface NewsletterAPIResponse)
			// but ConsentOption has these as optional so we need to keep ts happy by falling back to
			// "" here
			identityName={identityName || ''}
			frequency={frequency || ''}
			description={description || ''}
			selected={subscribed}
			onClick={clickHandler}
		/>
	);
};

function notEmpty<T>(value: T | undefined): value is T {
	return value !== undefined;
}

function getColor(theme: string): string {
	const colors: { [T in Theme]: string } = {
		[Theme.news]: palette.red.medium,
		[Theme.opinion]: palette.orange.medium,
		[Theme.features]: palette.neutral['1'],
		[Theme.sport]: palette.blue.medium,
		[Theme.culture]: '#a1845c',
		[Theme.lifestyle]: palette.pink.medium,
		[Theme.comment]: '#e05e00',
		[Theme.work]: palette.neutral['1'],
		[Theme.fromThePapers]: palette.neutral['1'],
	};

	if (theme in Theme) {
		return colors[theme as Theme];
	}
	return palette.neutral['1'];
}

const newsletterPreferenceGroups = (
	newsletters: ConsentOption[],
	clickHandler: ClickHandler,
) => {
	const themes = uniq(newsletters.map((_) => _.theme)).filter(notEmpty);

	return themes.map((theme) => (
		<DropMenu key={theme} color={getColor(theme)} title={theme}>
			{newsletters
				.filter((n) => n.theme === theme)
				.map((n) => newsletterPreference(n, clickHandler))}
		</DropMenu>
	));
};

export const NewsletterSection: FC<NewsletterSectionProps> = (props) => {
	const { newsletters, clickHandler } = props;
	return (
		<PageSection
			title="Your newsletters"
			description={`
        Our regular newsletters help you get closer to our quality,
        independent journalism. Pick the issues and topics that interest you
        below.`}
			subtext={`
        The Guardian’s newsletters include content from our website, which may
        be funded by outside parties. Newsletters may also display information
        about Guardian News and Media's other products, services or events
        (such as Guardian Jobs or Masterclasses), chosen charities or online
        advertisements.
      `}
		>
			{newsletterPreferenceGroups(newsletters, clickHandler)}
		</PageSection>
	);
};
