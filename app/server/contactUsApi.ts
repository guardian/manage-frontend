import { Request, Response } from "express";
import { ContactUsReq } from "../shared/contactUsTypes";
import { contactUsConfig } from "./contactUsConfig";

export const contactUsConfigHandler = (_: Request, res: Response) =>
  res.json(contactUsConfig);

export const contactUsFormHandler = (req: Request, res: Response) => {
  const validBody = parseAndValidate(req.body);

  if (!validBody) {
    return res.status(400).send();
  }

  res.status(201).send();
};

const parseAndValidate = (body: any): ContactUsReq | undefined => {
  try {
    const bodyAsJson = body ? JSON.parse(body) : "{}";
    return validateContactUsFormBody(bodyAsJson)
      ? (bodyAsJson as ContactUsReq)
      : undefined;
  } catch (error) {
    return undefined;
  }
};

const validateContactUsFormBody = (body: any): boolean => {
  if (
    body &&
    body.topic &&
    validateTopics(body.topic, body.subtopic, body.subsubtopic) &&
    body.name &&
    body.email &&
    isEmail(body.email) &&
    body.subject &&
    body.message
  ) {
    return true;
  }

  return false;
};

const validateTopics = (
  reqTopic: string | undefined,
  reqSubtopic: string | undefined,
  reqSubsubtopic: string | undefined
): boolean => {
  // Validate topic
  const topicIndex = contactUsConfig.findIndex(topic => topic.id === reqTopic);
  if (topicIndex === -1 || contactUsConfig[topicIndex].noForm) {
    return false;
  }

  // Validate subtopic
  const subtopics = contactUsConfig[topicIndex].subtopics;
  if (subtopics) {
    if (!reqSubtopic) {
      return false;
    }

    const subtopicIndex = subtopics.findIndex(
      subtopic => subtopic.id === reqSubtopic
    );
    if (subtopicIndex === -1 || subtopics[subtopicIndex].noForm) {
      return false;
    }

    // Validate subsubtopic
    const subsubtopics = subtopics[subtopicIndex].subsubtopics;
    if (subsubtopics) {
      if (!reqSubsubtopic) {
        return false;
      }

      const subsubtopicsIndex = subsubtopics.findIndex(
        subsubtopic => subsubtopic.id === reqSubsubtopic
      );
      if (subtopicIndex === -1 || subsubtopics[subsubtopicsIndex].noForm) {
        return false;
      }
    } else if (reqSubsubtopic) {
      return false;
    }
  } else if (reqSubtopic || reqSubsubtopic) {
    return false;
  }

  return true;
};

const isEmail = (email: string): boolean => {
  const emailSplit = email.split("@");
  return emailSplit.length === 2 && emailSplit[1].includes(".");
};
