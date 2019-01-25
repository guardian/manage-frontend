# To separate account management functionality that pertains to any paid product from identity

## Context

Presently all account management functionality is accessed through profile.theguardian.com, backed by the identity project within [frontend](https://github.com/frontend) and the [identity-frontend](https://github.com/guardian/identity-frontend) projects.

The code relating to account management lives in the front end, and is occasionally referred to as _manage my account_ or _mma_. It is an odd hybrid of hand made SPA and server-side template. Adding functionality is difficult, and testing new functionality is time consuming.

This cannot handle the complexity of subscription management, which is instead handled by [subscriptions-frontend](https://github.com/guardian/subscriptions-frontend).

Each of Membership, Contributions and Subscriptions have a page within this, and all code around this makes the assumption that no more than one of each category can be held by a user. For subscriptions, there is no such restriction on purchase.

Basic functionality is missing from the user management pages.

A great deal of account management functionality also lives within Salesforce, and there is significant duplication of effort here.

## Decision

We will develop a new front end to provide access to user management functionality. Relevant parts will be accesible using Salesforce authentication to minimise duplication of systems.

## Status

Accepted
