# manage.theguardian.com

This README contains mainly set-up information.

[SEE THE WIKI FOR MAIN DOCUMENTATION!](https://github.com/guardian/manage-frontend/wiki)

## Technologies

- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Emotion](https://emotion.sh)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org)

DEV only Dependencies

- [Jest](https://facebook.github.io/jest/)
- [Yarn](https://yarnpkg.com/lang/en/)
- [NGINX](https://www.nginx.com)

## Dependencies

- [`identity-frontend`](https://github.com/guardian/identity-frontend)
- [IDAPI](https://github.com/guardian/identity)
- [`members-data-api`](https://github.com/guardian/members-data-api)
- [`holiday-stop-api` ](https://github.com/guardian/support-service-lambdas/tree/master/handlers/holiday-stop-api)
- [`delivery-records-api`](https://github.com/guardian/support-service-lambdas/tree/master/handlers/delivery-records-api)
- [`cancellation-sf-cases-api`](https://github.com/guardian/support-service-lambdas/tree/master/handlers/cancellation-sf-cases-api)
- Stripe
- Google ReCaptcha

## Basic DEV environment

NOTE nginx proxies CODE instances of [`identity-frontend`](https://github.com/guardian/identity-frontend) for sign-in and [`members-data-api`](https://github.com/guardian/members-data-api) **if they're not running locally**. See sections further down if you need to actually develop either of those services in parallel with `manage-frontend`.

#### One-off setup

1. Follow the [Nginx steps for manage-frontend](https://github.com/guardian/manage-frontend/blob/master/nginx/README.md)
1. Ensure you have `nvm` installed (DO NOT install via Brew, instead use [nvm's installation instructions](https://github.com/nvm-sh/nvm#installing-and-updating))
1. In `./app`...
   1. run `nvm use`
   1. run `yarn`
   1. authenticate snyk [with your token](https://support.snyk.io/hc/en-us/articles/360004008258-Authenticate-the-CLI-with-your-account) `npx snyk config set api=XXXXXXXX`

#### Running locally (each day you need use it)

1.  First fetch credentials from [Janus](https://janus.gutools.co.uk/) for the `membership` profile.

1.  You will need to have nginx running (`sudo nginx`), if it's not running already.
1.  In `./app`, run `yarn watch`.
1.  Which should open https://manage.thegulocal.com/ in the browser (you may need to refresh if you see an error, whilst the it catches up)
1.  You will very likely be redirected to `profile.thegulocal.com` (as you need to be signed in, in the last hour, to use MMA - see [wiki/IDAPI-Integration](https://github.com/guardian/manage-frontend/wiki/IDAPI-Integration)). You can use the same login as you would use in CODE, and you can create new subs by visiting https://support.code.dev-theguardian.com (when sign-in there with the same account). _Social sign-in (Google, Facebook etc.) doesn't appear to work via the proxy unfortunately._

### To develop `members-data-api` in parallel

#### One-off setup

1. Follow the [setup instructions for members-data-api](https://github.com/guardian/members-data-api#setting-it-up-locally).

#### Running locally (each day you need use it)

1.  You will also need to have [members-data-api](https://github.com/guardian/members-data-api) (`./start-api.sh`) running, to get subscription data (from DEV Zuora/Salesforce).
1.  You will probably also need the tunnel to the `contributions-store`, see point 2 of [members-data-api#running-locally](https://github.com/guardian/members-data-api#running-locally)

### To develop `identity-frontend` in parallel (very unlikely)

#### One-off setup

1. Follow the [nginx steps for identity-platform](https://github.com/guardian/identity-platform/blob/master/nginx/README.md#setup-nginx-with-ssl-for-dev).
1. Follow the [identity-frontend configuration steps](https://github.com/guardian/identity-frontend#configuration).

#### Running locally (each day you need use it)

2.  Start [identity-frontend](https://github.com/guardian/identity-frontend) with `./start-frontend.sh`.

## SSH into running instances in AWS

You must ssh via the bastion, e.g. using [ssm-scala](https://github.com/guardian/ssm-scala):
`ssm ssh --profile membership --bastion-tags contributions-store-bastion,support,PROD --tags manage-frontend,support,CODE -a -x --newest`

| Description           | Command |
| --------------------- | --------------------- |
| application directory | `/etc/gu/dist` |
| application logs | `/var/log/manage-frontend.log` |
| service config | `/etc/systemd/system/manage-frontend.service` |
| service logs | `journalctl -u manage-frontend` |
| service status | `systemctl status manage-frontend` |
| healthcheck | `curl http://127.0.0.1:9000/healthcheck` |
