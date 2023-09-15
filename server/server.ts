import * as Sentry from '@sentry/node';
import { raw } from 'body-parser';
import cookieParser from 'cookie-parser';
import type { NextFunction, Request, RequestHandler, Response } from 'express';
import { default as express } from 'express';
import helmet from 'helmet';
import { MAX_FILE_ATTACHMENT_SIZE_KB } from '../shared/fileUploadUtils';
import { conf } from './config';
import { log } from './log';
import * as routes from './routes';

const port = 9233;

const server = express();

declare let WEBPACK_BUILD: string;
if (conf.SERVER_DSN) {
	Sentry.init({
		dsn: conf.SERVER_DSN,
		release: WEBPACK_BUILD || 'local',
		environment: conf.DOMAIN,
	});
	server.use(
		Sentry.Handlers.requestHandler({
			ip: false,
			user: false,
			request: ['method', 'query_string', 'url'], // this list is explicit, to avoid sending cookies
		}),
	);
}

if (conf.DOMAIN === 'thegulocal.com') {
	// tslint:disable-next-line:no-object-mutation
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

server.use(helmet());

const serveStaticAssets: RequestHandler = express.static(__dirname + '/static');

/** static asses are cached by fastly */
server.use('/static', serveStaticAssets);

/**
 * WARNING: Because manage-fronted manages personal data make sure to prevent caching
 * on both CDN (Fastly) and browsers. This Cache-Control header below is VERY IMPORTANT
 * so mind removing or it! Without it personal data would likely be served to wrong user.
 * In particular mind the endpoints that proxy to APIs such as IDAPI or MDAPI.
 *
 * This middleware has no mount path so it executes for all routes that follow this call.
 * To enable caching for a route that requires it register it above this middleware, see /static
 * route as example, or override headers via Response arguments for a particular route later one.
 * https://stackoverflow.com/a/31661931
 *
 * There exists an additional safety net as a VCL condition in Fastly which should force a
 * PASS (do not cache) on sensitive routes. See https://github.com/guardian/manage-frontend/wiki/Fastly-&-Caching
 */
const disableCache = (_: Request, res: Response, next: NextFunction) => {
	res.header(
		'Cache-Control',
		'private, no-cache, no-store, must-revalidate, max-age=0',
	);
	res.header('Access-Control-Allow-Origin', '*.' + conf.DOMAIN);
	next();
};
server.use(disableCache);

/**
 * Cookies and body parsing
 * ------------------------
 * We don't parse the body of JSON requests that are coming into the server from
 * the client using express.json() because MMA is essentially a proxy and is
 * usually not interested in the body of the request. One of the exceptions is
 * POST /aapi/avatar, which extracts file data from a JSON payload and reformats
 * it. This is handled separately directly in the route handler.
 *
 * WARNING: A lot of the routes _rely_ on the JSON body not being parsed at the
 * server level, so they don't stringify the body before sending it to
 * downstream APIs. For this reason, think and test carefully before adding a
 * global body parser to the server!
 */
server.use(cookieParser());
server.use(
	raw({
		type: '*/*',
		limit: `${MAX_FILE_ATTACHMENT_SIZE_KB + 100}kb`,
	}),
); // parses all bodys to a raw 'Buffer'

server.use(routes.core);
server.use('/profile/', routes.profile);
server.use('/api/', routes.api);
server.use('/idapi', routes.idapi);
server.use('/mpapi', routes.mpapi);
server.use('/aapi', routes.aapi);
server.use(routes.productsProvider('/api/'));

// Help Centre
server.use('/help-centre', routes.helpcentre);

// ALL OTHER ENDPOINTS CAN BE HANDLED BY MMA CLIENT SIDE REACT ROUTING
server.use(routes.frontend);

if (conf.SERVER_DSN) {
	server.use(Sentry.Handlers.errorHandler());
}
server.listen(port);
log.info(`Serving at http://localhost:${port}`);
