import { css, ThemeProvider } from '@emotion/react';
import { palette, space, textSans } from '@guardian/source-foundations';
import {
	Button,
	buttonThemeReaderRevenueBrand,
	Stack,
	SvgClock,
	SvgCreditCard,
} from '@guardian/source-react-components';
import { useNavigate } from 'react-router';
import { Card } from '../../shared/Card';
import { Heading } from '../../shared/Heading';
import {
	buttonCentredCss,
	buttonLayoutCss,
	iconListCss,
	listWithDividersCss,
	newAmountCss,
	productTitleCss,
	sectionSpacing,
	smallPrintCss,
} from './SaveStyles';

const YourNewSupport = () => (
	<section css={sectionSpacing}>
		<Heading
			sansSerif
			cssOverrides={css`
				margin-bottom: ${space[3]}px;
			`}
		>
			Your new support
		</Heading>
		<Card>
			<Card.Header backgroundColor={palette.brand[500]}>
				<h3 css={productTitleCss}>Monthly</h3>
			</Card.Header>
			<Card.Section>
				<p
					css={css`
						${textSans.medium()};
						margin: 0;
					`}
				>
					Monthly support with supporter newsletter and fewer asks for
					support
				</p>
				<p css={newAmountCss}>XY/month</p>
			</Card.Section>
		</Card>
	</section>
);

const WhatHappensNext = () => (
	<section css={sectionSpacing}>
		<Stack space={4}>
			<Heading sansSerif>What happens next?</Heading>
			<ul css={[iconListCss, listWithDividersCss]}>
				<li>
					<SvgClock size="medium" />
					<span>
						<strong>
							Your new support will start at the end of your
							billing period
						</strong>
						<br />
						You will be charged XY from the XX month. From that
						date, you will continue to receive the supporter
						newsletter and see fewer support asks but you will lose
						access to premium features in the App and ad-free
						reading.
					</span>
				</li>
				<li>
					<SvgCreditCard size="medium" />
					<span>
						<strong>Your payment method</strong>
						<br />
						The payment will be taken from{' '}
						{/* <PaymentDetails
            subscription={
                contributionToSwitch.subscription
            }
        /> */}
					</span>
				</li>
			</ul>
		</Stack>
	</section>
);

const TsAndCs = () => (
	<section css={sectionSpacing}>
		<p css={smallPrintCss}>
			This subscription auto-renews and you will be charged the applicable
			monthly amount each time it renews unless you cancel. You can change
			how much you pay at any time but
		</p>
		<p css={smallPrintCss}>
			By proceeding, you are agreeing to our{' '}
			<a href="https://www.theguardian.com/info/2022/oct/28/the-guardian-supporter-plus-terms-and-conditions">
				Terms and Conditions
			</a>
			.
		</p>
		<p css={smallPrintCss}>
			To find out what personal data we collect and how we use it, please
			visit our{' '}
			<a href="https://www.theguardian.com/help/privacy-policy">
				Privacy Policy
			</a>
			.
		</p>
	</section>
);

export const MembershipSwitch = () => {
	const navigate = useNavigate();

	return (
		<>
			<section css={sectionSpacing}>
				<Heading sansSerif>Review change</Heading>
				<p
					css={css`
						${textSans.medium()}
						margin: 0;
					`}
				>
					You are changing your current membership for a XY Monthly.
				</p>
			</section>
			<YourNewSupport />
			<WhatHappensNext />
			<section css={sectionSpacing}>
				<p
					css={css`
						${textSans.medium()}
						border-top: 1px solid ${palette.neutral[86]};
						padding-top: ${space[5]}px;
					`}
				>
					Please note that, once the change is done, you will not be
					able to have the full set of benefits for £7 again (full
					price is now £10).
				</p>
			</section>
			<section css={[sectionSpacing, buttonLayoutCss]}>
				<ThemeProvider theme={buttonThemeReaderRevenueBrand}>
					<Button cssOverrides={buttonCentredCss}>
						Confirm change
					</Button>
				</ThemeProvider>
				<Button
					priority="tertiary"
					cssOverrides={[buttonCentredCss]}
					onClick={() => navigate('..')}
				>
					Back
				</Button>
			</section>
			<TsAndCs />
		</>
	);
};
