import { css } from "@emotion/core";
import { palette, space } from "@guardian/src-foundations";
import { headline, textSans } from "@guardian/src-foundations/typography";
import { RouteComponentProps } from "@reach/router";
import { captureException } from "@sentry/browser";
import React, { useState } from "react";
import { contactUsConfig } from "../../../shared/contactUsConfig";
import { minWidth } from "../../styles/breakpoints";
import { trackEvent } from "../analytics";
import { ContactUsForm, FormPayload } from "./contactUsForm";
import { ContactUsHeader } from "./contactUsHeader";
import { ContactUsPageContainer } from "./contactUsPageContainer";
import { SelfServicePrompt } from "./selfServicePrompt";
import { SubTopicForm } from "./subTopicForm";
import { TopicForm } from "./topicForm";

interface ContactUsState {
  selectedTopic: string | undefined;
  selectedSubTopic: string | undefined;
  selectedSubSubTopic: string | undefined;
}

interface ContactUsProps extends RouteComponentProps {
  urlTopicId?: string;
  urlSubTopicId?: string;
  urlSubSubTopicId?: string;
}

type ContactUsFormStatus = "form" | "success";

export const ContactUs = (props: ContactUsProps) => {
  const validDeepLinkTopic = contactUsConfig.find(
    topic => topic.id === props.urlTopicId
  );

  const validDeepLinkSubTopic = validDeepLinkTopic?.subtopics?.find(
    subTopic => subTopic.id === props.urlSubTopicId
  );

  const validDeepLinkSubSubTopic = validDeepLinkSubTopic?.subsubtopics?.find(
    subSubTopic => subSubTopic.id === props.urlSubSubTopicId
  );

  const [formStatus, setFormStatus] = useState<ContactUsFormStatus>("form");

  const [contactUsState, setContactUsState] = useState<ContactUsState>({
    selectedTopic: validDeepLinkTopic?.id,
    selectedSubTopic: validDeepLinkSubTopic?.id,
    selectedSubSubTopic: validDeepLinkSubSubTopic?.id
  });

  const setTopic = (selectedTopic: string) => {
    setContactUsState({
      selectedTopic,
      selectedSubTopic: undefined,
      selectedSubSubTopic: undefined
    });

    trackEvent({
      eventCategory: "ContactUs",
      eventAction: "topic_click",
      eventLabel: selectedTopic
    });
  };

  const setSubTopic = (selectedSubTopic: string) => {
    setContactUsState({
      ...contactUsState,
      selectedSubTopic,
      selectedSubSubTopic: undefined
    });

    trackEvent({
      eventCategory: "ContactUs",
      eventAction: "subtopic_click",
      eventLabel: selectedSubTopic
    });
  };

  const setSubSubTopic = (selectedSubSubTopic: string) => {
    setContactUsState({
      ...contactUsState,
      selectedSubSubTopic
    });

    trackEvent({
      eventCategory: "ContactUs",
      eventAction: "subsubtopic_click",
      eventLabel: selectedSubSubTopic
    });
  };

  const submitForm = async (formData: FormPayload): Promise<boolean> => {
    const body = JSON.stringify({
      ...(contactUsState.selectedTopic && {
        topic: contactUsState.selectedTopic
      }),
      ...(contactUsState.selectedSubTopic && {
        subtopic: contactUsState.selectedSubTopic
      }),
      ...(contactUsState.selectedSubSubTopic && {
        subsubtopic: contactUsState.selectedSubSubTopic
      }),
      name: formData.fullName,
      email: formData.email,
      subject: formData.subjectLine,
      message: formData.details,
      captchaToken: formData.captchaToken
    });

    const res = await fetch("/api/contact-us/", { method: "POST", body });
    if (res.ok) {
      setFormStatus("success");
      trackEvent({
        eventCategory: "ContactUs",
        eventAction: "submission_success",
        eventLabel:
          `${contactUsState.selectedTopic} - ` +
          `${contactUsState.selectedSubTopic} - ` +
          `${contactUsState.selectedSubSubTopic}`
      });
      return true;
    } else {
      const errorMsg = `Could not submit Contact Us form. ${res.status} - ${res.statusText}`;

      trackEvent({
        eventCategory: "ContactUs",
        eventAction: "submission_failure",
        eventLabel: errorMsg
      });
      captureException(errorMsg);
      return false;
    }
  };

  const currentTopic = contactUsConfig.find(
    topic => topic.id === contactUsState.selectedTopic
  );

  const subTopics = currentTopic?.subtopics;
  const currentSubTopic = subTopics?.find(
    subTopic => subTopic.id === contactUsState.selectedSubTopic
  );

  const subSubTopics = currentSubTopic?.subsubtopics;
  const currentSubSubTopic = subSubTopics?.find(
    subSubTopic => subSubTopic.id === contactUsState.selectedSubSubTopic
  );

  const subTopicsTitle = currentTopic?.subTopicsTitle || "";
  const subSubTopicsTitle = currentSubTopic?.subsubTopicsTitle || "";

  const selfServiceBox =
    currentSubSubTopic?.selfServiceBox ||
    currentSubTopic?.selfServiceBox ||
    currentTopic?.selfServiceBox;

  const showForm =
    (currentSubSubTopic && !currentSubSubTopic?.noForm) ||
    (currentSubTopic && !currentSubTopic?.noForm && !subSubTopics) ||
    (currentTopic && !currentTopic?.noForm && !subTopics);

  const subjectLine = `${currentTopic ? currentTopic.name : ""}${
    currentSubSubTopic ? ` - ${currentSubSubTopic.name}` : ""
  }${
    !currentSubSubTopic && currentSubTopic ? ` - ${currentSubTopic.name}` : ""
  }`;

  const isSubjectLineEditable = !!(
    currentSubSubTopic?.editableSubjectLine ||
    currentSubTopic?.editableSubjectLine ||
    currentTopic?.editableSubjectLine
  );

  return (
    <>
      <ContactUsHeader />
      <ContactUsPageContainer>
        <div
          css={css`
            margin-bottom: ${space[24]}px;
          `}
        >
          <h1
            css={css`
              ${headline.xxsmall({ fontWeight: "bold" })};
              margin: 0;
              border-top: 1px solid ${palette.neutral[86]};
              ${minWidth.desktop} {
                font-size: 1.75rem;
                border-top: 0;
              }
            `}
          >
            {headerText(formStatus)}
          </h1>
          <p
            css={css`
              margin-top: ${space[5]}px;
              ${textSans.medium()};
            `}
          >
            {containerText(formStatus, currentTopic?.enquiryLabel || "")}
          </p>
          {formStatus === "form" && (
            <>
              <TopicForm
                data={contactUsConfig}
                preSelectedId={contactUsState.selectedTopic}
                submitCallback={setTopic}
              />
              {subTopics && (
                <SubTopicForm
                  key={`subtopic-${contactUsState.selectedTopic}`}
                  title={subTopicsTitle}
                  submitButonText="Continue to step 2"
                  data={subTopics}
                  preSelectedId={contactUsState.selectedSubTopic}
                  submitCallback={setSubTopic}
                />
              )}
              {subSubTopics && (
                <SubTopicForm
                  key={`subsubtopic-${contactUsState.selectedSubTopic}`}
                  title={subSubTopicsTitle}
                  submitButonText="Continue to step 3"
                  data={subSubTopics}
                  preSelectedId={contactUsState.selectedSubSubTopic}
                  submitCallback={setSubSubTopic}
                />
              )}
              {selfServiceBox && (
                <SelfServicePrompt
                  copy={selfServiceBox.text}
                  linkCopy={selfServiceBox.linkText}
                  linkHref={selfServiceBox.href}
                  linkAsButton={!showForm}
                  showContacts={!showForm}
                  topicReferer={
                    `${contactUsState.selectedTopic} - ` +
                    `${contactUsState.selectedSubTopic} - ` +
                    `${contactUsState.selectedSubSubTopic}`
                  }
                  additionalCss={css`
                    margin: ${space[9]}px 0 ${space[6]}px;
                  `}
                />
              )}

              {showForm && (
                <ContactUsForm
                  key={subjectLine}
                  submitCallback={submitForm}
                  title={`${
                    subTopics || subSubTopics
                      ? `Step ${subSubTopics ? "3" : "2"}:`
                      : ""
                  } Tell us more`}
                  subjectLine={subjectLine}
                  editableSubjectLine={isSubjectLineEditable}
                />
              )}
            </>
          )}
        </div>
      </ContactUsPageContainer>
    </>
  );
};

const headerText = (status: ContactUsFormStatus) => {
  switch (status) {
    case "form":
      return "We are here to help";
    case "success":
      return "Thank you for contacting us";
  }
};

const containerText = (status: ContactUsFormStatus, label: string) => {
  switch (status) {
    case "form":
      return "Visit our help centre to view our commonly asked questions, or continue below to use our contact form. It only takes a few minutes.";
    case "success":
      return `Thank you for contacting us regarding ${label}. We will send a confirmation email detailing your request and aim to get back to you within 48 hours.`;
  }
};
