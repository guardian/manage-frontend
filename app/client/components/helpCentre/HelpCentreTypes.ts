interface BaseArticle {
  title: string;
}

interface ArticleWithPath extends BaseArticle {
  path: string;
}

interface BaseTopic {
  title: string;
}

interface TopicWithPath extends BaseTopic {
  path: string;
}

export interface SingleTopic extends BaseTopic {
  articles: ArticleWithPath[];
}

export interface SingleTopicWithPath extends SingleTopic {
  path: string;
}

export interface MoreTopics extends BaseTopic {
  topics: SingleTopicWithPath[];
}

export interface Article extends BaseArticle {
  body: BaseNode[];
  topics: TopicWithPath[];
}

export interface BaseNode {
  element: string;
}
export interface TextNode extends BaseNode {
  content: string;
}

export interface ElementNode extends BaseNode {
  content: BaseNode[];
}

export interface LinkNode extends ElementNode {
  href: string;
}
