'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[4048],
	{
		'./client/fixtures/productBuilder/testProducts.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				v_: () => annualContributionPaidByCardWithCurrency,
				EM: () => contributionCancelled,
				ZY: () => contributionPaidByCard,
				az: () => contributionPaidByDirectDebit,
				uH: () => contributionPaidByPayPal,
				VO: () => contributionPaidByPayPalAboveSupporterPlusThreshold,
				AD: () => contributionPaidBySepa,
				IB: () => digitalPackPaidByDirectDebit,
				Z6: () => digitalPackWithPaymentFailure,
				av: () => guardianAdLite,
				kj: () => guardianAdLiteCancelled,
				kk: () => guardianAdLiteInTrialPeriod,
				SN: () => guardianWeeklyCancelled,
				Pl: () => guardianWeeklyExpiredCard,
				uV: () => guardianWeeklyGiftPurchase,
				_8: () => guardianWeeklyGiftRecipient,
				X8: () => guardianWeeklyPaidByCard,
				LE: () => homeDeliverySunday,
				x2: () => membershipSupporter,
				wG: () => membershipSupporterCurrencyUSD,
				Nf: () => monthlyContributionPaidByCard,
				Y$: () => newspaperVoucherPaidByPaypal,
				Of: () => patronMembership,
				gx: () => supporterPlus,
				hc: () => supporterPlusAnnual,
				pz: () => supporterPlusAnnualCancelled,
				tv: () => supporterPlusCancelled,
				XU: () => supporterPlusInOfferPeriod,
				dd: () => supporterPlusMonthlyAllAccessDigital,
				gD: () => supporterPlusUSA,
				uU: () => tierThree,
			});
			var utilities_currencyIso = __webpack_require__(
					'./client/utilities/currencyIso.ts',
				),
				cards = {
					visaActive: () => ({
						last4: '4242',
						expiry: { month: 4, year: 2024 },
						type: 'Visa',
						stripePublicKeyForUpdate: 'pk_test_123',
						email: 'test.user@example.com',
					}),
					visaExpired: () => ({
						last4: '4242',
						expiry: { month: 4, year: 2015 },
						type: 'Visa',
						stripePublicKeyForUpdate: 'pk_test_123',
						email: 'test.user@example.com',
					}),
				};
			class productBuilder_ProductBuilder {
				constructor(baseProduct) {
					this.productToBuild = baseProduct;
				}
				getProductDetailObject() {
					return this.productToBuild;
				}
				tier(tier) {
					return (this.productToBuild.tier = tier), this;
				}
				withNoCurrentPlans() {
					return (
						(this.productToBuild.subscription.currentPlans = []),
						this
					);
				}
				payByCard(customCard) {
					return (
						(this.productToBuild.subscription.card =
							customCard || cards.visaActive()),
						(this.productToBuild.subscription.paymentMethod =
							'Card'),
						this
					);
				}
				payByDirectDebit() {
					return (
						(this.productToBuild.subscription.mandate = {
							accountName: 'khjhk',
							accountNumber: '****9911',
							sortCode: '200000',
						}),
						(this.productToBuild.subscription.paymentMethod =
							'DirectDebit'),
						this
					);
				}
				payByPayPal(email) {
					return (
						(this.productToBuild.subscription.payPalEmail =
							null != email
								? email
								: 'sb-ltpuy8454870@personal.example.com'),
						(this.productToBuild.subscription.paymentMethod =
							'PayPal'),
						this
					);
				}
				payBySepa() {
					return (
						(this.productToBuild.subscription.paymentMethod =
							'Sepa'),
						(this.productToBuild.subscription.sepaMandate = {
							accountName: 'John Smith',
							iban: 'FR*********************2606',
						}),
						this
					);
				}
				gift(isReceived) {
					return (
						(this.productToBuild.isPaidTier = !isReceived),
						(this.productToBuild.subscription.readerType = 'Gift'),
						this
					);
				}
				withAlertText(alertText) {
					return (this.productToBuild.alertText = alertText), this;
				}
				cancel() {
					return (
						(this.productToBuild.subscription.cancelledAt = !0),
						(this.productToBuild.subscription.cancellationEffectiveDate =
							'2023-03-20'),
						this
					);
				}
				inOfferPeriod() {
					return (
						(this.productToBuild.subscription.nextPaymentDate =
							'2023-03-20'),
						(this.productToBuild.subscription.potentialCancellationDate =
							'2023-02-20'),
						this
					);
				}
				withPotentialCancellationDate() {
					return (
						(this.productToBuild.subscription.potentialCancellationDate =
							'2025-02-20'),
						this
					);
				}
				inTrialPeriod() {
					return (
						(this.productToBuild.subscription.trialLength = 2), this
					);
				}
				asPatron() {
					return (
						(this.productToBuild.subscription.readerType =
							'Patron'),
						this
					);
				}
				asPatronTier() {
					return (this.productToBuild.tier = 'Patron'), this;
				}
				withEvents() {
					var currentPlans =
						this.productToBuild.subscription.currentPlans;
					for (var currentPlan of currentPlans)
						isPaidSubscriptionPlan(currentPlan) &&
							(currentPlan.features = 'Fancy Events');
					return this;
				}
				inUSA() {
					return (
						(this.productToBuild.billingCountry = 'United States'),
						this
					);
				}
				nonServiceableCountry() {
					return (this.productToBuild.billingCountry = 'Qatar'), this;
				}
				withCurrency(currencyIso) {
					var { plan, currentPlans, futurePlans } =
							this.productToBuild.subscription,
						currencySymbol = (0, utilities_currencyIso.eu)(
							currencyIso,
						);
					for (var currentPlan of (plan &&
						((plan.currencyISO = currencyIso),
						(plan.currency = currencySymbol)),
					currentPlans))
						isPaidSubscriptionPlan(currentPlan) &&
							((currentPlan.currency = currencySymbol),
							(currentPlan.currencyISO = currencyIso));
					for (var futurePlan of futurePlans)
						isPaidSubscriptionPlan(futurePlan) &&
							((futurePlan.currency = currencySymbol),
							(futurePlan.currencyISO = currencyIso));
					return this;
				}
				withBillingPeriod(billingPeriod) {
					var { plan, currentPlans, futurePlans } =
						this.productToBuild.subscription;
					for (var currentPlan of (plan &&
						(plan.billingPeriod = billingPeriod),
					currentPlans))
						isPaidSubscriptionPlan(currentPlan) &&
							(currentPlan.billingPeriod = billingPeriod);
					for (var futurePlan of futurePlans)
						isPaidSubscriptionPlan(futurePlan) &&
							(futurePlan.billingPeriod = billingPeriod);
					return this;
				}
				withPrice(price) {
					this.productToBuild.subscription.nextPaymentPrice = price;
					var { plan, currentPlans, futurePlans } =
						this.productToBuild.subscription;
					for (var currentPlan of (plan && (plan.price = price),
					currentPlans))
						isPaidSubscriptionPlan(currentPlan) &&
							(currentPlan.price = price);
					for (var futurePlan of futurePlans)
						isPaidSubscriptionPlan(futurePlan) &&
							(futurePlan.price = price);
					return this;
				}
			}
			function isPaidSubscriptionPlan(subscriptionPlan) {
				return (
					!!subscriptionPlan &&
					(subscriptionPlan.hasOwnProperty('price') ||
						subscriptionPlan.hasOwnProperty('amount'))
				);
			}
			function guardianWeeklyPaidByCard() {
				return new productBuilder_ProductBuilder({
					tier: 'Guardian Weekly - Domestic',
					isPaidTier: !0,
					selfServiceCancellation: {
						isAllowed: !1,
						shouldDisplayEmail: !1,
						phoneRegionsToDisplay: ['UK & ROW'],
					},
					joinDate: '2021-11-29',
					optIn: !0,
					subscription: {
						contactId: '0039E00001KA26BQAT',
						deliveryAddress: {
							addressLine1: 'Kings Place',
							addressLine2: '90 York Way',
							town: 'London',
							postcode: 'N1 9GU',
							country: 'United Kingdom',
						},
						safeToUpdatePaymentMethod: !0,
						start: '2021-12-24',
						end: '2022-12-15',
						nextPaymentPrice: 13500,
						nextPaymentDate: '2021-12-10',
						lastPaymentDate: null,
						potentialCancellationDate: null,
						chargedThroughDate: null,
						renewalDate: '2022-12-15',
						anniversaryDate: '2022-12-24',
						cancelledAt: !1,
						subscriptionId: 'A-S00286635',
						trialLength: 9,
						autoRenew: !0,
						currentPlans: [],
						futurePlans: [
							{
								name: null,
								start: '2021-12-10',
								end: '2022-11-29',
								shouldBeVisible: !0,
								chargedThrough: null,
								price: 15e3,
								currency: '£',
								currencyISO: 'GBP',
								billingPeriod: 'year',
							},
						],
						readerType: 'Direct',
						accountId: '8ad0965d7d585497017d6ce786026089',
						deliveryAddressChangeEffectiveDate: '2021-12-10',
					},
					isTestUser: !1,
				})
					.payByCard()
					.getProductDetailObject();
			}
			function guardianWeeklyGiftPurchase() {
				return new productBuilder_ProductBuilder({
					tier: 'Guardian Weekly - Domestic',
					isPaidTier: !0,
					selfServiceCancellation: {
						isAllowed: !1,
						shouldDisplayEmail: !1,
						phoneRegionsToDisplay: ['UK & ROW'],
					},
					joinDate: '2021-11-29',
					optIn: !0,
					subscription: {
						contactId: '0039E00001KA26BQAT',
						deliveryAddress: {
							addressLine1: 'Kings Place',
							addressLine2: '90 York Way',
							town: 'London',
							postcode: 'N1 9GU',
							country: 'United Kingdom',
						},
						safeToUpdatePaymentMethod: !0,
						start: '2021-12-24',
						end: '2022-12-15',
						nextPaymentPrice: 13500,
						nextPaymentDate: '2021-12-10',
						lastPaymentDate: null,
						potentialCancellationDate: null,
						chargedThroughDate: null,
						renewalDate: '2022-12-15',
						anniversaryDate: '2022-12-24',
						cancelledAt: !1,
						subscriptionId: 'A-S00286635',
						trialLength: 9,
						autoRenew: !0,
						currentPlans: [],
						futurePlans: [
							{
								name: null,
								start: '2021-12-10',
								end: '2022-11-29',
								shouldBeVisible: !0,
								chargedThrough: null,
								price: 15e3,
								currency: '£',
								currencyISO: 'GBP',
								billingPeriod: 'year',
							},
						],
						readerType: 'Direct',
						accountId: '8ad0965d7d585497017d6ce786026089',
						deliveryAddressChangeEffectiveDate: '2021-12-10',
					},
					isTestUser: !1,
				})
					.payByCard()
					.gift(!1)
					.getProductDetailObject();
			}
			function guardianWeeklyGiftRecipient() {
				return new productBuilder_ProductBuilder({
					tier: 'Guardian Weekly - Domestic',
					isPaidTier: !0,
					selfServiceCancellation: {
						isAllowed: !1,
						shouldDisplayEmail: !1,
						phoneRegionsToDisplay: ['UK & ROW'],
					},
					joinDate: '2021-11-29',
					optIn: !0,
					subscription: {
						contactId: '0039E00001KA26BQAT',
						deliveryAddress: {
							addressLine1: 'Kings Place',
							addressLine2: '90 York Way',
							town: 'London',
							postcode: 'N1 9GU',
							country: 'United Kingdom',
						},
						safeToUpdatePaymentMethod: !0,
						start: '2021-12-24',
						end: '2022-12-15',
						nextPaymentPrice: 13500,
						nextPaymentDate: '2021-12-10',
						lastPaymentDate: null,
						potentialCancellationDate: null,
						chargedThroughDate: null,
						renewalDate: '2022-12-15',
						anniversaryDate: '2022-12-24',
						cancelledAt: !1,
						subscriptionId: 'A-S00286635',
						trialLength: 9,
						autoRenew: !0,
						currentPlans: [],
						futurePlans: [
							{
								name: null,
								start: '2021-12-10',
								end: '2022-11-29',
								shouldBeVisible: !0,
								chargedThrough: null,
								price: 15e3,
								currency: '£',
								currencyISO: 'GBP',
								billingPeriod: 'year',
							},
						],
						readerType: 'Direct',
						accountId: '8ad0965d7d585497017d6ce786026089',
						deliveryAddressChangeEffectiveDate: '2021-12-10',
					},
					isTestUser: !1,
				})
					.gift(!0)
					.getProductDetailObject();
			}
			function guardianWeeklyExpiredCard() {
				return new productBuilder_ProductBuilder({
					tier: 'Guardian Weekly - Domestic',
					isPaidTier: !0,
					selfServiceCancellation: {
						isAllowed: !1,
						shouldDisplayEmail: !1,
						phoneRegionsToDisplay: ['UK & ROW'],
					},
					joinDate: '2021-11-29',
					optIn: !0,
					subscription: {
						contactId: '0039E00001KA26BQAT',
						deliveryAddress: {
							addressLine1: 'Kings Place',
							addressLine2: '90 York Way',
							town: 'London',
							postcode: 'N1 9GU',
							country: 'United Kingdom',
						},
						safeToUpdatePaymentMethod: !0,
						start: '2021-12-24',
						end: '2022-12-15',
						nextPaymentPrice: 13500,
						nextPaymentDate: '2021-12-10',
						lastPaymentDate: null,
						potentialCancellationDate: null,
						chargedThroughDate: null,
						renewalDate: '2022-12-15',
						anniversaryDate: '2022-12-24',
						cancelledAt: !1,
						subscriptionId: 'A-S00286635',
						trialLength: 9,
						autoRenew: !0,
						currentPlans: [],
						futurePlans: [
							{
								name: null,
								start: '2021-12-10',
								end: '2022-11-29',
								shouldBeVisible: !0,
								chargedThrough: null,
								price: 15e3,
								currency: '£',
								currencyISO: 'GBP',
								billingPeriod: 'year',
							},
						],
						readerType: 'Direct',
						accountId: '8ad0965d7d585497017d6ce786026089',
						deliveryAddressChangeEffectiveDate: '2021-12-10',
					},
					isTestUser: !1,
				})
					.payByCard(cards.visaExpired())
					.withAlertText(
						'Our attempt to take payment for your Guardian Weekly subscription failed on 24/02/2016.',
					)
					.getProductDetailObject();
			}
			function guardianWeeklyCancelled() {
				return new productBuilder_ProductBuilder({
					tier: 'Guardian Weekly - Domestic',
					isPaidTier: !0,
					selfServiceCancellation: {
						isAllowed: !1,
						shouldDisplayEmail: !1,
						phoneRegionsToDisplay: ['UK & ROW'],
					},
					joinDate: '2021-11-29',
					optIn: !0,
					subscription: {
						contactId: '0039E00001KA26BQAT',
						deliveryAddress: {
							addressLine1: 'Kings Place',
							addressLine2: '90 York Way',
							town: 'London',
							postcode: 'N1 9GU',
							country: 'United Kingdom',
						},
						safeToUpdatePaymentMethod: !0,
						start: '2021-12-24',
						end: '2022-12-15',
						nextPaymentPrice: 13500,
						nextPaymentDate: '2021-12-10',
						lastPaymentDate: null,
						potentialCancellationDate: null,
						chargedThroughDate: null,
						renewalDate: '2022-12-15',
						anniversaryDate: '2022-12-24',
						cancelledAt: !1,
						subscriptionId: 'A-S00286635',
						trialLength: 9,
						autoRenew: !0,
						currentPlans: [],
						futurePlans: [
							{
								name: null,
								start: '2021-12-10',
								end: '2022-11-29',
								shouldBeVisible: !0,
								chargedThrough: null,
								price: 15e3,
								currency: '£',
								currencyISO: 'GBP',
								billingPeriod: 'year',
							},
						],
						readerType: 'Direct',
						accountId: '8ad0965d7d585497017d6ce786026089',
						deliveryAddressChangeEffectiveDate: '2021-12-10',
					},
					isTestUser: !1,
				})
					.payByCard()
					.cancel()
					.getProductDetailObject();
			}
			function digitalPackPaidByDirectDebit() {
				return new productBuilder_ProductBuilder({
					tier: 'Digital Pack',
					isPaidTier: !0,
					selfServiceCancellation: {
						isAllowed: !0,
						shouldDisplayEmail: !1,
						phoneRegionsToDisplay: ['UK & ROW'],
					},
					joinDate: '2021-11-11',
					subscription: {
						contactId: '0039E00001KA26BQAT',
						deliveryAddress: {
							addressLine1: 'Kings Place',
							addressLine2: '90 York Way',
							town: 'London',
							postcode: 'N1 9GU',
							country: 'United Kingdom',
						},
						safeToUpdatePaymentMethod: !0,
						start: '2021-11-27',
						end: '2022-11-11',
						nextPaymentPrice: 14900,
						nextPaymentDate: '2021-11-27',
						lastPaymentDate: null,
						potentialCancellationDate: null,
						chargedThroughDate: null,
						renewalDate: '2022-11-11',
						anniversaryDate: '2022-11-27',
						cancelledAt: !1,
						subscriptionId: 'A-S00278175',
						trialLength: 12,
						autoRenew: !0,
						plan: {
							name: 'Digital Pack',
							price: 14900,
							currency: '£',
							currencyISO: 'GBP',
							billingPeriod: 'year',
							start: '2022-12-23',
							end: '2024-12-11',
							shouldBeVisible: !0,
							features: '',
						},
						currentPlans: [],
						futurePlans: [
							{
								name: null,
								start: '2022-06-05',
								end: '2023-05-20',
								shouldBeVisible: !0,
								chargedThrough: null,
								price: 14900,
								currency: '£',
								currencyISO: 'GBP',
								billingPeriod: 'year',
							},
						],
						readerType: 'Direct',
					},
					isTestUser: !1,
				})
					.payByDirectDebit()
					.getProductDetailObject();
			}
			function digitalPackWithPaymentFailure() {
				return new productBuilder_ProductBuilder({
					tier: 'Digital Pack',
					isPaidTier: !0,
					selfServiceCancellation: {
						isAllowed: !0,
						shouldDisplayEmail: !1,
						phoneRegionsToDisplay: ['UK & ROW'],
					},
					joinDate: '2021-11-11',
					subscription: {
						contactId: '0039E00001KA26BQAT',
						deliveryAddress: {
							addressLine1: 'Kings Place',
							addressLine2: '90 York Way',
							town: 'London',
							postcode: 'N1 9GU',
							country: 'United Kingdom',
						},
						safeToUpdatePaymentMethod: !0,
						start: '2021-11-27',
						end: '2022-11-11',
						nextPaymentPrice: 14900,
						nextPaymentDate: '2021-11-27',
						lastPaymentDate: null,
						potentialCancellationDate: null,
						chargedThroughDate: null,
						renewalDate: '2022-11-11',
						anniversaryDate: '2022-11-27',
						cancelledAt: !1,
						subscriptionId: 'A-S00278175',
						trialLength: 12,
						autoRenew: !0,
						plan: {
							name: 'Digital Pack',
							price: 14900,
							currency: '£',
							currencyISO: 'GBP',
							billingPeriod: 'year',
							start: '2022-12-23',
							end: '2024-12-11',
							shouldBeVisible: !0,
							features: '',
						},
						currentPlans: [],
						futurePlans: [
							{
								name: null,
								start: '2022-06-05',
								end: '2023-05-20',
								shouldBeVisible: !0,
								chargedThrough: null,
								price: 14900,
								currency: '£',
								currencyISO: 'GBP',
								billingPeriod: 'year',
							},
						],
						readerType: 'Direct',
					},
					isTestUser: !1,
				})
					.payByDirectDebit()
					.withAlertText('Payment failed')
					.getProductDetailObject();
			}
			function monthlyContributionPaidByCard() {
				return new productBuilder_ProductBuilder({
					tier: 'Contributor',
					isPaidTier: !0,
					selfServiceCancellation: {
						isAllowed: !0,
						shouldDisplayEmail: !0,
						phoneRegionsToDisplay: ['UK & ROW', 'US', 'AUS'],
					},
					joinDate: '2022-01-05',
					optIn: !0,
					subscription: {
						contactId: '0039E00001KA26BQAT',
						deliveryAddress: {
							addressLine1: 'Kings Place',
							addressLine2: '90 York Place',
							town: 'Canberra',
							region: 'ACT',
							postcode: '2601',
							country: 'Australia',
						},
						safeToUpdatePaymentMethod: !0,
						start: '2022-01-05',
						end: '2022-02-05',
						nextPaymentPrice: 700,
						nextPaymentDate: '2022-02-05',
						lastPaymentDate: '2022-01-05',
						potentialCancellationDate: null,
						chargedThroughDate: '2022-02-05',
						renewalDate: '2023-01-05',
						anniversaryDate: '2023-01-05',
						cancelledAt: !1,
						subscriptionId: 'A-S00303370',
						trialLength: -24,
						autoRenew: !0,
						currentPlans: [
							{
								name: null,
								start: '2022-01-05',
								end: '2023-01-05',
								shouldBeVisible: !0,
								chargedThrough: '2022-02-05',
								price: 700,
								currency: '£',
								currencyISO: 'GBP',
								billingPeriod: 'month',
							},
						],
						futurePlans: [],
						readerType: 'Direct',
						accountId: '8ad09f8a7e25bda3017e296317464818',
					},
					isTestUser: !1,
				})
					.payByCard()
					.withBillingPeriod('month')
					.withPrice(400)
					.getProductDetailObject();
			}
			function annualContributionPaidByCardWithCurrency(currency, price) {
				return new productBuilder_ProductBuilder({
					tier: 'Contributor',
					isPaidTier: !0,
					selfServiceCancellation: {
						isAllowed: !0,
						shouldDisplayEmail: !0,
						phoneRegionsToDisplay: ['UK & ROW', 'US', 'AUS'],
					},
					joinDate: '2022-01-05',
					optIn: !0,
					subscription: {
						contactId: '0039E00001KA26BQAT',
						deliveryAddress: {
							addressLine1: 'Kings Place',
							addressLine2: '90 York Place',
							town: 'Canberra',
							region: 'ACT',
							postcode: '2601',
							country: 'Australia',
						},
						safeToUpdatePaymentMethod: !0,
						start: '2022-01-05',
						end: '2022-02-05',
						nextPaymentPrice: 700,
						nextPaymentDate: '2022-02-05',
						lastPaymentDate: '2022-01-05',
						potentialCancellationDate: null,
						chargedThroughDate: '2022-02-05',
						renewalDate: '2023-01-05',
						anniversaryDate: '2023-01-05',
						cancelledAt: !1,
						subscriptionId: 'A-S00303370',
						trialLength: -24,
						autoRenew: !0,
						currentPlans: [
							{
								name: null,
								start: '2022-01-05',
								end: '2023-01-05',
								shouldBeVisible: !0,
								chargedThrough: '2022-02-05',
								price: 700,
								currency: '£',
								currencyISO: 'GBP',
								billingPeriod: 'month',
							},
						],
						futurePlans: [],
						readerType: 'Direct',
						accountId: '8ad09f8a7e25bda3017e296317464818',
					},
					isTestUser: !1,
				})
					.payByCard()
					.withBillingPeriod('year')
					.withCurrency(currency)
					.withPrice(null != price ? price : 300)
					.getProductDetailObject();
			}
			function contributionPaidByCard() {
				return new productBuilder_ProductBuilder({
					tier: 'Contributor',
					isPaidTier: !0,
					selfServiceCancellation: {
						isAllowed: !0,
						shouldDisplayEmail: !0,
						phoneRegionsToDisplay: ['UK & ROW', 'US', 'AUS'],
					},
					joinDate: '2022-01-05',
					optIn: !0,
					subscription: {
						contactId: '0039E00001KA26BQAT',
						deliveryAddress: {
							addressLine1: 'Kings Place',
							addressLine2: '90 York Place',
							town: 'Canberra',
							region: 'ACT',
							postcode: '2601',
							country: 'Australia',
						},
						safeToUpdatePaymentMethod: !0,
						start: '2022-01-05',
						end: '2022-02-05',
						nextPaymentPrice: 700,
						nextPaymentDate: '2022-02-05',
						lastPaymentDate: '2022-01-05',
						potentialCancellationDate: null,
						chargedThroughDate: '2022-02-05',
						renewalDate: '2023-01-05',
						anniversaryDate: '2023-01-05',
						cancelledAt: !1,
						subscriptionId: 'A-S00303370',
						trialLength: -24,
						autoRenew: !0,
						currentPlans: [
							{
								name: null,
								start: '2022-01-05',
								end: '2023-01-05',
								shouldBeVisible: !0,
								chargedThrough: '2022-02-05',
								price: 700,
								currency: '£',
								currencyISO: 'GBP',
								billingPeriod: 'month',
							},
						],
						futurePlans: [],
						readerType: 'Direct',
						accountId: '8ad09f8a7e25bda3017e296317464818',
					},
					isTestUser: !1,
				})
					.payByCard()
					.getProductDetailObject();
			}
			function contributionPaidByPayPal() {
				return new productBuilder_ProductBuilder({
					tier: 'Contributor',
					isPaidTier: !0,
					selfServiceCancellation: {
						isAllowed: !0,
						shouldDisplayEmail: !0,
						phoneRegionsToDisplay: ['UK & ROW', 'US', 'AUS'],
					},
					joinDate: '2022-01-05',
					optIn: !0,
					subscription: {
						contactId: '0039E00001KA26BQAT',
						deliveryAddress: {
							addressLine1: 'Kings Place',
							addressLine2: '90 York Place',
							town: 'Canberra',
							region: 'ACT',
							postcode: '2601',
							country: 'Australia',
						},
						safeToUpdatePaymentMethod: !0,
						start: '2022-01-05',
						end: '2022-02-05',
						nextPaymentPrice: 700,
						nextPaymentDate: '2022-02-05',
						lastPaymentDate: '2022-01-05',
						potentialCancellationDate: null,
						chargedThroughDate: '2022-02-05',
						renewalDate: '2023-01-05',
						anniversaryDate: '2023-01-05',
						cancelledAt: !1,
						subscriptionId: 'A-S00303370',
						trialLength: -24,
						autoRenew: !0,
						currentPlans: [
							{
								name: null,
								start: '2022-01-05',
								end: '2023-01-05',
								shouldBeVisible: !0,
								chargedThrough: '2022-02-05',
								price: 700,
								currency: '£',
								currencyISO: 'GBP',
								billingPeriod: 'month',
							},
						],
						futurePlans: [],
						readerType: 'Direct',
						accountId: '8ad09f8a7e25bda3017e296317464818',
					},
					isTestUser: !1,
				})
					.payByPayPal()
					.getProductDetailObject();
			}
			function contributionPaidByPayPalAboveSupporterPlusThreshold() {
				return new productBuilder_ProductBuilder({
					tier: 'Contributor',
					isPaidTier: !0,
					selfServiceCancellation: {
						isAllowed: !0,
						shouldDisplayEmail: !0,
						phoneRegionsToDisplay: ['UK & ROW', 'US', 'AUS'],
					},
					joinDate: '2022-01-05',
					optIn: !0,
					subscription: {
						contactId: '0039E00001KA26BQAT',
						deliveryAddress: {
							addressLine1: 'Kings Place',
							addressLine2: '90 York Place',
							town: 'Canberra',
							region: 'ACT',
							postcode: '2601',
							country: 'Australia',
						},
						safeToUpdatePaymentMethod: !0,
						start: '2022-01-05',
						end: '2022-02-05',
						nextPaymentPrice: 700,
						nextPaymentDate: '2022-02-05',
						lastPaymentDate: '2022-01-05',
						potentialCancellationDate: null,
						chargedThroughDate: '2022-02-05',
						renewalDate: '2023-01-05',
						anniversaryDate: '2023-01-05',
						cancelledAt: !1,
						subscriptionId: 'A-S00303370',
						trialLength: -24,
						autoRenew: !0,
						currentPlans: [
							{
								name: null,
								start: '2022-01-05',
								end: '2023-01-05',
								shouldBeVisible: !0,
								chargedThrough: '2022-02-05',
								price: 700,
								currency: '£',
								currencyISO: 'GBP',
								billingPeriod: 'month',
							},
						],
						futurePlans: [],
						readerType: 'Direct',
						accountId: '8ad09f8a7e25bda3017e296317464818',
					},
					isTestUser: !1,
				})
					.payByPayPal()
					.withPrice(1200)
					.getProductDetailObject();
			}
			function contributionPaidByDirectDebit() {
				return new productBuilder_ProductBuilder({
					tier: 'Contributor',
					isPaidTier: !0,
					selfServiceCancellation: {
						isAllowed: !0,
						shouldDisplayEmail: !0,
						phoneRegionsToDisplay: ['UK & ROW', 'US', 'AUS'],
					},
					joinDate: '2022-01-05',
					optIn: !0,
					subscription: {
						contactId: '0039E00001KA26BQAT',
						deliveryAddress: {
							addressLine1: 'Kings Place',
							addressLine2: '90 York Place',
							town: 'Canberra',
							region: 'ACT',
							postcode: '2601',
							country: 'Australia',
						},
						safeToUpdatePaymentMethod: !0,
						start: '2022-01-05',
						end: '2022-02-05',
						nextPaymentPrice: 700,
						nextPaymentDate: '2022-02-05',
						lastPaymentDate: '2022-01-05',
						potentialCancellationDate: null,
						chargedThroughDate: '2022-02-05',
						renewalDate: '2023-01-05',
						anniversaryDate: '2023-01-05',
						cancelledAt: !1,
						subscriptionId: 'A-S00303370',
						trialLength: -24,
						autoRenew: !0,
						currentPlans: [
							{
								name: null,
								start: '2022-01-05',
								end: '2023-01-05',
								shouldBeVisible: !0,
								chargedThrough: '2022-02-05',
								price: 700,
								currency: '£',
								currencyISO: 'GBP',
								billingPeriod: 'month',
							},
						],
						futurePlans: [],
						readerType: 'Direct',
						accountId: '8ad09f8a7e25bda3017e296317464818',
					},
					isTestUser: !1,
				})
					.payByDirectDebit()
					.getProductDetailObject();
			}
			function contributionPaidBySepa() {
				return new productBuilder_ProductBuilder({
					tier: 'Contributor',
					isPaidTier: !0,
					selfServiceCancellation: {
						isAllowed: !0,
						shouldDisplayEmail: !0,
						phoneRegionsToDisplay: ['UK & ROW', 'US', 'AUS'],
					},
					joinDate: '2022-01-05',
					optIn: !0,
					subscription: {
						contactId: '0039E00001KA26BQAT',
						deliveryAddress: {
							addressLine1: 'Kings Place',
							addressLine2: '90 York Place',
							town: 'Canberra',
							region: 'ACT',
							postcode: '2601',
							country: 'Australia',
						},
						safeToUpdatePaymentMethod: !0,
						start: '2022-01-05',
						end: '2022-02-05',
						nextPaymentPrice: 700,
						nextPaymentDate: '2022-02-05',
						lastPaymentDate: '2022-01-05',
						potentialCancellationDate: null,
						chargedThroughDate: '2022-02-05',
						renewalDate: '2023-01-05',
						anniversaryDate: '2023-01-05',
						cancelledAt: !1,
						subscriptionId: 'A-S00303370',
						trialLength: -24,
						autoRenew: !0,
						currentPlans: [
							{
								name: null,
								start: '2022-01-05',
								end: '2023-01-05',
								shouldBeVisible: !0,
								chargedThrough: '2022-02-05',
								price: 700,
								currency: '£',
								currencyISO: 'GBP',
								billingPeriod: 'month',
							},
						],
						futurePlans: [],
						readerType: 'Direct',
						accountId: '8ad09f8a7e25bda3017e296317464818',
					},
					isTestUser: !1,
				})
					.payBySepa()
					.getProductDetailObject();
			}
			function contributionCancelled() {
				return new productBuilder_ProductBuilder({
					tier: 'Contributor',
					isPaidTier: !0,
					selfServiceCancellation: {
						isAllowed: !0,
						shouldDisplayEmail: !0,
						phoneRegionsToDisplay: ['UK & ROW', 'US', 'AUS'],
					},
					joinDate: '2022-01-05',
					optIn: !0,
					subscription: {
						contactId: '0039E00001KA26BQAT',
						deliveryAddress: {
							addressLine1: 'Kings Place',
							addressLine2: '90 York Place',
							town: 'Canberra',
							region: 'ACT',
							postcode: '2601',
							country: 'Australia',
						},
						safeToUpdatePaymentMethod: !0,
						start: '2022-01-05',
						end: '2022-02-05',
						nextPaymentPrice: 700,
						nextPaymentDate: '2022-02-05',
						lastPaymentDate: '2022-01-05',
						potentialCancellationDate: null,
						chargedThroughDate: '2022-02-05',
						renewalDate: '2023-01-05',
						anniversaryDate: '2023-01-05',
						cancelledAt: !1,
						subscriptionId: 'A-S00303370',
						trialLength: -24,
						autoRenew: !0,
						currentPlans: [
							{
								name: null,
								start: '2022-01-05',
								end: '2023-01-05',
								shouldBeVisible: !0,
								chargedThrough: '2022-02-05',
								price: 700,
								currency: '£',
								currencyISO: 'GBP',
								billingPeriod: 'month',
							},
						],
						futurePlans: [],
						readerType: 'Direct',
						accountId: '8ad09f8a7e25bda3017e296317464818',
					},
					isTestUser: !1,
				})
					.payByCard()
					.cancel()
					.getProductDetailObject();
			}
			function newspaperVoucherPaidByPaypal(email) {
				return new productBuilder_ProductBuilder({
					tier: 'Newspaper Digital Voucher',
					isPaidTier: !0,
					selfServiceCancellation: {
						isAllowed: !1,
						shouldDisplayEmail: !1,
						phoneRegionsToDisplay: ['UK & ROW'],
					},
					joinDate: '2021-11-26',
					optIn: !0,
					subscription: {
						contactId: '0039E00001KA26BQAT',
						deliveryAddress: {
							addressLine1: 'Kings Place',
							addressLine2: '90 York Way',
							town: 'London',
							postcode: 'N1 9GU',
							country: 'United Kingdom',
						},
						safeToUpdatePaymentMethod: !0,
						start: '2021-12-06',
						end: '2022-11-26',
						nextPaymentPrice: 5299,
						nextPaymentDate: '2021-12-06',
						lastPaymentDate: null,
						potentialCancellationDate: null,
						chargedThroughDate: null,
						renewalDate: '2022-11-26',
						anniversaryDate: '2022-12-06',
						cancelledAt: !1,
						subscriptionId: 'A-S00285104',
						trialLength: -7,
						autoRenew: !0,
						currentPlans: [
							{
								name: 'Everyday',
								start: '2021-12-06',
								end: '2022-11-26',
								shouldBeVisible: !0,
								chargedThrough: null,
								price: 5299,
								currency: '£',
								currencyISO: 'GBP',
								billingPeriod: 'month',
								daysOfWeek: [
									'Monday',
									'Tuesday',
									'Wednesday',
									'Thursday',
									'Friday',
									'Saturday',
									'Sunday',
								],
							},
						],
						futurePlans: [],
						readerType: 'Direct',
						accountId: '8ad0824e7d584341017d5bc38c0d52dc',
					},
					isTestUser: !1,
				})
					.payByPayPal(email)
					.getProductDetailObject();
			}
			function homeDeliverySunday() {
				return new productBuilder_ProductBuilder({
					tier: 'Newspaper Delivery',
					isPaidTier: !0,
					selfServiceCancellation: {
						isAllowed: !1,
						shouldDisplayEmail: !1,
						phoneRegionsToDisplay: ['UK & ROW'],
					},
					billingCountry: 'United Kingdom',
					joinDate: '2025-02-11',
					optIn: !0,
					subscription: {
						contactId: '0039E00001KA26BQAT',
						deliveryAddress: {
							addressLine1: 'Kings Place',
							addressLine2: '90 York Way',
							town: 'London',
							postcode: 'N1 9GU',
							country: 'United Kingdom',
						},
						safeToUpdatePaymentMethod: !0,
						start: '2025-02-11',
						end: '2026-02-11',
						nextPaymentPrice: 2099,
						nextPaymentDate: '2025-02-11',
						lastPaymentDate: null,
						potentialCancellationDate: null,
						chargedThroughDate: null,
						renewalDate: '2026-02-11',
						anniversaryDate: '2026-02-11',
						cancelledAt: !1,
						subscriptionId: 'A-S00959486',
						trialLength: 0,
						autoRenew: !0,
						plan: {
							name: 'Newspaper Delivery',
							price: 2099,
							currency: '£',
							currencyISO: 'GBP',
							billingPeriod: 'month',
							start: '2022-12-23',
							end: '2024-12-11',
							shouldBeVisible: !0,
							features: '',
						},
						currentPlans: [
							{
								name: 'Sunday',
								start: '2025-02-11',
								end: '2026-02-11',
								shouldBeVisible: !0,
								chargedThrough: null,
								price: 2099,
								currency: '£',
								currencyISO: 'GBP',
								billingPeriod: 'month',
								features: '',
								daysOfWeek: ['Sunday'],
							},
						],
						futurePlans: [
							{
								name: null,
								start: '2025-02-26',
								end: '2025-02-26',
								shouldBeVisible: !0,
								chargedThrough: null,
								price: 500,
								currency: '£',
								currencyISO: 'GBP',
								billingPeriod: 'month',
								features: '',
							},
						],
						readerType: 'Direct',
						accountId: '8ad0824e7d584341017d5bc38c0d52dc',
					},
					isTestUser: !1,
				})
					.payByCard()
					.getProductDetailObject();
			}
			function membershipSupporter() {
				return new productBuilder_ProductBuilder({
					tier: 'Supporter',
					isPaidTier: !0,
					selfServiceCancellation: {
						isAllowed: !0,
						shouldDisplayEmail: !0,
						phoneRegionsToDisplay: ['UK & ROW', 'US', 'AUS'],
					},
					billingCountry: 'United Kingdom',
					joinDate: '2023-04-26',
					optIn: !0,
					subscription: {
						contactId: '2',
						safeToUpdatePaymentMethod: !0,
						start: '2023-04-26',
						end: '2024-04-26',
						nextPaymentPrice: 700,
						nextPaymentDate: '2023-05-26',
						lastPaymentDate: '2023-04-26',
						potentialCancellationDate: null,
						chargedThroughDate: '2023-05-26',
						renewalDate: '2024-04-26',
						anniversaryDate: '2024-04-26',
						cancelledAt: !1,
						subscriptionId: 'A-S00538748',
						trialLength: -1,
						autoRenew: !0,
						plan: {
							name: 'Supporter',
							price: 700,
							currency: '£',
							currencyISO: 'GBP',
							billingPeriod: 'month',
							start: '',
							end: '',
							shouldBeVisible: !1,
							features: '',
						},
						currentPlans: [
							{
								name: null,
								start: '2023-04-26',
								end: '2024-04-26',
								shouldBeVisible: !0,
								chargedThrough: '2023-05-26',
								price: 700,
								currency: '£',
								currencyISO: 'GBP',
								billingPeriod: 'month',
							},
						],
						futurePlans: [],
						readerType: 'Direct',
						accountId: '2',
					},
					isTestUser: !1,
				})
					.payByCard()
					.getProductDetailObject();
			}
			function membershipSupporterCurrencyUSD() {
				return new productBuilder_ProductBuilder({
					tier: 'Supporter',
					isPaidTier: !0,
					selfServiceCancellation: {
						isAllowed: !0,
						shouldDisplayEmail: !0,
						phoneRegionsToDisplay: ['UK & ROW', 'US', 'AUS'],
					},
					billingCountry: 'United Kingdom',
					joinDate: '2023-04-26',
					optIn: !0,
					subscription: {
						contactId: '2',
						safeToUpdatePaymentMethod: !0,
						start: '2023-04-26',
						end: '2024-04-26',
						nextPaymentPrice: 700,
						nextPaymentDate: '2023-05-26',
						lastPaymentDate: '2023-04-26',
						potentialCancellationDate: null,
						chargedThroughDate: '2023-05-26',
						renewalDate: '2024-04-26',
						anniversaryDate: '2024-04-26',
						cancelledAt: !1,
						subscriptionId: 'A-S00538748',
						trialLength: -1,
						autoRenew: !0,
						plan: {
							name: 'Supporter',
							price: 700,
							currency: '£',
							currencyISO: 'GBP',
							billingPeriod: 'month',
							start: '',
							end: '',
							shouldBeVisible: !1,
							features: '',
						},
						currentPlans: [
							{
								name: null,
								start: '2023-04-26',
								end: '2024-04-26',
								shouldBeVisible: !0,
								chargedThrough: '2023-05-26',
								price: 700,
								currency: '£',
								currencyISO: 'GBP',
								billingPeriod: 'month',
							},
						],
						futurePlans: [],
						readerType: 'Direct',
						accountId: '2',
					},
					isTestUser: !1,
				})
					.payByCard()
					.withCurrency('USD')
					.getProductDetailObject();
			}
			function supporterPlus() {
				return new productBuilder_ProductBuilder({
					tier: 'Supporter Plus',
					isPaidTier: !0,
					isTestUser: !1,
					selfServiceCancellation: {
						isAllowed: !0,
						shouldDisplayEmail: !1,
						phoneRegionsToDisplay: ['UK & ROW'],
					},
					joinDate: '2022-07-20',
					optIn: !0,
					subscription: {
						contactId: '0039E00001VVNb5QAH',
						safeToUpdatePaymentMethod: !0,
						start: '2022-07-20',
						end: '2022-08-20',
						nextPaymentPrice: 5e3,
						nextPaymentDate: '2022-08-20',
						lastPaymentDate: '2022-07-20',
						potentialCancellationDate: null,
						chargedThroughDate: '2022-08-20',
						renewalDate: '2023-07-20',
						anniversaryDate: '2023-07-20',
						cancelledAt: !1,
						subscriptionId: 'A-S00393340',
						trialLength: -2,
						autoRenew: !0,
						currentPlans: [
							{
								name: null,
								start: '2022-07-20',
								end: '2023-07-20',
								shouldBeVisible: !0,
								chargedThrough: '2022-08-20',
								price: 5e3,
								currency: '£',
								currencyISO: 'GBP',
								billingPeriod: 'month',
							},
						],
						futurePlans: [],
						readerType: 'Direct',
						accountId: '8ad088718219a6b601821bbe9e6210f2',
					},
				})
					.payByCard()
					.getProductDetailObject();
			}
			function supporterPlusUSA() {
				return new productBuilder_ProductBuilder({
					tier: 'Supporter Plus',
					isPaidTier: !0,
					isTestUser: !1,
					selfServiceCancellation: {
						isAllowed: !0,
						shouldDisplayEmail: !1,
						phoneRegionsToDisplay: ['UK & ROW'],
					},
					joinDate: '2022-07-20',
					optIn: !0,
					subscription: {
						contactId: '0039E00001VVNb5QAH',
						safeToUpdatePaymentMethod: !0,
						start: '2022-07-20',
						end: '2022-08-20',
						nextPaymentPrice: 5e3,
						nextPaymentDate: '2022-08-20',
						lastPaymentDate: '2022-07-20',
						potentialCancellationDate: null,
						chargedThroughDate: '2022-08-20',
						renewalDate: '2023-07-20',
						anniversaryDate: '2023-07-20',
						cancelledAt: !1,
						subscriptionId: 'A-S00393340',
						trialLength: -2,
						autoRenew: !0,
						currentPlans: [
							{
								name: null,
								start: '2022-07-20',
								end: '2023-07-20',
								shouldBeVisible: !0,
								chargedThrough: '2022-08-20',
								price: 5e3,
								currency: '£',
								currencyISO: 'GBP',
								billingPeriod: 'month',
							},
						],
						futurePlans: [],
						readerType: 'Direct',
						accountId: '8ad088718219a6b601821bbe9e6210f2',
					},
				})
					.payByCard()
					.inUSA()
					.getProductDetailObject();
			}
			function supporterPlusMonthlyAllAccessDigital() {
				return new productBuilder_ProductBuilder({
					tier: 'Supporter Plus',
					isPaidTier: !0,
					isTestUser: !1,
					selfServiceCancellation: {
						isAllowed: !0,
						shouldDisplayEmail: !1,
						phoneRegionsToDisplay: ['UK & ROW'],
					},
					joinDate: '2022-07-20',
					optIn: !0,
					subscription: {
						contactId: '0039E00001VVNb5QAH',
						safeToUpdatePaymentMethod: !0,
						start: '2022-07-20',
						end: '2022-08-20',
						nextPaymentPrice: 5e3,
						nextPaymentDate: '2022-08-20',
						lastPaymentDate: '2022-07-20',
						potentialCancellationDate: null,
						chargedThroughDate: '2022-08-20',
						renewalDate: '2023-07-20',
						anniversaryDate: '2023-07-20',
						cancelledAt: !1,
						subscriptionId: 'A-S00393340',
						trialLength: -2,
						autoRenew: !0,
						currentPlans: [
							{
								name: null,
								start: '2022-07-20',
								end: '2023-07-20',
								shouldBeVisible: !0,
								chargedThrough: '2022-08-20',
								price: 5e3,
								currency: '£',
								currencyISO: 'GBP',
								billingPeriod: 'month',
							},
						],
						futurePlans: [],
						readerType: 'Direct',
						accountId: '8ad088718219a6b601821bbe9e6210f2',
					},
				})
					.payByCard()
					.withPrice(1200)
					.withBillingPeriod('month')
					.getProductDetailObject();
			}
			function supporterPlusAnnual() {
				return new productBuilder_ProductBuilder({
					tier: 'Supporter Plus',
					isPaidTier: !0,
					isTestUser: !1,
					selfServiceCancellation: {
						isAllowed: !0,
						shouldDisplayEmail: !1,
						phoneRegionsToDisplay: ['UK & ROW'],
					},
					joinDate: '2022-07-20',
					optIn: !0,
					subscription: {
						contactId: '0039E00001VVNb5QAH',
						safeToUpdatePaymentMethod: !0,
						start: '2022-07-20',
						end: '2022-08-20',
						nextPaymentPrice: 5e3,
						nextPaymentDate: '2022-08-20',
						lastPaymentDate: '2022-07-20',
						potentialCancellationDate: null,
						chargedThroughDate: '2022-08-20',
						renewalDate: '2023-07-20',
						anniversaryDate: '2023-07-20',
						cancelledAt: !1,
						subscriptionId: 'A-S00393340',
						trialLength: -2,
						autoRenew: !0,
						currentPlans: [
							{
								name: null,
								start: '2022-07-20',
								end: '2023-07-20',
								shouldBeVisible: !0,
								chargedThrough: '2022-08-20',
								price: 5e3,
								currency: '£',
								currencyISO: 'GBP',
								billingPeriod: 'month',
							},
						],
						futurePlans: [],
						readerType: 'Direct',
						accountId: '8ad088718219a6b601821bbe9e6210f2',
					},
				})
					.payByCard()
					.withPrice(12e3)
					.withBillingPeriod('year')
					.getProductDetailObject();
			}
			function supporterPlusAnnualCancelled() {
				return new productBuilder_ProductBuilder({
					tier: 'Supporter Plus',
					isPaidTier: !0,
					isTestUser: !1,
					selfServiceCancellation: {
						isAllowed: !0,
						shouldDisplayEmail: !1,
						phoneRegionsToDisplay: ['UK & ROW'],
					},
					joinDate: '2022-07-20',
					optIn: !0,
					subscription: {
						contactId: '0039E00001VVNb5QAH',
						safeToUpdatePaymentMethod: !0,
						start: '2022-07-20',
						end: '2022-08-20',
						nextPaymentPrice: 5e3,
						nextPaymentDate: '2022-08-20',
						lastPaymentDate: '2022-07-20',
						potentialCancellationDate: null,
						chargedThroughDate: '2022-08-20',
						renewalDate: '2023-07-20',
						anniversaryDate: '2023-07-20',
						cancelledAt: !1,
						subscriptionId: 'A-S00393340',
						trialLength: -2,
						autoRenew: !0,
						currentPlans: [
							{
								name: null,
								start: '2022-07-20',
								end: '2023-07-20',
								shouldBeVisible: !0,
								chargedThrough: '2022-08-20',
								price: 5e3,
								currency: '£',
								currencyISO: 'GBP',
								billingPeriod: 'month',
							},
						],
						futurePlans: [],
						readerType: 'Direct',
						accountId: '8ad088718219a6b601821bbe9e6210f2',
					},
				})
					.payByCard()
					.withPrice(12e3)
					.withBillingPeriod('year')
					.cancel()
					.getProductDetailObject();
			}
			function supporterPlusCancelled() {
				return new productBuilder_ProductBuilder({
					tier: 'Supporter Plus',
					isPaidTier: !0,
					isTestUser: !1,
					selfServiceCancellation: {
						isAllowed: !0,
						shouldDisplayEmail: !1,
						phoneRegionsToDisplay: ['UK & ROW'],
					},
					joinDate: '2022-07-20',
					optIn: !0,
					subscription: {
						contactId: '0039E00001VVNb5QAH',
						safeToUpdatePaymentMethod: !0,
						start: '2022-07-20',
						end: '2022-08-20',
						nextPaymentPrice: 5e3,
						nextPaymentDate: '2022-08-20',
						lastPaymentDate: '2022-07-20',
						potentialCancellationDate: null,
						chargedThroughDate: '2022-08-20',
						renewalDate: '2023-07-20',
						anniversaryDate: '2023-07-20',
						cancelledAt: !1,
						subscriptionId: 'A-S00393340',
						trialLength: -2,
						autoRenew: !0,
						currentPlans: [
							{
								name: null,
								start: '2022-07-20',
								end: '2023-07-20',
								shouldBeVisible: !0,
								chargedThrough: '2022-08-20',
								price: 5e3,
								currency: '£',
								currencyISO: 'GBP',
								billingPeriod: 'month',
							},
						],
						futurePlans: [],
						readerType: 'Direct',
						accountId: '8ad088718219a6b601821bbe9e6210f2',
					},
				})
					.payByCard()
					.cancel()
					.getProductDetailObject();
			}
			function supporterPlusInOfferPeriod() {
				return new productBuilder_ProductBuilder({
					tier: 'Supporter Plus',
					isPaidTier: !0,
					isTestUser: !1,
					selfServiceCancellation: {
						isAllowed: !0,
						shouldDisplayEmail: !1,
						phoneRegionsToDisplay: ['UK & ROW'],
					},
					joinDate: '2022-07-20',
					optIn: !0,
					subscription: {
						contactId: '0039E00001VVNb5QAH',
						safeToUpdatePaymentMethod: !0,
						start: '2022-07-20',
						end: '2022-08-20',
						nextPaymentPrice: 5e3,
						nextPaymentDate: '2022-08-20',
						lastPaymentDate: '2022-07-20',
						potentialCancellationDate: null,
						chargedThroughDate: '2022-08-20',
						renewalDate: '2023-07-20',
						anniversaryDate: '2023-07-20',
						cancelledAt: !1,
						subscriptionId: 'A-S00393340',
						trialLength: -2,
						autoRenew: !0,
						currentPlans: [
							{
								name: null,
								start: '2022-07-20',
								end: '2023-07-20',
								shouldBeVisible: !0,
								chargedThrough: '2022-08-20',
								price: 5e3,
								currency: '£',
								currencyISO: 'GBP',
								billingPeriod: 'month',
							},
						],
						futurePlans: [],
						readerType: 'Direct',
						accountId: '8ad088718219a6b601821bbe9e6210f2',
					},
				})
					.payByCard()
					.inOfferPeriod()
					.getProductDetailObject();
			}
			function guardianAdLite() {
				return new productBuilder_ProductBuilder({
					tier: 'Guardian Ad-Lite',
					isPaidTier: !0,
					selfServiceCancellation: {
						isAllowed: !0,
						shouldDisplayEmail: !0,
						phoneRegionsToDisplay: ['UK & ROW', 'US', 'AUS'],
					},
					joinDate: '2022-07-20',
					optIn: !0,
					subscription: {
						contactId: '0039E00001KA26BQAT',
						deliveryAddress: {
							addressLine1: 'Kings Place',
							addressLine2: '90 York Place',
							town: 'London',
							postcode: 'N1 9GU',
							country: 'United Kingdom',
						},
						safeToUpdatePaymentMethod: !0,
						start: '2022-07-20',
						end: '2022-08-20',
						nextPaymentPrice: 700,
						nextPaymentDate: '2022-08-20',
						lastPaymentDate: '2022-07-20',
						potentialCancellationDate: null,
						chargedThroughDate: '2022-08-20',
						renewalDate: '2023-07-20',
						anniversaryDate: '2023-07-20',
						cancelledAt: !1,
						subscriptionId: 'A-S00303371',
						trialLength: -2,
						autoRenew: !0,
						currentPlans: [
							{
								name: null,
								start: '2022-07-20',
								end: '2023-07-20',
								shouldBeVisible: !0,
								chargedThrough: '2022-08-20',
								price: 700,
								currency: '£',
								currencyISO: 'GBP',
								billingPeriod: 'month',
							},
						],
						futurePlans: [],
						readerType: 'Direct',
						accountId: '8ad09f8a7e25bda3017e296317464818',
					},
					isTestUser: !1,
				})
					.payByCard()
					.withPotentialCancellationDate()
					.getProductDetailObject();
			}
			function guardianAdLiteInTrialPeriod() {
				return new productBuilder_ProductBuilder({
					tier: 'Guardian Ad-Lite',
					isPaidTier: !0,
					selfServiceCancellation: {
						isAllowed: !0,
						shouldDisplayEmail: !0,
						phoneRegionsToDisplay: ['UK & ROW', 'US', 'AUS'],
					},
					joinDate: '2022-07-20',
					optIn: !0,
					subscription: {
						contactId: '0039E00001KA26BQAT',
						deliveryAddress: {
							addressLine1: 'Kings Place',
							addressLine2: '90 York Place',
							town: 'London',
							postcode: 'N1 9GU',
							country: 'United Kingdom',
						},
						safeToUpdatePaymentMethod: !0,
						start: '2022-07-20',
						end: '2022-08-20',
						nextPaymentPrice: 700,
						nextPaymentDate: '2022-08-20',
						lastPaymentDate: '2022-07-20',
						potentialCancellationDate: null,
						chargedThroughDate: '2022-08-20',
						renewalDate: '2023-07-20',
						anniversaryDate: '2023-07-20',
						cancelledAt: !1,
						subscriptionId: 'A-S00303371',
						trialLength: -2,
						autoRenew: !0,
						currentPlans: [
							{
								name: null,
								start: '2022-07-20',
								end: '2023-07-20',
								shouldBeVisible: !0,
								chargedThrough: '2022-08-20',
								price: 700,
								currency: '£',
								currencyISO: 'GBP',
								billingPeriod: 'month',
							},
						],
						futurePlans: [],
						readerType: 'Direct',
						accountId: '8ad09f8a7e25bda3017e296317464818',
					},
					isTestUser: !1,
				})
					.payByCard()
					.inTrialPeriod()
					.getProductDetailObject();
			}
			function guardianAdLiteCancelled() {
				return new productBuilder_ProductBuilder({
					tier: 'Guardian Ad-Lite',
					isPaidTier: !0,
					selfServiceCancellation: {
						isAllowed: !0,
						shouldDisplayEmail: !0,
						phoneRegionsToDisplay: ['UK & ROW', 'US', 'AUS'],
					},
					joinDate: '2022-07-20',
					optIn: !0,
					subscription: {
						contactId: '0039E00001KA26BQAT',
						deliveryAddress: {
							addressLine1: 'Kings Place',
							addressLine2: '90 York Place',
							town: 'London',
							postcode: 'N1 9GU',
							country: 'United Kingdom',
						},
						safeToUpdatePaymentMethod: !0,
						start: '2022-07-20',
						end: '2022-08-20',
						nextPaymentPrice: 700,
						nextPaymentDate: '2022-08-20',
						lastPaymentDate: '2022-07-20',
						potentialCancellationDate: null,
						chargedThroughDate: '2022-08-20',
						renewalDate: '2023-07-20',
						anniversaryDate: '2023-07-20',
						cancelledAt: !1,
						subscriptionId: 'A-S00303371',
						trialLength: -2,
						autoRenew: !0,
						currentPlans: [
							{
								name: null,
								start: '2022-07-20',
								end: '2023-07-20',
								shouldBeVisible: !0,
								chargedThrough: '2022-08-20',
								price: 700,
								currency: '£',
								currencyISO: 'GBP',
								billingPeriod: 'month',
							},
						],
						futurePlans: [],
						readerType: 'Direct',
						accountId: '8ad09f8a7e25bda3017e296317464818',
					},
					isTestUser: !1,
				})
					.payByCard()
					.cancel()
					.getProductDetailObject();
			}
			function tierThree() {
				return new productBuilder_ProductBuilder({
					tier: 'Tier Three',
					isPaidTier: !0,
					selfServiceCancellation: {
						isAllowed: !0,
						shouldDisplayEmail: !0,
						phoneRegionsToDisplay: ['UK & ROW', 'US', 'AUS'],
					},
					billingCountry: 'United Kingdom',
					joinDate: '2021-11-29',
					optIn: !0,
					subscription: {
						paymentMethod: 'Card',
						card: {
							last4: '4242',
							expiry: { month: 2, year: 2029 },
							type: 'Visa',
							stripePublicKeyForUpdate:
								'pk_test_Qm3CGRdrV4WfGYCpm0sftR0f',
							email: 'rupert.bates+t3@observer.co.uk',
						},
						contactId: '003UD00000BDAMbYAP',
						deliveryAddress: {
							addressLine1: 'Kings Place',
							addressLine2: '',
							town: 'London',
							postcode: 'N19GU',
							country: 'United Kingdom',
						},
						safeToUpdatePaymentMethod: !0,
						start: '2021-12-24',
						end: '2022-12-15',
						nextPaymentPrice: 2500,
						nextPaymentDate: '2024-06-28',
						lastPaymentDate: null,
						potentialCancellationDate: null,
						chargedThroughDate: null,
						renewalDate: '2022-12-15',
						anniversaryDate: '2022-12-24',
						cancelledAt: !1,
						subscriptionId: 'A-S00897035',
						trialLength: 4,
						autoRenew: !0,
						plan: {
							name: 'Tier Three',
							price: 2500,
							currency: '£',
							currencyISO: 'GBP',
							billingPeriod: 'month',
							start: '',
							end: '',
							shouldBeVisible: !1,
							features: '',
						},
						currentPlans: [],
						futurePlans: [
							{
								name: null,
								start: '2021-12-10',
								end: '2022-11-29',
								shouldBeVisible: !0,
								chargedThrough: null,
								price: 2500,
								currency: '£',
								currencyISO: 'GBP',
								billingPeriod: 'month',
								features: '',
							},
						],
						readerType: 'Direct',
						accountId: '8ad08f069010dd31019011e437574822',
					},
					isTestUser: !1,
				})
					.payByCard()
					.getProductDetailObject();
			}
			function patronMembership() {
				return new productBuilder_ProductBuilder({
					tier: 'Supporter',
					isPaidTier: !0,
					selfServiceCancellation: {
						isAllowed: !0,
						shouldDisplayEmail: !0,
						phoneRegionsToDisplay: ['UK & ROW', 'US', 'AUS'],
					},
					billingCountry: 'United Kingdom',
					joinDate: '2023-04-26',
					optIn: !0,
					subscription: {
						contactId: '2',
						safeToUpdatePaymentMethod: !0,
						start: '2023-04-26',
						end: '2024-04-26',
						nextPaymentPrice: 700,
						nextPaymentDate: '2023-05-26',
						lastPaymentDate: '2023-04-26',
						potentialCancellationDate: null,
						chargedThroughDate: '2023-05-26',
						renewalDate: '2024-04-26',
						anniversaryDate: '2024-04-26',
						cancelledAt: !1,
						subscriptionId: 'A-S00538748',
						trialLength: -1,
						autoRenew: !0,
						plan: {
							name: 'Supporter',
							price: 700,
							currency: '£',
							currencyISO: 'GBP',
							billingPeriod: 'month',
							start: '',
							end: '',
							shouldBeVisible: !1,
							features: '',
						},
						currentPlans: [
							{
								name: null,
								start: '2023-04-26',
								end: '2024-04-26',
								shouldBeVisible: !0,
								chargedThrough: '2023-05-26',
								price: 700,
								currency: '£',
								currencyISO: 'GBP',
								billingPeriod: 'month',
							},
						],
						futurePlans: [],
						readerType: 'Direct',
						accountId: '2',
					},
					isTestUser: !1,
				})
					.payByCard()
					.withPrice(1e4)
					.asPatron()
					.asPatronTier()
					.withEvents()
					.getProductDetailObject();
			}
		},
	},
]);
