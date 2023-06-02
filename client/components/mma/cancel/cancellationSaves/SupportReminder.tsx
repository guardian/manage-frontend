import { CancellationContributionReminder } from '../cancellationContributionReminder';
import { headingCss, sectionSpacing } from './SaveStyles';

export const SupportReminder = () => {
	return (
		<section css={sectionSpacing}>
			<h2 css={headingCss}>
				We're sorry to see you go today. You can support us again any
				time.
			</h2>
			<CancellationContributionReminder />
		</section>
	);
};
