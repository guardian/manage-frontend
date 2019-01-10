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

## Installation and running

1.  Add the following line to to `/etc/hosts`

```
127.0.0.1 manage.thegulocal.com
127.0.0.1 profile.thegulocal.com
127.0.0.1 members-data-api.thegulocal.com
```

2.  You will need to have [identity-frontend](https://github.com/guardian/identity-frontend) and [members-data-api](https://github.com/guardian/members-data-api) running locally, as it will require you are logged in first. If this is the first time you'll need to do these sub-steps:
    1.  follow the [nginx steps for identity-platform](https://github.com/guardian/identity-platform/blob/master/nginx/README.md#setup-nginx-with-ssl-for-dev)
    2.  follow the [identity-frontend configuration steps](https://github.com/guardian/identity-frontend#configuration)
    3.  follow the [setup instructions for members-data-api](https://github.com/guardian/members-data-api#setting-it-up-locally)
3.  In `./nginx` run `./setup.sh`.
4.  In `./app`, run `nvm use`, `yarn` and `yarn watch`.
5.  Then go to https://manage.thegulocal.com/
