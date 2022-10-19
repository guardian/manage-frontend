# Setup Nginx with valid TLS certificate in DEV

nginx proxies CODE instances of [`identity-frontend`](https://github.com/guardian/identity-frontend) for sign-in and [`members-data-api`](https://github.com/guardian/members-data-api) **if they're not running locally**.

_Old nginx configuration files were in `/usr/local/etc/nginx/sites-enabled`, however the new
ones end up in `/usr/local/etc/nginx/servers`, so backup and remove`sites-enabled`_

1. Ensure you have [dev-nginx](https://github.com/guardian/dev-nginx) installed, if not...
   ```bash
   brew tap "guardian/devtools"
   brew install dev-nginx
   ```
1. Inside the `nginx` directory (in the manage-frontend repo - /manage-frontend/nginx), run `./setup.sh` (which creates/installs certs for manage.thegulocal.com, members-data-api.thegulocal.com and profile.thegulocal.com, then installs the nginx config for each and (re)starts nginx) - you will need to enter your machine password (for the `sudo`)
1. Check `/usr/local/etc/nginx/servers/manage-frontend.conf` exists
