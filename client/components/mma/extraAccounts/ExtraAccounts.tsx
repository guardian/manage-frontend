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
import { InvitationSentIcon } from '../shared/assets/InvitationSentIcon';
import { DefaultLoadingView } from '../shared/asyncComponents/DefaultLoadingView';
import { ExtraAccountRow } from './ExtraAccountRow';

const extraAccountsFaqItems: FaqItem[] = [
	{
		id: 'what-is-extra-accounts',
		title: 'What is Extra accounts?',
		content:
			'Multiple accounts is a subscription benefit that allows Digital Plus subscribers to share their subscription access with up to three other people.',
	},
	{
		id: 'who-can-i-invite',
		title: 'Who can I invite to join Extra accounts?',
		content:
			'You can invite friends, family, or anyone you choose. Each person needs their own Guardian account to accept the invitation.',
	},
	{
		id: 'what-benefits',
		title: 'What benefits will invited members receive?',
		content:
			'Invited members get access to the same Digital Plus benefits as you, including ad-free reading and exclusive features.',
	},
	{
		id: 'cancel-or-change',
		title: 'What happens if I cancel or change my subscription?',
		content:
			'If you cancel or change your subscription, invited members will lose access when your Extra accounts benefit ends.',
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

	svg {
		width: ${space[6]}px;
		height: ${space[6]}px;
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

const faqsBandCss = css`
	width: 100%;
	background-color: ${palette.neutral[97]};

	padding-top: ${space[9]}px;
	padding-bottom: ${space[12]}px;

	${from.desktop} {
		margin-top: -${space[10]}px;
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
											<InvitationAvailableIcon
												key={index}
											/>
										);
									}

									if (account.status === 'pending') {
										return (
											<InvitationSentIcon key={index} />
										);
									}

									return (
										<SvgTickRound
											key={index}
											theme={{
												fill: palette.success[400],
											}}
										/>
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
							viewMoreHref="/help-centre"
						/>
					</div>
				</div>
			</section>
		</>
	);
};
