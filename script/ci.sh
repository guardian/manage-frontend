#!/usr/bin/env bash

set -e
set -x

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
ROOT_DIR="${DIR}/.."
cd "$ROOT_DIR"

yarn install
yarn type-check
yarn lint
yarn bundle

cp package.json dist
cp riff-raff.yaml dist

pushd dist
yarn install --production
popd

cd dist

zip -FSr "${ROOT_DIR}/manage-frontend.zip" ./*
