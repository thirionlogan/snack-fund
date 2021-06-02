#!/bin/bash
cd hooks
ln -f pre-push.sh ../.git/hooks/pre-push
ln -f pre-commit.sh ../.git/hooks/pre-commit
exit 0