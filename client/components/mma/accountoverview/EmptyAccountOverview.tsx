import { css } from '@emotion/react';
import {
	brand,
	headline,
	neutral,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';
import { useState } from 'react';
import { CallCentreEmailAndNumbers } from '../../shared/CallCenterEmailAndNumbers';
import { SupportTheGuardianButton } from '../../shared/SupportTheGuardianButton';
import { Users } from '../identity/identity';
import { InfoIconDark } from '../shared/assets/InfoIconDark';

export const EmptyAccountOverview = () => {
	const [userEmailAddress, setUserEmailAddress] = useState('-');
	Users.getCurrentUser().then((info) =>
		setUserEmailAddress(info.primaryEmailAddress),
	);
	const [showTopCallCentreNumbers, setTopCallCentreNumbersVisibility] =
		useState<boolean>(false);

	return (
		<>
			<h2
				css={css`
					margin-top: 50px;
					border-top: 1px solid ${neutral['86']};
					${headline.small()};
					font-weight: bold;
					${until.tablet} {
						font-size: 1.25rem;
						line-height: 1.6;
					}
				`}
			>
				Welcome to your Guardian account
			</h2>
			<p
				css={css`
					${textSans.medium()};
				`}
			>
				When you subscribe or contribute, you’ll be able to see your
				support information here. There’s currently no active
				subscription, membership or recurring contribution linked to
				this email address.
			</p>
			<dl
				css={css`
					${textSans.medium()}
					background-color: ${neutral[97]};
					border: 1px solid ${neutral[86]};
					margin: 30px 0 0 0;
					padding: ${space[5]}px;
				`}
			>
				<dt
					css={css`
						font-weight: bold;
						margin: 0;
						padding: 0;
						display: inline-block;
						min-width: 13ch;
					`}
				>
					Email address
				</dt>
				<dd
					css={css`
						margin: 0;
						padding: 0;
						display: inline-block;
						overflow-wrap: anywhere;
					`}
					data-qm-masking="blocklist"
				>
					{userEmailAddress}
				</dd>
			</dl>
			<p
				css={css`
					${textSans.medium()};
					margin: ${space[6]}px 0 30px 0;
				`}
			>
				Please consider supporting our journalism via a new subscription
				or contribution.
			</p>
			<SupportTheGuardianButton
				supportReferer={'account_overview_no_product'}
			/>
			<div
				css={css`
					margin: ${space[6]}px 0 0 0;
					padding: 0 0 0 ${space[6]}px;
					position: relative;
				`}
			>
				<i
					css={css`
						position: absolute;
						top: 2px;
						left: 0;
					`}
				>
					<InfoIconDark fillColor={brand[500]} />
				</i>
				<p
					css={css`
						margin: 0;
						padding: 0;
						${textSans.medium()}
					`}
				>
					If you are already supporting the Guardian, it may be linked
					to a different email address. Please check that you are
					logged in using the correct account or contact our customer
					service team for help.{' '}
					<span
						css={css`
							cursor: pointer;
							color: ${brand[500]};
							text-decoration: underline;
						`}
						onClick={() =>
							setTopCallCentreNumbersVisibility(
								!showTopCallCentreNumbers,
							)
						}
					>
						Contact us
					</span>
					.
				</p>
				{showTopCallCentreNumbers && (
					<div
						css={css`
							margin-top: ${space[5]}px;
						`}
					>
						<CallCentreEmailAndNumbers />
					</div>
				)}
			</div>
		</>
	);
};
