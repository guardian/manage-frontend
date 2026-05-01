import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import type { ProductDetail } from '../../../../../shared/productResponse';
import type { ProductTypeWithCancellationFlowMandatoryReasons } from '../../../../../shared/productTypes';
import { usePrintCancellationStore } from '../../../../stores/PrintCancellationStore';
import type { DeliveryRecordDetail } from '../../delivery/records/deliveryRecordsApi';
import type { OutstandingHolidayStop } from '../../holiday/HolidayStopApi';
import type { OptionalCancellationReasonId } from '../cancellationReason';

interface ValidatedReviewProps {
	productDetail: ProductDetail;
	productType: ProductTypeWithCancellationFlowMandatoryReasons;
	selectedReasonId: OptionalCancellationReasonId;
	cancellationPolicy: string;
	isPrintProductType: boolean;
	setCaseData?: (data: {
		caseId: string;
		holidayStops?: OutstandingHolidayStop[];
		deliveryCredits?: DeliveryRecordDetail[];
	}) => void;
}

interface PrintCancellationReasonReviewProps {
	productDetail: ProductDetail;
	productType: ProductTypeWithCancellationFlowMandatoryReasons;
	renderValidatedReview: (props: ValidatedReviewProps) => ReactNode;
}

export const PrintCancellationReasonReview = ({
	productDetail,
	productType,
	renderValidatedReview,
}: PrintCancellationReasonReviewProps) => {
	const { selectedReasonId, cancellationPolicy, setCaseData } =
		usePrintCancellationStore();

	if (!selectedReasonId) {
		return <Navigate to=".." />;
	}

	return renderValidatedReview({
		productDetail,
		productType,
		selectedReasonId,
		cancellationPolicy,
		isPrintProductType: true,
		setCaseData,
	});
};
