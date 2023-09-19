# manage-frontend-static

This cloudforms the assets bucket for the assets that
is used by manage-frontend.

# Background

The reason this exists is to prevent people getting blank pages during a deploy (or if there's a failed deploy)

During a deploy or after a failed deploy it's designed for instances with different builds (e.g. 14d6 and 7af3) to be in service at the same time.  The requests are distributed at random between them.

In a simple world we would serve the html pages, and the JS/CSS assets from the instances, for simplicity.  So /index.html would contain a reference to the bundle /assets/main.14d6.js, which would be served from the instance.  The "14d6" would change on every build, for cache busting reasons.

However if the index.html refers to 14d6 and the request for /assets/main.14d6.js goes to an instance running build 7af3, there is simply a 404 returned and the user sees a blank page.  After a few refreshes it should all be working again until the next deploy.

This is not a great situation, so we get around it by making /assets/ point to an S3 bucket, and making sure that the bucket contains all possible main.*.js over recent deploys.  This means that whichever bundles or CSS are requested, the S3 bucket will be able to handle this.

The cost is an increase in complexity of the deployment process, as below.

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
