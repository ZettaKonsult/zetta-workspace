#!/bin/bash

SCRIPT_DIR=`dirname $(readlink -f "$0")`
cd $SCRIPT_DIR
echo "Updating Zetta Workspace"
cd .. && git pull
echo "Updating Zetta Open Modules"
cd zk-open-modules && git pull
cd $SCRIPT_DIR
