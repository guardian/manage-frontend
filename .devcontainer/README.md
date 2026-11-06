# Working on the devcontainer setup

For creating and using the container, follow the [setup guide](../README.md).

## Change the shared configuration

1. Create a working branch from `devcontainer`, not `main`.
2. Edit `devenv.yaml` for modules, ports, environment variables, and setup commands.
   Edit `escapehatch.json` for the public CA mount and certificate trust setup.
3. From the launcher repository root, regenerate and check:

   ```bash
   mise exec -- devenv generate
   mise exec -- devenv check
   ```

4. Test with the IDE creation method described in the setup guide. Recreate the
   container when changing ports, mounts, or environment; preserve the source
   volume and any unpushed work.
5. Commit the source configuration and generated `shared/devcontainer.json`.
   Target your PR at `devcontainer`.

Do not hand-edit generated JSON. Application dependency setup lives in
`script/setup-devcontainer.sh` on the application branch; changes to that script
belong in a separate PR targeting `main`. To test before merging, select that
application working branch when creating the container.

## Add personal IDE preferences

Put personal extensions or dotfiles settings in
`~/.config/devenv/devenv.yaml`, then run `mise exec -- devenv generate`.
Use the resulting `user/devcontainer.json`, which is ignored by Git.
Do not edit it directly: generation overwrites it.

See Guardian devenv's [configuration reference](https://github.com/guardian/devenv/blob/main/docs/configuration.md)
for supported settings.
