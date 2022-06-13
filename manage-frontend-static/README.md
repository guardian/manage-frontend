# manage-frontend-static

This cloudforms the assets bucket for the assets that
is used by manage-frontend.

# Deploying to PROD (manual)

1. make your changes to cfn
1. do a PR and get it approved
1. merge to default branch
1. check out the default branch locally
1. get janus credentials
1. run ./PROD-deploy.sh

# More information

Traditionally this would just be a manually created bucket
but that doesn't really help us if we need to recreate the
stack.

For cloudformed assets normally riffraff uses the
stack/stage/app tags to look up the right resource.
However the aws-s3 task of riffraff needs
a specific bucket name (or a key in the target account's
SSM)

This does make it a little tricky to cloudform along with
the rest of the app, but it's simple enough to put the
bucket in its own cloudformation.

It's only possible to deploy this into PROD and once
deployed it should not be deleted, only updated, as
deleting it would leave open an S3 bucket on our domain.
