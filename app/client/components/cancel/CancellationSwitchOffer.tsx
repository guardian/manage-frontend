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

const CancellationSwitchOffer = () => {
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
				We’re sorry to hear you’re thinking of cancelling.
			</h2>
			<p
				css={css`
					${textSans.medium()}
				`}
			>
				Your support means the Guardian can remain editorially
				independent, free from the influence of billionaire owners and
				politicians. This enables us to give a voice to the voiceless,
				challenge the powerful and hold them to account. The support
				from our readers helps us to keep our journalism free of a
				paywall, so it’s open and accessible to all.
			</p>
			<Button
				icon={<SvgArrowRightStraight />}
				iconSide="right"
				onClick={() => {
					navigate('./switch');
				}}
			>
				Explore a digital subscription
			</Button>
		</>
	);
};

export default CancellationSwitchOffer;
