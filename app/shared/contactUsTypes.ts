interface BaseTopic {
  id: string;
  name: string;
  selfServiceBox?: SelfServiceBox;
  editableSubjectLine?: boolean;
  noForm?: boolean;
}

interface SelfServiceBox {
  text: string;
  linkText: string;
  href: string;
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

export interface ContactUsReq {
  topic: string;
  subtopic?: string;
  subsubtopic?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}
