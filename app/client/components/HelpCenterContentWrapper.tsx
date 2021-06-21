import { Location } from "@reach/router";
import React from "react";
import { KnownIssues } from "./helpCentre/knownIssues";
import { SectionContent } from "./sectionContent";
import { SectionHeader } from "./sectionHeader";

interface HelpCenterContentWrapperProps {
  children: React.ReactNode;
}

const pathsWithNav = ["/help-centre/topic/", "/help-centre/article/"];

export const HelpCenterContentWrapper = (
  props: HelpCenterContentWrapperProps
) => (
  <Location>
    {({ location }) => {
      const headerTitle = location.pathname.startsWith(
        "/help-centre/contact-us"
      )
        ? "Need to contact us?"
        : "How can we help you?";
      if (pathsWithNav.some(path => location.pathname.startsWith(path))) {
        return (
          <>
            <SectionHeader title={headerTitle} pageHasNav={true} />
            <SectionContent hasNav={true}>{props.children}</SectionContent>
          </>
        );
      }
      return (
        <>
          <SectionHeader title={headerTitle} />
          <KnownIssues />
          <SectionContent>{props.children}</SectionContent>
        </>
      );
    }}
  </Location>
);
