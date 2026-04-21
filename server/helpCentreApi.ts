import { captureMessage } from '@sentry/node';
import type { Request, Response } from 'express';
import { s3FilePromise } from './awsIntegration';
import { conf } from './config';
import { log } from './log';

type HelpCentreContentType = 'article' | 'topic';
type HelpCentreFailureReason = 'empty_file' | 'file_not_found';

const captureHelpCentreFetchFailure = ({
	contentType,
	reason,
	filePath,
	error,
}: {
	contentType: HelpCentreContentType;
	reason: HelpCentreFailureReason;
	filePath: string;
	error?: unknown;
}) => {
	captureMessage(`Help centre ${contentType} fetch failed.`, {
		fingerprint: [`help-centre-${contentType}-fetch-${reason}`],
		contexts: {
			helpCentreFetch: {
				contentType,
				reason,
				filePath,
			},
		},
		extra: {
			errorValue: error === undefined ? undefined : String(error),
		},
	});
};

export const getArticleHandler = async (req: Request, res: Response) => {
	const { article } = req.params;
	const bucketName = 'manage-help-content';
	const filePath = `${conf.STAGE}/articles/${article}.json`;
	s3FilePromise(bucketName, filePath)
		.then((data) => {
			if (!data) {
				const errorMessage = `File ${filePath} was empty`;
				log.error(errorMessage);
				captureHelpCentreFetchFailure({
					contentType: 'article',
					reason: 'empty_file',
					filePath,
				});
			}
			const statusCode = data ? 200 : 404;
			res.status(statusCode).json(data || []);
		})
		.catch((error) => {
			const errorMessage = `File ${filePath} not found`;
			log.error(errorMessage, error);
			captureHelpCentreFetchFailure({
				contentType: 'article',
				reason: 'file_not_found',
				filePath,
				error,
			});
			res.status(404).send();
		});
};

export const getTopicHandler = async (req: Request, res: Response) => {
	const { topic } = req.params;
	const bucketName = 'manage-help-content';
	const filePath = `${conf.STAGE}/topics/${topic}.json`;
	s3FilePromise(bucketName, filePath)
		.then((data) => {
			if (!data) {
				const errorMessage = `File ${filePath} was empty`;
				log.error(errorMessage);
				captureHelpCentreFetchFailure({
					contentType: 'topic',
					reason: 'empty_file',
					filePath,
				});
			}
			const statusCode = data ? 200 : 404;
			res.status(statusCode).json(data || []);
		})
		.catch((error) => {
			const errorMessage = `File ${filePath} not found`;
			log.error(errorMessage, error);
			captureHelpCentreFetchFailure({
				contentType: 'topic',
				reason: 'file_not_found',
				filePath,
				error,
			});
			res.status(404).send();
		});
};
