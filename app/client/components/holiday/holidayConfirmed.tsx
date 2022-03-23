import { css } from '@emotion/core';
import { space } from '@guardian/src-foundations';
import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { DateRange } from '../../../shared/dates';
import { isProduct, ProductDetail } from '../../../shared/productResponse';
import { ProductTypeWithHolidayStopsFlow } from '../../../shared/productTypes';
import { LinkButton } from '../buttons';
import { GenericErrorScreen } from '../genericErrorScreen';
import { ProgressIndicator } from '../progressIndicator';
import { buttonBarCss } from './holidayDateChooser';
import { creditExplainerSentence } from './holidayQuestionsModal';
import { Button } from '@guardian/src-button';
import { isHolidayStopsResponse } from './holidayStopApi';
import {
	HolidayStopsContext,
	HolidayStopsContextInterface,
} from './HolidayStopsContainer';
import { SummaryTable } from './summaryTable';

const HolidayConfirmed = () => {
	const {
		productDetail,
		productType,
		selectedRange,
		publicationsImpacted,
		holidayStopResponse,
		reload,
	} = useContext(HolidayStopsContext) as HolidayStopsContextInterface;

	const navigate = useNavigate();

	return isHolidayStopsResponse(holidayStopResponse) ? (
		!!selectedRange && isProduct(productDetail) ? (
			<>
				<ProgressIndicator
					steps={[
						{ title: 'Choose dates' },
						{ title: 'Review' },
						{
							title: 'Confirmation',
							isCurrentStep: true,
						},
					]}
					additionalCSS={css`
						margin: ${space[5]}px 0 ${space[12]}px;
					`}
				/>
				<h1>Your schedule has been set</h1>
				<p>
					We will send an email to confirm the details.{' '}
					{creditExplainerSentence(
						productType.holidayStops.issueKeyword,
					)}{' '}
					{productType.holidayStops.additionalHowAdvice}
				</p>
				<SummaryTable
					data={{ selectedRange, publicationsImpacted }}
					isTestUser={productDetail.isTestUser}
					subscription={productDetail.subscription}
					issueKeyword={productType.holidayStops.issueKeyword}
				/>
				<div css={[buttonBarCss, { justifyContent: 'flex-end' }]}>
					<div css={{ marginBottom: '10px' }}>
						<Button
							priority="secondary"
							onClick={() => {
								reload();
								navigate('../create');
							}}
						>
							Schedule another suspension
						</Button>
					</div>
					<div css={{ marginBottom: '10px', marginLeft: '20px' }}>
						<Button
							onClick={() => navigate(`/${productType.urlPart}`)}
						>
							Manage your subscriptions
						</Button>
					</div>
				</div>
			</>
		) : (
			<Navigate to=".." />
		)
	) : (
		<GenericErrorScreen loggingMessage="No holiday stop response" />
	);
};

export default HolidayConfirmed;
