import { css } from '@emotion/core';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { neutral } from '@guardian/src-foundations/palette';
import { space } from '@guardian/src-foundations';
import { SvgArrowRightStraight } from '@guardian/src-icons';
import { Button } from '@guardian/src-button';
import { useNavigate } from 'react-router-dom';
import { maxWidth } from '../../styles/breakpoints';

const CancellationSwitchReview = () => {
	const navigate = useNavigate();

	const subHeadingTitleCss = `
    ${headline.small({ fontWeight: 'bold' })};
    ${maxWidth.tablet} {
      font-size: 1.25rem;
      line-height: 1.6;
    };
  `;
	const subHeadingBorderTopCss = `
    border-top: 1px solid ${neutral['86']};
    margin: 50px 0 ${space[5]}px;
  `;

	return (
		<>
			<h2
				css={css`
					${subHeadingTitleCss}
					${subHeadingBorderTopCss}
				`}
			>
				Change your support to a digital subscription
			</h2>
			<p
				css={css`
					${textSans.medium()}
				`}
			>
				If you decide to change the way you support us by becoming a
				digital subscriber we’ll stop your monthly contribution payments
				straight away and you’ll have immediate access to the benefits
				of a digital subscription.
			</p>
			<Button
				icon={<SvgArrowRightStraight />}
				iconSide="right"
				onClick={() => {
					navigate('./confirmed');
				}}
			>
				Confirm change
			</Button>
		</>
	);
};

export default CancellationSwitchReview;
