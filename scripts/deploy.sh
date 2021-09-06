###################################################################################################
# Copyright © 2021 Baggers Ltd. All Rights Reserved
#
# Unauthorized copying of this file, via any medium is strictly prohibited
# Proprietary and confidential
# Written by Daniel Cooke <danielcooke1996@gmail.com>
###################################################################################################
#!/bin/bash
GREEN=$(echo -en '\033[00;32m')
RESTORE=$(echo -en '\033[0m')
BLUE=$(echo -en '\033[00;34m')

./scripts/logHeader.sh "DEPLOYING BAGGERS WEB APPLICATION"

log() {
	echo "${BLUE}$1${RESTORE}"
}

NEXT_PUBLIC_VERSION=1.2.0 
NEXT_PUBLIC_BUILD_TIME=$(date) 
NEXT_PUBLIC_BUILD_ALIAS=$(node ./scripts/buildAliasGenerator.js) 

echo "${GREEN} Version: ${RESTORE}${NEXT_PUBLIC_VERSION}"

echo "${GREEN} Time: ${RESTORE}${NEXT_PUBLIC_BUILD_TIME}"
echo "${GREEN} Alias: ${RESTORE}${NEXT_PUBLIC_BUILD_ALIAS}"


./scripts/logHeader.sh "Installing workspace dependencies"
yarn workspaces focus -A

log "Building packages"

NODE_ENV=production
yarn build
yarn workspaces focus --production -A
yarn lerna run deploy


## TODO: Wed 18th August - 

### Graphql Deploy

# Unfortunately serverless does not allow you to dynamically set plugins,
# when we got to deploy our production node_modules we get "Serverless-offline" not found
# For now i will probably just include this as a production dependency (ew)
# But in future i can remove this dependency by hacking the serverless yml
# https://stackoverflow.com/questions/48460763/disable-sls-plugin-on-production-different-plugins-per-stage
# serverless github actions will help to deploy after we get this working locally


## TODO: 1st September

# Graphql And UI builds working
# This script needs to be broken down into .github/workflow commands etc.