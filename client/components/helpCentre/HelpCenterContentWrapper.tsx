import { useLocation } from 'react-router-dom';
import { SectionContent } from '../shared/SectionContent';
import { SectionHeader } from '../shared/SectionHeader';
import { KnownIssues } from './KnownIssues';

interface HelpCenterContentWrapperProps {
	children: React.ReactNode;
}

const pathsWithNav = ['/help-centre/topic/', '/help-centre/article/'];

export const HelpCenterContentWrapper = (
	props: HelpCenterContentWrapperProps,
) => {
	const location = useLocation();
	const headerTitle = location.pathname.startsWith('/help-centre/contact-us')
		? 'Need to contact us?'
		: 'How can we help you?';
	if (pathsWithNav.some((path) => location.pathname.startsWith(path))) {
		return (
			<>
				<SectionHeader title={headerTitle} pageHasNav={true} />
				<SectionContent hasNav={true}>{props.children}</SectionContent>
			</>
		);
	}
	return (
		<>
			<SectionHeader title={headerTitle} />
			<KnownIssues />
			<SectionContent>{props.children}</SectionContent>
		</>
	);
};
