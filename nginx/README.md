# Setup Nginx with valid TLS certificate in DEV

1. Old nginx configuration files were in `/usr/local/etc/nginx/sites-enabled`, however the new
   onese end up in `/usr/local/etc/nginx/servers`, so backup and remove `site-enabled`
1. Install [dev-nginx](https://github.com/guardian/dev-nginx)
   ```bash
   brew tap "guardian/devtools"
   brew install dev-nginx
   ```
1. Add the following to `/etc/hosts`
   ```
   127.0.0.1   manage.thegulocal.com               # https://github.com/guardian/manage-frontend
   127.0.0.1   profile.thegulocal.com              # https://github.com/guardian/identity-frontend
   127.0.0.1   members-data-api.thegulocal.com     # https://github.com/guardian/members-data-api
   ```
1. Run `setup.sh`
1. Enter sudo password
1. Check `/usr/local/etc/nginx/servers/manage-frontend.conf` exists
1. Start nginx with `sudo nginx`
