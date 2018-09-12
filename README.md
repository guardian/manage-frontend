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
```

2.  In `./nginx` run `./setup.sh`.
3.  In `./app`, run `nvm use`, `yarn` and `yarn watch`.
4.  then go to https://manage.thegulocal.com/

You will need to have [identity](https://github.com/guardian/identity) running locally and [members-data-api](https://github.com/guardian/members-data-api) too, as it will require you are logged in first, and later you will need to be able to get a user.
