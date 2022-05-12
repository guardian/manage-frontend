import { css, Global } from '@emotion/core';
import { lazy, ReactNode, Suspense, useEffect, useState } from 'react';
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
	hasDeliveryFlow,
	hasDeliveryRecordsFlow,
	shouldHaveHolidayStopsFlow,
} from '../productUtils';
import { fonts } from '../styles/fonts';
import global from '../styles/global';
import { Main } from './main';
import MMAPageSkeleton from './MMAPageSkeleton';
import Maintenance from './maintenance';
import {
	isSignedIn,
	pageRequiresSignIn,
	SignInStatus,
} from '../services/signInStatus';
import useAnalytics from '../services/useAnalytics';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DeliveryAddressUpdate } from './delivery/address/deliveryAddressForm';
import useScrollToTop from '../services/useScrollToTop';
import useConsent from '../services/useConsent';
import ErrorBoundary from './ErrorBoundary';
import { GenericErrorScreen } from './genericErrorScreen';
import { breakpoints, space } from '@guardian/src-foundations';
import { minWidth } from '../styles/breakpoints';

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
const CancellationContainer = lazy(
	() =>
		import(
			/* webpackChunkName: "Cancellation" */ './cancel/CancellationContainer'
		),
);

const CancellationReasonSelection = lazy(
	() =>
		import(
			/* webpackChunkName: "Cancellation" */ './cancel/CancellationReasonSelection'
		),
);

const CancellationReasonReview = lazy(
	() =>
		import(
			/* webpackChunkName: "Cancellation" */ './cancel/CancellationReasonReview'
		),
);

const SavedCancellation = lazy(
	() =>
		import(
			/* webpackChunkName: "Cancellation" */ './cancel/stages/savedCancellation'
		),
);

const ExecuteCancellation = lazy(
	() =>
		import(
			/* webpackChunkName: "Cancellation" */ './cancel/stages/executeCancellation'
		),
);

const PaymentDetailUpdateContainer = lazy(
	() =>
		import(
			/* webpackChunkName: "PaymentDetailUpdate" */ './payment/update/PaymentDetailUpdateContainer'
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
			/* webpackChunkName: "PaymentDetailUpdate" */ './payment/update/PaymentDetailUpdateConfirmation'
		),
);

const PaymentFailed = lazy(
	() =>
		import(
			/* webpackChunkName: "PaymentDetailUpdate" */ './payment/update/PaymentFailed'
		),
);

const HolidayStopsContainer = lazy(
	() =>
		import(
			/* webpackChunkName: "HolidayStops" */ './holiday/HolidayStopsContainer'
		),
);

const HolidaysOverview = lazy(
	() =>
		import(
			/* webpackChunkName: "HolidayStops" */ './holiday/holidaysOverview'
		),
);

const HolidayDateChooser = lazy(
	() =>
		import(
			/* webpackChunkName: "HolidayStops" */ './holiday/holidayDateChooser'
		),
);

const HolidayReview = lazy(
	() =>
		import(
			/* webpackChunkName: "HolidayStops" */ './holiday/holidayReview'
		),
);

const HolidayConfirmed = lazy(
	() =>
		import(
			/* webpackChunkName: "HolidayStops" */ './holiday/holidayConfirmed'
		),
);

const DeliveryAddressChangeContainer = lazy(
	() =>
		import(
			/* webpackChunkName: "DeliveryAddress" */ './delivery/address/deliveryAddressChangeContainer'
		),
);

const DeliveryAddressReview = lazy(
	() =>
		import(
			/* webpackChunkName: "DeliveryAddress" */ './delivery/address/deliveryAddressReview'
		),
);

const DeliveryAddressConfirmation = lazy(
	() =>
		import(
			/* webpackChunkName: "DeliveryAddress" */ './delivery/address/deliveryAddressConfirmation'
		),
);

const DeliveryRecordsContainer = lazy(
	() =>
		import(
			/* webpackChunkName: "DeliveryRecords" */ './delivery/records/DeliveryRecordsContainer'
		),
);

const DeliveryRecords = lazy(
	() =>
		import(
			/* webpackChunkName: "DeliveryRecords" */ './delivery/records/deliveryRecords'
		),
);

const DeliveryRecordsProblemReview = lazy(
	() =>
		import(
			/* webpackChunkName: "DeliveryRecords" */ './delivery/records/deliveryRecordsProblemReview'
		),
);

const DeliveryRecordsProblemConfirmation = lazy(
	() =>
		import(
			/* webpackChunkName: "DeliveryRecords" */ './delivery/records/deliveryRecordsProblemConfirmation'
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

const GenericErrorContainer = (props: { children: ReactNode }) => (
	<section
		css={css`
			padding: 0 ${space[3]}px;
			${minWidth.tablet} {
				padding-left: ${space[5]}px;
				padding-right: ${space[5]}px;
			}
		`}
	>
		<div
			css={css`
				margin: ${space[12]}px auto;
				max-width: ${breakpoints.wide}px;
			`}
		>
			{props.children}
		</div>
	</section>
);

const MMARouter = () => {
	const [signInStatus, setSignInStatus] = useState<SignInStatus>('init');

	useEffect(() => {
		setSignInStatus(isSignedIn() ? 'signedIn' : 'signedOut');
	}, []);

	useAnalytics();
	useConsent();
	useScrollToTop();

	return (
		<Main signInStatus={signInStatus} requiresSignIn={pageRequiresSignIn()}>
			<Global styles={css(`${global}`)} />
			<Global styles={css(`${fonts}`)} />
			<Suspense fallback={<MMAPageSkeleton />}>
				<ErrorBoundary
					fallback={(error) => (
						<GenericErrorContainer>
							<GenericErrorScreen loggingMessage={error} />
						</GenericErrorContainer>
					)}
				>
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
						<Route
							path="/account-settings"
							element={<Settings />}
						/>
						{Object.values(GROUPED_PRODUCT_TYPES).map(
							(groupedProductType: GroupedProductType) => (
								<Route
									key={groupedProductType.urlPart}
									path={`/${groupedProductType.urlPart}`}
									element={
										<ManageProduct
											groupedProductType={
												groupedProductType
											}
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
						{Object.values(PRODUCT_TYPES)
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
											element={<DeliveryRecords />}
										/>
										<Route
											path="review"
											element={
												<DeliveryRecordsProblemReview />
											}
										/>
										<Route
											path="confirmed"
											element={
												<DeliveryRecordsProblemConfirmation />
											}
										/>
									</Route>
								),
							)}
						{Object.values(PRODUCT_TYPES).map(
							(productType: ProductType) => (
								<Route
									key={productType.urlPart}
									path={'/cancel/' + productType.urlPart}
									element={
										<CancellationContainer
											productType={productType}
										/>
									}
								>
									<Route
										index
										element={
											<CancellationReasonSelection />
										}
									/>
									<Route
										path="review"
										element={<CancellationReasonReview />}
									/>
									<Route
										path="saved"
										element={<SavedCancellation />}
									/>
									<Route
										path="confirmed"
										element={<ExecuteCancellation />}
									/>
								</Route>
							),
						)}
						{Object.values(PRODUCT_TYPES)
							.filter(shouldHaveHolidayStopsFlow)
							.map(
								(
									productType: ProductTypeWithHolidayStopsFlow,
								) => (
									<Route
										key={productType.urlPart}
										path={'/suspend/' + productType.urlPart}
										element={
											<HolidayStopsContainer
												productType={productType}
											/>
										}
									>
										<Route
											index
											element={<HolidaysOverview />}
										/>
										<Route
											path="create"
											element={<HolidayDateChooser />}
										/>
										<Route
											path="amend"
											element={
												<HolidayDateChooser
													isAmendJourney
												/>
											}
										/>
										<Route
											path="review"
											element={<HolidayReview />}
										/>
										<Route
											path="confirmed"
											element={<HolidayConfirmed />}
										/>
									</Route>
								),
							)}
						<Route path="/help" element={<Help />} />
						{/*Does not require sign in*/}
						<Route
							path="/cancel-reminders/*reminderCode"
							element={<CancelReminders />}
						/>
						<Route path="/maintenance" element={<Maintenance />} />
						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				</ErrorBoundary>
			</Suspense>
		</Main>
	);
};

export const MMAPage = (
	<BrowserRouter>
		<MMARouter />
	</BrowserRouter>
);
