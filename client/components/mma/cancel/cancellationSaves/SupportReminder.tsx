import { CancellationContributionReminder } from '../cancellationContributionReminder';
import { headingCss, sectionSpacing } from './SaveStyles';

export const SupportReminder = () => {
	return (
		<section css={sectionSpacing}>
			<h2 css={headingCss}>
				We're sorry to see you go today.
				<span css={{ display: 'block' }}>
					You can support us again any time.
				</span>
			</h2>
			<CancellationContributionReminder />
		</section>
	);
};
