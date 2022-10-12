import { css } from '@emotion/react';
import {
	from,
	headline,
	neutral,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';
import { LinkButton } from '@guardian/source-react-components';
import type { SelfServiceCancellation } from '../../../shared/productResponse';
import type { ProductType } from '../../../shared/productTypes';
import { CallCentreEmailAndNumbers } from '../callCenterEmailAndNumbers';
import { NAV_LINKS } from '../nav/navConfig';
import { ProductDescriptionListTable } from '../productDescriptionListTable';

interface ContactUsToCancelProps {
	selfServiceCancellation: SelfServiceCancellation;
	subscriptionId: string;
	productType: ProductType;
}

export const ContactUsToCancel = (props: ContactUsToCancelProps) => {
	const subHeadingTitleCss = `
    ${headline.small()};
    font-weight: bold;
    ${until.tablet} {
      font-size: 1.25rem;
      line-height: 1.6;
    };
  `;
	const subHeadingBorderTopCss = `
    border-top: 1px solid ${neutral['86']};
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
						title: 'Subscription ID',
						value: props.subscriptionId,
					},
				]}
			/>
			<p
				css={css`
					${textSans.medium()}
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
