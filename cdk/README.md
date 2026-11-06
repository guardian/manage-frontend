# Infrastructure

This directory defines the components to be deployed to AWS.

See [`package.json`](./package.json) for a list of available scripts.

GuCDK 62 enables ALB access logging by default, using
`application-load-balancer/<stage>/<stack>/<app>` in the account's access-log bucket.
The stack must specify its AWS region.

The upgrade temporarily retains `WazuhSecurityGroup` without attaching it to new
instances, following the [GuCDK migration instructions](https://github.com/guardian/cdk/blob/main/CHANGELOG.md#6150).
After deploying and rotating instances in both CODE and PROD, remove
`legacyWazuhSecurityGroup` and its logical-ID override in a separate deployment.
