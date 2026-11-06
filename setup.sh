#!/usr/bin/env bash

# This script gets all the basic requirements installed on your host machine, ready
# to create the container in your IDE.

set -euo pipefail

confirm() {
	local answer
	read -r -p "$1 [y/N] " answer
	[[ "$answer" == y || "$answer" == Y ]]
}

if [[ "$(uname -s)" != Darwin || -f /.dockerenv ]]; then
	printf 'Run this script on your macOS host, not inside the container.\n' >&2
	exit 1
fi

cd "$(dirname "${BASH_SOURCE[0]}")"

if ! command -v brew >/dev/null; then
	printf 'Install Homebrew from https://brew.sh, then rerun bash setup.sh.\n' >&2
	exit 1
fi

export PATH="$(brew --prefix)/bin:$(brew --prefix)/sbin:$PATH"

missing=()
for tool in mise nginx mkcert dev-nginx; do
	if ! command -v "$tool" >/dev/null; then
		if [[ "$tool" == dev-nginx ]]; then
			missing+=("guardian/devtools/dev-nginx")
		else
			missing+=("$tool")
		fi
	fi
done

if [[ ${#missing[@]} -gt 0 ]]; then
	printf 'Missing Homebrew packages: %s\n' "${missing[*]}"
	if ! confirm 'Install these packages with Homebrew?'; then
		printf 'Prerequisites not installed. Install them before rerunning setup.\n' >&2
		exit 1
	fi
	brew install "${missing[@]}"
fi

if ! command -v docker >/dev/null || ! docker info >/dev/null 2>&1; then
	printf 'Install/start Docker Desktop, wait until it is ready, then rerun bash setup.sh.\n' >&2
	exit 1
fi

printf 'This will trust this checkout'\''s mise configuration and install its pinned devenv tool.\n'
if ! confirm 'Continue?'; then
	printf 'Setup cancelled.\n' >&2
	exit 1
fi
mise trust
mise install
mise exec -- devenv generate

printf '\nReview nginx/*.conf first, especially if other projects use these domains.\n'
if confirm 'Configure host entries/certificates/nginx and restart nginx?'; then
	bash nginx/setup.sh
else
	printf 'Skipped nginx setup; existing nginx configuration must be running.\n'
fi

ca="$HOME/Library/Application Support/mkcert/rootCA.pem"
if [[ ! -f "$ca" ]]; then
	printf 'Public CA certificate missing: %s\n' "$ca" >&2
	printf 'Set up nginx certificates, or update the CA mount in .devcontainer/escapehatch.json and regenerate.\n' >&2
	exit 1
fi

mise exec -- devenv check
printf '\nLauncher prepared. In IntelliJ open .devcontainer/user/devcontainer.json\n'
printf 'and choose Create Dev Container and Clone Sources. Follow README.md for repository/branch selection.\n'
