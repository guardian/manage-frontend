import css from "@emotion/css";
import { Button } from "@guardian/src-button";
import { neutral, space } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import { navigate, RouteComponentProps } from "@reach/router";
import { captureException, captureMessage } from "@sentry/browser";
import React, { useEffect, useState } from "react";
import { minWidth } from "../../styles/breakpoints";
import { trackEvent } from "../analytics";
import { SelectedTopicObjectContext } from "../sectionContent";
import { Spinner } from "../spinner";
import { ThumbsUpIcon } from "../svgs/thumbsUpIcon";
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

  const setSelectedTopicObject = React.useContext(SelectedTopicObjectContext);
  useEffect(() => {
    const selectedNavTopic = helpCentreNavConfig.find(
      topic => topic.id === article?.topics[0].path
    );

    setSelectedTopicObject(selectedNavTopic?.id);
  }, [article]);

  return (
    <>
      <PageTitle title={article?.title} />
      <SeoData article={article} />
      <>
        <h2 css={h2Css}>{article?.title}</h2>
        {article ? (
          <>
            <ArticleBody
              article={article}
              articleCode={props.articleCode ?? ""}
            />
            <ArticleFeedbackWidget articleCode={props.articleCode ?? ""} />
          </>
        ) : (
          <Loading />
        )}
        <BackToHelpCentreButton />
      </>
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

const articleFeedbackWidgetCss = css`
  display: flex;
  flex-direction: column;
  border: 1px solid ${neutral[86]};
  padding: ${space[4]}px ${space[3]}px;
  margin: 66px 0;
  ${minWidth.mobileLandscape} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  & p {
    margin: 0;
    ${textSans.medium({ fontWeight: "bold" })}
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
      ${textSans.small({ fontWeight: "regular" })}
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
                  eventCategory: "help-centre",
                  eventAction: "article-feedback",
                  eventLabel: props.articleCode,
                  eventValue: 1
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
                  eventCategory: "help-centre",
                  eventAction: "article-feedback",
                  eventLabel: props.articleCode,
                  eventValue: 0
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
