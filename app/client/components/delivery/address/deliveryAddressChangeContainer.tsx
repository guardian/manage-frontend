import { css } from "@emotion/core";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { isProduct, MembersDataApiItem, MembersDatApiAsyncLoader } from "../../../../shared/productResponse";
import { GROUPED_PRODUCT_TYPES, ProductType, WithProductType } from "../../../../shared/productTypes";
import { createProductDetailFetcher } from "../../../productUtils";
import { addressChangeAffectedInfo, ContactIdToArrayOfProductDetailAndProductType, getValidDeliveryAddressChangeEffectiveDates } from "../../../services/deliveryAddress";
import { minWidth } from "../../../styles/breakpoints";
import { COUNTRIES } from "../../identity/models";
import { NAV_LINKS } from "../../nav/navConfig";
import { PageContainer } from "../../page";
import { AddressChangedInformationContext, ContactIdContext, NewDeliveryAddressContext } from "./deliveryAddressFormContext";

interface ContextAndOutletContainerProps {
	contactIdToArrayOfProductDetailAndProductType: ContactIdToArrayOfProductDetailAndProductType;
	productType: ProductType;
}

const renderContextAndOutletContainer =
	(productType: ProductType) =>
	(allProductDetails: MembersDataApiItem[]) => {
		return (
			<ContextAndOutletContainer
				contactIdToArrayOfProductDetailAndProductType={getValidDeliveryAddressChangeEffectiveDates(
					allProductDetails
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
				addressSetStateObject
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

const DeliveryAddressChangeContainer = (props: WithProductType<ProductType>) => {
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
							${minWidth.tablet} {
								display: inline;
							}
						`}
					>
						Update{' '}
					</span>
					delivery details
				</span>
			}
			breadcrumbs={[
				{
					title: NAV_LINKS.accountOverview.title,
					link: NAV_LINKS.accountOverview.link,
				},
				{
					title: 'Edit delivery address',
					currentPage: true,
				},
			]}
		>
			<MembersDatApiAsyncLoader
				render={renderContextAndOutletContainer(props.productType)}
				fetch={createProductDetailFetcher(
					GROUPED_PRODUCT_TYPES.subscriptions,
				)}
				loadingMessage={'Loading delivery details...'}
			/>
		</PageContainer>
	);
};

export default DeliveryAddressChangeContainer;