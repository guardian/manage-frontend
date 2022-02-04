
   
#!/bin/bash
# Quickly fire up Cypress using the CI settings for interactive local usage.

set -ae

trap 'kill $(jobs -p)' INT TERM EXIT

source cypress-mocked.env
CI_ENV=$(cat cypress-mocked.env | tr '\n' ',')
CI_ENV=${CI_ENV%?}
yarn bundle-dev
yarn mock-server &
yarn start &
yarn cypress open --env $CI_ENV --config '{"testFiles":["parallel-3/updatePaymentUpdate.spec.ts"]}'
