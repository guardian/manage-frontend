import { css } from '@emotion/react';
import { headline, space } from '@guardian/source-foundations';
import { min } from 'date-fns';
import { dateString } from '@/shared/dates';
import type { MPAPIResponse } from '@/shared/mpapiResponse';
import type { MembersDataApiResponse } from '@/shared/productResponse';
import { isProduct } from '@/shared/productResponse';

interface PersonalisedHeaderProps {
	mdapiResponse: MembersDataApiResponse;
	mpapiResponse: MPAPIResponse;
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
	mpapiResponse,
}: PersonalisedHeaderProps) => {
	const userDetails = mdapiResponse.user;

	if (
		!userDetails ||
		(mdapiResponse.products.length === 0 &&
			mpapiResponse.subscriptions.length === 0)
	) {
		return null;
	}

	const productDetails = mdapiResponse.products.filter(isProduct);

	const oldestDate = min([
		...productDetails.map((p) => new Date(p.joinDate)),
		...mpapiResponse.subscriptions.map((s) => new Date(s.from)),
	]);

	const supportStartYear = dateString(oldestDate, 'MMMM yyyy');

	return (
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
				data-qm-masking="blocklist"
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
	);
};
