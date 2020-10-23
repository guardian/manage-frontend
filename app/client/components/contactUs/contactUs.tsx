import { css } from "@emotion/core";
import { Button } from "@guardian/src-button";
import { palette, space } from "@guardian/src-foundations";
import { headline, textSans } from "@guardian/src-foundations/typography";
import { RouteComponentProps } from "@reach/router";
import React, { useEffect, useState } from "react";
import { Topic } from "../../../shared/contactUsTypes";
import { minWidth } from "../../styles/breakpoints";
import { trackEvent } from "../analytics";
import AsyncLoader from "../asyncLoader";
import { ContactUsForm } from "./contactUsForm";
import { ContactUsHeader } from "./contactUsHeader";
import { ContactUsPageContainer } from "./contactUsPageContainer";
import { SelfServicePrompt } from "./selfServicePrompt";
import { SubTopicForm } from "./subTopicForm";
import { TopicButton } from "./topicButton";

class ContactUsFormAsyncLoader extends AsyncLoader<ContactUsConfigResponse> {}

type ContactUsConfigResponse = Topic[];

interface ContactUsFormState {
  selectedTopic: string | undefined;
  selectedSubTopic: string | undefined;
  selectedSubSubTopic: string | undefined;
}

interface ContactUsProps extends RouteComponentProps {
  urlTopicId?: string;
  urlSubTopicId?: string;
  urlSubSubTopicId?: string;
}

interface ContactUsPropsWithConfig extends ContactUsProps {
  config: Topic[];
}

const renderContactUs = (props: ContactUsProps) => (
  config: ContactUsConfigResponse
) => <ContactUs {...props} config={config} />;

const ContactUs = (props: ContactUsPropsWithConfig) => {
  const validDeepLinkTopic = props.config.find(
    topic => topic.id === props.urlTopicId
  );

  const validDeepLinkSubTopic = validDeepLinkTopic?.subtopics?.find(
    subTopic => subTopic.id === props.urlSubTopicId
  );

  const validDeepLinkSubSubTopic = validDeepLinkSubTopic?.subsubtopics?.find(
    subSubTopic => subSubTopic.id === props.urlSubSubTopicId
  );

  const initialTopicSelection: string =
    validDeepLinkTopic?.id || props.config[0].id;

  const [formSubmittedSuccessfully, setFormSubmitionStatus] = useState<boolean>(
    false
  );

  const [contactUsFormState, setContactUsFormState] = useState<
    ContactUsFormState
  >({
    selectedTopic: initialTopicSelection,
    selectedSubTopic: validDeepLinkSubTopic?.id,
    selectedSubSubTopic: validDeepLinkSubSubTopic?.id
  });

  const [requireTopicSubmitButton, setRequireTopicSubmitButton] = useState<
    boolean
  >(!validDeepLinkTopic);

  const [
    requireSubTopicSubmitButton,
    setRequireSubTopicSubmitButton
  ] = useState<boolean>(!validDeepLinkSubTopic);

  const [
    requireSubSubTopicSubmitButton,
    setRequireSubSubTopicSubmitButton
  ] = useState<boolean>(!validDeepLinkSubSubTopic);

  const setTopic = (newTopicId: string, hasComeFromSubmitButton: boolean) => {
    setContactUsFormState({
      selectedTopic:
        hasComeFromSubmitButton || !requireTopicSubmitButton
          ? newTopicId
          : contactUsFormState.selectedTopic,
      selectedSubTopic: props.config.find(topic => topic.id === newTopicId)
        ?.subtopics?.[0].id,
      selectedSubSubTopic: undefined
    });
    setRequireSubTopicSubmitButton(true);
    setRequireSubSubTopicSubmitButton(true);
  };

  const setSubTopic = (selectedSubTopic: string) => {
    setContactUsFormState({
      ...contactUsFormState,
      selectedSubTopic,
      selectedSubSubTopic: undefined
    });
    setRequireSubSubTopicSubmitButton(true);
  };

  const setSubSubTopic = (selectedSubSubTopic: string) =>
    setContactUsFormState({
      ...contactUsFormState,
      selectedSubSubTopic
    });

  const [transientTopicSelection, setTransientTopicSelection] = useState<
    string
  >(initialTopicSelection);

  const topicSelectionCallback = (newTopicId: string) => {
    setTransientTopicSelection(newTopicId);
    setTopic(newTopicId, requireTopicSubmitButton);
    trackEvent({
      eventCategory: "contact_us_topic",
      eventAction: "click",
      eventLabel: newTopicId
    });
  };

  const subTopicSelectionCallback = (newSubTopicId: string) => {
    setSubTopic(newSubTopicId);

    trackEvent({
      eventCategory: "contact_us_subtopic",
      eventAction: "click",
      eventLabel: newSubTopicId
    });
  };

  const subTopicSubmitCallback = () => {
    if (!!contactUsFormState.selectedSubTopic) {
      setRequireSubTopicSubmitButton(false);
    }
  };

  const subSubTopicSelectionCallback = (newSubSubTopicId: string) => {
    setSubSubTopic(newSubSubTopicId);

    trackEvent({
      eventCategory: "contact_us_subsubtopic",
      eventAction: "click",
      eventLabel: newSubSubTopicId
    });
  };

  const subSubTopicSubmitCallback = () => {
    if (!!contactUsFormState.selectedSubSubTopic) {
      setRequireSubSubTopicSubmitButton(false);
    }
  };

  const currentTopic = props.config.find(
    topic => topic.id === contactUsFormState.selectedTopic
  );

  const subTopics = currentTopic?.subtopics;

  const currentSubTopic = subTopics?.find(
    subTopic => subTopic.id === contactUsFormState.selectedSubTopic
  );

  const subSubTopics = currentSubTopic?.subsubtopics;

  const currentSubSubTopic = subSubTopics?.find(
    subSubTopic => subSubTopic.id === contactUsFormState.selectedSubSubTopic
  );

  const showSubTopics =
    !!contactUsFormState.selectedTopic &&
    !requireTopicSubmitButton &&
    !!subTopics;

  const showSubSubTopics =
    !!contactUsFormState.selectedSubTopic &&
    !requireSubTopicSubmitButton &&
    !!subSubTopics;

  const showForm =
    (!!contactUsFormState.selectedSubSubTopic &&
      !requireSubSubTopicSubmitButton &&
      !currentSubSubTopic?.noForm) ||
    (!!contactUsFormState.selectedSubTopic &&
      !requireSubTopicSubmitButton &&
      !currentSubTopic?.noForm &&
      !subSubTopics) ||
    (!!contactUsFormState.selectedTopic &&
      !requireTopicSubmitButton &&
      !currentTopic?.noForm &&
      !subTopics);

  const [showSelfServicePrompt, setShowSelfServicePrompt] = useState<boolean>(
    false
  );

  const [subTopicsTitle, setSubTopicsTitle] = useState<string>("");
  const [subSubTopicsTitle, setSubSubTopicsTitle] = useState<string>("");

  const [formSubjectLine, setFormSubjectLine] = useState<string>("");

  const [formHasEditableSubjectLine, setFormHasEditableSubjectLine] = useState<
    boolean
  >(false);

  useEffect(() => {
    const selectedSubtopic = currentTopic?.subtopics?.find(
      subTopic => subTopic.id === contactUsFormState.selectedSubTopic
    );
    const selectedSubSubtopic = selectedSubtopic?.subsubtopics?.find(
      subSubTopic => subSubTopic.id === contactUsFormState.selectedSubSubTopic
    );
    setShowSelfServicePrompt(
      (!showSubTopics &&
        !!currentTopic?.selfServiceBox &&
        !requireTopicSubmitButton) ||
        (!selectedSubtopic?.subsubtopics &&
          !!selectedSubtopic?.selfServiceBox &&
          !requireSubTopicSubmitButton) ||
        (!!selectedSubSubtopic?.selfServiceBox &&
          !requireSubSubTopicSubmitButton)
    );
    setFormSubjectLine(
      `${currentTopic ? currentTopic.name : ""}${
        selectedSubSubtopic ? ` - ${selectedSubSubtopic.name}` : ""
      }${
        !selectedSubSubtopic && selectedSubtopic
          ? ` - ${selectedSubtopic.name}`
          : ""
      }`
    );
    setFormHasEditableSubjectLine(
      !!selectedSubSubtopic?.editableSubjectLine ||
        !!selectedSubtopic?.editableSubjectLine ||
        !!currentTopic?.editableSubjectLine
    );
    if (selectedSubtopic?.subsubTopicsTitle) {
      setSubSubTopicsTitle(selectedSubtopic?.subsubTopicsTitle);
    }
    if (currentTopic?.subTopicsTitle) {
      setSubTopicsTitle(currentTopic.subTopicsTitle);
    }
  }, [
    contactUsFormState,
    requireTopicSubmitButton,
    requireSubTopicSubmitButton,
    requireSubSubTopicSubmitButton
  ]);

  return (
    <>
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
          {formSubmittedSuccessfully
            ? "Thank you for contacting us"
            : "We are here to help"}
        </h1>
        <p
          css={css`
            margin-top: ${space[5]}px;
            ${textSans.medium()};
          `}
        >
          {formSubmittedSuccessfully
            ? `Thank you for contacting us regarding ${currentTopic?.enquiryLabel}. We will send a confirmation email detailing your request and aim to get back to you within 48 hours.`
            : "Visit our help centre to view our commonly asked questions, or continue below to use our contact form. It only takes a few minutes."}
        </p>
        {!formSubmittedSuccessfully && (
          <>
            <h2
              css={css`
                ${headline.xxsmall({ fontWeight: "bold" })};
                border-top: 1px solid ${palette.neutral[86]};
                margin-top: ${space[6]}px;
                padding: ${space[1]}px 0;
                ${minWidth.desktop} {
                  margin-top: ${space[9]}px;
                }
              `}
            >
              Choose a topic you would like to discuss
            </h2>
            <div
              css={css`
                display: flex;
                flex-wrap: wrap;
                align-items: stretch;
                justify-content: space-between;
              `}
            >
              {props.config.map((topic, topicIndex) => (
                <TopicButton
                  {...topic}
                  id={topic.id}
                  updateCallback={topicSelectionCallback}
                  isSelected={topic.id === contactUsFormState.selectedTopic}
                  key={topicIndex}
                />
              ))}
            </div>
            {requireTopicSubmitButton && (
              <Button
                css={css`
                  margin-top: ${space[6]}px;
                `}
                onClick={() => {
                  setTopic(transientTopicSelection, true);
                  setRequireTopicSubmitButton(false);
                }}
              >
                Begin form
              </Button>
            )}
            {showSubTopics && (
              <SubTopicForm
                updateCallback={subTopicSelectionCallback}
                submitCallback={subTopicSubmitCallback}
                title={subTopicsTitle}
                submitButonText="Continue to step 2"
                showSubmitButton={requireSubTopicSubmitButton}
                data={subTopics}
                preSelectedId={contactUsFormState.selectedSubTopic}
                additionalCss={css`
                  margin-top: ${space[9]}px;
                `}
              />
            )}
            {showSubSubTopics && (
              <SubTopicForm
                updateCallback={subSubTopicSelectionCallback}
                submitCallback={subSubTopicSubmitCallback}
                title={subSubTopicsTitle}
                submitButonText="Continue to step 3"
                showSubmitButton={requireSubSubTopicSubmitButton}
                data={subSubTopics}
                preSelectedId={contactUsFormState.selectedSubSubTopic}
                additionalCss={css`
                  margin-top: ${space[9]}px;
                `}
              />
            )}
            {showSelfServicePrompt && (
              <SelfServicePrompt
                copy={
                  "Did you know you can suspend your deliveries online by logging in below and selecting ‘Manage Subscription’? It’s easy to use and means you don’t have to wait for a response."
                }
                linkCopy="Go to your account"
                linkHref="/"
                topicReferer={`${contactUsFormState.selectedTopic ||
                  contactUsFormState.selectedSubTopic ||
                  contactUsFormState.selectedSubSubTopic}`}
                additionalCss={css`
                  margin: ${space[9]}px 0 ${space[6]}px;
                `}
              />
            )}

            {showForm && (
              <ContactUsForm
                key={formSubjectLine}
                submitCallback={() => {
                  setFormSubmitionStatus(true);
                  trackEvent({
                    eventCategory: "contactus_form",
                    eventAction: "submission",
                    eventLabel: `${contactUsFormState.selectedTopic ||
                      contactUsFormState.selectedSubTopic ||
                      contactUsFormState.selectedSubSubTopic}`
                  });
                }}
                title={`${
                  showSubTopics || showSubSubTopics
                    ? `Step ${showSubTopics ? "3" : "2"}: `
                    : ""
                }Tell us more`}
                subjectLine={formSubjectLine}
                editableSubjectLine={formHasEditableSubjectLine}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export const ContactUsPage = (props: ContactUsProps) => (
  <>
    <ContactUsHeader />
    <ContactUsPageContainer>
      <ContactUsFormAsyncLoader
        render={renderContactUs(props)}
        fetch={() => fetch("/api/contact-us-config/")}
        loadingMessage={"Loading form..."}
      />
    </ContactUsPageContainer>
  </>
);
