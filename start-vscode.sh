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

for tool in docker mise node devcontainer; do
	if ! command -v "$tool" >/dev/null; then
		printf 'Missing command: %s\n' "$tool" >&2
		if [[ "$tool" == devcontainer ]]; then
			printf 'Install the Dev Containers CLI with: npm install -g @devcontainers/cli\n' >&2
		fi
		exit 1
	fi
done

branch="${1:-main}"
docker info >/dev/null
mise exec -- devenv generate

config="$PWD/.devcontainer/user/devcontainer.json"
container=manage-frontend-devcontainer

if docker container inspect "$container" >/dev/null 2>&1; then
	existing_config=$(docker inspect "$container" --format '{{index .Config.Labels "devcontainer.config_file"}}')
	if [[ "$existing_config" != "$config" ]]; then
		printf '%s already exists and was not created by this launcher. Reuse it or remove only that container after saving your work.\n' "$container" >&2
		exit 1
	fi
fi

image=$(node -p 'require(process.argv[1]).image' "$config")
workspace_mount=$(node -p 'require(process.argv[1]).workspaceMount' "$config")
workspace=$(node -p 'require(process.argv[1]).workspaceFolder' "$config")

# Clone inside the source volume without mounting host files or credentials.
docker run --rm -i --user root \
	--mount "$workspace_mount" --workdir "$workspace" \
	--env "MANAGE_FRONTEND_BRANCH=$branch" \
	--entrypoint bash "$image" -euo pipefail <<'BASH'
chown vscode:vscode "$PWD"
exec sudo -u vscode --preserve-env=MANAGE_FRONTEND_BRANCH bash -euo pipefail <<'CLONE'
git check-ref-format --branch "$MANAGE_FRONTEND_BRANCH" >/dev/null
if [[ -e .git || -L .git ]]; then
	if [[ ! -d .git || -L .git ]] ||
	   [[ "$(git rev-parse --show-toplevel)" != "$PWD" ]] ||
	   [[ -e .git/objects/info/alternates ]]; then
		printf 'Expected an independent manage-frontend checkout; refusing to change this workspace.\n' >&2
		exit 1
	fi
	case "$(git remote get-url origin)" in
		https://github.com/guardian/manage-frontend.git|git@github.com:guardian/manage-frontend.git)
			;;
		*)
			printf 'Expected the guardian/manage-frontend origin over HTTPS or SSH.\n' >&2
			exit 1
			;;
	esac
	printf 'Reusing existing checkout on branch %s; requested branch applies only to a new clone.\n' "$(git branch --show-current)"
else
	git clone --branch "$MANAGE_FRONTEND_BRANCH" -- https://github.com/guardian/manage-frontend.git .
fi
CLONE
BASH

devcontainer up --workspace-folder "$PWD" --config "$config"

docker exec --user vscode "$container" \
	test -f /home/vscode/.manage-frontend-setup-complete

printf '\nIn VS Code, run Dev Containers: Attach to Running Container...\n'
printf 'Select %s, then open /home/vscode/project.\n' "$container"
printf 'Do not delete the source volume unless you intend to delete the checkout and all unpushed work.\n'
