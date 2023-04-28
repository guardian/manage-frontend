import {
	Button,
	Stack,
	SvgArrowRightStraight,
	SvgCalendar,
	SvgEnvelope,
} from '@guardian/source-react-components';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { Heading } from '../../shared/Heading';
import { iconListCss, sectionSpacing } from '../../switch/SwitchStyles';
import type { CancellationPageTitleInterface } from '../CancellationContainer';
import { CancellationPageTitleContext } from '../CancellationContainer';
import { buttonLayoutCss } from './SaveStyles';

export const SwitchThankYou = () => {
	const navigate = useNavigate();

	const pageTitleContext = useContext(
		CancellationPageTitleContext,
	) as CancellationPageTitleInterface;
	pageTitleContext.setPageTitle('Change your membership');

	return (
		<>
			<section css={sectionSpacing}>
				<Stack space={4}>
					<Heading>
						Thank you for continuing to support Guardian journalism
						every month
					</Heading>
				</Stack>
			</section>
			<section css={sectionSpacing}>
				<Stack space={4}>
					<Heading sansSerif>What happens next?</Heading>
					<ul css={[iconListCss]}>
						<li>
							<SvgEnvelope size="medium" />
							<span data-qm-masking="blocklist">
								We will send you a confirmation email to
								email@email.com
							</span>
						</li>
						<li>
							<SvgCalendar size="medium" />
							<span>
								This change will happen on your next billing
								date of XYZ. Until then, you have access to all
								of your current supporter extras
							</span>
						</li>
					</ul>
				</Stack>
			</section>
			<section css={sectionSpacing}>
				<div css={[buttonLayoutCss, { textAlign: 'left' }]}>
					<Button
						icon={<SvgArrowRightStraight />}
						iconSide="right"
						onClick={() => navigate('/')}
					>
						Back to your account
					</Button>
				</div>
			</section>
		</>
	);
};
