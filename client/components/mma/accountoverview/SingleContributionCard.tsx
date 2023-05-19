import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import { Button, Stack } from '@guardian/source-react-components';
import { useNavigate } from 'react-router';
import type { SingleProductDetail } from '../../../../shared/productResponse';
import { Card } from '../shared/Card';
import { productColour } from './ProductCardConfiguration';
import {
	buttonLayoutCss,
	keyValueCss,
	productDetailLayoutCss,
	productTitleCss,
} from './ProductCardStyles';

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
					<h3 css={productTitleCss(true)}>Single Support</h3>
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
								<>
									<div
										css={css`
											padding-top: ${space[3]}px;
										`}
									>
										<dt>Single contribution of</dt>
										<dd>
											{contribution.currency}
											{contribution.price}
										</dd>
									</div>
									<div>
										<dt>Date of contribution</dt>
										<dd>dateeee</dd>
									</div>
								</>
							))}
						</dl>
						<div css={buttonLayoutCss}>
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
