#!/bin/bash
cd hooks
chmod +rwx ./pre-push.sh
chmod +rwx ./pre-commit.sh
ln -f pre-push.sh ../.git/hooks/pre-push
ln -f pre-commit.sh ../.git/hooks/pre-commit
exit 0