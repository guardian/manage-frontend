# Account Frontend

This is a shell webapp using:

* [Sytled Components](https://emotion.sh)
* [React](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org)
* [Jest](https://facebook.github.io/jest/)

This is probably a good chance for people to look at it and give any opinions before we get much further.

## How to install

1.  Add `account.thegulocal.com` to `/etc/hosts`
1.  In `./nginx` run `./setup.sh`.
1.  In `./app`, run `nvm use`, `yarn` and `yarn watch`.
1.  then go to http://account.thegulocal.com/

You will need to have identity running locally and members-data-api too, as it will require you are logged in first, and later you will need to be able to get a user.
Or you can comment out this line: https://github.com/guardian/account-frontend/blob/dc51f6207dc9040a790c868d7ba21cc39353fe8f/app/server/server.ts#L21
