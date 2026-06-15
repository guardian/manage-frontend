import { Button, SvgGift } from '@guardian/source/react-components';
import { Ribbon } from '../../shared/Ribbon';
import { Card } from '../shared/Card';
import type { ProductCardConfiguration } from './ProductCardConfiguration';
import {
	centeredActionCss,
	giftRibbonColour,
	giftRibbonCopyColour,
	giftRibbonCss,
	keyValueCss,
	leaveButtonCss,
	productCardTitleCss,
	productDetailLayoutCss,
	sectionHeadingCss,
	sharedMembershipTextCss,
} from './ProductCardStyles';

type SharedSubscriptionOwner = {
	firstName: string;
	lastName: string;
	email: string;
};

export const SecondaryUserSections = ({
	subscriptionName,
	primarySubscriber,
}: {
	subscriptionName: string;
	primarySubscriber: SharedSubscriptionOwner;
}) => (
	<>
		<Card.Section>
			<CardSectionSubscriptionDetails
				subscriptionName={subscriptionName}
				primarySubscriber={primarySubscriber}
			/>
		</Card.Section>
		<Card.Section>
			<CardSectionManageAccess subscriptionName={subscriptionName} />
		</Card.Section>
	</>
);

const CardSectionSubscriptionDetails = ({
	subscriptionName,
	primarySubscriber,
}: {
	subscriptionName: string;
	primarySubscriber: SharedSubscriptionOwner;
}) => (
	<div css={productDetailLayoutCss}>
		<div>
			<h4 css={sectionHeadingCss}>Subscription details</h4>
			<p css={sharedMembershipTextCss}>
				Subscription: {subscriptionName} shared subscription <br />
				Owner: {primarySubscriber.firstName}{' '}
				{primarySubscriber.lastName}
				<br /> <br />
				You’ve been given access by {primarySubscriber.firstName}{' '}
				{primarySubscriber.lastName} ({primarySubscriber.email}). To
				access your benefits, sign in on your devices and the Guardian
				app. Your account and activity are private and not shared with
				the subscription owner.
			</p>
		</div>
	</div>
);

const CardSectionManageAccess = ({
	subscriptionName,
}: {
	subscriptionName: string;
}) => (
	<div css={keyValueCss}>
		<div>
			<h4 css={sectionHeadingCss}>Manage your access</h4>
			<p css={sharedMembershipTextCss}>
				You can leave this shared subscription at any time. If you
				leave, you’ll lose your access to Digital plus benefits.
			</p>
		</div>
		<div css={centeredActionCss}>
			<Button
				aria-label={`${subscriptionName} : Leave shared subscription`}
				size="small"
				priority="primary"
				cssOverrides={leaveButtonCss}
				onClick={() => undefined}
			>
				{`Leave subscription`}
			</Button>
		</div>
	</div>
);

export const ProductCardHeader = ({
	cardConfig,
	productTitle,
	isGifted,
}: {
	cardConfig: ProductCardConfiguration;
	productTitle: string;
	isGifted: boolean;
}) => (
	<Card.Header backgroundColor={cardConfig.colour} minHeightOverride="auto">
		<h3 css={productCardTitleCss(cardConfig.invertText)}>{productTitle}</h3>
		{isGifted && (
			<Ribbon
				copy="Gift"
				ribbonColour={giftRibbonColour(cardConfig)}
				copyColour={giftRibbonCopyColour(cardConfig)}
				icon={
					<SvgGift
						isAnnouncedByScreenReader
						size="small"
						theme={{ fill: giftRibbonCopyColour(cardConfig) }}
					/>
				}
				additionalCss={giftRibbonCss}
			/>
		)}
	</Card.Header>
);
