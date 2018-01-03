#!/usr/bin/env bash

set -e

### to be done as parameters for the script 
AWS_ID="662301466295"
MONGO_DOMAIN="ec2-54-205-77-206.compute-1.amazonaws.com"
TAG="latest"
FRONTEND_BUCKET="focus21notesappfrontend"
CF_DISTRIBUTIONID="E29UUHZVQTN70S"
BACKEND_APP="focus21-notesapp-elb-154020615.us-east-1.elb.amazonaws.com"


echo "Building Production Frontend"
sed -i 's#localhost#''#$BACKEND_APP' src/config.js

yarn build
echo "Building image..."
docker build --build-arg mongo_domain=$MONGO_DOMAIN -t mahfouz/focus21notesapp:$TAG .
echo "Tagging image"
docker tag mahfouz/focus21notesapp:$TAG $AWS_ID.dkr.ecr.us-east-1.amazonaws.com/mahfouz/focus21notesapp:$TAG

DOCKER_LOGIN=$(aws ecr get-login --no-email-option)
$DOCKER_LOGIN

echo "Pushing image"
docker push $AWS_ID.dkr.ecr.us-east-1.amazonaws.com/mahfouz/focus21notesapp:$TAG
echo "Updating CFN"
aws cloudformation update-stack --stack-name Focus21Notesapp --use-previous-template --capabilities CAPABILITY_IAM \
  --parameters ParameterKey=DockerImageURL,ParameterValue=$AWS_ID.dkr.ecr.us-east-1.amazonaws.com/mahfouz/focus21notesapp:$TAG \
  ParameterKey=DesiredCapacity,UsePreviousValue=true \
  ParameterKey=InstanceType,UsePreviousValue=true \
  ParameterKey=MaxSize,UsePreviousValue=true \
  ParameterKey=SubnetIDs,UsePreviousValue=true \
  ParameterKey=VpcId,UsePreviousValue=true




echo "Updating Frontend Static Files"
aws s3 sync ./build/ s3://$FRONTEND_BUCKET --acl public-read
aws cloudfront create-invalidation --distribution-id $CF_DISTRIBUTIONID --paths /
