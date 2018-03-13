#!/bin/bash

OPEN_MODULES=zk-open-modules

SCRIPT_DIR=`dirname $(readlink -f "$0")`
cd $SCRIPT_DIR
echo "==== Running script from `pwd`"
cd ..
ZETTA_DIR=`pwd`
echo "==== Working from `pwd`"
echo "==== Stashing local changes ========="
git stash
echo "==== Updating Workspace ============="
git rebase master
cd $OPEN_MODULES
echo "==== Updating Open Modules =========="
echo "==== In `pwd`"
git rebase master
cd "$ZETTA_DIR"
echo "==== In `pwd`"
echo "==== Re-applying stashed changes ===="
git stash apply
exit 0
