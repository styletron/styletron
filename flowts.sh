#!/usr/bin/env bash

set -e
flowts \
  --commit-rename-command "git add . && git commit --no-verify -m 'flowts rename'" \
  --no-allow-js \
  -i "styletron*/**/*.js" \
  -x "**/dist/**/*" \
  -x "**/dist-*/**/*" \
  -x "**/lib/**/*" \
  -x "**/.cuprc.js" \
  -x "**/.eslintrc.js" \
  ./packages

#yarn eslint ./ --fix
git add .
git commit --no-verify -m 'flowts convert'
