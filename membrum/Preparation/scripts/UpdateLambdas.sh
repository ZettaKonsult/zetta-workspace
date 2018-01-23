#!/bin/bash

HOME=`dirname $(readlink -f "$0")`
echo "Working from `pwd`"

echo "Updating functions..."

NAMES=( \
 "getNewAssignments" \
 "saveNewAssignments" \
 "parseUploadedFile" \
 "registerOrganisations"
)

LENGTH=${#NAMES[@]}

i=0
for NAME in ${NAMES[@]}; do
  i=$((i + 1))
  echo "==== Deploying $NAME [ $i / $LENGTH ] ==== "
  yarn sls deploy function -f $NAME
done
