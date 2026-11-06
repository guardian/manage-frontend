# Looking for the devcontainer setup? It's on the `devcontainer` branch

To set up a dev container, switch to the
[`devcontainer` branch](https://github.com/guardian/manage-frontend/tree/devcontainer)
and follow its setup instructions.

**The launcher branch is being prepared.** These steps will be available once it
is published.

Save your work by committing or stashing any local changes, then switch branches:

```bash
git fetch origin
git switch devcontainer
```

Follow the README on that branch to create the dev container and clone the
application sources inside it.

The launcher checkout holds the container setup; your application checkout lives
separately inside a Docker volume. Do not mount host application sources or AWS
credentials into the container. Its setup instructions cover configuring dedicated
read-only temporary AWS credentials inside it.

This directory on `main` is only a signpost to that setup. Maintain container
configuration on `devcontainer`, rather than adding a second setup here.
