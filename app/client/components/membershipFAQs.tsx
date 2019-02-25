import React from "react";
import palette from "../colours";
import { Accordion } from "./accordion";
import { navLinks } from "./nav";
import { PageContainerSection, PageHeaderContainer } from "./page";
import { RouteableProps } from "./wizardRouterAdapter";

const headerCss = {
  marginBottom: "12px",
  borderBottom: `1px solid ${palette.neutral["5"]}`
};

const linkCss = {
  textDecoration: "underline",
  color: palette.blue.dark,
  ":visited": { color: palette.blue.dark }
};

export const MembershipFAQs = (props: RouteableProps) => (
  <>
    <PageHeaderContainer selectedNavItem={navLinks.membership}>
      <h1>Frequently asked questions</h1>
      <p>Common questions about Guardian Members</p>
    </PageHeaderContainer>

    <PageContainerSection>
      <h2 css={headerCss}>Guardian Membership: the basics</h2>
      <Accordion initialIndex={-1}>
        <div title="What is membership?">
          <div>
            <p>
              Quality, independent, investigative journalism is expensive and
              takes time to produce. The decline in print advertising sales,
              along with the rise of digital advertising spend going to social
              media and tech giants, means we must look for alternative means to
              fund our journalism. Lots of people around the world read, watch
              and listen to the Guardian’s journalism but many do not pay for
              it. Rather than setting up a paywall, we are asking those who can
              afford it to make their contribution to our fearless, independent
              journalism.{" "}
              <a css={linkCss} href="https://support.theguardian.com/">
                Become a Supporter
              </a>{" "}
              if you share our belief that the open exchange of information,
              ideas and opinions can help to change the world for the better.
            </p>
            <p>
              Membership is an opportunity for readers to offer financial
              support to the Guardian’s journalism, and for the Guardian to
              deepen its relationship with its readers.{" "}
              <a css={linkCss} href="https://membership.theguardian.com/">
                Find out more on our membership site
              </a>
              .
            </p>
          </div>
        </div>
        <div title="What are the different levels of membership?">
          <div>
            You can read a full description of each membership tier on{" "}
            <a css={linkCss} href="https://membership.theguardian.com/">
              our membership site
            </a>
            .
          </div>
        </div>
        <div title="Does membership provide an ad-free experience?">
          <div>
            <p>
              As part of your membership, you qualify for free access to the
              premium tier of the award-winning Guardian news app, which has no
              adverts, allows you to follow your favourite journalists, sign up
              for alerts to key topics, series and sports events, and gives you
              access to our crosswords. You can download the app by visiting{" "}
              <a css={linkCss} href="https://theguardian.com/guardianapp">
                theguardian.com/guardianapp
              </a>, and then you simply need to sign in with your Guardian
              Members login details. If you encounter any difficulties accessing
              the premium tier, please ensure you have the latest version of the
              app downloaded. Once in the app you can choose between the UK, US,
              Australia or International edition.
            </p>
            <p>
              At the moment, only Digital Pack offers an ad-free experience on
              the website.{" "}
              <a
                css={linkCss}
                href="https://support.theguardian.com/subscribe/digital"
              >
                Sign up for Digital Pack here
              </a>
              .
            </p>
          </div>
        </div>
        <div title="I’m already a Member, but I’m still seeing membership related ads and promotions.">
          <div>
            You can avoid seeing membership ads if you{" "}
            <a css={linkCss} href="https://profile.theguardian.com/signin">
              sign in
            </a>{" "}
            at the top left hand corner of{" "}
            <a css={linkCss} href="https://theguardian.com/">
              theguardian.com
            </a>{" "}
            and on the Guardian app, so we know you are a Member. If you’ve
            forgotten or need to retrieve your password you can{" "}
            <a css={linkCss} href="https://profile.theguardian.com/reset">
              reset it here
            </a>.
          </div>
        </div>
        <div title="What happens if I don't want to receive membership emails?">
          <div>
            If you no longer want to receive our email updates for Members,
            click the unsubscribe link at the bottom of the email. We have also
            created a{" "}
            <a
              css={linkCss}
              href="https://support.theguardian.com/contribute?INTCMP=membership_faq"
            >
              one-off contributions
            </a>{" "}
            page specifically for loyal readers who want to make a financial
            contribution but don't want to receive regular communications.
          </div>
        </div>
        <div title="I want to update the personal details (phone, email or address) connected to my membership account">
          <div>
            You can update any of your personal details by simply{" "}
            <a css={linkCss} href="https://profile.theguardian.com/signin">
              signing in
            </a>{" "}
            to your membership account and clicking{" "}
            <a
              css={linkCss}
              href="https://profile.theguardian.com/account/edit"
            >
              edit profile
            </a>{" "}
            to update your account details. Any changes will be automatically
            updated in our system.
          </div>
        </div>
        <div title="My membership welcome gift hasn’t arrived yet">
          <div>
            Your welcome gift should be delivered to you three weeks after
            joining us. If you have not received it by this time, please email
            the membership customer support team at{" "}
            <a css={linkCss} href="mailto:membershipsupport@theguardian.com">
              membershipsupport@theguardian.com
            </a>{" "}
            and quote your Membership ID number.
          </div>
        </div>
        <div title="Is it possible to make a contribution or sign up using PayPal?">
          <div>Yes, we now accept payments via Paypal.</div>
        </div>
        <div title="How do I know you are protecting my personal information?">
          <div>
            We will never use your information for any purpose – marketing or
            otherwise – without your permission. You can read more about our
            approach to data security in our{" "}
            <a
              css={linkCss}
              href="http://www.theguardian.com/help/privacy-policy"
            >
              privacy policy
            </a>.
          </div>
        </div>
        <div title="What happens if I want to change my membership tier?">
          <div>
            You can change your membership tier online anytime. Just go to your{" "}
            <a
              css={linkCss}
              href="https://profile.theguardian.com/membership/edit"
            >
              Profile page
            </a>{" "}
            on the membership site and follow the instructions.
          </div>
        </div>
        <div title="What happens if I want to cancel my membership?">
          <div>
            You can cancel your membership by{" "}
            <a
              css={linkCss}
              href="https://membership.theguardian.com/tier/cancel"
            >
              following the instructions on this page
            </a>. Your membership will run until the end of your current payment
            term and then renew on an ongoing basis unless you choose to cancel.
          </div>
        </div>
        <div title="What are the terms and conditions of membership?">
          <div>
            Read the full set of{" "}
            <a
              css={linkCss}
              href="https://www.theguardian.com/info/2014/sep/09/guardian-membership-terms-and-conditions"
            >
              terms and conditions here
            </a>.
          </div>
        </div>
        <div title="What is Guardian Live?">
          <div>
            Guardian Live is a rolling events programme of discussions, debates,
            interviews and festivals that transform our journalism in print and
            online into live experiences. Recent examples include cooking
            lessons from Nigella Lawson and Jeanette Winterson, guided tours of
            the Guardian archives and printing presses, and talks from Johnny
            Marr, Bryan Cranston and Alan Bennett.{" "}
            <a css={linkCss} href="https://membership.theguardian.com/events">
              Find out more about Guardian Live
            </a>{" "}
            on our membership site.
          </div>
        </div>

        <div title="Can I change from the Tickets Benefit to the Book Benefit?">
          <div>
            Yes, you can choose to move from one benefit type to another, but
            only if you have not yet redeemed a ticket, or received a book in
            the applicable membership year. To do so, contact membership support
            by either emailing{" "}
            <a css={linkCss} href="mailto:membershipsupport@theguardian.com">
              membershipsupport@theguardian.com
            </a>{" "}
            or calling 0330 333 6898.
          </div>
        </div>
        <div title="What are Guardian Masterclasses?">
          <div>
            Guardian Masterclasses match our readers’ interests with a wide
            range of courses and workshops, harnessing the expertise and
            specialisms of award-winning Guardian professionals and leading
            figures from the creative and digital industries. Recent examples
            include data visualisation workshops, a lyric-writing lesson from
            Chris Difford, and a masterclass in becoming a successful journalist
            from some of our award-winning writers. More{" "}
            <a
              css={linkCss}
              href="https://www.theguardian.com/guardian-masterclasses/faqs"
            >
              frequently asked questions are available here
            </a>.
          </div>
        </div>
      </Accordion>
    </PageContainerSection>
  </>
);
