# Cypress testing

Cypress tests come in two types: mocked and end-to-end (E2E).

## Mocked tests

Most of the tests are mocked tests. They mock responses from various APIs and
short-circuit the identity middleware, which prevents the tests from needing to
log a user in. The middleware is short-circuited by setting the value of the
global variable `CYPRESS` to `'SKIP_IDAPI'` in the `bundle-dev-server-cypress`
script in `package.json`.

The mocked tests live in `cypress/tests/mocked`.

The mocked tests use the following commands in `package.json`:

-   `yarn cypress:mocked:server`: starts a dev server (essentially the same as the standard `yarn watch` command but with the `CYPRESS` variable set to `'SKIP_IDAPI'`, and doesn't open a new browser tab).
-   `yarn cypress:mocked:open`: opens the Cypress test runner in mocked mode.
-   `yarn cypress:mocked:run`: runs the Cypress tests headless in mocked mode.

In CI, the mocked tests are run by the `cypress-mocked.yml` GitHub Actions job.

## End-to-end tests

The end-to-end tests live in `cypress/tests/e2e`. They currently comprise a
small suite of basic tests which use CODE IDAPI to generate a test user and CODE
Gateway to sign that user in before performing a few basic functions on the
frontend.

To run E2E tests locally, it is necessary to download a Cypress env file from S3
with the following command (after getting fresh tokens from Janus):

```bash
aws s3 cp --profile membership s3://gu-reader-revenue-private/manage-frontend/CODE/cypress.env.json cypress.env.json
```

Also ensure that you have run the setup script in the `nginx` directory, which
sets up the local Nginx proxy to CODE Gateway and IDAPI. If you are also developing
Identity projects such as Gateway, you may have already run the setup script in the
`identity-platform` repo. If this is the case, you will have conflicting server blocks
for the `profile.thegulocal.com` domain. You will need to either:

-   Always run Gateway locally while running MMA E2E tests, and delete the
    `identity-frontend-CODE-fallback.conf` file in the Nginx config directory; or
-   Comment out the `profile.thegulocal.com` server block in the `identity.conf`
    file in the Nginx config directory.

Remember to restart Nginx after making any changes to the Nginx config files.

```bash
cd $(dev-nginx locate)/servers
sudo rm identity-frontend-CODE-fallback.conf
# OR
sudo vim identity.conf
sudo nginx -s reload
```

The E2E tests use the following commands in `package.json`:

-   `yarn cypress:e2e:server`: starts a dev server without setting the `CYPRESS` variable.
-   `yarn cypress:e2e:open`: opens the Cypress test runner in E2E mode.
-   `yarn cypress:e2e:run`: runs the Cypress tests headless in E2E mode.
