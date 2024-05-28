import { neutral } from '@guardian/source/foundations';
import { CommentsIcon } from '../../mma/shared/assets/CommentsIcon';
import { CreditCardIcon } from '../../mma/shared/assets/CreditCardIcon';
import { DeliveryIcon } from '../../mma/shared/assets/DeliveryIcon';
import { NewspaperIcon } from '../../mma/shared/assets/NewspaperIcon';
import { NewspaperVoucherIcon } from '../../mma/shared/assets/NewspaperVoucherIcon';
import { OtherIcon } from '../../mma/shared/assets/OtherIcon';
import { ProfileIcon } from '../../mma/shared/assets/ProfileIcon';
import { TechIcon } from './TechIcon';

interface TopicIconProps {
	id: string;
}

export const TopicIcon = (props: TopicIconProps) => {
	switch (props.id) {
		case 'delivery':
			return <DeliveryIcon overrideFillColor={neutral[100]} />;
		case 'billing':
			return <CreditCardIcon overrideFillColor={neutral[100]} />;
		case 'vouchers':
			return <NewspaperVoucherIcon overrideFillColor={neutral[100]} />;
		case 'account':
			return <ProfileIcon overrideFillColor={neutral[100]} />;
		case 'tech':
			return <TechIcon overrideFillColor={neutral[100]} />;
		case 'journalism':
			return <NewspaperIcon overrideFillColor={neutral[100]} />;
		case 'comments':
			return <CommentsIcon overrideFillColor={neutral[100]} />;
		case 'other':
			return <OtherIcon overrideFillColor={neutral[100]} />;
	}
	return <></>;
};
