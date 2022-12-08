import { neutral } from '@guardian/source-foundations';
import { CommentsIcon } from '../mma/shared/assets/commentsIcon';
import { CreditCardIcon } from '../mma/shared/assets/creditCardIcon';
import { DeliveryIcon } from '../mma/shared/assets/deliveryIcon';
import { NewspaperIcon } from '../mma/shared/assets/newspaperIcon';
import { NewspaperVoucherIcon } from '../mma/shared/assets/newspaperVoucherIcon';
import { OtherIcon } from '../mma/shared/assets/otherIcon';
import { ProfileIcon } from '../mma/shared/assets/profileIcon';
import { TechIcon } from './techIcon';

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
