#!/usr/bin/env bash

# This script creates a devcontainer from a clone of the repo, ready
# for use with vscode.
# Creating from within vscode seems to fail as it expects you to mount the same branch.

set -euo pipefail

if [[ $# -gt 1 || "${1:-}" == --help ]]; then
	printf 'Usage: bash start-vscode.sh [application-branch]\n'
	printf 'Defaults to main on first creation; existing checkouts keep their branch and work.\n'
	exit 0
fi

cd "$(dirname "${BASH_SOURCE[0]}")"

for tool in docker git mise node devcontainer; do
	if ! command -v "$tool" >/dev/null; then
		printf 'Missing command: %s\n' "$tool" >&2
		if [[ "$tool" == devcontainer ]]; then
			printf 'Install the Dev Containers CLI with: npm install -g @devcontainers/cli\n' >&2
		fi
		exit 1
	fi
done

branch="${1:-main}"
git check-ref-format --branch "$branch" >/dev/null
docker info >/dev/null
mise exec -- devenv generate

config="$PWD/.devcontainer/user/devcontainer.json"
volume=manage-frontend-devcontainer-vscode-sources
container=manage-frontend-devcontainer

if docker container inspect "$container" >/dev/null 2>&1; then
	existing_config=$(docker inspect "$container" --format '{{index .Config.Labels "devcontainer.config_file"}}')
	if [[ "$existing_config" != "$config" ]]; then
		printf '%s already exists and was not created by this launcher. Reuse it or remove only that container after saving your work.\n' "$container" >&2
		exit 1
	fi
fi

image=$(node -p 'require("./.devcontainer/user/devcontainer.json").image')

# The clone runs inside Docker. No host files, credentials, or Git objects are mounted.
docker run --rm --user root \
	--mount "source=$volume,target=/workspaces/manage-frontend,type=volume" \
	--entrypoint bash "$image" -euo pipefail -c '
sudo chown vscode:vscode /workspaces/manage-frontend
exec sudo -u vscode bash -euo pipefail -c '\''
cd /workspaces/manage-frontend
if [[ -d .git ]]; then
	test ! -L .git
	test "$(git rev-parse --show-toplevel)" = "$PWD"
	test "$(git remote get-url origin)" = https://github.com/guardian/manage-frontend.git
	test ! -e .git/objects/info/alternates
	printf "Reusing existing checkout on branch %s; requested branch applies only to a new clone.\n" "$(git branch --show-current)"
else
	git clone --branch "$1" -- https://github.com/guardian/manage-frontend.git .
fi
'\'' clone "$1"
' clone "$branch"

devcontainer up --workspace-folder "$PWD" --config "$config" \
	--mount-workspace-git-root false

docker exec --user vscode "$container" \
	test -f /home/vscode/.manage-frontend-setup-complete

printf '\nIn VS Code, run Dev Containers: Attach to Running Container...\n'
printf 'Select %s, then open /home/vscode/project.\n' "$container"
printf 'Source volume: %s. Do not delete it unless you intend to delete the checkout and all unpushed work.\n' "$volume"
