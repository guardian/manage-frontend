# Run this file to deploy the frontend static assets bucket defined in the cfn
# This probably won't be a common task, but see the Readme to understand more

aws cloudformation deploy \
    --profile membership \
    --stack-name manage-PROD-frontend-static \
    --template-file cfn.yaml \
    --region eu-west-1 \
    --tags App=frontend-static Stage=PROD Stack=support
