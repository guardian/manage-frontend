import { palette } from '@guardian/source/foundations';
import type { ReactElement } from 'react';
import { Modal } from './Modal';

interface HolidayAnniversaryDateExplainerModalProps {
	dateElement: ReactElement;
	issueKeyword: string;
}

export const HolidayAnniversaryDateExplainerModal = (
	props: HolidayAnniversaryDateExplainerModalProps,
) => (
	<Modal
		instigator={
			<a
				css={{
					textDecoration: 'underline',
					color: palette.sport[400],
					cursor: 'pointer',
				}}
			>
				What is this date?
			</a>
		}
		title="What is this date?"
	>
		<p>
			{props.dateElement} is the anniversary of your subscription. The
			number of {props.issueKeyword}s you can suspend per year is reset on
			this date.
		</p>
	</Modal>
);
