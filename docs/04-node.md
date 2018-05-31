# To use node and express for the server

## Context

It's not intended for this app to have a significant server side component, and will instead directly send calls from the frontend to a service layer. This service layer will be discussed in its own project, but presently comprises solely of [members data APO](https://github.com/guardian/members-data-api) which is the same backend which currently provides account management functionality.

## Decision

The backend for this app will have two responsibiliies. Firstly, it will act as a proxy for calls to the service layer. Secondly, it will provide server side rendering capabilities to improve user experience.
