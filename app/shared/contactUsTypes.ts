interface BaseTopic {
  id: string;
  name: string;
  selfServiceBox?: SelfServiceBox;
  editableSubjectLine?: boolean;
}

interface SelfServiceBox {
  text: string;
  linkText: string;
  href: string;
  noForm?: boolean;
}

export interface SubTopic extends BaseTopic {
  subsubtopics?: BaseTopic[];
  subsubTopicsTitle?: string;
}

export interface Topic extends BaseTopic {
  enquiryLabel: string;
  subtopics?: SubTopic[];
  subTopicsTitle?: string;
}
