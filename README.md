# Manage Frontend - manage.theguardian.com

Frontend of `manage.theguardian.com`

## Technologies

- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Emotion](https://emotion.sh)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org)
- [Jest](https://facebook.github.io/jest/)

## Dependencies

- [Members data API](https://github.com/guardian/members-data-api)
- [NVM](https://github.com/creationix/nvm)
- [Yarn](https://yarnpkg.com/lang/en/)
- [NGINX](https://www.nginx.com)

## Setup DEV environment

1. Follow the [Nginx steps for manage-frontend](https://github.com/guardian/manage-frontend/blob/master/nginx/README.md)
1. Follow the [nginx steps for identity-platform](https://github.com/guardian/identity-platform/blob/master/nginx/README.md#setup-nginx-with-ssl-for-dev).
1. Follow the [identity-frontend configuration steps](https://github.com/guardian/identity-frontend#configuration).
1. Follow the [setup instructions for members-data-api](https://github.com/guardian/members-data-api#setting-it-up-locally).
1. In `./nginx` run `./setup.sh`.
1. In `./app`, run `nvm use` and `yarn`.

**Running locally**

1.  First fetch credentials from [Janus](https://janus.gutools.co.uk/) for the `membership` profile.
2.  You will need to have [identity-frontend](https://github.com/guardian/identity-frontend) running (`./start-frontend.sh`), to allow you to sign in (the sign-in cookies are required).
3.  You will also need to have [members-data-api](https://github.com/guardian/members-data-api) (`./start-api.sh`) running, to get CODE subscription data.
4.  You will need to have nginx running (`sudo nginx`), if it's not running already.
5.  In `./app`, run `yarn watch`.
6.  Then go to https://manage.thegulocal.com/
7.  To execute `yarn test` first authenticate snyk [with your token](https://support.snyk.io/hc/en-us/articles/360004008258-Authenticate-the-CLI-with-your-account)
    ```
    cd app
    npx snyk config set api=XXXXXXXX
    ```

### SSH

You must ssh via the bastion, e.g. using [ssm-scala](https://github.com/guardian/ssm-scala):
`ssm ssh --profile membership --bastion-tags contributions-store-bastion,support,PROD --tags manage-frontend,support,CODE -a -x --newest`
