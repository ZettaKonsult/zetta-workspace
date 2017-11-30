#!/bin/bash

HOME=`dirname $(readlink -f "$0")`
YML="$HOME/../../../../serverless.yml"

echo "Updating functions..."
FILE=`cat $YML`

NAMES=( \
 "confirmPayment" \
 "getUnpaidUrls" \
 "getLatestUnpaidUrl" \
 "getOrder" \
 "updateOrder" \
)

LENGTH=${#NAMES[@]}

mvn install

i=0
for NAME in ${NAMES[@]}; do
  i=$((i + 1))
  echo "==== Deploying $NAME [ $i / $LENGTH ] ==== "
  sls deploy function -f $NAME
done
