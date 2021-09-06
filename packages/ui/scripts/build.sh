###################################################################################################
# Copyright © 2021 Baggers Ltd. All Rights Reserved
#
# Unauthorized copying of this file, via any medium is strictly prohibited
# Proprietary and confidential
# Written by Daniel Cooke <danielcooke1996@gmail.com>
###################################################################################################
#!/bin/bash
echo "Start graphql dev server"
yarn workspace @baggers/graphql run dev:nowatch &

echo "Waiting for GraphQL..."
until $(curl --output /dev/null --silent --head http://localhost:5000/graphql); do
    printf '.'
    sleep 1
done

echo "Found graphql"


yarn next build
lsof -i:5000 -t | xargs kill -9
