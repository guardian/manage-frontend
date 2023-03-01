import { SingleProductDetail } from '../../../shared/productResponse';
import { css } from '@emotion/react';
import {
	brand,
	from,
	neutral,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';
import { dateAddMonths, dateIsAfter, dateString } from '../../../shared/dates';
import { SupportTheGuardianButton } from '../supportTheGuardianButton';
import { lowerCase } from 'lodash';
import { Button } from '../buttons';
import { LinkButton } from '@guardian/source-react-components';
import { DropMenu } from '../identity/DropMenu';
import { CancellationContributionReminder } from '../cancel/cancellationContributionReminder';

interface SingleProductCardProps {
	productDetail: SingleProductDetail;
}
export const SingleProductCard = (props: SingleProductCardProps) => {
	const productDetail = props.productDetail;

	const postContributionActionsAvailable =
		dateIsAfter(
			new Date(productDetail.created),
			dateAddMonths(new Date(), -1),
		) && productDetail.status === 'Paid';

	return (
		<div
			css={css`
				border: 1px solid ${neutral[86]};
			`}
		>
			<div
				css={css`
					display: flex;
					justify-content: space-between;
					align-items: start;
					background-color: ${productDetail.refunded
						? neutral[0]
						: brand[400]};
					${from.mobileLandscape} {
						align-items: center;
					}
					padding-right: ${space[3]}px;
				`}
			>
				<h3
					css={css`
						font-size: 17px;
						font-weight: bold;
						margin: 0;
						padding: ${space[3]}px;
						color: ${neutral[100]};
						${until.mobileLandscape} {
							padding: ${space[3]}px;
						}
						${from.tablet} {
							font-size: 20px;
							padding: ${space[3]}px ${space[5]}px;
						}
					`}
				>
					{dateString(
						new Date(productDetail.created),
						`EEEE d MMMM yyyy`,
					)}
				</h3>
				{!postContributionActionsAvailable &&
					!productDetail.refunded && (
						<SupportTheGuardianButton
							alternateButtonText="Contribute again"
							supportReferer="payment_flow"
							theme="brand"
							size="small"
							urlSuffix="/contribute"
						/>
					)}
			</div>
			<div
				css={css`
					padding: ${space[5]}px ${space[3]}px;
					${from.tablet} {
						padding: ${space[5]}px;
						display: flex;
					}
				`}
			>
				<div
					css={css`
						margin: 0;
						padding: 0;
						${from.tablet} {
							flex: 1;
							display: flex;
							flex-flow: column nowrap;
						}
					`}
				>
					<ul
						css={css`
							list-style: none;
							margin: 0;
							padding: 0;
						`}
					>
						<li
							css={css`
								${textSans.medium({})};
								margin: 0 0 16px 0;
								padding: 0 ${space[2]}px 0 0;
								display: inline-block;
								vertical-align: top;
							`}
						>
							{productDetail.status === 'Refunded' &&
							productDetail.refunded ? (
								<>
									Your{' '}
									<b>
										{productDetail.currencyIdentifier}
										{productDetail.amount}
									</b>{' '}
									contribution made to the Guardian at
									{dateString(
										new Date(productDetail.created),
										` HH:mm`,
									)}
									{lowerCase(
										dateString(
											new Date(productDetail.created),
											`a`,
										),
									)}
									&nbsp;on this day, was successfully{' '}
									<b>refunded</b> on
									{dateString(
										new Date(productDetail.refunded),
										` EEEE d MMMM yyyy 'at' HH:mm`,
									)}
									{lowerCase(
										dateString(
											new Date(productDetail.refunded),
											`a`,
										),
									)}
									.
								</>
							) : (
								<>
									You supported the Guardian with a{' '}
									<b>
										{productDetail.currencyIdentifier}
										{productDetail.amount}
									</b>{' '}
									contribution via{' '}
									<b>
										{productDetail.payment_provider ===
										'Stripe'
											? 'credit card'
											: productDetail.payment_provider}
									</b>{' '}
									at{' '}
									{dateString(
										new Date(productDetail.created),
										`HH:mm`,
									)}
									{lowerCase(
										dateString(
											new Date(productDetail.created),
											`a`,
										),
									)}{' '}
									on this day.
								</>
							)}
						</li>
					</ul>
					{postContributionActionsAvailable && (
						<div>
							<div
								css={css`
									margin-bottom: ${space[5]}px;
								`}
							>
								<Button
									text="Refund this contribution"
									fontWeight="bold"
									onClick={() => {
										alert(
											`Refunded ${productDetail.payment_id}`,
										);
									}}
								/>
								&nbsp;
								{productDetail.payment_provider ===
									'Paypal' && (
									<LinkButton
										cssOverrides={css`
											padding-bottom: 0px;
										`}
										role="link"
										priority="secondary"
										size="small"
										onClick={() => {
											alert(
												`Donated ${productDetail.payment_id}`,
											);
										}}
									>
										{`Donate this contribution`}
									</LinkButton>
								)}
							</div>
							<div>
								<DropMenu
									color={brand[500]}
									title="Set reminder"
								>
									<CancellationContributionReminder />
								</DropMenu>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
