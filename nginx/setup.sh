#!/usr/bin/env bash

set -euo pipefail

if [[ "$(uname -s)" != Darwin ]]; then
	printf 'This host setup currently supports macOS only.\n' >&2
	exit 1
fi

if ! command -v dev-nginx >/dev/null; then
	printf 'Install dev-nginx first: brew install guardian/devtools/dev-nginx\n' >&2
	exit 1
fi

cd "$(dirname "${BASH_SOURCE[0]}")"

for domain in manage.thegulocal.com profile.thegulocal.com members-data-api.thegulocal.com; do
	dev-nginx add-to-hosts-file "$domain"
	dev-nginx setup-cert "$domain"
done

for config in manage-frontend.conf identity-frontend-CODE-fallback.conf members-data-api-CODE-fallback.conf; do
	dev-nginx link-config "$PWD/$config"
done

dev-nginx restart-nginx
