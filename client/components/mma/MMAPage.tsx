import { css, Global } from '@emotion/react';
import { ABProvider, useAB } from '@guardian/ab-react';
import { breakpoints, from, space } from '@guardian/source/foundations';
import type { ReactNode } from 'react';
import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import {
	featureSwitches,
	initFeatureSwitchUrlParamOverride,
} from '../../../shared/featureSwitches';
import type {
	ProductType,
	ProductTypeWithDeliveryRecordsProperties,
	ProductTypeWithHolidayStopsFlow,
} from '../../../shared/productTypes';
import { PRODUCT_TYPES } from '../../../shared/productTypes';
import { abSwitches } from '../../experiments/abSwitches';
import { tests } from '../../experiments/abTests';
import { fonts } from '../../styles/fonts';
import { global } from '../../styles/global';
import { getCookie } from '../../utilities/cookies';
import { useAnalytics } from '../../utilities/hooks/useAnalytics';
import { useConsent } from '../../utilities/hooks/useConsent';
import { useScrollToTop } from '../../utilities/hooks/useScrollToTop';
import {
	hasDeliveryFlow,
	hasDeliveryRecordsFlow,
	shouldHaveHolidayStopsFlow,
} from '../../utilities/productUtils';
import type { SignInStatus } from '../../utilities/signInStatus';
import { isSignedIn } from '../../utilities/signInStatus';
import { ErrorBoundary } from '../shared/ErrorBoundary';
import { GenericErrorScreen } from '../shared/GenericErrorScreen';
import { Main } from '../shared/Main';
import { DeliveryAddressUpdate } from './delivery/address/DeliveryAddressForm';
import { Maintenance } from './maintenance/Maintenance';
import { MMAPageSkeleton } from './MMAPageSkeleton';
import { SignInError } from './signInError/SignInError';
import ophan from "@guardian/ophan-tracker-js/MMA";

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Ophan events are diverse (and unguessable?)
const record = (event: any) => {
	ophan.record(event);
};

initFeatureSwitchUrlParamOverride();

// The code below uses magic comments to instruct Webpack on
// how to name the chunks these dynamic imports produce
// More information: https://webpack.js.org/api/module-methods/#magic-comments

const AccountOverview = lazy(() =>
	import(
		/* webpackChunkName: "AccountOverview" */ './accountoverview/AccountOverview'
	).then(({ AccountOverview }) => ({ default: AccountOverview })),
);
const Billing = lazy(() =>
	import(/* webpackChunkName: "Billing" */ './billing/Billing').then(
		({ Billing }) => ({ default: Billing }),
	),
);

const DataPrivacy = lazy(() =>
	import(
		/* webpackChunkName: "DataPrivacy" */ './dataPrivacy/DataPrivacy'
	).then(({ DataPrivacy }) => ({ default: DataPrivacy })),
);
const ManageProduct = lazy(() =>
	import(
		/* webpackChunkName: "ManageProduct" */ './accountoverview/ManageProduct'
	).then(({ ManageProduct }) => ({ default: ManageProduct })),
);
const ManageProductV2 = lazy(() =>
	import(
		/* webpackChunkName: "ManageProduct" */ './accountoverview/manageProducts/ManageProductV2'
	).then(({ ManageProductV2 }) => ({ default: ManageProductV2 })),
);
const CancellationContainer = lazy(() =>
	import(
		/* webpackChunkName: "Cancellation" */ './cancel/CancellationContainer'
	).then(({ CancellationContainer }) => ({ default: CancellationContainer })),
);

const CancellationJourneyFunnel = lazy(() =>
	import(
		/* webpackChunkName: "Cancellation" */ './cancel/CancellationJourneyFunnel'
	).then(({ CancellationJourneyFunnel }) => ({
		default: CancellationJourneyFunnel,
	})),
);

const CancellationReasonReview = lazy(() =>
	import(
		/* webpackChunkName: "Cancellation" */ './cancel/CancellationReasonReview'
	).then(({ CancellationReasonReview }) => ({
		default: CancellationReasonReview,
	})),
);

const SavedCancellation = lazy(() =>
	import(
		/* webpackChunkName: "Cancellation" */ './cancel/stages/SavedCancellation'
	).then(({ SavedCancellation }) => ({ default: SavedCancellation })),
);

const ConfirmCancellation = lazy(() =>
	import(
		/* webpackChunkName: "Cancellation" */ './cancel/stages/ConfirmCancellation'
	).then(({ ConfirmCancellation }) => ({ default: ConfirmCancellation })),
);

const ExecuteCancellation = lazy(() =>
	import(
		/* webpackChunkName: "Cancellation" */ './cancel/stages/ExecuteCancellation'
	).then(({ ExecuteCancellation }) => ({ default: ExecuteCancellation })),
);

const MembershipCancellationLanding = lazy(() =>
	import(
		/* webpackChunkName: "Cancellation" */ './cancel/cancellationSaves/CancellationLanding'
	).then(({ CancellationLanding: MembershipCancellationLanding }) => ({
		default: MembershipCancellationLanding,
	})),
);

const ValueOfSupport = lazy(() =>
	import(
		/* webpackChunkName: "Cancellation" */ './cancel/cancellationSaves/membership/ValueOfSupport'
	).then(({ ValueOfSupport }) => ({
		default: ValueOfSupport,
	})),
);

const CancelAlternativeOffer = lazy(() =>
	import(
		/* webpackChunkName: "Cancellation" */ './cancel/cancellationSaves/CancelAlternativeOffer'
	).then(({ CancelAlternativeOffer }) => ({
		default: CancelAlternativeOffer,
	})),
);

const CancelAlternativeReview = lazy(() =>
	import(
		/* webpackChunkName: "Cancellation" */ './cancel/cancellationSaves/CancelAlternativeReview'
	).then(({ CancelAlternativeReview }) => ({
		default: CancelAlternativeReview,
	})),
);

const CancelAlternativeConfirmed = lazy(() =>
	import(
		/* webpackChunkName: "Cancellation" */ './cancel/cancellationSaves/CancelAlternativeConfirmed'
	).then(({ CancelAlternativeConfirmed }) => ({
		default: CancelAlternativeConfirmed,
	})),
);

const SaveOptions = lazy(() =>
	import(
		/* webpackChunkName: "Cancellation" */ './cancel/cancellationSaves/membership/SaveOptions'
	).then(({ SaveOptions }) => ({
		default: SaveOptions,
	})),
);

const MembershipSwitch = lazy(() =>
	import(
		/* webpackChunkName: "Cancellation" */ './cancel/cancellationSaves/membership/MembershipSwitch'
	).then(({ MembershipSwitch }) => ({
		default: MembershipSwitch,
	})),
);

const SelectReason = lazy(() =>
	import(
		/* webpackChunkName: "Cancellation" */ './cancel/cancellationSaves/SelectReason'
	).then(({ SelectReason }) => ({
		default: SelectReason,
	})),
);

const ContinueMembershipConfirmation = lazy(() =>
	import(
		/* webpackChunkName: "Cancellation" */ './cancel/cancellationSaves/membership/ContinueMembershipConfirmation'
	).then(({ ContinueMembershipConfirmation }) => ({
		default: ContinueMembershipConfirmation,
	})),
);

const ConfirmMembershipCancellation = lazy(() =>
	import(
		/* webpackChunkName: "Cancellation" */ './cancel/cancellationSaves/membership/ConfirmMembershipCancellation'
	).then(({ ConfirmMembershipCancellation }) => ({
		default: ConfirmMembershipCancellation,
	})),
);

const SwitchThankYou = lazy(() =>
	import(
		/* webpackChunkName: "Cancellation" */ './cancel/cancellationSaves/membership/SwitchThankYou'
	).then(({ SwitchThankYou }) => ({
		default: SwitchThankYou,
	})),
);

const ConfirmDigiSubCancellation = lazy(() =>
	import(
		/* webpackChunkName: "Cancellation" */ './cancel/cancellationSaves/digipack/ConfirmDigiSubCancellation'
	).then(({ ConfirmDigiSubCancellation: ConfirmDigiSubCancellation }) => ({
		default: ConfirmDigiSubCancellation,
	})),
);

const DigiSubThankYouOffer = lazy(() =>
	import(
		/* webpackChunkName: "Cancellation" */ './cancel/cancellationSaves/digipack/DigiSubThankYouOffer'
	).then(({ DigiSubThankYouOffer: DigiSubThankYouOffer }) => ({
		default: DigiSubThankYouOffer,
	})),
);

const DigiSubDiscountConfirmed = lazy(() =>
	import(
		/* webpackChunkName: "Cancellation" */ './cancel/cancellationSaves/digipack/DigiSubDiscountConfirmed'
	).then(({ DigiSubDiscountConfirmed: DigiSubDiscountConfirmed }) => ({
		default: DigiSubDiscountConfirmed,
	})),
);

const PaymentDetailUpdateContainer = lazy(() =>
	import(
		/* webpackChunkName: "PaymentDetailUpdate" */ './paymentUpdate/PaymentDetailUpdateContainer'
	).then(({ PaymentDetailUpdateContainer }) => ({
		default: PaymentDetailUpdateContainer,
	})),
);
const PaymentDetailUpdate = lazy(() =>
	import(
		/* webpackChunkName: "PaymentDetailUpdate" */ './paymentUpdate/PaymentDetailUpdate'
	).then(({ PaymentDetailUpdate }) => ({ default: PaymentDetailUpdate })),
);

const PaymentDetailUpdateConfirmation = lazy(() =>
	import(
		/* webpackChunkName: "PaymentDetailUpdate" */ './paymentUpdate/PaymentDetailUpdateConfirmation'
	).then(({ PaymentDetailUpdateConfirmation }) => ({
		default: PaymentDetailUpdateConfirmation,
	})),
);

const PaymentFailed = lazy(() =>
	import(
		/* webpackChunkName: "PaymentDetailUpdate" */ './paymentUpdate/PaymentFailed'
	).then(({ PaymentFailed }) => ({ default: PaymentFailed })),
);

const HolidayStopsContainer = lazy(() =>
	import(
		/* webpackChunkName: "HolidayStops" */ './holiday/HolidayStopsContainer'
	).then(({ HolidayStopsContainer }) => ({ default: HolidayStopsContainer })),
);

const HolidaysOverview = lazy(() =>
	import(
		/* webpackChunkName: "HolidayStops" */ './holiday/HolidaysOverview'
	).then(({ HolidaysOverview }) => ({ default: HolidaysOverview })),
);

const HolidayDateChooser = lazy(() =>
	import(
		/* webpackChunkName: "HolidayStops" */ './holiday/HolidayDateChooser'
	).then(({ HolidayDateChooser }) => ({ default: HolidayDateChooser })),
);

const HolidayReview = lazy(() =>
	import(
		/* webpackChunkName: "HolidayStops" */ './holiday/HolidayReview'
	).then(({ HolidayReview }) => ({ default: HolidayReview })),
);

const HolidayConfirmed = lazy(() =>
	import(
		/* webpackChunkName: "HolidayStops" */ './holiday/HolidayConfirmed'
	).then(({ HolidayConfirmed }) => ({ default: HolidayConfirmed })),
);

const DeliveryAddressChangeContainer = lazy(() =>
	import(
		/* webpackChunkName: "DeliveryAddress" */ './delivery/address/DeliveryAddressChangeContainer'
	).then(({ DeliveryAddressChangeContainer }) => ({
		default: DeliveryAddressChangeContainer,
	})),
);

const DeliveryAddressReview = lazy(() =>
	import(
		/* webpackChunkName: "DeliveryAddress" */ './delivery/address/DeliveryAddressReview'
	).then(({ DeliveryAddressReview }) => ({ default: DeliveryAddressReview })),
);

const DeliveryAddressConfirmation = lazy(() =>
	import(
		/* webpackChunkName: "DeliveryAddress" */ './delivery/address/DeliveryAddressConfirmation'
	).then(({ DeliveryAddressConfirmation }) => ({
		default: DeliveryAddressConfirmation,
	})),
);

const DeliveryRecordsContainer = lazy(() =>
	import(
		/* webpackChunkName: "DeliveryRecords" */ './delivery/records/DeliveryRecordsContainer'
	).then(({ DeliveryRecordsContainer }) => ({
		default: DeliveryRecordsContainer,
	})),
);

const DeliveryRecords = lazy(() =>
	import(
		/* webpackChunkName: "DeliveryRecords" */ './delivery/records/DeliveryRecords'
	).then(({ DeliveryRecords }) => ({ default: DeliveryRecords })),
);

const DeliveryRecordsProblemReview = lazy(() =>
	import(
		/* webpackChunkName: "DeliveryRecords" */ './delivery/records/DeliveryRecordsProblemReview'
	).then(({ DeliveryRecordsProblemReview }) => ({
		default: DeliveryRecordsProblemReview,
	})),
);

const DeliveryRecordsProblemConfirmation = lazy(() =>
	import(
		/* webpackChunkName: "DeliveryRecords" */ './delivery/records/DeliveryRecordsProblemConfirmation'
	).then(({ DeliveryRecordsProblemConfirmation }) => ({
		default: DeliveryRecordsProblemConfirmation,
	})),
);

const SwitchContainer = lazy(() =>
	import(/* webpackChunkName: "Switch" */ './switch/SwitchContainer').then(
		({ SwitchContainer }) => ({
			default: SwitchContainer,
		}),
	),
);

const SwitchOptions = lazy(() =>
	import(
		/* webpackChunkName: "Switch" */ './switch/options/SwitchOptions'
	).then(({ SwitchOptions }) => ({
		default: SwitchOptions,
	})),
);

const SwitchReview = lazy(() =>
	import(
		/* webpackChunkName: "Switch" */ './switch/review/SwitchReview'
	).then(({ SwitchReview }) => ({
		default: SwitchReview,
	})),
);

const UpgradeSupportContainer = lazy(() =>
	import(
		/* webpackChunkName: "UpgradeSupport" */ './upgrade/UpgradeSupportContainer'
	).then(({ UpgradeSupportContainer }) => ({
		default: UpgradeSupportContainer,
	})),
);

const UpgradeSupport = lazy(() =>
	import(
		/* webpackChunkName: "UpgradeSupport" */ './upgrade/UpgradeSupport'
	).then(({ UpgradeSupport }) => ({
		default: UpgradeSupport,
	})),
);

const UpgradeSupportThankYou = lazy(() =>
	import(
		/* webpackChunkName: "UpgradeSupport" */ './upgrade/UpgradeSupportThankYou'
	).then(({ UpgradeSupportThankYou }) => ({
		default: UpgradeSupportThankYou,
	})),
);

const UpgradeSupportSwitchThankYou = lazy(() =>
	import(
		/* webpackChunkName: "UpgradeSupport" */ './upgrade/UpgradeSupportSwitchThankYou'
	).then(({ UpgradeSupportSwitchThankYou }) => ({
		default: UpgradeSupportSwitchThankYou,
	})),
);

const SwitchComplete = lazy(() =>
	import(
		/* webpackChunkName: "Switch" */ './switch/complete/SwitchComplete'
	).then(({ SwitchComplete }) => ({
		default: SwitchComplete,
	})),
);

const EmailAndMarketing = lazy(() =>
	import(
		/* webpackChunkName: "EmailAndMarketing" */ './identity/emailAndMarketing/EmailAndMarketing'
	).then(({ EmailAndMarketing }) => ({ default: EmailAndMarketing })),
);
const PublicProfile = lazy(() =>
	import(
		/* webpackChunkName: "PublicProfile" */ './identity/publicProfile/PublicProfile'
	).then(({ PublicProfile }) => ({ default: PublicProfile })),
);
const Settings = lazy(() =>
	import(
		/* webpackChunkName: "Settings" */ './identity/settings/Settings'
	).then(({ Settings }) => ({ default: Settings })),
);
const Help = lazy(() =>
	import(/* webpackChunkName: "Help" */ './help/Help').then(({ Help }) => ({
		default: Help,
	})),
);
const CancelReminders = lazy(() =>
	import(
		/* webpackChunkName: "CancelReminders" */ './cancelReminders/CancelReminders'
	).then(({ CancelReminders }) => ({ default: CancelReminders })),
);
const CreateReminder = lazy(() =>
	import(
		/* webpackChunkName: "CreateReminder" */ './reminders/CreateReminder'
	).then(({ CreateReminder }) => ({ default: CreateReminder })),
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
		<Main signInStatus={signInStatus}>
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
						<Route
							path="/app"
							element={<AccountOverview isFromApp />}
						/>
						<Route path="/billing" element={<Billing />} />
						<Route path="/data-privacy" element={<DataPrivacy />} />
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
						<Route
							path="upgrade-support"
							element={<UpgradeSupportContainer />}
						>
							<Route index element={<UpgradeSupport />} />
							<Route
								path={'switch-thank-you'}
								element={<UpgradeSupportSwitchThankYou />}
							/>
							<Route
								path={'thank-you'}
								element={<UpgradeSupportThankYou />}
							/>
						</Route>
						{[
							{ path: '/switch', fromApp: false },
							{ path: '/app/switch', fromApp: true },
						].map(({ path, fromApp }) => (
							<Route
								key={path}
								path={path}
								element={
									<SwitchContainer isFromApp={fromApp} />
								}
							>
								<Route index element={<SwitchOptions />} />
								<Route
									path="review"
									element={<SwitchReview />}
								/>
								<Route
									path="complete"
									element={<SwitchComplete />}
								/>
							</Route>
						))}
						{Object.values(PRODUCT_TYPES).map(
							(productType: ProductType) =>
								featureSwitches.digisubSave &&
								productType.productType === 'digipack' ? (
									<Route
										key={productType.urlPart}
										path={`/${productType.urlPart}`}
										element={
											<ManageProductV2
												productType={productType}
											/>
										}
									/>
								) : (
									<Route
										key={productType.urlPart}
										path={`/${productType.urlPart}`}
										element={
											<ManageProduct
												productType={productType}
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
										element={<CancellationJourneyFunnel />}
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
									<Route
										path="landing"
										element={
											<MembershipCancellationLanding />
										}
									/>
									<Route
										path="details"
										element={<ValueOfSupport />}
									/>
									<Route
										path="offer"
										element={<CancelAlternativeOffer />}
									/>
									<Route
										path="pause"
										element={<CancelAlternativeOffer />}
									/>
									<Route
										path="pause-review"
										element={<CancelAlternativeReview />}
									/>
									<Route
										path="offer-review"
										element={<CancelAlternativeReview />}
									/>
									<Route
										path="offer-confirmed"
										element={<CancelAlternativeConfirmed />}
									/>
									<Route
										path="pause-confirmed"
										element={<CancelAlternativeConfirmed />}
									/>

									<Route
										path="offers"
										element={<SaveOptions />}
									/>
									<Route
										path="reasons"
										element={<SelectReason />}
									/>
									<Route
										path="switch-offer"
										element={<MembershipSwitch />}
									/>
									<Route
										path="thank-you"
										element={
											<ContinueMembershipConfirmation />
										}
									/>
									<Route
										path="confirm"
										element={
											productType.urlPart ===
											'membership' ? (
												<ConfirmMembershipCancellation />
											) : (
												<ConfirmCancellation />
											)
										}
									/>
									<Route
										path="switch-thank-you"
										element={<SwitchThankYou />}
									/>

									<Route
										path="confirm-cancel"
										element={<ConfirmDigiSubCancellation />}
									/>
									<Route
										path="discount-offer"
										element={<DigiSubThankYouOffer />}
									/>
									<Route
										path="discount-confirmed"
										element={<DigiSubDiscountConfirmed />}
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
							path="/cancel-reminders/:reminderCode"
							element={<CancelReminders />}
						/>
						{/*Does not require sign in*/}
						<Route
							path="/create-reminder/one-off"
							element={
								<CreateReminder reminderType={'ONE_OFF'} />
							}
						/>
						{/*Does not require sign in*/}
						<Route
							path="/create-reminder/recurring"
							element={
								<CreateReminder reminderType={'RECURRING'} />
							}
						/>
						{/*Does not require sign in*/}
						<Route path="/maintenance" element={<Maintenance />} />
						{/*Does not require sign in*/}
						<Route
							path="/sign-in-error"
							element={<SignInError />}
						/>
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
