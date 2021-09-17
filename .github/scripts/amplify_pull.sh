#!/bin/bash
set -e

AWSCLOUDFORMATIONCONFIG="{\
\"configLevel\":\"project\",\
\"useProfile\":false,\
\"profileName\":\"default\",\
\"accessKeyId\":\"$AWS_ACCESS_KEY_ID\",\
\"secretAccessKey\":\"$AWS_SECRET_ACCESS_KEY\",\
\"region\":\"eu-west-1\"\
}"\

AMPLIFY="{\
\"appId\":\"d8x9zrj8dyb2\",\
\"projectName\":\"baggers\",\
\"envName\":\"dev\"\
}"

PROVIDERS="{\
\"awscloudformation\":$AWSCLOUDFORMATIONCONFIG\
}"

cd packages/ui

amplify pull  \
	--amplify $AMPLIFY \
	--providers $PROVIDERS \
	--yes

