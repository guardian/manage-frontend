import { css } from '@emotion/react';
import { headline } from '@guardian/source-foundations';
import { Stack } from '@guardian/source-react-components';
import { NAV_LINKS } from '../../shared/nav/NavConfig';
import { PageContainer } from '../Page';
import { sectionSpacing } from '../switch/SwitchStyles';
import { UpgradeSupportAmountForm } from './UpgradeSupportAmountForm';

export const UpgradeSupport = () => {
	return (
		<>
			<PageContainer
				selectedNavItem={NAV_LINKS.accountOverview}
				pageTitle={'Select your new support'}
				compactTitle
				minimalFooter
			>
				<section css={sectionSpacing}>
					<Stack space={3}>
						<h2
							css={css`
								${headline.xsmall({ fontWeight: 'bold' })};
								margin-bottom: 0;
							`}
						>
							1. Increase your support
						</h2>
						<UpgradeSupportAmountForm />
					</Stack>
				</section>
			</PageContainer>
		</>
	);
};
