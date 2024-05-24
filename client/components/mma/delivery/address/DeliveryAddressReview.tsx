import { css } from '@emotion/react';
import {
	brand,
	from,
	headline,
	neutral,
	space,
	textSans,
	until,
} from '@guardian/source/foundations';
import { Button, Stack } from '@guardian/source/react-components';
import { useContext, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import type {
	ProductType,
	WithProductType,
} from '../../../../../shared/productTypes';
import { CallCentreEmailAndNumbers } from '../../../shared/CallCenterEmailAndNumbers';
import { InfoSection } from '../../shared/InfoSection';
import { ProductDescriptionListTable } from '../../shared/ProductDescriptionListTable';
import { ProgressIndicator } from '../../shared/ProgressIndicator';
import { DeliveryAddressDisplay } from './DeliveryAddressDisplay';
import {
	AddressChangedInformationContext,
	convertToDescriptionListData,
	NewDeliveryAddressContext,
} from './DeliveryAddressFormContext';

export const DeliveryAddressReview = (props: WithProductType<ProductType>) => {
	const newDeliveryAddressContext = useContext(NewDeliveryAddressContext);
	const addressChangedInformationContext = useContext(
		AddressChangedInformationContext,
	);

	const [showTopCallCentreNumbers, setTopCallCentreNumbersVisibility] =
		useState<boolean>(false);

	const navigate = useNavigate();
	const location = useLocation();

	if (!newDeliveryAddressContext.addressStateObject?.addressLine1) {
		<Navigate to=".." replace />;
	}

	const subHeadingCss = `
    border-top: 1px solid ${neutral['86']};
    ${headline.small()};
    font-weight: bold;
    margin-top: 50px;
    ${until.tablet} {
      font-size: 1.25rem;
      line-height: 1.6;
    };
  `;

	const dtCss: string = `
    font-weight: bold;
    display: inline-block;
    vertical-align: top;
    min-width: 12ch;
  `;
	const ddCss: string = `
    margin: 0;
    display: inline-block;
    vertical-align: top;
    min-width: 12ch;
  `;

	return (
		<>
			<ProgressIndicator
				steps={[
					{ title: 'Update' },
					{ title: 'Review', isCurrentStep: true },
					{ title: 'Confirmation' },
				]}
				additionalCSS={css`
					margin-top: ${space[5]}px;
				`}
			/>
			<h2
				css={css`
					${subHeadingCss}
				`}
			>
				Review address details
			</h2>
			<div>
				{addressChangedInformationContext.length > 1 && (
					<InfoSection>
						Please note that changing your address here will update
						the delivery address for all of your subscriptions.
					</InfoSection>
				)}
				<section
					css={css`
						border: 1px solid ${neutral['86']};
						margin-top: ${space[5]}px;
					`}
				>
					<h2
						css={css`
							margin: 0;
							padding: ${space[3]}px;
							background-color: ${neutral['97']};
							border-bottom: 1px solid ${neutral['86']};
							${textSans.medium({ fontWeight: 'bold' })};
							${from.tablet} {
								padding: ${space[3]}px ${space[5]}px;
							}
						`}
					>
						Delivery address
						{props.productType.delivery
							?.enableDeliveryInstructionsUpdate &&
							' and instructions'}
					</h2>
					<dl
						css={css`
							padding: 0 ${space[3]}px;
							${textSans.medium()};
							display: flex;
							flex-wrap: wrap;
							flex-direction: column;
							justify-content: space-between;
							${from.tablet} {
								padding: 0 ${space[5]}px;
							}
						`}
					>
						<div
							css={css`
								flex-grow: 1;
							`}
						>
							<dt
								css={css`
									${dtCss}
								`}
							>
								Address
							</dt>
							<dd
								css={css`
									${ddCss}
								`}
							>
								{newDeliveryAddressContext.addressStateObject && (
									<DeliveryAddressDisplay
										{...newDeliveryAddressContext.addressStateObject}
									/>
								)}
							</dd>
						</div>
						<div
							css={css`
								flex-grow: 1;
								margin-top: 16px;
								${from.tablet} {
									margin-top: 0;
								}
							`}
						>
							<dt
								css={css`
									${dtCss}
								`}
							>
								Instruction
							</dt>
							<dd
								css={css`
									${ddCss}
								`}
							>
								{newDeliveryAddressContext.addressStateObject
									?.instructions || '-'}
							</dd>
						</div>
					</dl>
				</section>
				<p
					css={css`
						${textSans.medium()};
						margin-top: ${space[9]}px;
					`}
				>
					I understand that this address change will affect the
					following subscriptions
				</p>
				<ProductDescriptionListTable
					content={convertToDescriptionListData(
						addressChangedInformationContext,
					)}
					seperateEachRow
				/>
				<div
					css={css`
						margin-top: ${space[5]}px;
						* {
							display: inline-block;
						}
						${from.tablet} {
							margin-top: ${space[6]}px;
						}
					`}
				>
					<Button
						onClick={() => {
							navigate('../confirmed', {
								state: location.state,
							});
						}}
					>
						Submit details
					</Button>
					<Link
						to={'..'}
						css={css`
							${textSans.medium()};
							font-weight: bold;
							margin-left: 22px;
							color: ${brand[400]};
						`}
					>
						Go back
					</Link>
				</div>
				<Stack space={5}>
					<p
						css={css`
							${textSans.medium()};
							margin: ${space[12]}px 0 0;
							color: ${neutral[46]};
						`}
					>
						If you need separate delivery addresses for each of your
						subscriptions, please{' '}
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
							contact us
						</span>
						.
					</p>
					{showTopCallCentreNumbers && <CallCentreEmailAndNumbers />}
				</Stack>
			</div>
		</>
	);
};
