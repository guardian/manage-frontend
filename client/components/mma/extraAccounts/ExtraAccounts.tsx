import { css } from '@emotion/react';
import {
	headlineBold28,
	palette,
	space,
	textSans17,
	textSansBold17,
} from '@guardian/source/foundations';
import {
	SvgPersonRoundOutlined,
	SvgTickRound,
} from '@guardian/source/react-components';
import { Fragment, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useExtraAccounts } from '../../../utilities/hooks/useExtraAccounts';
import { GenericErrorScreen } from '../../shared/GenericErrorScreen';
import { NAV_LINKS } from '../../shared/nav/NavConfig';
import { SuccessMessage } from '../delivery/address/DeliveryAddressConfirmation';
import { PageContainer } from '../Page';
import { DefaultLoadingView } from '../shared/asyncComponents/DefaultLoadingView';
import { ProblemAlert } from '../shared/ProblemAlert';
import { ExtraAccountRow } from './ExtraAccountRow';

const MAX_ACCOUNTS = 3;

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
	background-color: ${palette.neutral[97]};
	padding: ${space[3]}px;
	padding-bottom: ${space[9]}px;

	p {
		${textSans17};
		margin: 0;
	}

	p + p {
		margin-top: ${space[3]}px;
	}
`;

const bodyCss = css`
	background-color: ${palette.neutral[100]};
	padding: ${space[3]}px;
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
		submitError,
	} = useExtraAccounts();
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	if (shouldRedirect) {
		return <Navigate to="/" replace />;
	}

	const usedCount = (accounts ?? []).filter(
		(account) => account.status !== 'empty',
	).length;

	return (
		<PageContainer
			selectedNavItem={NAV_LINKS.extraAccounts}
			pageTitle="Extra accounts"
			minimalFooter
		>
			<h2 css={subHeadingCss}>Manage extra accounts</h2>

			{successMessage && (
				<SuccessMessage
					message={successMessage}
					additionalCss={css`
						margin-bottom: ${space[5]}px;
					`}
				/>
			)}

			{submitError && (
				<ProblemAlert
					title="Something went wrong"
					message={submitError}
					additionalcss={css`
						margin-bottom: ${space[5]}px;
					`}
				/>
			)}

			{hasError ? (
				<GenericErrorScreen />
			) : isLoading || !accounts ? (
				<DefaultLoadingView loadingMessage="Loading your extra accounts..." />
			) : (
				<div css={cardCss}>
					<div css={introCss}>
						<p>
							You can share your subscription with up to{' '}
							{MAX_ACCOUNTS} people. Each account is individual.
							Your account data or billing information are not
							shared with the people you invite.
						</p>
					</div>

					<div css={bodyCss}>
						<div css={dotsRowCss}>
							{Array.from({ length: MAX_ACCOUNTS }).map(
								(_, index) =>
									index < usedCount ? (
										<SvgTickRound
											key={index}
											theme={{ fill: palette.brand[400] }}
										/>
									) : (
										<SvgPersonRoundOutlined
											key={index}
											theme={{
												fill: palette.neutral[60],
											}}
										/>
									),
							)}
						</div>

						<p css={usageCss}>
							<strong>
								{usedCount}/{MAX_ACCOUNTS} invitation
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
									onSuccessfulAction={setSuccessMessage}
								/>
							</Fragment>
						))}
					</div>
				</div>
			)}
		</PageContainer>
	);
};
