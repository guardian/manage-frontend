import { css } from '@emotion/react';
import { from } from '@guardian/source-foundations';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import type { MembersDataApiResponse } from '../../../../../shared/productResponse';
import {
	isProduct,
	MembersDataApiAsyncLoader,
} from '../../../../../shared/productResponse';
import type {
	ProductType,
	WithProductType,
} from '../../../../../shared/productTypes';
import { GROUPED_PRODUCT_TYPES } from '../../../../../shared/productTypes';
import type { ContactIdToArrayOfProductDetailAndProductType } from '../../../../utilities/deliveryAddress';
import {
	addressChangeAffectedInfo,
	getValidDeliveryAddressChangeEffectiveDates,
} from '../../../../utilities/deliveryAddress';
import { createProductDetailFetcher } from '../../../../utilities/productUtils';
import { NAV_LINKS } from '../../../shared/nav/NavConfig';
import { COUNTRIES } from '../../identity/models';
import { PageContainer } from '../../Page';
import {
	AddressChangedInformationContext,
	ContactIdContext,
	NewDeliveryAddressContext,
} from './DeliveryAddressFormContext';

interface ContextAndOutletContainerProps {
	contactIdToArrayOfProductDetailAndProductType: ContactIdToArrayOfProductDetailAndProductType;
	productType: ProductType;
}

const renderContextAndOutletContainer =
	(productType: ProductType) => (mdapiResponse: MembersDataApiResponse) => {
		return (
			<ContextAndOutletContainer
				contactIdToArrayOfProductDetailAndProductType={getValidDeliveryAddressChangeEffectiveDates(
					mdapiResponse.products
						.filter(isProduct)
						.filter((_) => _.subscription.readerType !== 'Gift'),
				)}
				productType={productType}
			/>
		);
	};

const ContextAndOutletContainer = (props: ContextAndOutletContainerProps) => {
	const existingDeliveryAddress = Object.values(
		props.contactIdToArrayOfProductDetailAndProductType,
	)[0][0].productDetail.subscription.deliveryAddress;

	const [addressLine1, setAddressLine1] = useState(
		existingDeliveryAddress?.addressLine1 || '',
	);
	const [addressLine2, setAddressLine2] = useState(
		existingDeliveryAddress?.addressLine2 || '',
	);
	const [town, setTown] = useState(existingDeliveryAddress?.town || '');
	const [region, setRegion] = useState(existingDeliveryAddress?.region || '');
	const [postcode, setPostcode] = useState(
		existingDeliveryAddress?.postcode || '',
	);

	const [country, setCountry] = useState(
		existingDeliveryAddress?.country
			? COUNTRIES.find(
					(countryObj) =>
						existingDeliveryAddress?.country === countryObj.iso,
			  )?.name || existingDeliveryAddress?.country
			: '',
	);
	const [instructions, setInstructions] = useState(
		existingDeliveryAddress?.instructions || '',
	);

	const addressSetStateObject = {
		setAddressLine1,
		setAddressLine2,
		setTown,
		setRegion,
		setPostcode,
		setCountry,
		setInstructions,
	};

	const addressStateObject = {
		addressLine1,
		addressLine2,
		town,
		region,
		postcode,
		country,
		instructions,
	};

	return (
		<NewDeliveryAddressContext.Provider
			value={{
				addressStateObject,
				addressSetStateObject,
			}}
		>
			<AddressChangedInformationContext.Provider
				value={addressChangeAffectedInfo(
					props.contactIdToArrayOfProductDetailAndProductType,
				)}
			>
				<ContactIdContext.Provider
					value={props.contactIdToArrayOfProductDetailAndProductType}
				>
					<Outlet />
				</ContactIdContext.Provider>
			</AddressChangedInformationContext.Provider>
		</NewDeliveryAddressContext.Provider>
	);
};

export const DeliveryAddressChangeContainer = (
	props: WithProductType<ProductType>,
) => {
	return (
		<PageContainer
			selectedNavItem={NAV_LINKS.accountOverview}
			pageTitle={
				<span
					css={css`
						::first-letter {
							text-transform: capitalize;
						}
					`}
				>
					<span
						css={css`
							display: none;
							${from.tablet} {
								display: inline;
							}
						`}
					>
						Update{' '}
					</span>
					delivery details
				</span>
			}
		>
			<MembersDataApiAsyncLoader
				render={renderContextAndOutletContainer(props.productType)}
				fetch={createProductDetailFetcher(
					GROUPED_PRODUCT_TYPES.subscriptions
						.allProductsProductTypeFilterString,
				)}
				loadingMessage={'Loading delivery details...'}
			/>
		</PageContainer>
	);
};
