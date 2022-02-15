interface BaseTopic {
	id: string;
	name: string;
	selfServiceBox?: SelfServiceBox;
	editableSubject?: boolean;
	noForm?: boolean;
}

interface SelfServiceBox {
	text: string[];
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

interface BaseContactUsReqPayload {
	name: string;
	email: string;
	subject: string;
	message: string;
	attachment?: { name: string; contents: string };
}

export interface ContactUsFormPayload extends BaseContactUsReqPayload {
	captchaToken: string;
}

export interface ContactUsReq extends BaseContactUsReqPayload {
	topic: string;
	subtopic?: string;
	subsubtopic?: string;
}
