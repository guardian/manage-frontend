# Cancellation Journey Worklog

## Objective

Redesign step 1 of the cancellation journey ("cancel reasons") and align print-product cancellation behavior:

-   Update navigation UI to numbered stepper style
-   Update page copy and CTA labels
-   Apply new cancellation reasons for print products
-   Ensure cancellation flows exist for all requested print-related products
-   Move feedback capture to step 1
-   Hide effective-date selection UI for print products
-   Refactor step-1 reason/effective-date sections to shared `Card` structure

## What Was Implemented

### 1) Step 1 UI and copy updates

In `client/components/mma/cancel/CancellationReasonSelection.tsx`:

-   Page title set to `Manage my subscription`
-   Intro copy updated:
    -   `We're sorry to see you go`
    -   `We value your feedback and review it regularly to improve our services.`
    -   Prompt asking why the user wants to cancel
-   Numbered step navigation uses `ProgressStepper` with 3 steps
-   CTA labels updated:
    -   Primary: `Continue to Cancel`
    -   Secondary: `Previous` (with left arrow icon) and navigation to `/`

### 2) New print cancellation reasons (consolidated + shuffled)

Added:

-   `client/components/mma/cancel/PrintedProductsCancellationReasons.tsx`

This file contains:

-   `printedProductsCancellationReasons` (shared print reason list)
-   `shuffledPrintedProductsCancellationReasons` (via `shuffleArray`)

Also added new reason ID in:

-   `client/components/mma/cancel/cancellationReason.ts`
    -   Added `mma_duplicate_subscription`

### 3) Product mappings and cancellation flow coverage

Updated `shared/productTypes.ts` to ensure print-related products use the shared print reasons and have cancellation config wired:

-   `homedelivery`
-   `homedeliveryplusdigital`
-   `nationaldelivery`
-   `nationaldeliveryplusdigital`
-   `voucher`
-   `voucherplusdigital`
-   `voucherobserver`
-   `digitalvoucher`
-   `digitalvoucherplusdigital`
-   `digitalvoucherobserver`
-   `guardianweekly`
-   `tierthree`
-   `observer`

All relevant entries now point to `shuffledPrintedProductsCancellationReasons` and include cancellation flow configuration consistent with the existing physical subs pattern.

### 4) Feedback moved from review step to step 1

State wiring:

-   `client/components/mma/cancel/CancellationContainer.tsx`
    -   `CancellationRouterState` now includes `cancellationFeedback?: string`

Step 1 capture and pass-through:

-   `client/components/mma/cancel/CancellationReasonSelection.tsx`
    -   Captures textarea input
    -   Passes `cancellationFeedback` in router state when continuing

Review submission behavior:

-   `client/components/mma/cancel/CancellationReasonReview.tsx`
    -   Removed embedded feedback form UI from review step
    -   On confirm/continue, submits `routerState.cancellationFeedback` if present

### 5) Conditional rendering by product type (print-only behavior)

Added helper in:

-   `client/utilities/productUtils.ts`
    -   `isPrintProduct(productType)`

Used in step 1 selection UI:

-   Feedback textarea now renders **only for print products**
-   Effective-date selection route (`ReasonPickerWithCancellationDate`) is used only when:
    -   `startPageOfferEffectiveDateOptions` is enabled
    -   product is **not** print (`!isPrintProduct(productType)`)

Result: print products do not show the "When would you like your cancellation to become effective?" box.

### 6) Card-based section refactor + CSS adjustments

In `client/components/mma/cancel/CancellationReasonSelection.tsx`:

-   Converted reasons block and effective-date block to shared `Card` structure:
    -   `Card`
    -   `Card.Header`
    -   `Card.Section`
-   Updated radio group spacing with explicit child selectors
-   Retained validation error display behavior

### 7) Arrow icon added to secondary button

In `client/components/mma/cancel/CancellationReasonSelection.tsx`:

-   Added `SvgArrowLeftStraight` to the `Previous` button
-   `iconSide="left"`

## Clarifications Applied During Implementation

-   New reasons were scoped to print products rather than all product families.
-   Shared reason arrays were consolidated into one print-focused source file.
-   Non-print reason files that were temporarily modified were reverted to their original behavior.

## Current Status

-   Core requested changes are implemented.
-   Recent lint checks on modified selection file passed.
-   Review performed: no obvious regressions found via static inspection.

## Suggested Next-Step Prompt Seed

Use this in the next step if helpful:

> We have completed the cancellation journey step-1 refactor for print products. Please continue from the current branch state. Keep the step-1 `Card` layout and copy as-is. Preserve print-only feedback box behavior and keep effective-date hidden for print products. Validate end-to-end behavior for each print product variant in `productTypes.ts` and identify any product-specific save/offer edge cases in the review and confirm steps.

## Step 2 update: print redesign implementation

In `client/components/mma/cancel/CancellationReasonReview.tsx`:

-   Added a print-only branch in `ValidatedCancellationReasonReview` using `isPrintProduct(productType)`.
-   Added a new in-file component (`PrintCancellationStepTwo`) that renders:
    -   3-step `ProgressStepper` with step 2 active, aligned to step-1 spacing conventions.
    -   Heading/content sections matching the new static layout:
        -   `Pause your subscription`
        -   `Do you need a break?` banner with `Pause subscription` CTA
        -   `Speak with an advisor` contact section
    -   Bottom CTAs:
        -   `Previous` (back to step 1)
        -   `Continue to cancel` (continues cancellation path to `../confirmed`)
-   Wired `Pause subscription` CTA to existing suspension routes via:
    -   `/suspend/${productType.urlPart}`

Also in review behavior:

-   Restored feedback box for non-print products on review step.
-   Updated feedback submission on continue to use review feedback value first, and fall back to router feedback when needed.
-   Print branch does not render the restored review feedback box.

Notes:

-   Existing non-print review/save/escalation/contact-us flow logic remains in place.
-   Existing cancellation save routes (`contact-us`, `pause-review`, `offer-review`, etc.) were left unchanged.

## Step 3 update: print final confirmation implementation

### Routing and flow

In `client/components/mma/cancel/CancellationReasonReview.tsx`:

-   Updated print step-2 primary CTA (`Continue to cancel`) to navigate to `../confirm` (instead of `../confirmed`) so users see an explicit final confirmation screen before execution.
-   State payload passed forward remains intact (`selectedReasonId`, `caseId`, credits/stops, feedback data when present), so `ExecuteCancellation` still receives required data after confirm.

### New print-only step 3 screen

In `client/components/mma/cancel/stages/ConfirmCancellation.tsx`:

-   Added print-product detection and a print-only early-return branch in `ConfirmCancellation`.
-   Added a guard redirect for invalid print route state (`selectedReasonId`/`caseId` missing) back to `../review`.
-   Added print stepper for step 3 (`[{}, {}, { isCurrentStep: true }]`).
-   Implemented print-specific copy/layout to match the supplied design:
    -   Heading:
        -   `<firstName>, thank you for supporting the Guardian since <date>. Is this really goodbye?`
    -   Body copy describing support impact and cancellation consequence
    -   Bold end-date line and benefits-retained line
-   CTA wiring:
    -   `Previous` (left arrow) -> `../review`
    -   `Confirm cancellation` -> `../confirmed`

### User data source change for name interpolation

In `client/components/mma/cancel/stages/ConfirmCancellation.tsx`:

-   Switched supporter name lookup from router state to MDAPI user data via zustand:
    -   Uses `useAccountStore().getUser()` for `firstName`
-   Removed now-unneeded `user` dependency from confirm-route state typing.

### Skeleton/loading fix for confirm transition

In `client/components/mma/MMAPageSkeleton.tsx`:

-   Fixed route matching for skeleton fallback so nested routes render the loading shell.
-   Previous behavior matched only exact paths (e.g. `/cancel/<product>`), which missed `/cancel/<product>/confirm` and could show a white flash during lazy load.
-   Updated matcher now supports nested subpaths under known MMA routes (while preserving root matching behavior).

### Step 1 structural follow-up (separation by early return)

In `client/components/mma/cancel/CancellationReasonSelection.tsx`:

-   Refactored selection flow to use explicit early return for print:
    -   `PrintReasonPicker` handles print-only step-1 UI/copy/CTA behavior.
    -   `ReasonPicker` reverts non-print flow to original/general behavior and styling.
-   Kept print-specific feedback capture in the print component path.

### Validation status

-   Lint checks were run on modified cancellation and MMA routing/skeleton files after changes.
-   No linter errors were reported on the final touched files.
