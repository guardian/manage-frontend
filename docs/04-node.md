# To use Node and Express for the server

## Context

It's not intended for this app to have a significant server-side component, instead it will directly send calls from the front end to a service layer. This service layer will be discussed in its own project, but presently comprises solely of [members data API](https://github.com/guardian/members-data-api), the same back end that currently provides account management functionality.

## Decision

The back end for this app will have two responsibilities. Firstly, it will act as a proxy for calls to the service layer. Secondly, it will provide server side rendering capabilities to improve user experience.

## Status

Accepted
