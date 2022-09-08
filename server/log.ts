import winston from 'winston';
import { putMetricDataPromise } from './awsIntegration';
import { conf, Environments } from './config';

const location = conf.ENVIRONMENT === Environments.AWS ? '/var/log/' : './';

export const log = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	transports: [
		new winston.transports.File({
			filename: `${location}/manage-frontend.log`,
		}),
		new winston.transports.Console({ format: winston.format.simple() }),
	],
});

interface MetricLoggingFields {
	loggingCode: string;
	isOK: boolean;
}

export const putMetric = (fields: MetricLoggingFields) => {
	const dimensions = {
		Stage: conf.STAGE,
		outcome: fields.isOK ? 'SUCCESS' : 'ERROR',
	};

	if (fields.loggingCode) {
		putMetricDataPromise(fields.loggingCode, dimensions).catch((error) =>
			log.error('Failed to putMetricData', {
				metricName: fields.loggingCode,
				dimensions,
				error,
			}),
		);
	}
};
