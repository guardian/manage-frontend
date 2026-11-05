import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import { CancellationContainer } from '@/client/components/mma/cancel/CancellationContainer';
import { CancellationReasonReview } from '@/client/components/mma/cancel/CancellationReasonReview';
import { CancellationReasonSelection } from '@/client/components/mma/cancel/CancellationReasonSelection';
import { ConfirmCancellation } from '@/client/components/mma/cancel/stages/ConfirmCancellation';
import { ExecuteCancellation } from '@/client/components/mma/cancel/stages/ExecuteCancellation';
import { toMembersDataApiResponse } from '@/client/fixtures/mdapiResponse';
import { useAccountStore } from '@/client/stores/AccountStore';
import { usePrintCancellationStore } from '@/client/stores/PrintCancellationStore';
import { featureSwitches } from '@/shared/featureSwitches';
import type { ProductDetail } from '@/shared/productResponse';
import type { ProductType } from '@/shared/productTypes';

// Storybook has no URL param, so turn the print journey on for these stories.
featureSwitches.printProductCancellation = true;

export interface PrintCancellationStoryProduct {
	productType: ProductType;
	productDetail: ProductDetail;
}

type ReviewVariant = 'soft' | 'hard' | 'hardWithCredit';

const reader = {
	firstName: 'test',
	lastName: 'name',
	email: 'test@test.com',
};

export const withReader = (
	productDetail: ProductDetail,
	country?: string,
): ProductDetail => ({
	...productDetail,
	billingCountry: country ?? productDetail.billingCountry,
	subscription: {
		...productDetail.subscription,
		deliveryAddress: productDetail.subscription.deliveryAddress
			? {
					...productDetail.subscription.deliveryAddress,
					country:
						country ??
						productDetail.subscription.deliveryAddress.country,
			  }
			: undefined,
		account: { accountName: reader.firstName },
	},
});

const seedReader = (productDetail: ProductDetail) => {
	useAccountStore.getState().setMdapiResponse({
		user: reader,
		products: [productDetail],
	});
};

const seedJourney = (hasOutstandingCredit: boolean) => {
	const state = usePrintCancellationStore.getState();
	if (!state.cancellationMode) {
		return false;
	}
	const creditIsReady = hasOutstandingCredit
		? !!state.holidayStops?.length
		: !state.holidayStops?.length;
	if (state.caseId === 'caseId' && creditIsReady) {
		return true;
	}
	usePrintCancellationStore.setState({
		selectedReasonId: 'mma_editorial',
		cancellationFeedback: '',
		caseId: 'caseId',
		holidayStops: hasOutstandingCredit ? [{}] : [],
		deliveryCredits: [],
	});
	return true;
};

const cancellationDate = (variant: ReviewVariant | 'soft' | 'hard') =>
	variant === 'soft' ? '2026-06-01' : 'now';

const dateHandler = (variant: ReviewVariant | 'soft' | 'hard') =>
	http.get('/api/cancellation-date/**', () =>
		HttpResponse.json({
			cancellationEffectiveDate: cancellationDate(variant),
		}),
	);

const containerParameters = ({
	productType,
	productDetail,
}: PrintCancellationStoryProduct) => ({
	reactRouter: {
		state: { productDetail },
		container: <CancellationContainer productType={productType} />,
	},
});

export const printCancellationMeta = (title: string): Meta => ({
	title,
	component: CancellationContainer,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
	},
});

export const reasonsStory = (
	product: PrintCancellationStoryProduct,
): StoryObj<typeof CancellationReasonSelection> => ({
	name: 'Reasons',
	render: () => {
		seedReader(product.productDetail);
		return <CancellationReasonSelection />;
	},
	parameters: {
		msw: [dateHandler('soft')],
		...containerParameters(product),
	},
});

export const pauseStory = (
	product: PrintCancellationStoryProduct,
	name = 'Pause',
): StoryObj<typeof CancellationReasonReview> => ({
	name,
	render: () => {
		seedReader(product.productDetail);
		seedJourney(false);
		return <CancellationReasonReview />;
	},
	parameters: {
		msw: [
			dateHandler('soft'),
			http.post('/api/case', () => HttpResponse.json({ id: 'caseId' })),
			http.get('/api/holidays/**', () =>
				HttpResponse.json({ publicationsToRefund: [] }),
			),
			http.get('/api/delivery-records/**', () =>
				HttpResponse.json({ results: [] }),
			),
		],
		...containerParameters(product),
	},
});

export const reviewStory = (
	product: PrintCancellationStoryProduct,
	variant: ReviewVariant,
): StoryObj<typeof ConfirmCancellation> => ({
	name:
		variant === 'soft'
			? 'Review, soft'
			: variant === 'hard'
			? 'Review, hard'
			: 'Review, hard with credit',
	render: () => {
		seedReader(product.productDetail);
		if (!seedJourney(variant === 'hardWithCredit')) {
			return <></>;
		}
		return <ConfirmCancellation />;
	},
	parameters: {
		msw: [dateHandler(variant)],
		...containerParameters(product),
	},
});

export const confirmedStory = (
	product: PrintCancellationStoryProduct,
	mode: 'soft' | 'hard',
): StoryObj<typeof ExecuteCancellation> => ({
	name: mode === 'soft' ? 'Confirmed, soft' : 'Confirmed, hard',
	render: () => {
		seedReader(product.productDetail);
		if (!seedJourney(false)) {
			return <></>;
		}
		return <ExecuteCancellation />;
	},
	parameters: {
		msw: [
			dateHandler(mode),
			http.patch('/api/case/**', () =>
				HttpResponse.json({ id: 'caseId' }),
			),
			http.get('/api/me/mma/**', () =>
				HttpResponse.json(
					toMembersDataApiResponse(product.productDetail),
				),
			),
			http.post(
				'/api/cancel/**',
				() => new HttpResponse(null, { status: 201 }),
			),
		],
		...containerParameters(product),
	},
});

export const escalatedStory = (
	product: PrintCancellationStoryProduct,
): StoryObj<typeof ExecuteCancellation> => ({
	name: 'Confirmed, escalated',
	render: () => {
		seedReader(product.productDetail);
		if (!seedJourney(true)) {
			return <></>;
		}
		return <ExecuteCancellation />;
	},
	parameters: {
		msw: [
			dateHandler('hard'),
			http.patch('/api/case/**', () =>
				HttpResponse.json({ id: 'caseId' }),
			),
		],
		...containerParameters(product),
	},
});
