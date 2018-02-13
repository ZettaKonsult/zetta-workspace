#!/bin/bash

HOME=`dirname $(readlink -f "$0")`
LAMBDA_DIR="$HOME/../lambda/"
cd $LAMBDA_DIR
LAMBDA=`pwd`
cd "$HOME/../../../../"
echo "Working from `pwd`"

NAME="$1"
DATA="$LAMBDA/$NAME/$2"

echo "Running test of $NAME using `basename $DATA`"
yarn sls invoke local --function "$NAME" --path "$DATA"
