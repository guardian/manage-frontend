import { css } from '@emotion/react';
import { headline, space } from '@guardian/source-foundations';
import { dateString } from '../../../../shared/dates';
import type { MembersDataApiResponse } from '../../../../shared/productResponse';
import { isProduct, sortByJoinDate } from '../../../../shared/productResponse';

interface PersonalisedHeaderProps {
	mdapiResponse: MembersDataApiResponse;
}

function calculateTimeOfDay() {
	const currentHour = new Date().getHours();

	if (currentHour < 12) {
		return 'Good morning';
	}
	if (currentHour < 18) {
		return 'Good afternoon';
	}
	return 'Good evening';
}

export const PersonalisedHeader = ({
	mdapiResponse,
}: PersonalisedHeaderProps) => {
	const userDetails = mdapiResponse.user;

	const productDetails = mdapiResponse.products
		.filter(isProduct)
		.sort(sortByJoinDate);
	const oldestProduct = productDetails[productDetails.length - 1];
	const supportStartYear = dateString(
		new Date(oldestProduct.joinDate),
		'MMMM yyyy',
	);

	return userDetails ? (
		<hgroup
			css={css`
				margin-top: ${space[12]}px;
			`}
		>
			<h2
				css={css`
					${headline.large({ fontWeight: 'bold' })};
					margin-bottom: 0;
				`}
			>
				{calculateTimeOfDay()}, {userDetails.firstName ?? 'supporter'}
			</h2>
			<p
				css={css`
					${headline.xxxsmall()};
				`}
			>
				Thank you for funding the Guardian since {supportStartYear}
			</p>
		</hgroup>
	) : null;
};