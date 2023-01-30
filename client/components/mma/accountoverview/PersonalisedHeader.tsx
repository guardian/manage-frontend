import { css } from '@emotion/react';
import { headline, space } from '@guardian/source-foundations';
import type { MembersDataApiResponse } from '../../../../shared/productResponse';
import { isProduct, sortByJoinDate } from '../../../../shared/productResponse';

interface PersonalisedHeaderProps {
	mdapiResponse: MembersDataApiResponse;
}

export const PersonalisedHeader = ({
	mdapiResponse,
}: PersonalisedHeaderProps) => {
	const userDetails = mdapiResponse.user;

	const productDetails = mdapiResponse.products
		.filter(isProduct)
		.sort(sortByJoinDate);
	const oldestProduct = productDetails[productDetails.length - 1];
	const supportStartYear = new Date(oldestProduct.joinDate).getFullYear();

	const calculatedTimeOfDay = () => {
		const userDate = new Date().getHours();

		if (userDate >= 0 && userDate <= 11) {
			return 'Good Morning';
		}
		if (userDate >= 12 && userDate <= 17) {
			return 'Good Afternoon';
		}
		if (userDate >= 18 && userDate <= 23) {
			return 'Good Evening';
		}
	};

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
				{calculatedTimeOfDay()} {userDetails.firstName ?? 'Reader'}
			</h2>
			<p
				css={css`
					${headline.xxxsmall()};
				`}
			>
				Thanks for supporting the Guardian since {supportStartYear}
			</p>
		</hgroup>
	) : null;
};
