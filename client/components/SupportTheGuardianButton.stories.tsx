import { ThemeProvider } from '@emotion/react';
import { palette } from '@guardian/source-foundations';
import {
	buttonThemeReaderRevenueBrand,
	buttonThemeReaderRevenueBrandAlt,
	Inline,
	LinkButton,
	SvgArrowRightStraight,
} from '@guardian/source-react-components';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { SupportTheGuardianButton } from './supportTheGuardianButton';

export default {
	title: 'Components/SupportTheGuardianButton',
	component: SupportTheGuardianButton,
} as ComponentMeta<typeof SupportTheGuardianButton>;

export const Default: ComponentStory<typeof SupportTheGuardianButton> = () => (
	<>
		<p>Existing</p>

		<Inline space={4}>
			<SupportTheGuardianButton supportReferer="storybook" />
			<SupportTheGuardianButton
				supportReferer="storybook"
				alternateButtonText="Subscribe"
				fontWeight="bold"
			/>
			<SupportTheGuardianButton
				supportReferer="storybook"
				fontWeight="bold"
				textColour={palette.neutral[100]}
				colour={palette.brand[400]}
				notPrimary
			/>
			<SupportTheGuardianButton
				supportReferer="storybook"
				fontWeight="bold"
				height="42px"
				textColour={palette.neutral[100]}
				colour={palette.brand[400]}
				notPrimary
			/>
			<SupportTheGuardianButton
				supportReferer="storybook"
				alternateButtonText="Make a recurring contribution"
				fontWeight="bold"
				height="42px"
				notPrimary
			/>
		</Inline>

		<p>New</p>

		<Inline space={4}>
			<ThemeProvider theme={buttonThemeReaderRevenueBrand}>
				<LinkButton
					href="/"
					icon={<SvgArrowRightStraight />}
					iconSide="right"
					nudgeIcon={true}
					size="small"
				>
					Support The Guardian
				</LinkButton>
				<LinkButton
					href="/"
					icon={<SvgArrowRightStraight />}
					iconSide="right"
					nudgeIcon={true}
					size="small"
				>
					Subscribe
				</LinkButton>
			</ThemeProvider>

			<LinkButton
				href="/"
				icon={<SvgArrowRightStraight />}
				iconSide="right"
				nudgeIcon={true}
				size="small"
			>
				Support The Guardian
			</LinkButton>

			<LinkButton
				href="/"
				icon={<SvgArrowRightStraight />}
				iconSide="right"
				nudgeIcon={true}
			>
				Support The Guardian
			</LinkButton>

			<ThemeProvider theme={buttonThemeReaderRevenueBrandAlt}>
				<LinkButton
					href="/"
					icon={<SvgArrowRightStraight />}
					iconSide="right"
					nudgeIcon={true}
				>
					Make a recurring contribution
				</LinkButton>
			</ThemeProvider>
		</Inline>
	</>
);
