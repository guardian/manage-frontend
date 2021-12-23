import { neutral } from "@guardian/src-foundations/palette";
import { CommentsIcon } from "../svgs/commentsIcon";
import { CreditCardIcon } from "../svgs/creditCardIcon";
import { DeliveryIcon } from "../svgs/deliveryIcon";
import { NewspaperIcon } from "../svgs/newspaperIcon";
import { NewspaperVoucherIcon } from "../svgs/newspaperVoucherIcon";
import { OtherIcon } from "../svgs/otherIcon";
import { ProfileIcon } from "../svgs/profileIcon";
import { TechIcon } from "./techIcon";

interface TopicIconProps {
  id: string;
}

export const TopicIcon = (props: TopicIconProps) => {
  switch (props.id) {
    case "delivery":
      return <DeliveryIcon overrideFillColor={neutral[100]} />;
    case "billing":
      return <CreditCardIcon overrideFillColor={neutral[100]} />;
    case "vouchers":
      return <NewspaperVoucherIcon overrideFillColor={neutral[100]} />;
    case "account":
      return <ProfileIcon overrideFillColor={neutral[100]} />;
    case "tech":
      return <TechIcon overrideFillColor={neutral[100]} />;
    case "journalism":
      return <NewspaperIcon overrideFillColor={neutral[100]} />;
    case "comments":
      return <CommentsIcon overrideFillColor={neutral[100]} />;
    case "other":
      return <OtherIcon overrideFillColor={neutral[100]} />;
  }
  return <></>;
};
