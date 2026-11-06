# Manage Frontend devcontainer setup

It's important to develop inside a devcontainer as it means that
untrusted dependencies can't compromise your whole computer, also
any agents you use don't have access to anything unexpected.

In this repo, the devcontainer setup is in a separate branch, to
reduce confusion and speed things up.  Use this branch to create a container, then clone the main branch
inside it.

## Host setup

You need [Homebrew](https://brew.sh), Docker Desktop running, and IntelliJ or
VS Code with Dev Containers support.

Once you have checked this branch out on the host, run `bash setup.sh` to
install the basic tooling needed outside the container.

## Creating the container
### IntelliJ

Open `.devcontainer/user/devcontainer.json` in IntelliJ and choose
**Create Dev Container and Clone Sources**, (not Mount Sources). Enter
`https://github.com/guardian/manage-frontend.git` and select **`main`**.

**Wait for tools and application dependencies to finish installing.**
This may take a couple of minutes - IntelliJ
will open the project before setup has completed; wait for
`Application dependencies installed` in the setup log before starting work.

### VS Code

You also need host Node.js and the Dev Containers CLI
(`npm install -g @devcontainers/cli`). From this launcher checkout:

```bash
bash start-vscode.sh <optional branch name>
```

In VS Code, run **Dev Containers: Attach to Running Container…**, select
`manage-frontend-devcontainer`, and open `/home/vscode/project`.
Do not use the clone wizard: it looks for configuration on the application
branch rather than in this launcher checkout.

You can alternatively connect to an IntelliJ created container - VSCode
will add the relevant programs to the container automatically.

## Running manage-frontend in the container

1. Add fresh **read-only Janus credentials** inside the container for the
   `membership` profile, including the session token.
2. Run `yarn watch` in the container's application checkout.
3. Open **https://manage.thegulocal.com/** in your host browser.

## Troubleshooting

### Setup says complete, but tools or dependencies are missing

The pinned devenv version can print `Setup complete` after a command failed.
Inspect `/var/log/post-create.log` for `Errored!` and the preceding error. After
resolving it, retry inside the container:

```bash
bash script/setup-devcontainer.sh
```

Check in the container terminal:

```bash
whoami
test -f "$HOME/.manage-frontend-setup-complete" && echo "Dependency setup completed"
node --version
yarn --version
aws --version
```

The user should be `vscode`. Missing `mise.toml` or the setup script usually
means the wrong application branch was cloned.

### The app is unreachable or nginx returns 502

Check that `yarn watch` is running in the container and nginx is running on the
host. On the host, verify the port mapping:

```bash
docker port manage-frontend-devcontainer 9234
```

Expect `127.0.0.1:9234`. Stop any native webpack server using that port.
If the mapping is missing, rebuild using the current launcher configuration.

### Certificate or connection errors

If host setup reports a missing public CA certificate, check
`~/Library/Application Support/mkcert/rootCA.pem`. Run `bash setup.sh` and approve
nginx setup to create certificates if they have not been set up. If your existing
nginx certificates use a CA elsewhere, change the mount source in
`.devcontainer/escapehatch.json`, then rerun setup. Never mount `rootCA-key.pem`
or the whole CA directory; only the public certificate is mounted read-only
and trusted automatically during container creation.

From inside the container, test host nginx without sending an HTTP request:

```bash
openssl s_client -brief -verify_return_error \
  -verify_hostname profile.thegulocal.com \
  -connect profile.thegulocal.com:443 \
  -servername profile.thegulocal.com </dev/null
```

Expect `Verification: OK`. Repeat with `members-data-api.thegulocal.com` in all
three hostname arguments. Connection refusal or EOF can mean host nginx is not
running. Certificate verification errors mean the mounted CA may not match the
nginx certificates; check its path and rebuild after correcting it or rotating
the CA. Do not disable TLS verification.

### AWS credentials have expired

Replace the in-container Janus credentials with fresh dedicated read-only
credentials, including the session token. Read-only permissions may prevent
features that write data; do not substitute more privileged host credentials.

### Social login redirects to CODE

Use username/password login instead. Social login through the CODE proxy has
known limitations.

### Git reports dubious ownership or the terminal uses root

Reconnect through **Remote Development → Dev Containers**, not a
`/$docker.ij/...` filesystem path or ordinary Docker console. The intended user
is `vscode`; do not hide the mismatch with `safe.directory` exceptions.

## Developing the launcher

Base launcher working branches on `devcontainer` and target PRs at
`devcontainer`, not `main`. Application changes belong on `main`.

Edit the YAML or escape hatch, then regenerate:

```bash
mise exec -- devenv generate
mise exec -- devenv check
```

Commit `shared/devcontainer.json`; keep `user/` ignored.