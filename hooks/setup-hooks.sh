#!/bin/bash
cd hooks
ln -f pre-push ../.git/hooks/pre-push
ln -f pre-commit ../.git/hooks/pre-commit
exit 0