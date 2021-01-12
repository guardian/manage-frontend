# To submit all forms via server-side

## Context

Forms that do not require a login to access could be submitted directly to the service layer and bypass the server-side of this project. However, there are trade-offs with that decision.

Benefits of not bypassing the server side:

- Is consistent with manage-frontend’s standard approach
- Lambda endpoints remain secret
- Can use API key to validate requests at API Gateway level
- Cheaper in case of DDoS attack
- Easier to debug manage-frontend's logs VS API gateway's log
- Allows for more flexibility in case requirements change

Benefits of bypassing the server-side:

- Simpler to maintain as there are fewer parts
- Less latency due to 1 less hop (relatively negligible)

## Decision

We will submit all forms through the server-side of this project.

## Status

Accepted
