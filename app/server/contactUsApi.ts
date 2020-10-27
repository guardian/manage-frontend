import { captureMessage } from "@sentry/node";
import { Request, Response } from "express";
import fetch from "node-fetch";
import { contactUsConfig } from "../shared/contactUsConfig";
import { ContactUsReq } from "../shared/contactUsTypes";
import { getContactUsAPIHostAndKey } from "./apiGatewayDiscovery";
import { log } from "./log";

export const contactUsFormHandler = async (req: Request, res: Response) => {
  const validBody = parseAndValidate(req.body);
  if (!validBody) {
    return res.status(400).send();
  }

  const apiConfig = await getContactUsAPIHostAndKey();
  if (!apiConfig) {
    const errorMessage = "Could not obtain contact-us-api host/key.";
    log.error(errorMessage);
    captureMessage(errorMessage);
    return res.status(500).send();
  }

  fetch(apiConfig.host, {
    method: "POST",
    body: JSON.stringify(validBody),
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiConfig.apiKey
    }
  })
    .then(contactUsAPIResponse => {
      if (!contactUsAPIResponse.ok) {
        const errorMessage = `Unexpected error from contact-us-api endpoint. ${contactUsAPIResponse.status} ${contactUsAPIResponse.statusText}`;
        log.error(errorMessage);
        captureMessage(errorMessage);
      }
      res.status(contactUsAPIResponse.status).send();
    })
    .catch(error => {
      const errorMessage =
        "Unexpected error when trying to contact contact-us-api endpoint.";
      log.error(errorMessage, error);
      captureMessage(errorMessage);
      res.status(500).send();
    });
};

const parseAndValidate = (body: any): ContactUsReq | undefined => {
  try {
    const bodyAsJson = body ? JSON.parse(body) : "{}";

    return validateContactUsFormBody(bodyAsJson)
      ? buildContactUsReqBody(bodyAsJson)
      : undefined;
  } catch (error) {
    return undefined;
  }
};

const validateContactUsFormBody = (body: any): boolean =>
  body &&
  body.topic &&
  validateTopics(body.topic, body.subtopic, body.subsubtopic) &&
  body.name &&
  body.email &&
  isEmail(body.email) &&
  body.subject &&
  body.message;

const validateTopics = (
  reqTopic: string | undefined,
  reqSubtopic: string | undefined,
  reqSubsubtopic: string | undefined
): boolean => {
  // Validate topic
  const topic = contactUsConfig.find(topicEntry => topicEntry.id === reqTopic);
  if (!topic || topic.noForm) {
    return false;
  }

  // Validate subtopic
  const subtopicList = topic.subtopics;
  if (subtopicList) {
    if (!reqSubtopic) {
      return false;
    }

    const subtopic = subtopicList.find(
      subtopicEntry => subtopicEntry.id === reqSubtopic
    );
    if (!subtopic || subtopic.noForm) {
      return false;
    }

    // Validate subsubtopic
    const subsubtopicList = subtopic.subsubtopics;
    if (subsubtopicList) {
      if (!reqSubsubtopic) {
        return false;
      }

      const subsubtopic = subsubtopicList.find(
        subsubtopicEntry => subsubtopicEntry.id === reqSubsubtopic
      );
      if (!subsubtopic || subsubtopic.noForm) {
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

const buildContactUsReqBody = (body: any): ContactUsReq => ({
  topic: body.topic,
  ...(body.subtopic && {
    subtopic: body.subtopic
  }),
  ...(body.subsubtopic && {
    subsubtopic: body.subsubtopic
  }),
  name: body.name,
  email: body.email,
  subject: body.subject,
  message: body.message
});
