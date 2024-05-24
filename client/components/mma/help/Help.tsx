import { css } from '@emotion/react';
import {
	brand,
	from,
	headline,
	neutral,
	space,
	textSans,
} from '@guardian/source/foundations';
import { LinkButton, Stack } from '@guardian/source/react-components';
import { useState } from 'react';
import { trackEvent } from '../../../utilities/analytics';
import { CallCentreEmailAndNumbers } from '../../shared/CallCenterEmailAndNumbers';
import { NAV_LINKS } from '../../shared/nav/NavConfig';
import { PageContainer } from '../Page';

interface Question {
	id: string;
	title: string;
	link: string;
}

const highlightedQuestions: Question[] = [
	{
		id: 'q1',
		title: "Can my delivery be suspended while I'm on holiday?",
		link: 'https://manage.theguardian.com/help-centre/article/i-need-to-pause-my-delivery',
	},
	{
		id: 'q2',
		title: 'How do I change my delivery address?',
		link: 'https://manage.theguardian.com/help-centre/article/i-need-to-change-my-delivery-address',
	},
	{
		id: 'q3',
		title: 'My delivery is late or missing',
		link: 'https://manage.theguardian.com/help-centre/article/my-delivery-is-late-or-missing',
	},
	{
		id: 'q4',
		title: 'Where can I use my Subscription Card or vouchers?',
		link: 'https://manage.theguardian.com/help-centre/article/im-a-print-subscriber-where-can-i-pick-up-my-papers',
	},
	{
		id: 'q5',
		title: 'How do I update my payment details?',
		link: 'https://manage.theguardian.com/help-centre/article/how-do-i-update-my-payment-details',
	},
	{
		id: 'q6',
		title: 'How do I reset my password?',
		link: 'https://manage.theguardian.com/help-centre/article/ive-forgotten-my-password',
	},
];

const listStyle = css`
	list-style: none;
	margin: 0 0 20px;
	padding: 0;
`;

const listItemStyle = css`
	display: block;
	& + li {
		margin-top: ${space[5]}px;
	}
`;

const listItemAnchorStyle = css`
	${textSans.medium()};
	color: ${neutral[20]};
	text-decoration: underline;
`;

const h2Style = css`
	border-top: 1px solid ${neutral['86']};
	margin-top: 30px;
	${from.tablet} {
		margin-top: 40px;
	}
	${headline.small({ fontWeight: 'bold' })};
`;

const h3Style = css`
	margin-top: 30px;
	${from.tablet} {
		margin-top: 40px;
	}
	${headline.xxsmall({ fontWeight: 'bold' })};
`;

const callCentreToggleSpanStyle = (isOpen: boolean) => css`
	cursor: pointer;
	text-decoration: underline;
	color: ${brand[500]};
	position: relative;
	:after {
		content: '';
		display: block;
		width: 7px;
		height: 7px;
		border-top: 2px solid ${brand['500']};
		border-right: 2px solid ${brand['500']};
		position: absolute;
		top: 50%;
		transform: ${isOpen
			? 'translateY(-5%) rotate(315deg)'
			: 'translateY(-50%) rotate(135deg)'};
		transition: transform 0.3s ease;
		right: -12px;
	}
`;

const pStyle = css`
	${textSans.medium()};
	margin-top: 30px;
	${from.tablet} {
		margin-top: 40px;
	}
`;

export const Help = () => {
	const [callCentreOpen, setCallCentreOpen] = useState<boolean>(false);
	return (
		<PageContainer selectedNavItem={NAV_LINKS.help} pageTitle="Help">
			<h2 css={h2Style}>How can we help?</h2>
			<ul css={listStyle}>
				{highlightedQuestions.map((question) => (
					<li key={question.id} css={listItemStyle}>
						<a href={question.link} css={listItemAnchorStyle}>
							{question.title}
						</a>
					</li>
				))}
			</ul>
			<h3 css={h3Style}>Can’t find what you’re looking for?</h3>
			<p
				css={css`
					${textSans.medium()};
				`}
			>
				Visit our Help Centre to find more useful information
			</p>
			<LinkButton
				href="/help-centre#call-us"
				priority="secondary"
				onClick={() =>
					trackEvent({
						eventCategory: 'help-page',
						eventAction: 'help-centre-cta-click',
					})
				}
			>
				Visit Help Centre
			</LinkButton>
			<Stack space={5}>
				<p
					css={css`
						${textSans.medium()};
						margin: 30px 0 0;
					`}
				>
					If you still can’t find what you need and want to contact
					us, check{' '}
					<span
						css={callCentreToggleSpanStyle(callCentreOpen)}
						onClick={() => setCallCentreOpen(!callCentreOpen)}
					>
						here
					</span>
				</p>
				{callCentreOpen && (
					<>
						<CallCentreEmailAndNumbers />
						<p css={pStyle}>
							Or use our contact form to get in touch and we’ll
							get back to you as soon as possible.
						</p>
						<LinkButton
							href="/help-centre/contact-us/"
							priority="secondary"
							onClick={() =>
								trackEvent({
									eventCategory: 'help-page',
									eventAction: 'contact-us-cta-click',
								})
							}
						>
							Take me to the form
						</LinkButton>
					</>
				)}
			</Stack>
		</PageContainer>
	);
};
