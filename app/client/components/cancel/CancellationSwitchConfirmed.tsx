import { css } from '@emotion/react';
import {
	space,
	neutral,
	headline,
	textSans,
} from '@guardian/source-foundations';
import {
	Button,
	SvgArrowRightStraight,
} from '@guardian/source-react-components';
import { useNavigate } from 'react-router-dom';
import { maxWidth } from '../../styles/breakpoints';

const CancellationSwitchConfirmed = () => {
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
				You’re now a digital subscritber
			</h2>
			<p
				css={css`
					${textSans.medium()}
				`}
			>
				Your monthly contribution has successfully been changed to a
				Digital Subscription. We’ve stopped your previous payments and
				started you on your new plan. Please check your inbox for an
				email containing all your details and information on how to
				access your benefits.
			</p>
			<Button
				icon={<SvgArrowRightStraight />}
				iconSide="right"
				onClick={() => {
					navigate('/');
				}}
			>
				Return to Account overview
			</Button>
		</>
	);
};

export default CancellationSwitchConfirmed;