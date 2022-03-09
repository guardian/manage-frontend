import { css, Global } from '@emotion/core';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
	GROUPED_PRODUCT_TYPES,
	GroupedProductType,
	PRODUCT_TYPES,
	ProductType,
	ProductTypeWithDeliveryRecordsProperties,
	ProductTypeWithHolidayStopsFlow,
} from '../../shared/productTypes';
import {
	hasCancellationFlow,
	hasDeliveryFlow,
	hasDeliveryRecordsFlow,
	shouldHaveHolidayStopsFlow,
} from '../productUtils';
import { fonts } from '../styles/fonts';
import global from '../styles/global';
import { AnalyticsTracker } from './analytics';
import { CancellationReason } from './cancel/cancellationReason';
import { ExecuteCancellation } from './cancel/stages/executeCancellation';
import { GenericSaveAttempt } from './cancel/stages/genericSaveAttempt';
import { SavedCancellation } from './cancel/stages/savedCancellation';
import { CMPBanner } from './consent/CMPBanner';
import { DeliveryAddressConfirmation } from './delivery/address/deliveryAddressConfirmation';
import { DeliveryAddressReview } from './delivery/address/deliveryAddressReview';
import { DeliveryRecordsProblemConfirmation } from './delivery/records/deliveryRecordsProblemConfirmation';
import { DeliveryRecordsProblemReview } from './delivery/records/deliveryRecordsProblemReview';
import { HolidayConfirmed } from './holiday/holidayConfirmed';
import { HolidayDateChooser } from './holiday/holidayDateChooser';
import { HolidayReview } from './holiday/holidayReview';
import { Main } from './main';
import MMAPageSkeleton from './MMAPageSkeleton';
import { PaymentUpdated } from './payment/update/paymentUpdated';
import PaymentFailed from './payment/update/PaymentFailed';
import { ScrollToTop } from './scrollToTop';
import Maintenance from './maintenance';
import {
	isSignedIn,
	pageRequiresSignIn,
	SignInStatus,
} from '../services/signInStatus';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DeliveryAddressUpdate } from './delivery/address/deliveryAddressForm';

// The code below uses magic comments to instruct Webpack on
// how to name the chunks these dynamic imports produce
// More information: https://webpack.js.org/api/module-methods/#magic-comments

const AccountOverview = lazy(
	() =>
		import(
			/* webpackChunkName: "AccountOverview" */ './accountoverview/accountOverview'
		),
);
const Billing = lazy(
	() => import(/* webpackChunkName: "Billing" */ './billing/billing'),
);
const ManageProduct = lazy(
	() =>
		import(
			/* webpackChunkName: "ManageProduct" */ './accountoverview/manageProduct'
		),
);
const CancellationFlow = lazy(
	() =>
		import(
			/* webpackChunkName: "CancellationFlow" */ './cancel/cancellationFlow'
		),
);
const PaymentUpdateFlow = lazy(
	() =>
		import(
			/* webpackChunkName: "PaymentUpdateFlow" */ './payment/update/updatePaymentFlow'
		),
);
const HolidaysOverview = lazy(
	() =>
		import(
			/* HolidaysOverview: "holidaysoverview" */ './holiday/holidaysOverview'
		),
);
const DeliveryAddressChangeContainer = lazy(
	() =>
		import(
			/* webpackChunkName: "DeliveryAddressChangeContainer" */ './delivery/address/deliveryAddressChangeContainer'
		),
);
const DeliveryRecords = lazy(
	() =>
		import(
			/* webpackChunkName: "DeliveryRecords" */ './delivery/records/deliveryRecords'
		),
);
const EmailAndMarketing = lazy(
	() =>
		import(
			/* webpackChunkName: "EmailAndMarketing" */ './identity/EmailAndMarketing'
		),
);
const PublicProfile = lazy(
	() =>
		import(
			/* webpackChunkName: "PublicProfile" */ './identity/PublicProfile'
		),
);
const Settings = lazy(
	() => import(/* webpackChunkName: "Settings" */ './identity/Settings'),
);
const Help = lazy(() => import(/* webpackChunkName: "Help" */ './help'));
const CancelReminders = lazy(
	() => import(/* webpackChunkName: "CancelReminders" */ './cancelReminders'),
);

const MMARouter = () => {
	const [signInStatus, setSignInStatus] = useState<SignInStatus>('init');

	useEffect(() => {
		setSignInStatus(isSignedIn() ? 'signedIn' : 'signedOut');
	}, []);

	return (
		<Main signInStatus={signInStatus} requiresSignIn={pageRequiresSignIn()}>
			<Global styles={css(`${global}`)} />
			<Global styles={css(`${fonts}`)} />
			<Suspense fallback={<MMAPageSkeleton />}>
				<Routes>
					<Route path="/" element={<AccountOverview />} />
					<Route path="/billing" element={<Billing />} />

					<Route
						path="/email-prefs"
						element={<EmailAndMarketing />}
					/>

					<Route
						path="/public-settings"
						element={<PublicProfile />}
					/>

					<Route path="/account-settings" element={<Settings />} />

					{Object.values(GROUPED_PRODUCT_TYPES).map(
						(groupedProductType: GroupedProductType) => (
							<Route
								key={groupedProductType.urlPart}
								path={`/${groupedProductType.urlPart}`}
								element={
									<ManageProduct
										groupedProductType={groupedProductType}
									/>
								}
							/>
						),
					)}

					{Object.values(PRODUCT_TYPES)
						.filter(hasDeliveryFlow)
						.map((productType: ProductType) =>
							<Route
								key={productType.urlPart}
								path={`/delivery/${productType.urlPart}/address`}
								element={<DeliveryAddressChangeContainer productType={productType}/>}
							>
								<Route
									index
									element={<DeliveryAddressUpdate productType={productType} />}
								/>
								<Route
									path="review"
									element={<DeliveryAddressReview productType={productType} />}
								/>
								<Route
									path="confirmed"
									element={<DeliveryAddressConfirmation productType={productType} />}
								/>
							</Route>
						)
					}
					<Route path="/help" element={<Help />} />

					{/* {Object.values(PRODUCT_TYPES).map(
						(productType: ProductType) => (
							<CancellationFlow
								key={productType.urlPart}
								path={'/cancel/' + productType.urlPart}
								productType={productType}
							>
								{hasCancellationFlow(productType) &&
									productType.cancellation.reasons.map(
										(reason: CancellationReason) => (
											<GenericSaveAttempt
												path={reason.reasonId}
												productType={productType}
												reason={reason}
												key={reason.reasonId}
												linkLabel={reason.linkLabel}
											>
												<ExecuteCancellation
													path="confirmed"
													productType={productType}
												/>
												{!!reason.savedBody && (
													<SavedCancellation
														path="saved"
														reason={reason}
														productType={
															productType
														}
													/>
												)}
											</GenericSaveAttempt>
										),
									)}
							</CancellationFlow>
						),
					)} */}

					{/*
					{Object.values(PRODUCT_TYPES).map(
						(productType: ProductType) => (
							<PaymentUpdateFlow
								key={productType.urlPart}
								path={'/payment/' + productType.urlPart}
								productType={productType}
							>
								<PaymentUpdated
									path="updated"
									productType={productType}
								/>
								<PaymentFailed
									path="failed"
									productType={productType}
								/>
							</PaymentUpdateFlow>
						),
					)}

					{Object.values(PRODUCT_TYPES)
						.filter(shouldHaveHolidayStopsFlow)
						.map((productType: ProductTypeWithHolidayStopsFlow) => (
							<HolidaysOverview
								key={productType.urlPart}
								path={'/suspend/' + productType.urlPart}
								productType={productType}
							>
								<HolidayDateChooser
									path="create"
									productType={productType}
								>
									<HolidayReview
										path="review"
										productType={productType}
									>
										<HolidayConfirmed
											path="confirmed"
											productType={productType}
										/>
									</HolidayReview>
								</HolidayDateChooser>
								<HolidayDateChooser
									path="amend"
									productType={productType}
									requiresExistingHolidayStopToAmendInContext
								>
									<HolidayReview
										path="review"
										productType={productType}
									>
										<HolidayConfirmed
											path="confirmed"
											productType={productType}
										/>
									</HolidayReview>
								</HolidayDateChooser>
							</HolidaysOverview>
						))}



					{Object.values(PRODUCT_TYPES)
						.filter(hasDeliveryRecordsFlow)
						.map(
							(
								productType: ProductTypeWithDeliveryRecordsProperties,
							) => (
								<DeliveryRecords
									key={productType.urlPart}
									path={`/delivery/${productType.urlPart}/records`}
									productType={productType}
								>
									<DeliveryRecordsProblemReview
										path="review"
										productType={productType}
									>
										<DeliveryRecordsProblemConfirmation
											path="confirmed"
											productType={productType}
										/>
									</DeliveryRecordsProblemReview>
								</DeliveryRecords>
							),
						)} */}

					{/*Does not require sign in*/}
					<Route
						path="/cancel-reminders/*reminderCode"
						element={<CancelReminders />}
					/>
					<Route path="/maintenance" element={<Maintenance />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</Suspense>
		</Main>
	);
};

export const MMAPage = (
	<BrowserRouter>
		<AnalyticsTracker />
		<MMARouter />
		<CMPBanner />
		<ScrollToTop />
	</BrowserRouter>
);
