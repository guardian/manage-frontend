import { Button } from '@guardian/source/react-components';
import type { FC } from 'react';
import { WithStandardTopMargin } from '@/client/components/shared/WithStandardTopMargin';

export const ObserverNewsletterLink: FC = () => {
	return (
		<WithStandardTopMargin>
			<p>
				{' '}
				To manage your newsletters for Observer Food, Design Review and
				other newsletters from the Observer which is published by
				Tortoise Media Ltd, please click the button below
			</p>
			<a href="https://observer.co.uk/newsletters">
				<Button priority="primary"> View Observer Newsletters</Button>
			</a>
		</WithStandardTopMargin>
	);
};
