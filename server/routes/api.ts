import * as Sentry from '@sentry/node';
import { Router } from 'express';
import type { MembersDataApiResponse } from '../../shared/productResponse';
import { isProduct, MDA_TEST_USER_HEADER } from '../../shared/productResponse';
import {
	cancellationSfCasesAPI,
	deliveryRecordsAPI,
	holidayStopAPI,
	invoicingAPI,
	productMoveAPI,
} from '../apiGatewayDiscovery';
import {
	customMembersDataApiHandler,
	membersDataApiHandler,
	proxyApiHandler,
	straightThroughBodyHandler,
} from '../apiProxy';
import { s3FilePromise } from '../awsIntegration';
import { conf } from '../config';
import { contactUsFormHandler } from '../contactUsApi';
import { augmentProductDetailWithDeliveryAddressChangeEffectiveDateForToday } from '../fulfilmentDateCalculatorReader';
import { getArticleHandler, getTopicHandler } from '../helpCentreApi';
import { log } from '../log';
import { withIdentity } from '../middleware/identityMiddleware';
import {
	cancelReminderHandler,
	createOneOffReminderHandler,
	publicCreateReminderHandler,
	reactivateReminderHandler,
} from '../reminders/reminderApi';
import { stripeSetupIntentHandler } from '../stripeSetupIntentsHandler';

const router = Router();

router.use(withIdentity(401));

router.get(
	'/existing-payment-options',
	membersDataApiHandler(
		'user-attributes/me/existing-payment-options',
		'MDA_EXISTING_PAYMENT_OPTIONS',
	),
);

router.get(
	'/me/mma/:subscriptionName?',
	customMembersDataApiHandler((response, body) => {
		const isTestUser = response.getHeader(MDA_TEST_USER_HEADER) === 'true';
		const mdapiResponse = JSON.parse(
			body.toString(),
		) as MembersDataApiResponse;
		const augmentedWithTestUser = mdapiResponse.products.map(
			(mdapiObject) => ({
				...mdapiObject,
				isTestUser,
			}),
		);
		Promise.all(
			augmentedWithTestUser
				.filter(isProduct)
				// TODO move this to members-data-api, so we can eliminate this customMembersDataApiHandler
				.map(
					augmentProductDetailWithDeliveryAddressChangeEffectiveDateForToday,
				),
		)
			.then((productDetails) => {
				mdapiResponse.products = productDetails;
				response.json(mdapiResponse);
			})
			.catch((error) => {
				const errorMessage =
					"Unexpected error when augmenting members-data-api response with 'deliveryAddressChangeEffectiveDate'";
				log.error(errorMessage, error);
				Sentry.captureMessage(errorMessage);
				response.json(augmentedWithTestUser); // fallback to sending the response augmented with just isTestUser
			});
	})(
		'user-attributes/me/mma/:subscriptionName',
		'MDA_DETAIL',
		['subscriptionName'],
		true,
	),
);

router.get(
	'/me/mma/one-off-contributions',
	membersDataApiHandler(
		'user-attributes/me/one-off-contributions',
		'MDA_DETAIL',
		[],
	),
);

router.get(
	'/cancellation-date/:subscriptionName',
	membersDataApiHandler(
		'user-attributes/me/cancellation-date/:subscriptionName',
		'MDA_CANCEL',
		['subscriptionName'],
	),
);

router.post(
	'/cancel/:subscriptionName?',
	membersDataApiHandler(
		'/user-attributes/me/cancel/:subscriptionName',
		'MDA_CANCEL',
		['subscriptionName'],
	),
);

router.post(
	'/supporter-plus-cancel/:subscriptionName',
	productMoveAPI(
		'supporter-plus-cancel/:subscriptionName',
		'CANCEL_SUPPORTER_PLUS',
		['subscriptionName'],
	),
);

router.post('/payment/card', stripeSetupIntentHandler);
router.post(
	'/payment/card/:subscriptionName',
	membersDataApiHandler(
		'/user-attributes/me/update-card/:subscriptionName',
		'MDA_UPDATE_PAYMENT_CARD',
		['subscriptionName'],
	),
);
router.post(
	'/payment/dd/:subscriptionName',
	membersDataApiHandler(
		'/user-attributes/me/update-direct-debit/:subscriptionName',
		'MDA_UPDATE_PAYMENT_DIRECT_DEBIT',
		['subscriptionName'],
	),
);

router.post(
	'/validate/payment/dd',
	proxyApiHandler('payment.' + conf.API_DOMAIN)(straightThroughBodyHandler)(
		'direct-debit/check-account',
		'PAPI_VALIDATE_DIRECT_DEBIT',
		[],
		true,
	),
);

router.post(
	'/case/:caseId?',
	cancellationSfCasesAPI('case', 'CREATE_CANCELLATION_CASE'),
);
router.patch(
	'/case/:caseId?',
	cancellationSfCasesAPI('case/:caseId', 'UPDATE_CANCELLATION_CASE', [
		'caseId',
	]),
);

router.post(
	'/product-move/:subscriptionName',
	productMoveAPI('product-move/:subscriptionName', 'MOVE_PRODUCT', [
		'subscriptionName',
	]),
);

router.get(
	'/holidays/:subscriptionName/potential',
	holidayStopAPI('potential/:subscriptionName', 'HOLIDAY_STOP_POTENTIALS', [
		'subscriptionName',
	]),
);
router.get(
	'/holidays/:subscriptionName/cancel',
	holidayStopAPI(
		'hsr/:subscriptionName/cancel',
		'HOLIDAY_STOP_CANCELLATION_PREVIEW',
		['subscriptionName'],
	),
);
router.get(
	'/holidays/:subscriptionName',
	holidayStopAPI('hsr/:subscriptionName', 'HOLIDAY_STOP_EXISTING', [
		'subscriptionName',
	]),
);
router.post('/holidays', holidayStopAPI('/hsr', 'HOLIDAY_STOP_CREATE'));
router.patch(
	'/holidays/:subscriptionName/:sfId',
	holidayStopAPI('hsr/:subscriptionName/:sfId', 'HOLIDAY_STOP_AMEND', [
		'subscriptionName',
		'sfId',
	]),
);
router.delete(
	'/holidays/:subscriptionName/:sfId',
	holidayStopAPI('hsr/:subscriptionName/:sfId', 'HOLIDAY_STOP_WITHDRAW', [
		'subscriptionName',
		'sfId',
	]),
);

router.get(
	'/delivery-records/:subscriptionName',
	deliveryRecordsAPI(
		'delivery-records/:subscriptionName',
		'DELIVERY_RECORDS_GET',
		['subscriptionName'],
	),
);
router.get(
	'/delivery-records/:subscriptionName/cancel',
	deliveryRecordsAPI(
		'delivery-records/:subscriptionName/cancel',
		'DELIVERY_RECORDS_CANCELLATION_PREVIEW',
		['subscriptionName'],
	),
);
router.post(
	'/delivery-records/:subscriptionName',
	deliveryRecordsAPI(
		'delivery-records/:subscriptionName',
		'DELIVERY_PROBLEM_CREATE',
		['subscriptionName'],
	),
);

router.put(
	'/delivery/address/update/:contactId',
	membersDataApiHandler(
		'/user-attributes/me/delivery-address/:contactId',
		'MDA_DELIVERY_ADDRESS_UPDATE',
		['contactId'],
	),
);

router.get('/invoices', invoicingAPI('invoices', 'LIST_INVOICES'));

router.get(
	'/invoices/:invoiceId',
	invoicingAPI(
		'invoices/:invoiceId',
		'GET_INVOICE_PDF',
		['invoiceId'],
		{ Accept: 'application/pdf' },
		true, // should not log body for pdf download
	),
);

router.get(
	'/cancelled',
	membersDataApiHandler(
		'user-attributes/me/cancelled-subscriptions',
		'MDA_CANCELLED_SUBSCRIPTIONS',
	),
);

router.get('/known-issues', async (_, response) => {
	const bucketName = 'manage-help-content';
	const filePath = `${conf.STAGE}/known-issues/knownIssuesConfig.json`;
	const data = await s3FilePromise(bucketName, filePath);
	response.json(data || []);
});

router.get('/help-centre/article/:article', getArticleHandler);
router.get('/help-centre/topic/:topic', getTopicHandler);

router.post('/contact-us', contactUsFormHandler);

router.post('/reminders/create', createOneOffReminderHandler); // requires sign-in
router.post(
	'/public/reminders/create/one-off',
	publicCreateReminderHandler('ONE_OFF'),
); // does not require sign-in, uses verification token
router.post(
	'/public/reminders/create/recurring',
	publicCreateReminderHandler('RECURRING'),
); // does not require sign-in, uses verification token
router.get(
	'/reminders/status',
	membersDataApiHandler(
		'user-attributes/me/reminders',
		'MDA_REMINDERS_STATUS',
	),
);
router.post('/reminders/cancel', cancelReminderHandler);
router.post('/reminders/reactivate', reactivateReminderHandler);

export { router };
