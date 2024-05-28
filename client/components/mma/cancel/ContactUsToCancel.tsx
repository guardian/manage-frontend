import { css } from '@emotion/react';
import {
	from,
	headlineBold28,
	palette,
	space,
	textSans17,
	until,
} from '@guardian/source/foundations';
import { LinkButton } from '@guardian/source/react-components';
import type { SelfServiceCancellation } from '../../../../shared/productResponse';
import type { GroupedProductType } from '../../../../shared/productTypes';
import { CallCentreEmailAndNumbers } from '../../shared/CallCenterEmailAndNumbers';
import { NAV_LINKS } from '../../shared/nav/NavConfig';
import { ProductDescriptionListTable } from '../shared/ProductDescriptionListTable';

interface ContactUsToCancelProps {
	selfServiceCancellation: SelfServiceCancellation;
	subscriptionId: string;
	groupedProductType: GroupedProductType;
}

export const ContactUsToCancel = (props: ContactUsToCancelProps) => {
	const subHeadingTitleCss = `
		${headlineBold28};
		${until.tablet} {
			font-size: 1.25rem;
			line-height: 1.6;
		};
	`;

	const subHeadingBorderTopCss = `
		border-top: 1px solid ${palette.neutral['86']};
		margin: 50px 0 ${space[5]}px;
	`;

	const subHeadingCss = `
		${subHeadingBorderTopCss}
		${subHeadingTitleCss}
	`;

	return (
		<>
			<h2
				css={css`
					${subHeadingCss}
				`}
			>
				Contact us to cancel
			</h2>
			<ProductDescriptionListTable
				content={[
					{
						title: props.groupedProductType.showSupporterId
							? 'Supporter ID'
							: 'Subscription ID',
						value: props.subscriptionId,
					},
				]}
			/>
			<p
				css={css`
					${textSans17};
				`}
			>
				Please contact our Customer Service team. You can find the
				contact details for your region below.
			</p>
			<CallCentreEmailAndNumbers
				hideEmailAddress={
					!props.selfServiceCancellation.shouldDisplayEmail
				}
				phoneRegionFilterKeys={
					props.selfServiceCancellation.phoneRegionsToDisplay
				}
			/>
			<LinkButton
				css={css`
					margin-top: ${space[3]}px;
					${from.tablet} {
						margin-top: ${space[5]}px;
					}
				`}
				href={NAV_LINKS.accountOverview.link}
			>
				Return to your account
			</LinkButton>
		</>
	);
};
