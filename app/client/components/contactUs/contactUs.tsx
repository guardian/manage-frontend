import { css } from '@emotion/react';
import { space } from '@guardian/src-foundations';
import { neutral } from '@guardian/src-foundations/palette';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { navigate, RouteComponentProps } from '@reach/router';
import { captureException } from '@sentry/browser';
import { contactUsConfig } from '../../../shared/contactUsConfig';
import { ContactUsFormPayload } from '../../../shared/contactUsTypes';
import { minWidth } from '../../styles/breakpoints';
import { trackEvent } from '../analytics';
import { ContactUsForm } from './contactUsForm';
import { SelfServicePrompt } from './selfServicePrompt';
import { SubTopicForm } from './subTopicForm';
import { TopicForm } from './topicForm';

export interface ContactUsProps extends RouteComponentProps {
	urlTopicId?: string;
	urlSubTopicId?: string;
	urlSubSubTopicId?: string;
	urlSuccess?: string;
}

const ContactUs = (props: ContactUsProps) => {
	const currentTopic = contactUsConfig.find(
		(topic) => topic.id === props.urlTopicId,
	);

	const subTopics = currentTopic?.subtopics;
	const currentSubTopic = subTopics?.find(
		(subTopic) => subTopic.id === props.urlSubTopicId,
	);

	const subSubTopics = currentSubTopic?.subsubtopics;
	const currentSubSubTopic = subSubTopics?.find(
		(subSubTopic) => subSubTopic.id === props.urlSubSubTopicId,
	);

	const success = props.urlSuccess === '1';

	const headerText = success
		? 'Thank you for contacting us'
		: 'We are here to help';

	const containerText = success
		? `Thank you for contacting us regarding ${currentTopic?.enquiryLabel}. We will send a confirmation email detailing your request and aim to get back to you within 48 hours.`
		: 'Visit our help centre to view our commonly asked questions, or continue below to use our contact form. It only takes a few minutes.';

	const subTopicsTitle = currentTopic?.subTopicsTitle || '';
	const subSubTopicsTitle = currentSubTopic?.subsubTopicsTitle || '';

	const selfServiceBox =
		currentSubSubTopic?.selfServiceBox ||
		currentSubTopic?.selfServiceBox ||
		currentTopic?.selfServiceBox;

	const showForm =
		(currentSubSubTopic && !currentSubSubTopic?.noForm) ||
		(currentSubTopic && !currentSubTopic?.noForm && !subSubTopics) ||
		(currentTopic && !currentTopic?.noForm && !subTopics);

	const subject = `${currentTopic ? currentTopic.name : ''}${
		currentSubSubTopic ? ` - ${currentSubSubTopic.name}` : ''
	}${
		!currentSubSubTopic && currentSubTopic
			? ` - ${currentSubTopic.name}`
			: ''
	}`;

	const isSubjectEditable = !!(
		currentSubSubTopic?.editableSubject ||
		currentSubTopic?.editableSubject ||
		currentTopic?.editableSubject
	);

	const setTopic = (selectedTopic: string) => {
		trackEvent({
			eventCategory: 'ContactUs',
			eventAction: 'topic_click',
			eventLabel: selectedTopic,
		});

		navigate(`/help-centre/contact-us/${selectedTopic}`, { replace: true });
	};

	const setSubTopic = (selectedSubTopic: string) => {
		trackEvent({
			eventCategory: 'ContactUs',
			eventAction: 'subtopic_click',
			eventLabel: selectedSubTopic,
		});

		navigate(
			`/help-centre/contact-us/${currentTopic?.id}/${selectedSubTopic}`,
			{
				replace: true,
			},
		);
	};

	const setSubSubTopic = (selectedSubSubTopic: string) => {
		trackEvent({
			eventCategory: 'ContactUs',
			eventAction: 'subsubtopic_click',
			eventLabel: selectedSubSubTopic,
		});

		navigate(
			`/help-centre/contact-us/${currentTopic?.id}/${currentSubTopic?.id}/${selectedSubSubTopic}`,
			{
				replace: true,
			},
		);
	};

	const submitForm = async (
		formData: ContactUsFormPayload,
	): Promise<boolean> => {
		const body = JSON.stringify({
			...(currentTopic?.id && {
				topic: currentTopic?.id,
			}),
			...(currentSubTopic?.id && {
				subtopic: currentSubTopic?.id,
			}),
			...(currentSubSubTopic?.id && {
				subsubtopic: currentSubSubTopic?.id,
			}),
			...formData,
		});

		const res = await fetch('/api/contact-us/', { method: 'POST', body });
		if (res.ok) {
			trackEvent({
				eventCategory: 'ContactUs',
				eventAction: 'submission_success',
				eventLabel:
					`${currentTopic?.id} - ` +
					`${currentSubTopic?.id || 'N/A'} - ` +
					`${currentSubSubTopic?.id || 'N/A'}`,
			});

			const urlSections = [
				'/help-centre/contact-us',
				currentTopic?.id,
				currentSubTopic?.id || '0',
				currentSubSubTopic?.id || '0',
				'1',
			];
			navigate(urlSections.join('/'));

			return true;
		} else {
			const errorMsg = `Could not submit Contact Us form. ${res.status} - ${res.statusText}`;
			trackEvent({
				eventCategory: 'ContactUs',
				eventAction: 'submission_failure',
				eventLabel: errorMsg,
			});
			captureException(errorMsg);

			return false;
		}
	};

	return (
		<>
			<div
				css={css`
					margin-bottom: ${space[24]}px;
				`}
			>
				<h1
					css={css`
						${headline.xxsmall({ fontWeight: 'bold' })};
						margin: 0;
						border-top: 1px solid ${neutral[86]};
						${minWidth.desktop} {
							font-size: 1.75rem;
							border-top: 0;
						}
					`}
				>
					{headerText}
				</h1>
				<p
					css={css`
						margin-top: ${space[5]}px;
						${textSans.medium()};
						max-width: 620px;
					`}
				>
					{containerText}
				</p>
				{!success && (
					<>
						<TopicForm
							data={contactUsConfig}
							preSelectedId={currentTopic?.id}
							submitCallback={setTopic}
						/>
						{subTopics && (
							<SubTopicForm
								key={`subtopic-${currentTopic?.id}`}
								title={subTopicsTitle}
								submitButonText="Continue to step 2"
								data={subTopics}
								preSelectedId={currentSubTopic?.id}
								submitCallback={setSubTopic}
							/>
						)}
						{subSubTopics && (
							<SubTopicForm
								key={`subsubtopic-${currentSubTopic?.id}`}
								title={subSubTopicsTitle}
								submitButonText="Continue to step 3"
								data={subSubTopics}
								preSelectedId={currentSubSubTopic?.id}
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
									`${currentTopic?.id} - ` +
									`${currentSubSubTopic?.id || 'N/A'} - ` +
									`${currentSubSubTopic?.id || 'N/A'}`
								}
								additionalCss={css`
									margin: ${space[9]}px 0 ${space[6]}px;
								`}
							/>
						)}

						{showForm && (
							<ContactUsForm
								key={`${currentTopic?.id}-${currentSubTopic?.id}-${currentSubSubTopic?.id}`}
								submitCallback={submitForm}
								title={`${
									subTopics || subSubTopics
										? `Step ${subSubTopics ? '3' : '2'}:`
										: ''
								} Tell us more`}
								subject={subject}
								editableSubject={isSubjectEditable}
							/>
						)}
					</>
				)}
			</div>
		</>
	);
};

export default ContactUs;
