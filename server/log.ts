import { createLogger, format, transports } from 'winston';
import { putMetricDataPromise } from './awsIntegration';
import { conf, Environments } from './config';

const location = conf.ENVIRONMENT === Environments.AWS ? '/var/log/' : './';

export const log = createLogger({
	level: 'info',
	format: format.json(),
	transports: [
		new transports.File({
			filename: `${location}/manage-frontend.log`,
		}),
		new transports.Console({ format: format.simple() }),
	],
});

interface MetricLoggingFields {
	loggingCode: string;
	isOK: boolean;
}

export const putMetric = (fields: MetricLoggingFields) => {
	if (process.env.RUNNING_IN_CYPRESS === 'true') {
		return;
	}
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
