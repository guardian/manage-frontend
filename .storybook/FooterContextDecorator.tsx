import { DecoratorFn } from '@storybook/react';
import { HasMinimalFooterContext } from '../client/components/shared/Main';
import { useState } from 'react';

export const FooterContextDecorator: DecoratorFn = (Story, context) => {
	const [_, setHasMinimalFooter] = useState<boolean>(false);

	return (
		<HasMinimalFooterContext.Provider value={{ setHasMinimalFooter }}>
			<Story />
		</HasMinimalFooterContext.Provider>
	);
};
