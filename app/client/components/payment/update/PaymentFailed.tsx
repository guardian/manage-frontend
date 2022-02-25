import {
	isProduct,
	MembersDataApiItemContext,
} from '../../../../shared/productResponse';
import {
	RouteableStepProps,
	visuallyNavigateToParent,
} from '../../wizardRouterAdapter';
import { css } from '@emotion/react';
import { neutral, brand } from '@guardian/src-foundations/palette';
import { space } from '@guardian/src-foundations';
import { minWidth } from '../../../styles/breakpoints';
import { Button } from '@guardian/src-button';
import {
	isNewPaymentMethodDetail,
	NewPaymentMethodContext,
} from './newPaymentMethodDetail';
import { CallCentreNumbers } from '../../callCentreNumbers';
import { textSans } from '@guardian/src-foundations/typography';
import { SvgArrowRightStraight } from '@guardian/src-icons';

export default function PaymentFailed(props: RouteableStepProps) {
	return (
		<MembersDataApiItemContext.Consumer>
			{(previousProductDetail) => (
				<NewPaymentMethodContext.Consumer>
					{(newPaymentMethodDetail) =>
						isNewPaymentMethodDetail(newPaymentMethodDetail) &&
						isProduct(previousProductDetail) ? (
							<>
								<div
									css={css`
										border-top: 1px solid ${neutral['86']};
										text-align: left;
										margin-top: ${space[9]}px;
										margin-bottom: ${space[6]}px;
										${textSans.medium()}
									`}
								>
									<p
										css={css`
											padding-top: ${space[1]}px;
										`}
									>
										Sorry, the{' '}
										{newPaymentMethodDetail.friendlyName}{' '}
										update failed.
										<br />
										To try again please go back and re-enter
										your new{' '}
										{
											newPaymentMethodDetail.friendlyName
										}{' '}
										details.
									</p>
								</div>
								<Button
									priority="primary"
									onClick={() =>
										visuallyNavigateToParent(props)
									}
									icon={<SvgArrowRightStraight />}
									iconSide="right"
								>
									Try again
								</Button>
								<div
									css={css`
										border-top: 1px solid ${neutral[86]};
										${textSans.medium()};
										color: ${neutral[46]};
										padding-top: ${space[4]}px;
										margin-top: ${space[6]}px;

										a {
											color: ${brand[500]};
										}

										${minWidth.tablet} {
											padding-top: ${space[9]}px;
											margin-top: ${space[9]}px;
										}
									`}
								>
									<CallCentreNumbers prefixText="Alternatively, to contact us" />
								</div>
							</>
						) : (
							visuallyNavigateToParent(props)
						)
					}
				</NewPaymentMethodContext.Consumer>
			)}
		</MembersDataApiItemContext.Consumer>
	);
}
