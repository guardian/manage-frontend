import * as Sentry from '@sentry/node';
import AWS from 'aws-sdk';
import type { GetObjectRequest } from 'aws-sdk/clients/s3';
import { RequestSigner } from 'aws4';
import { conf } from './config';
import { log } from './log';

export const AWS_REGION = 'eu-west-1';

const PROFILE = 'membership';

const CREDENTIAL_PROVIDER = new AWS.CredentialProviderChain([
	() => new AWS.SharedIniFileCredentials({ profile: PROFILE }),
	...AWS.CredentialProviderChain.defaultProviders,
]);

const standardAwsConfig = {
	region: AWS_REGION,
	credentialProvider: CREDENTIAL_PROVIDER,
};

const S3 = new AWS.S3(standardAwsConfig);

// Returns AWS signature version 4 headers to be used for AWS_IAM authorization in API Gateway
export const generateAwsSignatureHeaders = async (
	method: string,
	host: string, // foo.execute-api.eu-west-1.amazonaws.com
	path: string, // DEV/bar
	body: string, // '{"foo": "bar"}'
) => {
	const creds: AWS.Credentials = await CREDENTIAL_PROVIDER.resolvePromise();
	const opts = {
		region: AWS_REGION,
		service: 'execute-api',
		method,
		host,
		path,
		body,
	};
	return new RequestSigner(opts, creds).sign().headers;
};

export const APIGateway = new AWS.APIGateway(standardAwsConfig);

export const CloudFormation = new AWS.CloudFormation(standardAwsConfig);

const CloudWatch = new AWS.CloudWatch(standardAwsConfig);

export const handleAwsRelatedError = (message: string, detail?: any) => {
	log.error(message, detail);
	Sentry.captureMessage(message);
};

export const s3ConfigPromise =
	<ConfigInterface>(...fieldNamesToValidate: string[]) =>
	(configPathPart: string) =>
		s3FilePromise<ConfigInterface>(
			'gu-reader-revenue-private',
			`manage-frontend/${conf.API_STAGE}/${configPathPart}-${conf.API_STAGE}.json`,
			...fieldNamesToValidate,
		);

export const s3FilePromise = <ConfigInterface>(
	bucket: string,
	fileKey: string,
	...fieldNamesToValidate: string[]
) =>
	(async () => {
		const configPath: GetObjectRequest = {
			Bucket: bucket,
			Key: fileKey,
		};

		const s3PromiseResult = await S3.getObject(configPath).promise();

		if (s3PromiseResult.Body) {
			try {
				const parsed = JSON.parse(s3PromiseResult.Body.toString());
				const missingProperties = fieldNamesToValidate.filter(
					(field) => !parsed.hasOwnProperty(field),
				);
				if (missingProperties.length === 0) {
					return parsed as ConfigInterface;
				}
				handleAwsRelatedError(
					`${fileKey} missing ${missingProperties.map(
						(field) => `'${field}'`,
					)} properties in '${bucket}'`,
				);
			} catch (err) {
				handleAwsRelatedError(
					`could not parse ${fileKey} in '${bucket}'`,
					err,
				);
			}
		}

		handleAwsRelatedError(
			`S3 error fetching ${fileKey} in '${bucket}'`,
			s3PromiseResult,
		);
	})();

export const s3TextFilePromise = (
	bucket: string,
	fileKey: string,
): Promise<string | undefined> =>
	(async () => {
		const filePath: GetObjectRequest = {
			Bucket: bucket,
			Key: fileKey,
		};
		const s3PromiseResult = await S3.getObject(filePath).promise();
		if (
			s3PromiseResult.Body &&
			s3PromiseResult.ContentType === 'text/plain'
		) {
			return s3PromiseResult.Body.toString();
		}
		handleAwsRelatedError(
			`S3 error fetching ${fileKey} in '${bucket}'`,
			s3PromiseResult,
		);
	})();

export const putMetricDataPromise = (
	metricName: string,
	dimensions: Record<string, string>,
) =>
	CloudWatch.putMetricData({
		Namespace: 'manage-frontend',
		MetricData: [
			{
				MetricName: metricName,
				Dimensions: Object.entries(dimensions).map(([Name, Value]) => ({
					Name,
					Value,
				})),
				Value: 1,
				Unit: 'Count',
			},
		],
	}).promise();
