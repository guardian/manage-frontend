# Looking for the devcontainer setup? It's on the `devcontainer` branch

To set up a dev container, switch to the
[`devcontainer` branch](https://github.com/guardian/manage-frontend/tree/devcontainer)
and follow its setup instructions.

Save your work by committing or stashing any local changes, then switch branches:

```bash
git fetch origin
git switch devcontainer
```

Follow that branch's README for host setup and container creation in **IntelliJ
or VS Code**. The application sources are cloned independently inside the
container, not mounted from your host checkout.

This directory on `main` is only a signpost to that setup. Maintain container
configuration on `devcontainer`, rather than adding a second setup here.
