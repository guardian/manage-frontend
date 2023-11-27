import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import { Button, Stack } from '@guardian/source-react-components';
import { useNavigate } from 'react-router';
import { convertTimestampToDate } from '../../../../shared/dates';
import type { SingleProductDetail } from '../../../../shared/productResponse';
import { wideButtonLayoutCss } from '../../../styles/ButtonStyles';
import { convertCurrencyToSymbol } from '../../../utilities/currencyIso';
import { Card } from '../shared/Card';
import { productColour } from './ProductCardConfiguration';
import {
	keyValueCss,
	productCardTitleCss,
	productDetailLayoutCss,
} from './ProductCardStyles';

function getAmountDisplay(contribution: SingleProductDetail): string {
	const currencySymbol = convertCurrencyToSymbol(contribution.currency);
	return currencySymbol
		? `${currencySymbol}${contribution.price}`
		: `${contribution.price} ${contribution.currency}`;
}

export const SingleContributionCard = ({
	singleContributions,
}: {
	singleContributions: SingleProductDetail[];
}) => {
	const navigate = useNavigate();
	return (
		<Stack space={4}>
			<Card>
				<Card.Header backgroundColor={productColour.singleContribution}>
					<h3 css={productCardTitleCss(true)}>One-time Support</h3>
				</Card.Header>
				<Card.Section>
					<div
						css={[
							productDetailLayoutCss,
							css`
								margin-top: -${space[2]}px;
							`,
						]}
					>
						<dl css={keyValueCss}>
							{singleContributions.map((contribution) => (
								<span key={contribution.created}>
									<div
										css={css`
											padding-top: ${space[3]}px;

											dt {
												:after {
													content: '';
												}
											}
										`}
									>
										<dt>One-time contribution of</dt>
										<dd>
											{getAmountDisplay(contribution)}
										</dd>
									</div>
									<div>
										<dt>Date of contribution</dt>
										<dd>
											{convertTimestampToDate(
												contribution.created,
											)}
										</dd>
									</div>
								</span>
							))}
						</dl>
						<div css={wideButtonLayoutCss}>
							<Button
								css={css`
									justify-content: center;
								`}
								size="small"
								onClick={() => {
									navigate('/email-prefs');
								}}
							>
								Manage marketing preferences
							</Button>
						</div>
					</div>
				</Card.Section>
			</Card>
		</Stack>
	);
};
