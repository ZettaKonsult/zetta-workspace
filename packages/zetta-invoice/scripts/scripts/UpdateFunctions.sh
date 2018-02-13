#!/bin/bash

HOME=`dirname $(readlink -f "$0")`
YML="$HOME/../../../../serverless.yml"
cd `dirname $YML`
echo "Working from `pwd`"

echo "Updating functions..."

NAMES=( \
 "membrumDIBSConfirm" \
 "membrumNextOrder" \
 "membrumSavePayment" \
)

LENGTH=${#NAMES[@]}

mvn install

i=0
for NAME in ${NAMES[@]}; do
  i=$((i + 1))
  echo "==== Deploying $NAME [ $i / $LENGTH ] ==== "
  yarn sls deploy function -f $NAME
done
