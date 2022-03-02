import { css } from '@emotion/core';
import { LinkButton } from '@guardian/src-button';
import { space } from '@guardian/src-foundations';
import { neutral } from '@guardian/src-foundations/palette';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { SelfServiceCancellation } from '../../../shared/productResponse';
import { ProductType } from '../../../shared/productTypes';
import { maxWidth, minWidth } from '../../styles/breakpoints';
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
    ${maxWidth.tablet} {
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
					${minWidth.tablet} {
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
