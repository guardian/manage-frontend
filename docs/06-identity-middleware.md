# Identity Middleware

The identity middleware is responsible for controlling access to MMA.

Most routes on MMA are 'mandatory sign-in' routes, requiring the user to be
signed in to access them. For these routes, the identity middleware is responsible
for validating the user's OAuth tokens and performing an authorization code flow
if necessary.

Some routes, mostly connected to the Help Centre, are 'optional sign-in' routes.
For these routes, the identity middleware will attempt to validate the user's
OAuth tokens if they have an active Okta session, and will otherwise allow the user
to access the route in a signed-out state.

## Middleware flow

```mermaid
flowchart TD
    Start(Start) --> publicRoute{Public route?}
    publicRoute -- No --> signoutCookieSet{GU_SO cookie set?}
    signoutCookieSet --Yes--> clearCookies[Clear OAuth cookies]
    clearCookies --> performAuthMandatory(Perform authorization code flow -\n/mandatory endpoint)
    signoutCookieSet -- No --> tokensValid{OAuth and IDAPI\ncookies locally valid?}
    tokensValid -- Yes --> needServerSide{Need server-side validation?}
    needServerSide -- Yes --> serverSideValid{Server-side validation valid?}
    needServerSide -- No --> setLocalState(Set res.locals.identity)
    serverSideValid -- Yes --> setLocalState
    serverSideValid -- No --> performAuthMandatory
    setLocalState --> next(Next)
    tokensValid -- No --> performAuthMandatory
    publicRoute -- Yes --> signoutCookieSet2{GU_SO cookie set?}
    signoutCookieSet2 -- Yes --> clearCookies2[Clear OAuth cookies]
    clearCookies2 --> next
    signoutCookieSet2 -- No --> tokensValid2{OAuth and IDAPI\ncookies locally valid?}
    tokensValid2 -- Yes --> setLocalState
    tokensValid2 -- No --> guUSet{GU_GU cookie set?}
    guUSet -- No --> next
    guUSet -- Yes --> performAuthOptional(Perform authorization code flow -\n/optional endpoint)
```
