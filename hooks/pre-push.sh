#!/bin/bash
cd "$(git rev-parse --show-toplevel)" # go to top directory
JEST="node_modules/.bin/jest" # get the jest executable
pwd # print working directory

if [[ ! -x "$JEST" ]]; then
  printf "\t\033[41mPlease install Jest\033[0m (npm install jest)\n"
  exit 1
fi

echo "Running tests"

$JEST

JEST_EXIT="$?" # get exit code

if [[ "${JEST_EXIT}" == 0 ]]; then
  printf "\n\033[42mPUSH SUCCEEDED\033[0m\n"
else
  printf "\n\033[41mPUSH FAILED:\033[0m Fix errors and try again\n"
  exit 1
fi

exit $?
