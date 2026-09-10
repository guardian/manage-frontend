import { css } from '@emotion/react';
import {
	breakpoints,
	from,
	headlineBold28,
	palette,
	space,
	textSans17,
	textSansBold17,
} from '@guardian/source/foundations';
import { SvgTickRound } from '@guardian/source/react-components';
import { Fragment } from 'react';
import { Navigate } from 'react-router-dom';
import { gridBase, gridItemPlacement } from '../../../styles/grid';
import { MAX_EXTRA_ACCOUNTS } from '../../../utilities/extraAccounts';
import { useExtraAccounts } from '../../../utilities/hooks/useExtraAccounts';
import type { FaqItem } from '../../shared/Faqs';
import { Faqs } from '../../shared/Faqs';
import { GenericErrorScreen } from '../../shared/GenericErrorScreen';
import { NAV_LINKS } from '../../shared/nav/NavConfig';
import { PageContainer } from '../Page';
import { InvitationAvailableIcon } from '../shared/assets/InvitationAvailableIcon';
import { DefaultLoadingView } from '../shared/asyncComponents/DefaultLoadingView';
import { ExtraAccountRow } from './ExtraAccountRow';

const extraAccountsFaqItems: FaqItem[] = [
	{
		id: 'what-are-extra-accounts',
		title: 'What are extra accounts?',
		content: [
			'Extra accounts is a subscription benefit that allows eligible subscribers to share their Guardian access with up to three other people.',
		],
	},
	{
		id: 'who-can-i-invite',
		title: 'Who can I invite to join?',
		content: [
			'You can invite friends to join your subscription. They must be aged 18 or older and have a valid email address.',
		],
	},
	{
		id: 'what-benefits',
		title: 'What benefits will invited members receive?',
		content: [
			'Each invited member will have an individual account with their own login. Invited users will receive the same access to the Guardian as the primary account holder, including the Guardian app, Feast, Editions, ad-free reading and more.',
		],
	},
	{
		id: 'what-information-can-people-see',
		title: 'What information can people I invite see?',
		content: [
			'People you invite will not be able to see your account data, billing information or payment details, only your email address and first name',
			'Each invited member will have their own individual Guardian account and login. Their account, reading history, activity and preferences will remain separate from yours.',
		],
	},
	{
		id: 'cancel-or-change',
		title: 'What happens if I cancel or change my subscription?',
		content: [
			'If you cancel your subscription or change to a subscription that doesn’t include extra accounts, all invited members will automatically have their access cancelled. Invited members will be notified of this via email.',
		],
	},
];

const subHeadingCss = css`
	${headlineBold28};
	margin-top: ${space[5]}px;
`;

const cardCss = css`
	margin-top: ${space[5]}px;
	border: 1px solid ${palette.neutral[86]};
	border-radius: ${space[2]}px;
	overflow: hidden;
`;

const introCss = css`
	display: flex;
	flex-direction: column-reverse;
	justify-content: space-between;
	gap: ${space[3]}px;
	background-color: ${palette.neutral[97]};

	${from.tablet} {
		flex-direction: row;
	}
`;

const introTextCss = css`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	gap: ${space[2]}px;
	flex: 2;
	margin: ${space[3]}px;
	margin-bottom: ${space[9]}px;

	p {
		${textSans17};
		margin: 0;
	}
`;

const bodyCss = css`
	background-color: ${palette.neutral[100]};
	padding: ${space[3]}px;
	padding-bottom: 0;
`;

const dotsRowCss = css`
	display: flex;
	align-items: center;
	gap: ${space[1]}px;
	margin: ${space[1]}px 0;
`;

const dotCss = css`
	display: flex;

	svg {
		width: ${space[6]}px;
		height: ${space[6]}px;
	}
`;

const sourceDotCss = css`
	svg {
		width: 36px;
		height: 36px;
		margin: -6px;
	}
`;

const usageCss = css`
	${textSans17};
	margin: ${space[1]}px 0 ${space[3]}px 0;

	strong {
		${textSansBold17};
	}
`;

const dividerCss = css`
	border-top: 1px solid ${palette.neutral[86]};
`;

const imagePlaceholderCss = css`
	width: 100%;
	aspect-ratio: 25 / 9;
	background-color: ${palette.neutral[86]};
	border-radius: ${space[2]}px;
	align-self: center;

	${from.tablet} {
		flex: 1;
		aspect-ratio: 5 / 3;
	}
`;

const GAP_ABOVE_FAQS = 72;

const faqsBandCss = css`
	width: 100%;
	background-color: ${palette.neutral[97]};

	margin-top: calc(${GAP_ABOVE_FAQS}px - ${space[12]}px);
	padding-top: ${space[9]}px;
	padding-bottom: ${space[12]}px;

	${from.desktop} {
		margin-top: calc(${GAP_ABOVE_FAQS}px - ${space[24]}px);
		padding-top: ${space[14]}px;
		padding-bottom: ${space[24]}px;
	}
`;

const faqsInnerCss = css({
	...gridBase,
	maxWidth: `calc(${breakpoints.wide}px + 2.5rem)`,
	margin: '0 auto',
});

const faqsContentCss = css({
	...gridItemPlacement(1, 4),

	[from.tablet]: {
		...gridItemPlacement(1, 12),
	},

	[from.desktop]: {
		...gridItemPlacement(5, 8),
	},

	[from.wide]: {
		...gridItemPlacement(6, 10),
	},
});

export const ExtraAccounts = () => {
	const {
		accounts,
		isLoading,
		hasError,
		shouldRedirect,
		sendInvitation,
		cancelInvitation,
		removeAccess,
		isSubmitting,
	} = useExtraAccounts();

	if (shouldRedirect) {
		return <Navigate to="/" replace />;
	}

	const usedCount = (accounts ?? []).filter(
		(account) => account.status !== 'empty',
	).length;
	const allInvitesUsed = usedCount === MAX_EXTRA_ACCOUNTS;

	return (
		<>
			<PageContainer
				selectedNavItem={NAV_LINKS.extraAccounts}
				pageTitle="Extra accounts"
				minimalFooter
			>
				<h2 css={subHeadingCss}>Manage extra accounts</h2>

				{hasError ? (
					<GenericErrorScreen />
				) : isLoading || !accounts ? (
					<DefaultLoadingView loadingMessage="Loading your extra accounts..." />
				) : (
					<div css={cardCss}>
						<div css={introCss}>
							<div css={introTextCss}>
								{allInvitesUsed ? (
									<>
										<p>
											Nice, you're sharing all your extra
											accounts!
										</p>
										<p>
											Each account is individual. Your
											account data or billing information
											are not shared with the people you
											invite.
										</p>
										<p>
											You can remove access at any time.
										</p>
									</>
								) : (
									<>
										<p>
											You have up to three extra accounts
											to share.
										</p>
										<p>
											Each person gets their own account
											and login. Your account data and
											billing information are not shared
											with the people you invite, and your
											reading experience is completely
											personal to you.
										</p>
									</>
								)}
							</div>
							<div css={imagePlaceholderCss} />
						</div>

						<div css={bodyCss}>
							<div css={dotsRowCss}>
								{accounts.map((account, index) => {
									if (account.status === 'empty') {
										return (
											<span key={index} css={dotCss}>
												<InvitationAvailableIcon />
											</span>
										);
									}

									return (
										<span
											key={index}
											css={[dotCss, sourceDotCss]}
										>
											<SvgTickRound
												theme={{
													fill:
														account.status ===
														'pending'
															? palette
																	.specialReportAlt[300]
															: palette
																	.success[400],
												}}
											/>
										</span>
									);
								})}
							</div>

							<p css={usageCss}>
								<strong>
									{usedCount}/{MAX_EXTRA_ACCOUNTS} invitations
								</strong>{' '}
								being used
							</p>

							{accounts.map((account, index) => (
								<Fragment key={index}>
									<div css={dividerCss} />
									<ExtraAccountRow
										account={account}
										sendInvitation={sendInvitation}
										cancelInvitation={cancelInvitation}
										removeAccess={removeAccess}
										isSubmitting={isSubmitting}
									/>
								</Fragment>
							))}
						</div>
					</div>
				)}
			</PageContainer>

			<section css={faqsBandCss}>
				<div css={faqsInnerCss}>
					<div css={faqsContentCss}>
						<Faqs
							items={extraAccountsFaqItems}
							viewMoreHref="https://help.theguardian.com/article/what-are-extra-accounts-and-how-do-i-use-them"
							viewMoreLabel="See our full FAQs"
						/>
					</div>
				</div>
			</section>
		</>
	);
};
