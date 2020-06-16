#!/bin/bash
#Clean up legacy config
NGINX_HOME=$(dev-nginx locate-nginx)
sudo rm -f $NGINX_HOME/sites-enabled/manage-frontend.conf

# Setup Nginx proxies for local development with valid SSL
cd $( dirname "${BASH_SOURCE[0]}" )

dev-nginx add-to-hosts-file manage.thegulocal.com
dev-nginx setup-cert manage.thegulocal.com
dev-nginx link-config $(pwd)/manage-frontend.conf

dev-nginx add-to-hosts-file profile.thegulocal.com
dev-nginx setup-cert profile.thegulocal.com
dev-nginx link-config $(pwd)/identity-frontend-CODE-fallback.conf

dev-nginx add-to-hosts-file members-data-api.thegulocal.com
dev-nginx setup-cert members-data-api.thegulocal.com
dev-nginx link-config $(pwd)/members-data-api-CODE-fallback.conf

dev-nginx restart-nginx
