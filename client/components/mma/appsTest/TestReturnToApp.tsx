import { ThemeProvider } from '@emotion/react';
import {
	buttonThemeReaderRevenueBrand,
	LinkButton,
} from '@guardian/source-react-components';

export const TestReturnToApp = () => {
	return (
		<ThemeProvider theme={buttonThemeReaderRevenueBrand}>
			<LinkButton href="x-gu://mma/success">
				Activate full app access now
			</LinkButton>
		</ThemeProvider>
	);
};
