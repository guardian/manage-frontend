import { captureMessage } from '@sentry/node';
import type { Request, Response } from 'express';
import { s3FilePromise } from './awsIntegration';
import { conf } from './config';
import { log } from './log';

export const getArticleHandler = async (req: Request, res: Response) => {
	const { article } = req.params;
	const bucketName = 'manage-help-content';
	const filePath = `${conf.API_STAGE}/articles/${article}.json`;
	s3FilePromise(bucketName, filePath)
		.then((data) => {
			if (!data) {
				const errorMessage = `File ${filePath} was empty`;
				log.error(errorMessage);
				captureMessage(errorMessage);
			}
			const statusCode = data ? 200 : 404;
			res.status(statusCode).json(data || []);
		})
		.catch((error) => {
			const errorMessage = `File ${filePath} not found`;
			log.error(errorMessage, error);
			captureMessage(errorMessage);
			res.status(404).send();
		});
};

export const getTopicHandler = async (req: Request, res: Response) => {
	const { topic } = req.params;
	const bucketName = 'manage-help-content';
	const filePath = `${conf.API_STAGE}/topics/${topic}.json`;
	s3FilePromise(bucketName, filePath)
		.then((data) => {
			if (!data) {
				const errorMessage = `File ${filePath} was empty`;
				log.error(errorMessage);
				captureMessage(errorMessage);
			}
			const statusCode = data ? 200 : 404;
			res.status(statusCode).json(data || []);
		})
		.catch((error) => {
			const errorMessage = `File ${filePath} not found`;
			log.error(errorMessage, error);
			captureMessage(errorMessage);
			res.status(404).send();
		});
};
