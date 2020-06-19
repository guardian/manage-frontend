import React from "react";
import { getMainPlan, Subscription } from "../../../../shared/productResponse";
import { trackEvent } from "../../analytics";
import { WithStandardTopMargin } from "../../page";
import { hrefStyle } from "../cancellationConstants";

const trackCancellationClickEvent = (eventLabel: string) => () =>
  trackEvent({
    eventCategory: "cancellation",
    eventAction: "click",
    eventLabel
  });

export const voucherCancellationFlowStart = (subscription: Subscription) => {
  const mainPlan = getMainPlan(subscription);

  const isEligibleForFreeDigipackAccess =
    mainPlan?.name?.indexOf("plus Digi") === -1;

  return (
    <WithStandardTopMargin>
      <h3>
        We’re sorry to hear you’re thinking of cancelling your voucher
        subscription.
      </h3>

      <p>
        We understand that some of you may have concerns about claiming your
        paper during the COVID-19 outbreak. We are now offering all our voucher
        customers a holiday suspension of up to 10 weeks, which you can arrange{" "}
        <a
          css={hrefStyle}
          href="/suspend/voucher"
          onClick={trackCancellationClickEvent("voucher_holiday_suspension")}
        >
          online
        </a>
        .
      </p>

      <p>
        You can also opt for home delivery. Sign up to a free trial with{" "}
        <a
          css={hrefStyle}
          href="http://www.delivermynewspaper.com"
          onClick={trackCancellationClickEvent("delivery_my_newspaper")}
        >
          Deliver My Newspaper
        </a>{" "}
        and they will provide you with delivery vouchers, which you can use in
        combination with your newspaper vouchers to arrange a delivery service.
        You can also arrange delivery with your newsagent independently, if you
        wish.
      </p>

      {isEligibleForFreeDigipackAccess && (
        <p>
          We have also made our digital subscription temporarily available to
          all readers that hold a voucher subscription. This means you can enjoy
          ad-free reading, and two innovative Guardian apps -{" "}
          <a
            css={hrefStyle}
            href="https://www.theguardian.com/membership/2019/dec/07/guardian-daily-app-launch-new-edition"
            onClick={trackCancellationClickEvent("the_guardian_daily")}
          >
            The Guardian Daily
          </a>{" "}
          and premium access to{" "}
          <a
            css={hrefStyle}
            href="https://www.theguardian.com/technology/ng-interactive/2018/may/15/the-guardian-app"
            onClick={trackCancellationClickEvent("the_guardian_live_app")}
          >
            The Guardian Live
          </a>
          . Your access is already granted with the email you are subscribed
          with, all you need to do is download from the app store and sign in to
          enjoy.
        </p>
      )}

      <p>Please could you take a moment to tell us why you want to cancel?</p>
    </WithStandardTopMargin>
  );
};
