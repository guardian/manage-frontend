#!/usr/bin/env bash

set -euo pipefail

trap 'printf "Devcontainer setup failed at line %s. Resolve the error and rerun bash script/setup-devcontainer.sh.\n" "$LINENO" >&2' ERR

if [[ ! -f /.dockerenv || "$(id -un)" != vscode ]]; then
	printf 'Run this script inside the devcontainer as vscode, not on the host.\n' >&2
	exit 1
fi

cd "$(dirname "${BASH_SOURCE[0]}")/.."
rm -f "$HOME/.manage-frontend-setup-complete"

if [[ ! -d .git || ! -f mise.toml || ! -f .nvmrc ]]; then
	printf 'Expected an independent application checkout with mise.toml and .nvmrc.\n' >&2
	exit 1
fi

mise trust
mise install
mise exec -- node --version

yarn_version=$(mise exec -- node -p 'require("./package.json").packageManager.split("@")[1].split("+")[0]')
mise use --global "npm:yarn@$yarn_version"
mise exec -- yarn install --frozen-lockfile
mise reshim

sudo ln -sf "$HOME/.local/bin/mise" /usr/local/bin/mise
for tool in node npm npx yarn yarnpkg aws; do
	shim="$HOME/.local/share/mise/shims/$tool"
	if [[ ! -e "$shim" ]]; then
		printf 'Missing mise shim: %s\n' "$tool" >&2
		exit 1
	fi
	sudo ln -sf "$shim" "/usr/local/bin/$tool"
done

ln -sfn "$PWD" "$HOME/project"
touch "$HOME/.manage-frontend-setup-complete"
printf 'Application dependencies installed. No application services were started.\n'
