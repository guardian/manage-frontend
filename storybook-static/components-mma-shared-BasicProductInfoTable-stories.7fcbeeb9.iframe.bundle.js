'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[5286],
	{
		'./client/components/mma/shared/BasicProductInfoTable.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				I: () => BasicProductInfoTable,
			});
			var _shared_dates__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__('./shared/dates.ts'),
				_ProductDescriptionListTable__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./client/components/mma/shared/ProductDescriptionListTable.tsx',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
				BasicProductInfoTable = (props) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
						_ProductDescriptionListTable__WEBPACK_IMPORTED_MODULE_2__.M,
						{
							content: [
								{
									title: props.groupedProductType
										.showSupporterId
										? 'Supporter ID'
										: 'Subscription ID',
									value: props.productDetail.subscription
										.subscriptionId,
								},
								...(props.groupedProductType.tierLabel
									? [
											{
												title: props.groupedProductType
													.tierLabel,
												value: props.productDetail.tier,
											},
									  ]
									: []),
								...(props.groupedProductType
									.shouldShowJoinDateNotStartDate
									? [
											{
												title: 'Join date',
												value: (0,
												_shared_dates__WEBPACK_IMPORTED_MODULE_0__.sG)(
													props.productDetail
														.joinDate,
												).dateStr(),
											},
									  ]
									: [
											{
												title: 'Start date',
												value: props.productDetail
													.subscription.start
													? (0,
													  _shared_dates__WEBPACK_IMPORTED_MODULE_0__.sG)(
															props.productDetail
																.subscription
																.start,
													  ).dateStr()
													: '-',
											},
									  ]),
							],
						},
					);
			try {
				(BasicProductInfoTable.displayName = 'BasicProductInfoTable'),
					(BasicProductInfoTable.__docgenInfo = {
						description: '',
						displayName: 'BasicProductInfoTable',
						props: {
							groupedProductType: {
								defaultValue: null,
								description: '',
								name: 'groupedProductType',
								required: !0,
								type: { name: 'GroupedProductType' },
							},
							productDetail: {
								defaultValue: null,
								description: '',
								name: 'productDetail',
								required: !0,
								type: { name: 'ProductDetail' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/BasicProductInfoTable.tsx#BasicProductInfoTable'
						] = {
							docgenInfo: BasicProductInfoTable.__docgenInfo,
							name: 'BasicProductInfoTable',
							path: 'client/components/mma/shared/BasicProductInfoTable.tsx#BasicProductInfoTable',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/mma/shared/BasicProductInfoTable.stories.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					Default: () => Default,
					__namedExportsOrder: () => __namedExportsOrder,
					default: () => __WEBPACK_DEFAULT_EXPORT__,
				});
			var _shared_productTypes__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__('./shared/productTypes.ts'),
				_fixtures_productBuilder_testProducts__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./client/fixtures/productBuilder/testProducts.ts',
					),
				_BasicProductInfoTable__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./client/components/mma/shared/BasicProductInfoTable.tsx',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					);
			const __WEBPACK_DEFAULT_EXPORT__ = {
				title: 'Components/BasicProductInfoTable',
				component:
					_BasicProductInfoTable__WEBPACK_IMPORTED_MODULE_2__.I,
			};
			var Default = () =>
				(0, _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.tZ)(
					_BasicProductInfoTable__WEBPACK_IMPORTED_MODULE_2__.I,
					{
						groupedProductType:
							_shared_productTypes__WEBPACK_IMPORTED_MODULE_0__.HP
								.subscriptions,
						productDetail: (0,
						_fixtures_productBuilder_testProducts__WEBPACK_IMPORTED_MODULE_1__.Y$)(),
					},
				);
			Default.parameters = {
				...Default.parameters,
				docs: {
					...Default.parameters?.docs,
					source: {
						originalSource:
							'() => <BasicProductInfoTable groupedProductType={GROUPED_PRODUCT_TYPES.subscriptions} productDetail={newspaperVoucherPaidByPaypal()} />',
						...Default.parameters?.docs?.source,
					},
				},
			};
			const __namedExportsOrder = ['Default'];
		},
	},
]);
