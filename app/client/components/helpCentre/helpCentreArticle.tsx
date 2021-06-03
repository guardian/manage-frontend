import { navigate, RouteComponentProps } from "@reach/router";
import { captureException, captureMessage } from "@sentry/browser";
import React, { useEffect, useState } from "react";
import { SectionContent } from "../sectionContent";
import { SectionHeader } from "../sectionHeader";
import { Spinner } from "../spinner";
import { WithStandardTopMargin } from "../WithStandardTopMargin";
import { BackToHelpCentreButton } from "./BackToHelpCentreButton";
import { helpCentreNavConfig } from "./helpCentreConfig";
import { h2Css } from "./helpCentreStyles";
import {
  Article,
  BaseNode,
  ElementNode,
  LinkNode,
  TextNode
} from "./HelpCentreTypes";
import { PageTitle } from "./pageTitle";
import { SeoData } from "./seoData";

interface HelpCentreArticleProps extends RouteComponentProps {
  articleCode?: string;
}

const HelpCentreArticle = (props: HelpCentreArticleProps) => {
  const [article, setArticle] = useState<Article | undefined>(undefined);

  useEffect(() => {
    setArticle(undefined);
    fetch(`/api/help-centre/article/${props.articleCode}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          captureMessage(
            `Fetching article ${props.articleCode} returned ${response.status}.`
          );
          navigate("/help-centre");
        }
      })
      .then(articleData => setArticle(articleData as Article))
      .catch(error =>
        captureException(
          `Failed to fetch article ${props.articleCode}. Error: ${error}`
        )
      );
  }, [props.articleCode]);

  const selectedNavTopic = helpCentreNavConfig.find(
    topic => topic.id === article?.topics[0].path
  );

  return (
    <>
      <PageTitle title={article?.title} />
      <SeoData article={article} />
      <SectionHeader title="How can we help you?" pageHasNav={true} />
      <SectionContent hasNav={true} selectedTopicObject={selectedNavTopic}>
        <h2 css={h2Css}>{article?.title}</h2>
        {article ? (
          <ArticleBody
            article={article}
            articleCode={props.articleCode ?? ""}
          />
        ) : (
          <Loading />
        )}
        <BackToHelpCentreButton />
      </SectionContent>
    </>
  );
};

const Loading = () => (
  <WithStandardTopMargin>
    <Spinner loadingMessage={"Fetching article..."} />
  </WithStandardTopMargin>
);

interface ArticleBodyProps {
  article: Article;
  articleCode: string;
}

const ArticleBody = (props: ArticleBodyProps) => {
  // This is to appease React's "Lists need a unique key" error
  let keyCounter = 0;
  const getKey = () => props.articleCode + keyCounter++;

  const parseBody = (body: BaseNode[] | BaseNode): React.ReactNode => {
    if (Array.isArray(body)) {
      return body.map(parseBody);
    } else {
      const key = getKey();
      switch (body.element) {
        case "text": {
          return (body as TextNode).content;
        }
        case "h2": {
          return <h2 key={key}>{parseBody((body as ElementNode).content)}</h2>;
        }
        case "p": {
          return <p key={key}>{parseBody((body as ElementNode).content)}</p>;
        }
        case "ol": {
          return <ol key={key}>{parseBody((body as ElementNode).content)}</ol>;
        }
        case "ul": {
          return <ul key={key}>{parseBody((body as ElementNode).content)}</ul>;
        }
        case "li": {
          return <li key={key}>{parseBody((body as ElementNode).content)}</li>;
        }
        case "b": {
          return <b key={key}>{parseBody((body as ElementNode).content)}</b>;
        }
        case "i": {
          return <i key={key}>{parseBody((body as ElementNode).content)}</i>;
        }
        case "a": {
          const node = body as LinkNode;
          return (
            <a key={key} href={node.href}>
              {parseBody(node.content)}
            </a>
          );
        }
        default: {
          captureMessage(`Found unexpected element (${body.element}).`);
          return null;
        }
      }
    }
  };

  return <div>{parseBody(props.article.body)}</div>;
};

export default HelpCentreArticle;
