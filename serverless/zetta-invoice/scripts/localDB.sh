#! bin/bash

SUFFIX="start --migrate &"
if [ "$0" == "1" ]; then
  SUFFIX="quit"
fi
COMMAND="yarn sls dynamodb ${SUFFIX}"
echo "executing ${COMMAND} "
${COMMAND}
