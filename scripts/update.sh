#!/bin/bash

OPEN_MODULES=zk-open-modules

SCRIPT_DIR=`dirname $(readlink -f "$0")`
cd $SCRIPT_DIR
echo "==== Running script from `pwd` ============"
cd ..
echo "==== Updating Zetta Workspace `pwd` ======="
git rebase master
cd $OPEN_MODULES
echo "==== Updating Zetta Open Modules `pwd` ===="
git rebase master
exit 0
