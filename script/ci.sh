#!/usr/bin/env bash

set -e
set -x

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
ROOT_DIR="${DIR}/.."
cd "$ROOT_DIR"

yarn install --frozen-lockfile
yarn type-check
yarn lint
yarn test
yarn bundle

cp package.json dist
cp yarn.lock dist

cd dist

yarn install --production --frozen-lockfile

zip -FSr "${ROOT_DIR}/manage-frontend.zip" ./*
