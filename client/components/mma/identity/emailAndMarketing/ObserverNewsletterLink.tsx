import type { FC } from 'react';
import { WithStandardTopMargin } from '@/client/components/shared/WithStandardTopMargin';
import { Button } from '../../shared/Buttons';

export const ObserverNewsletterLink: FC = () => {
	return (
		<WithStandardTopMargin>
			<p>
				{' '}
				To manage newsletters published by the Observer, click "Observer
				newsletters" to visit the Tortoise website
			</p>
			<a href="https://observer.co.uk/newsletters">
				<Button text="Observer newsletter"></Button>
			</a>
		</WithStandardTopMargin>
	);
};
