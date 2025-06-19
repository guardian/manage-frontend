# Welcome to [manage.theguardian.com](https://manage.theguardian.com) repo!

🤝 This code is owned by the SR Value team, please feel free to [join our chat room](https://mail.google.com/mail/u/0/#chat/space/AAAAuotUxTg) for advice 🤝

💡 This README contains mainly set-up information. 💡

[Please see the wiki for the main documentation](https://github.com/guardian/manage-frontend/wiki)

## Technologies

-   [Node](https://nodejs.org/en/)
-   [Express](https://expressjs.com/)
-   [Emotion](https://emotion.sh)
-   [React](https://reactjs.org/)
-   [TypeScript](https://www.typescriptlang.org)

DEV only Dependencies

-   [Jest](https://facebook.github.io/jest/)
-   [Yarn](https://yarnpkg.com/lang/en/)
-   [NGINX](https://www.nginx.com)

## Dependencies

-   [`gateway`](https://github.com/guardian/gateway)
-   [IDAPI](https://github.com/guardian/identity)
-   [`members-data-api`](https://github.com/guardian/members-data-api)
-   [`holiday-stop-api` ](https://github.com/guardian/support-service-lambdas/tree/master/handlers/holiday-stop-api)
-   [`delivery-records-api`](https://github.com/guardian/support-service-lambdas/tree/master/handlers/delivery-records-api)
-   [`cancellation-sf-cases-api`](https://github.com/guardian/support-service-lambdas/tree/master/handlers/cancellation-sf-cases-api)
-   Stripe
-   Google ReCaptcha

## Basic DEV environment

NOTE: nginx proxies CODE instances of [`gateway`] for sign-in and [`members-data-api`](https://github.com/guardian/members-data-api) **if they're not running locally**. See sections further down if you need to actually develop either of those services in parallel with `manage-frontend`.

**Note:** When using the local proxy, the sign-in flow for social logins (for example Google) doesn't quite work as the provider has no knowledge of the proxy and redirects back to CODE which doesn't know how to handle the request. The solution is to either use a username/password to sign in or if you need social login run [`gateway`] locally.

[`gateway`]: https://github.com/guardian/gateway

#### One-off setup

1. Install Yarn if you don't already have it.
1. Follow the [Nginx steps for manage-frontend](https://github.com/guardian/manage-frontend/blob/master/nginx/README.md)
1. Install AWS CLI `brew install awscli`
1. Ensure you have a Node.js version manager installed. We recommend using [`fnm`](https://github.com/Schniz/fnm).
1. Run `fnm use` (or equivalent)
1. Run `yarn` to install dependencies

#### Running locally (each day you need use it)

1.  First fetch credentials from [Janus](https://janus.gutools.co.uk/) for the `membership` profile.

1.  You will need to have nginx running (`sudo nginx`) if it's not running already.
1.  Run `yarn watch`.
1.  This should open https://manage.thegulocal.com/ in the browser (this often happens before the server is fully up and running so you may need to refresh if you see an error).
1.  You will very likely be redirected to `profile.thegulocal.com` (as you need to be signed in, in the last hour, to use MMA - see [wiki/IDAPI-Integration](https://github.com/guardian/manage-frontend/wiki/IDAPI-Integration)). You can use the same login as you would use in CODE, and you can create new subs by visiting https://support.code.dev-theguardian.com (when sign-in there with the same account). _Social sign-in (Google, Facebook etc.) doesn't appear to work via the proxy unfortunately._

### To develop `members-data-api` in parallel

#### One-off setup

1. Follow the [setup instructions for members-data-api](https://github.com/guardian/members-data-api#setting-it-up-locally).

#### Running locally (each day you need use it)

1.  You will also need to have [members-data-api](https://github.com/guardian/members-data-api) (`./start-api.sh`) running, to get subscription data (from CODE Zuora/Salesforce).
1.  You will probably also need the tunnel to the `contributions-store`, see point 2 of [members-data-api#running-locally](https://github.com/guardian/members-data-api#running-locally)

## SSH into running instances in AWS

You must ssh via the bastion, e.g. using [ssm-scala](https://github.com/guardian/ssm-scala):
`ssm ssh --profile membership --bastion-tags contributions-store-bastion,support,PROD --tags manage-frontend,support,CODE -a -x --newest`

| Description           | Command                                       |
| --------------------- | --------------------------------------------- |
| application directory | `/etc/gu/dist`                                |
| application logs      | `/var/log/manage-frontend.log`                |
| service config        | `/etc/systemd/system/manage-frontend.service` |
| service logs          | `journalctl -u manage-frontend`               |
| service status        | `systemctl status manage-frontend`            |
| healthcheck           | `curl http://127.0.0.1:9233/_healthcheck`     |
