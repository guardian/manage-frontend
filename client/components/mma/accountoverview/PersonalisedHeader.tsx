import { css } from '@emotion/react';
import {
	from,
	headlineBold24,
	headlineBold28,
	space,
	textSans15,
	textSans17,
} from '@guardian/source/foundations';
import { min } from 'date-fns';
import { dateString } from '@/shared/dates';
import type { AppSubscription, MPAPIResponse } from '@/shared/mpapiResponse';
import type { MembersDataApiResponse } from '@/shared/productResponse';
import { isObserverProduct } from '@/shared/productResponse';
import { isProduct } from '@/shared/productResponse';

interface PersonalisedHeaderProps {
	mdapiResponse: MembersDataApiResponse;
	mpapiResponse?: MPAPIResponse;
}

export const PersonalisedHeader = ({
	mdapiResponse,
	mpapiResponse,
}: PersonalisedHeaderProps) => {
	const userDetails = mdapiResponse.user;

	if (
		!userDetails ||
		(mdapiResponse.products.length === 0 &&
			mpapiResponse?.subscriptions.length === 0)
	) {
		return null;
	}

	const productDetails = mdapiResponse.products.filter(isProduct);

	const oldestDate = min([
		...productDetails.map((p) => new Date(p.joinDate)),
		...(mpapiResponse
			? mpapiResponse.subscriptions.map(
					(s: AppSubscription) => new Date(s.from),
			  )
			: []),
	]);

	const supportStartYear = dateString(oldestDate, 'MMMM yyyy');

	const onlyHasObserverProducts =
		(!mpapiResponse || mpapiResponse.subscriptions.length === 0) &&
		productDetails.every(isObserverProduct);

	return (
		<hgroup
			css={css`
				margin-top: ${space[5]}px;

				${from.tablet} {
					margin-top: ${space[10]}px;
				}
			`}
		>
			<h2
				css={css`
					${headlineBold24};
					margin: 0;

					${from.tablet} {
						${headlineBold28};
					}
				`}
				data-qm-masking="blocklist"
			>
				Hi, {userDetails.firstName ?? 'supporter'}
			</h2>
			{!onlyHasObserverProducts && (
				<p
					css={css`
						margin: 0;
						margin-top: ${space[2]}px;
						${textSans15}

						${from.tablet} {
							${textSans17};
							margin-top: ${space[3]}px;
						}
					`}
				>
					Thank you for funding the Guardian's independent journalism
					since {supportStartYear}
				</p>
			)}
		</hgroup>
	);
};
