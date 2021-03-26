export interface Article {
  path: string;
  title: string;
}

export interface SingleTopic {
  title: string;
  articles: Article[];
}

export interface SingleTopicWithPath extends SingleTopic {
  path: string;
}

export interface MoreTopics {
  title: string;
  topics: SingleTopicWithPath[];
}
