import { Stack } from '@guardian/source-react-components';
import { useContext, useEffect } from 'react';
import type {
	CancellationPageTitleInterface} from '@/client/components/mma/cancel/CancellationContainer';
import {
	CancellationPageTitleContext
} from '@/client/components/mma/cancel/CancellationContainer';
import {
	headingCss,
	sectionSpacing,
} from '../../../../../styles/GenericStyles';

export const DigiSubDiscountConfirm = () => {
	const pageTitleContext = useContext(
		CancellationPageTitleContext,
	) as CancellationPageTitleInterface;

	useEffect(() => {
		pageTitleContext.setPageTitle('Your subscription');
	}, []);

	return (
		<section css={sectionSpacing}>
			<Stack space={4}>
				<h2 css={headingCss}>Discount confirmed</h2>
			</Stack>
		</section>
	);
};
