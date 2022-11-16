import { css } from '@emotion/react';
import { headline, space } from '@guardian/source-foundations';
import { useEffect, useState } from 'react';
import type { ProductDetail } from '../../../shared/productResponse';
import { Users } from '../identity/identity';
import type { User } from '../identity/models';

interface WelcomeMessageProps {
	activeProducts: ProductDetail[];
}

export const WelcomeMessage = ({ activeProducts }: WelcomeMessageProps) => {
	const [userDetails, setUserDetails] = useState<User>();

	useEffect(() => {
		Users.getCurrentUser().then((userDetails) =>
			setUserDetails(userDetails),
		);
	}, []);

	// The product detail array from AccountOverview is sorted by `joinDate` in
	// descending order so the last entry is the oldest product
	const oldestProduct = activeProducts[activeProducts.length - 1];
	const supportStartYear = new Date(oldestProduct.joinDate).getFullYear();

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
				Hello {userDetails.firstName}
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
