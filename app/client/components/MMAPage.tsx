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
import { DeliveryRecordsProblemConfirmation } from './delivery/records/deliveryRecordsProblemConfirmation';
import { DeliveryRecordsProblemReview } from './delivery/records/deliveryRecordsProblemReview';
import { HolidayConfirmed } from './holiday/holidayConfirmed';
import { HolidayDateChooser } from './holiday/holidayDateChooser';
import { HolidayReview } from './holiday/holidayReview';
import { Main } from './main';
import MMAPageSkeleton from './MMAPageSkeleton';
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
const PaymentDetailUpdateContainer = lazy(
	() =>
		import(
			/* webpackChunkName: "PaymentDetailUpdateContainer" */ './payment/update/PaymentDetailUpdateContainer'
		),
);
const PaymentDetailUpdate = lazy(
	() =>
		import(
			/* webpackChunkName: "PaymentDetailUpdate" */ './payment/update/PaymentDetailUpdate'
		),
);

const PaymentDetailUpdateConfirmation = lazy(
	() =>
		import(
			/* webpackChunkName: "PaymentDetailUpdateConfirmation" */ './payment/update/PaymentDetailUpdateConfirmation'
		),
);

const PaymentFailed = lazy(
	() =>
		import(
			/* webpackChunkName: "PaymentFailed" */ './payment/update/PaymentFailed'
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

const DeliveryAddressReview = lazy(
	() =>
		import(
			/* webpackChunkName: "DeliveryAddressReview" */ './delivery/address/deliveryAddressReview'
		),
);

const DeliveryAddressConfirmation = lazy(
	() =>
		import(
			/* webpackChunkName: "DeliveryAddressConfirmation" */ './delivery/address/deliveryAddressConfirmation'
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
						.map((productType: ProductType) => (
							<Route
								key={productType.urlPart}
								path={`/delivery/${productType.urlPart}/address`}
								element={
									<DeliveryAddressChangeContainer
										productType={productType}
									/>
								}
							>
								<Route
									index
									element={
										<DeliveryAddressUpdate
											productType={productType}
										/>
									}
								/>
								<Route
									path="review"
									element={
										<DeliveryAddressReview
											productType={productType}
										/>
									}
								/>
								<Route
									path="confirmed"
									element={
										<DeliveryAddressConfirmation
											productType={productType}
										/>
									}
								/>
							</Route>
						))}

					{Object.values(PRODUCT_TYPES).map(
						(productType: ProductType) => (
							<Route
								key={productType.urlPart}
								path={`/payment/${productType.urlPart}`}
								element={
									<PaymentDetailUpdateContainer
										productType={productType}
									/>
								}
							>
								<Route
									index
									element={
										<PaymentDetailUpdate
											productType={productType}
										/>
									}
								/>
								<Route
									path="updated"
									element={
										<PaymentDetailUpdateConfirmation />
									}
								/>
								<Route
									path="failed"
									element={<PaymentFailed />}
								/>
							</Route>
						),
					)}

					{/* {Object.values(PRODUCT_TYPES)
						.filter(hasDeliveryRecordsFlow)
						.map(
							(
								productType: ProductTypeWithDeliveryRecordsProperties,
							) => (
								<Route
									key={productType.urlPart}
									path={`/delivery/${productType.urlPart}/records`}
									element={
										<DeliveryRecordsContainer
											productType={productType}
										/>
									}
								>
									<Route
										index
										element={<h1>delivery records test</h1>}
									/>
									<Route
										path="review"
										element={
											<h1>
												delivery records review page
											</h1>
										}
									/>
									<Route
										path="confirmed"
										element={
											<h1>
												delivery records confirmed page
											</h1>
										}
									/>
								</Route>
							),
						)} */}

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
