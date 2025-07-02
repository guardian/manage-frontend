import { css } from '@emotion/react';
import {
	breakpoints,
	from,
	palette,
	space,
	textSans17,
	textSansBold17,
} from '@guardian/source/foundations';
import { useEffect, useState } from 'react';
import type { MembersDataApiResponse } from '../../../shared/productResponse';
import { isProduct } from '../../../shared/productResponse';
import { gridBase, gridItemPlacement } from '../../styles/grid';
import { allRecurringProductsDetailFetcher } from '../../utilities/productUtils';
import { ErrorIcon } from '../mma/shared/assets/ErrorIcon';

/*
 * NOTE: The abililty to load the known issues from a json file in an S3 bucket exists.
 * The code to do so has been commented out on the client and server in:
 *  - client/components/helpCentre/KnownIssues.tsx
 *  - server/routes/api.ts (the '/known-issues route')
 *
 *  If in the future a CMS of some kind can be constructed to enable
 *  a non-developer to curate the issues then this code can be
 *  reinstated (if the issues are to be stored in s3)
 */

export interface KnownIssueObj {
	date: string; // "29 Aug 1997 02:40"
	message: string;
	link?: string; // optional href that is rendered after the message
	affectedProducts?: string[]; // maps to productDetail.mmaProductKey property
}

interface KnownIssuesProp {
	issues: KnownIssueObj[];
}

export const KnownIssues = (props: KnownIssuesProp) => {
	const [issuesData, setIssuesData] = useState<KnownIssueObj[]>([]);
	useEffect(() => {
		(async () => {
			/*
			 * client side implementation of loading known issues
			 * externally (s3)
			const knownIssuesResponse = await fetch('/api/known-issues/');
			const knownIssues: Issue[] = knownIssuesResponse.ok
				? await knownIssuesResponse.json()
				: [];
			*/
			const unfilteredDateSortedIssues = props.issues.sort(
				(a, b) => Date.parse(a.date) - Date.parse(b.date),
			);
			const responseContainsProductIssues = props.issues.some(
				(issue: KnownIssueObj) => !!issue.affectedProducts?.length,
			);
			const globalIssues = unfilteredDateSortedIssues.filter(
				(issue) => !issue.affectedProducts,
			);
			setIssuesData(globalIssues);

			if (
				responseContainsProductIssues &&
				typeof window !== 'undefined'
			) {
				const signInStatus: string =
					window.guardian?.identityDetails?.signInStatus || '';
				if (signInStatus === 'signedInRecently') {
					const productDetailsResponse =
						await allRecurringProductsDetailFetcher();
					const mdapiResponse: MembersDataApiResponse =
						await productDetailsResponse.json();
					const userProductNames = mdapiResponse.products
						.filter(isProduct)
						.map((productDetail) => productDetail.mmaProductKey);

					const productIssues = unfilteredDateSortedIssues.filter(
						(issue) =>
							issue.affectedProducts?.some((product) =>
								userProductNames.includes(product),
							),
					);
					setIssuesData(globalIssues.concat(productIssues));
				}
			}
		})();
	}, [props.issues]);

	const containerCss = css`
		border-left: 1px solid #dcdcdc;
		border-right: 1px solid #dcdcdc;
		max-width: ${breakpoints.wide}px;
		margin: 0 auto;
		padding-top: ${space[4]}px;
		${from.tablet} {
			padding-top: ${space[5]}px;
		}
	`;

	const issuesContainerCss = css`
		padding-top: ${space[3]}px;
		${{ ...gridBase }};
	`;

	const divCss = css`
		border: 4px solid ${palette.error[400]};
		padding: ${space[3]}px ${space[3]}px ${space[3]}px 42px;
		position: relative;
		${{ ...gridItemPlacement(1, 4) }}

		${from.tablet} {
			${{ ...gridItemPlacement(1, 12) }}
		}

		${from.desktop} {
			${{ ...gridItemPlacement(3, 9) }}
		}

		${from.wide} {
			${{ ...gridItemPlacement(3, 12) }}
		}
	`;

	const iconCss = css`
		position: absolute;
		top: ${space[4]}px;
		left: ${space[3]}px;
	`;

	const h4Css = css`
		${textSansBold17};
		color: ${palette.error[400]};
		margin: 0;
	`;

	const aCss = css`
		${textSans17};
		text-decoration: underline;
		color: ${palette.neutral[0]};
	`;

	return (
		<>
			{!!issuesData.length && (
				<div css={containerCss}>
					{issuesData.map((issue, index) => (
						<div key={`issue${index}`} css={issuesContainerCss}>
							<div css={divCss}>
								<i css={iconCss}>
									<ErrorIcon />
								</i>
								<h4 css={h4Css}>{issue.message}</h4>
								{issue.link && (
									<a
										css={aCss}
										href={issue.link}
										rel="noreferrer"
										target="_blank"
									>
										Click here for more information
									</a>
								)}
							</div>
						</div>
					))}
				</div>
			)}
		</>
	);
};
