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
bash start-vscode.sh
# Or select an application branch for a new checkout:
bash start-vscode.sh jd/my-application-branch
```

The script clones the application into the source volume if it is empty,
before starting the devcontainer.
Existing checkouts keep their branch and uncommitted work.

1. Open a new VS Code window (**File → New Window**), without opening the
   launcher folder.
2. Press **Shift–Command–P** and choose
   **Dev Containers: Attach to Running Container…**.
3. Select `manage-frontend-devcontainer`. The first connection installs VS Code
   tooling inside the container and can take a few minutes.
4. Once attached, choose **File → Open Folder…** and open `/home/vscode/project`.

Do not use the clone wizard or the launcher's **Open in Container** entry in
Remote Explorer; neither uses this attachment workflow.

You can alternatively connect to an IntelliJ created container - VSCode
will add the relevant programs to the container automatically.

## Opening the existing container

Use the recent projects menu in either IntelliJ or VSCode to reopen the project.
The container will automatically be started if necessary.

## Running manage-frontend in the container

1. Add fresh "Local Development" membership Janus credentials inside the container.
2. Run `yarn watch` in the container's application checkout.
3. Open **https://manage.thegulocal.com/** in your host browser.

## Troubleshooting

### VS Code reports no devcontainer configuration or asks to add one

You have opened the launcher or application folder through the wrong workflow.
Open a new window and use **Shift–Command–P → Dev Containers: Attach to Running
Container…**, then open `/home/vscode/project` inside it. Do not select
**Reopen in Container** or Remote Explorer's **Open in Container** launcher entry.

### The container is missing from VS Code's attach list

Ensure Docker Desktop is running. If the container exists but is stopped, run
`docker start manage-frontend-devcontainer` on the host, then try attaching again.
If it has been deleted, recreate it with `bash start-vscode.sh`.
An existing source volume retains its checkout and unpushed work; do not delete
it to resolve an attachment problem.

### Setup says complete, but tools or dependencies are missing

The pinned devenv version can print `Setup complete` after a command failed.
Inspect `/var/log/on-create.log` (certificate trust) and
`/var/log/post-create.log` (tools and dependencies) for `Errored!` and the preceding error. After
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
host. Check the IDE's forwarded ports and ensure container port 9234 is forwarded
to host port 9234, where nginx expects it. Stop any native webpack server using
that port. In VS Code, use the **Ports** panel to inspect or add the forwarding.
If the port is missing, forward it or recreate using the current launcher
configuration.

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
