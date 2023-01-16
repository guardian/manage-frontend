import { css, Global } from '@emotion/react';
import { ABProvider, useAB } from '@guardian/ab-react';
import { breakpoints, from, space } from '@guardian/source-foundations';
import type { ReactNode } from 'react';
import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { initFeatureSwitchUrlParamOverride } from '../../../shared/featureSwitches';
import type {
	GroupedProductType,
	ProductType,
	ProductTypeWithDeliveryRecordsProperties,
	ProductTypeWithHolidayStopsFlow,
} from '../../../shared/productTypes';
import {
	GROUPED_PRODUCT_TYPES,
	PRODUCT_TYPES,
} from '../../../shared/productTypes';
import { abSwitches } from '../../experiments/abSwitches';
import { tests } from '../../experiments/abTests';
import { fonts } from '../../styles/fonts';
import global from '../../styles/global';
import { getCookie } from '../../utilities/cookies';
import useAnalytics from '../../utilities/hooks/useAnalytics';
import useConsent from '../../utilities/hooks/useConsent';
import useScrollToTop from '../../utilities/hooks/useScrollToTop';
import {
	hasDeliveryFlow,
	hasDeliveryRecordsFlow,
	shouldHaveHolidayStopsFlow,
} from '../../utilities/productUtils';
import type { SignInStatus } from '../../utilities/signInStatus';
import { isSignedIn, pageRequiresSignIn } from '../../utilities/signInStatus';
import ErrorBoundary from '../shared/ErrorBoundary';
import { GenericErrorScreen } from '../shared/GenericErrorScreen';
import { Main } from '../shared/Main';
import { DeliveryAddressUpdate } from './delivery/address/DeliveryAddressForm';
import Maintenance from './maintenance/Maintenance';
import MMAPageSkeleton from './MMAPageSkeleton';
import SwitchContainer from './switch/SwitchContainer';
import SwitchOptions from './switch/SwitchOptions';
import SwitchReview from './switch/SwitchReview';

const record = (event: any) => {
	if (window.guardian?.ophan?.record) {
		window.guardian.ophan.record(event);
	}
};

initFeatureSwitchUrlParamOverride();

// The code below uses magic comments to instruct Webpack on
// how to name the chunks these dynamic imports produce
// More information: https://webpack.js.org/api/module-methods/#magic-comments

const AccountOverview = lazy(
	() =>
		import(
			/* webpackChunkName: "AccountOverview" */ './accountoverview/AccountOverview'
		),
);
const Billing = lazy(
	() => import(/* webpackChunkName: "Billing" */ './billing/Billing'),
);
const ManageProduct = lazy(
	() =>
		import(
			/* webpackChunkName: "ManageProduct" */ './accountoverview/ManageProduct'
		),
);
const CancellationContainer = lazy(
	() =>
		import(
			/* webpackChunkName: "Cancellation" */ './cancel/CancellationContainer'
		),
);

const CancellationSwitchEligibilityCheck = lazy(
	() =>
		import(
			/* webpackChunkName: "Cancellation" */ './cancel/CancellationSwitchEligibilityCheck'
		),
);

const CancellationSwitchReview = lazy(
	() =>
		import(
			/* webpackChunkName: "Cancellation" */ './cancel/productSwitch/CancellationSwitchReview'
		),
);

const CancellationSwitchConfirmed = lazy(
	() =>
		import(
			/* webpackChunkName: "Cancellation" */ './cancel/productSwitch/CancellationSwitchConfirmed'
		),
);

const ProductSwitchFailed = lazy(
	() =>
		import(
			/* webpackChunkName: "Cancellation" */ './cancel/productSwitch/CancellationSwitchFailed'
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
			/* webpackChunkName: "Cancellation" */ './cancel/stages/SavedCancellation'
		),
);

const ExecuteCancellation = lazy(
	() =>
		import(
			/* webpackChunkName: "Cancellation" */ './cancel/stages/ExecuteCancellation'
		),
);

const PaymentDetailUpdateContainer = lazy(
	() =>
		import(
			/* webpackChunkName: "PaymentDetailUpdate" */ './paymentUpdate/PaymentDetailUpdateContainer'
		),
);
const PaymentDetailUpdate = lazy(
	() =>
		import(
			/* webpackChunkName: "PaymentDetailUpdate" */ './paymentUpdate/PaymentDetailUpdate'
		),
);

const PaymentDetailUpdateConfirmation = lazy(
	() =>
		import(
			/* webpackChunkName: "PaymentDetailUpdate" */ './paymentUpdate/PaymentDetailUpdateConfirmation'
		),
);

const PaymentFailed = lazy(
	() =>
		import(
			/* webpackChunkName: "PaymentDetailUpdate" */ './paymentUpdate/PaymentFailed'
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
			/* webpackChunkName: "HolidayStops" */ './holiday/HolidaysOverview'
		),
);

const HolidayDateChooser = lazy(
	() =>
		import(
			/* webpackChunkName: "HolidayStops" */ './holiday/HolidayDateChooser'
		),
);

const HolidayReview = lazy(
	() =>
		import(
			/* webpackChunkName: "HolidayStops" */ './holiday/HolidayReview'
		),
);

const HolidayConfirmed = lazy(
	() =>
		import(
			/* webpackChunkName: "HolidayStops" */ './holiday/HolidayConfirmed'
		),
);

const DeliveryAddressChangeContainer = lazy(
	() =>
		import(
			/* webpackChunkName: "DeliveryAddress" */ './delivery/address/DeliveryAddressChangeContainer'
		),
);

const DeliveryAddressReview = lazy(
	() =>
		import(
			/* webpackChunkName: "DeliveryAddress" */ './delivery/address/DeliveryAddressReview'
		),
);

const DeliveryAddressConfirmation = lazy(
	() =>
		import(
			/* webpackChunkName: "DeliveryAddress" */ './delivery/address/DeliveryAddressConfirmation'
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
			/* webpackChunkName: "DeliveryRecords" */ './delivery/records/DeliveryRecords'
		),
);

const DeliveryRecordsProblemReview = lazy(
	() =>
		import(
			/* webpackChunkName: "DeliveryRecords" */ './delivery/records/DeliveryRecordsProblemReview'
		),
);

const DeliveryRecordsProblemConfirmation = lazy(
	() =>
		import(
			/* webpackChunkName: "DeliveryRecords" */ './delivery/records/DeliveryRecordsProblemConfirmation'
		),
);

const EmailAndMarketing = lazy(
	() =>
		import(
			/* webpackChunkName: "EmailAndMarketing" */ './identity/emailAndMarketing/EmailAndMarketing'
		),
);
const PublicProfile = lazy(
	() =>
		import(
			/* webpackChunkName: "PublicProfile" */ './identity/publicProfile/PublicProfile'
		),
);
const Settings = lazy(
	() =>
		import(
			/* webpackChunkName: "Settings" */ './identity/settings/Settings'
		),
);
const Help = lazy(() => import(/* webpackChunkName: "Help" */ './help/Help'));
const CancelReminders = lazy(
	() =>
		import(
			/* webpackChunkName: "CancelReminders" */ './cancelReminders/CancelReminders'
		),
);

const GenericErrorContainer = (props: { children: ReactNode }) => (
	<section
		css={css`
			padding: 0 ${space[3]}px;
			${from.tablet} {
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

	const ABTestAPI = useAB();

	useEffect(() => {
		setSignInStatus(isSignedIn() ? 'signedIn' : 'signedOut');

		const allRunnableTests = ABTestAPI.allRunnableTests(tests);
		ABTestAPI.registerImpressionEvents(allRunnableTests);
		ABTestAPI.registerCompleteEvents(allRunnableTests);
	}, [ABTestAPI]);

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
						<Route path="/switch" element={<SwitchContainer />}>
							<Route index element={<SwitchOptions />} />
							<Route
								path="/switch/review"
								element={<SwitchReview />}
							/>
						</Route>
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
											<CancellationSwitchEligibilityCheck />
										}
									/>
									<Route
										path="switch"
										element={<CancellationSwitchReview />}
									/>
									<Route
										path="switch/confirmed"
										element={
											<CancellationSwitchConfirmed />
										}
									/>
									<Route
										path="switch/failed"
										element={<ProductSwitchFailed />}
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

const getMvtId = (): number => {
	const mvtId = getCookie('GU_mvt_id');
	return mvtId ? parseInt(mvtId) : 0;
};

export const MMAPage = (
	<ABProvider
		arrayOfTestObjects={tests}
		abTestSwitches={abSwitches}
		pageIsSensitive={false}
		mvtMaxValue={1000000}
		mvtId={getMvtId()}
		ophanRecord={record}
	>
		<BrowserRouter>
			<MMARouter />
		</BrowserRouter>
	</ABProvider>
);
