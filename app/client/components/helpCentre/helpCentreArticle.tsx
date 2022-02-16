import { css } from '@emotion/react'
import { Button } from '@guardian/src-button';
import { brand, neutral, space } from '@guardian/src-foundations';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { navigate, RouteComponentProps } from '@reach/router';
import { captureException, captureMessage } from '@sentry/browser';
import React, { useEffect, useState } from 'react';
import { minWidth } from '../../styles/breakpoints';
import { trackEvent } from '../analytics';
import { LinkButton } from '../buttons';
import { CallCentreEmailAndNumbers } from '../callCenterEmailAndNumbers';
import { isArticleLiveChatFeatureEnabled } from '../liveChat/liveChatFeatureSwitch';
import { SelectedTopicObjectContext } from '../sectionContent';
import { Spinner } from '../spinner';
import { ThumbsUpIcon } from '../svgs/thumbsUpIcon';
import { WithStandardTopMargin } from '../WithStandardTopMargin';
import { BackToHelpCentreLink } from './BackToHelpCentreLink';
import HelpCentreContactOptions from './helpCentreContactOptions';
import { h2Css } from './helpCentreStyles';
import {
	Article,
	BaseNode,
	ElementNode,
	LinkNode,
	TextNode,
} from './HelpCentreTypes';
import { PageTitle } from './pageTitle';
import { SeoData } from './seoData';

export interface HelpCentreArticleProps extends RouteComponentProps {
	articleCode?: string;
}

const HelpCentreArticle = (props: HelpCentreArticleProps) => {
	const [article, setArticle] = useState<Article | undefined>(undefined);

	useEffect(() => {
		setArticle(undefined);
		fetch(`/api/help-centre/article/${props.articleCode}`)
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					captureMessage(
						`Fetching article ${props.articleCode} returned ${response.status}.`,
					);
					navigate('/help-centre');
				}
			})
			.then((articleData) => setArticle(articleData as Article))
			.catch((error) =>
				captureException(
					`Failed to fetch article ${props.articleCode}. Error: ${error}`,
				),
			);
	}, [props.articleCode]);

	const setSelectedTopicId = React.useContext(SelectedTopicObjectContext);
	useEffect(() => {
		setSelectedTopicId(article?.topics[0].path);
	}, [article]);

	const articleContainerCss = css`
		max-width: 620px;
		color: ${neutral['7']};
	`;

	return (
		<>
			<PageTitle title={article?.title} />
			<SeoData article={article} />
			<div css={articleContainerCss}>
				<h2 css={h2Css}>{article?.title}</h2>
				{article ? (
					<>
						<ArticleBody
							article={article}
							articleCode={props.articleCode ?? ''}
						/>
						<ArticleFeedbackWidget
							articleCode={props.articleCode ?? ''}
						/>
						{isArticleLiveChatFeatureEnabled() ? (
							<HelpCentreContactOptions
								compactLayout={true}
								hideContactOptions={true}
							/>
						) : (
							<>
								<h2 css={h2Css}>
									Still can’t find what you’re looking for?
								</h2>
								<CallCentreEmailAndNumbers />
								<p>
									Or use our contact form to get in touch and
									we’ll get back to you as soon as possible.
								</p>
								<LinkButton
									to="/help-centre/contact-us"
									text={'Contact us'}
									fontWeight={'bold'}
									textColour={`${brand['400']}`}
									colour={`${brand['800']}`}
								/>
							</>
						)}
					</>
				) : (
					<Loading />
				)}
				<BackToHelpCentreLink />
			</div>
		</>
	);
};

const Loading = () => (
	<WithStandardTopMargin>
		<Spinner loadingMessage={'Fetching article...'} />
	</WithStandardTopMargin>
);

interface ArticleBodyProps {
	article: Article;
	articleCode: string;
}

const ArticleBody = (props: ArticleBodyProps) => {
	const aCss = css`
		color: ${brand[500]};
		text-decoration: underline;
	`;
	const ulCss = css`
		padding-left: 0;
	`;
	const liCss = css`
		list-style: none;
		padding-left: ${space[3] + space[2]}px;
		position: relative;
		:before {
			content: '';
			position: absolute;
			top: 8px;
			left: 0;
			width: 12px;
			height: 12px;
			border-radius: 50%;
			background-color: #c4c4c4;
		}
	`;
	const articleBodyH2Css = css`
		${headline.xxsmall({ fontWeight: 'bold' })};
		margin: ${space[6]}px 0 ${space[2]}px;
		b {
			font-weight: 700;
		}
	`;
	const articleBodyPCss = css`
		margin: 0 0 ${space[4]}px;
		font-size: 17px;
	`;

	// This is to appease React's "Lists need a unique key" error
	let keyCounter = 0;
	const getKey = () => props.articleCode + keyCounter++;

	const parseBody = (body: BaseNode[] | BaseNode): React.ReactNode => {
		if (Array.isArray(body)) {
			return body.map(parseBody);
		} else {
			const key = getKey();
			switch (body.element) {
				case 'text': {
					return (body as TextNode).content;
				}
				case 'h2': {
					return (
						<h2 key={key} css={articleBodyH2Css}>
							{parseBody((body as ElementNode).content)}
						</h2>
					);
				}
				case 'p': {
					return (
						<p key={key} css={articleBodyPCss}>
							{parseBody((body as ElementNode).content)}
						</p>
					);
				}
				case 'ol': {
					return (
						<ol key={key}>
							{parseBody((body as ElementNode).content)}
						</ol>
					);
				}
				case 'ul': {
					return (
						<ul key={key} css={ulCss}>
							{parseBody((body as ElementNode).content)}
						</ul>
					);
				}
				case 'li': {
					return (
						<li key={key} css={liCss}>
							{parseBody((body as ElementNode).content)}
						</li>
					);
				}
				case 'b': {
					return (
						<b key={key}>
							{parseBody((body as ElementNode).content)}
						</b>
					);
				}
				case 'i': {
					return (
						<i key={key}>
							{parseBody((body as ElementNode).content)}
						</i>
					);
				}
				case 'a': {
					const node = body as LinkNode;
					return (
						<a key={key} href={node.href} css={aCss}>
							{parseBody(node.content)}
						</a>
					);
				}
				default: {
					captureMessage(
						`Found unexpected element (${body.element}).`,
					);
					return null;
				}
			}
		}
	};

	return <div>{parseBody(props.article.body)}</div>;
};

const articleFeedbackWidgetCss = css`
	display: flex;
	flex-direction: column;
	border: 1px solid ${neutral[86]};
	padding: ${space[4]}px ${space[3]}px;
	margin: 36px 0 48px;
	${minWidth.desktop} {
		margin: 54px 0 66px;
	}
	${minWidth.mobileLandscape} {
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	& p {
		margin: 0;
		${textSans.medium({ fontWeight: 'bold' })}
	}
	& .buttonDiv {
		min-height: 36px;
		display: flex;
		align-items: center;
		margin-top: ${space[4]}px;
		${minWidth.mobileLandscape} {
			margin-top: 0;
		}
		& > * {
			margin-right: ${space[2]}px;
			${minWidth.mobileLandscape} {
				margin-right: ${space[3]}px;
			}
		}
		& p {
			${textSans.small({ fontWeight: 'regular' })}
		}
	}
`;

interface ArticleFeedbackWidgetProps {
	articleCode: string;
}

export const ArticleFeedbackWidget = (props: ArticleFeedbackWidgetProps) => {
	const [feedBackButtonClicked, setFeedBackButtonClicked] = useState(false);

	return (
		<div css={articleFeedbackWidgetCss}>
			<p>Did you find the information you need?</p>
			<div className="buttonDiv">
				{feedBackButtonClicked ? (
					<p>Thank you!</p>
				) : (
					<>
						<Button
							icon={<ThumbsUpIcon />}
							hideLabel={true}
							size="small"
							cssOverrides={css`
								svg {
									width: initial;
								}
							`}
							onClick={() => {
								setFeedBackButtonClicked(true);
								trackEvent({
									eventCategory: 'help-centre',
									eventAction: 'article-feedback',
									eventLabel: props.articleCode,
									eventValue: 1,
								});
							}}
						>
							Yes
						</Button>
						<Button
							icon={<ThumbsUpIcon invertIcon={true} />}
							hideLabel={true}
							size="small"
							cssOverrides={css`
								svg {
									width: initial;
								}
							`}
							onClick={() => {
								setFeedBackButtonClicked(true);
								trackEvent({
									eventCategory: 'help-centre',
									eventAction: 'article-feedback',
									eventLabel: props.articleCode,
									eventValue: 0,
								});
							}}
						>
							No
						</Button>
					</>
				)}
			</div>
		</div>
	);
};

export default HelpCentreArticle;
