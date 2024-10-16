import { palette } from '@guardian/source/foundations';
import uniq from 'lodash/uniq';
import type { FC } from 'react';
import { DropMenu } from '../DropMenu';
import type { ConsentOption } from '../models';
import { NewsletterGroup } from '../models';
import { NewsletterPreference } from '../NewsletterPreference';
import { PageSection } from '../PageSection';

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

function getGroupColor(group: string): string {
	const colors: { [T in NewsletterGroup]: string } = {
		[NewsletterGroup.newsInBrief]: palette.news[400],
		[NewsletterGroup.newsInDepth]: palette.news[400],
		[NewsletterGroup.opinion]: palette.opinion[500],
		[NewsletterGroup.features]: palette.neutral[7],
		[NewsletterGroup.sport]: palette.sport[400],
		[NewsletterGroup.culture]: '#a1845c',
		[NewsletterGroup.lifestyle]: palette.lifestyle[400],
		[NewsletterGroup.work]: palette.neutral[7],
		[NewsletterGroup.fromThePapers]: palette.neutral[7],
	};

	if (Object.values(NewsletterGroup).includes(group as NewsletterGroup)) {
		return colors[group as NewsletterGroup];
	}
	return palette.neutral[7];
}

const newsletterPreferenceGroups = (
	newsletters: ConsentOption[],
	clickHandler: ClickHandler,
) => {
	const groups = uniq(newsletters.map((_) => _.group)).filter(notEmpty);
	return groups.map((group) => (
		<DropMenu
			key={group}
			color={getGroupColor(group.toLowerCase())}
			title={group}
		>
			{newsletters
				.filter((n) => n.group === group)
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
        (such as Guardian Jobs), chosen charities or online
        advertisements.
      `}
		>
			{newsletterPreferenceGroups(newsletters, clickHandler)}
		</PageSection>
	);
};
