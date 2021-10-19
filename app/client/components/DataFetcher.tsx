import { GenericErrorScreen } from "./genericErrorScreen";
import React, { Suspense } from "react";
import SpinLoader from "./SpinLoader";
import {QueryErrorBoundary} from "react-fetching-library";
import {allErrorStatuses} from "../fetchClient";

interface DataFetcherProps {
  loadingMessage: string;
  ErrorComponent?: JSX.Element;
  children: JSX.Element | JSX.Element[] | null;
  spinnerScale?: number;
}

function renderErrorComponent(ErrorComponent: JSX.Element | undefined): () => JSX.Element {
  if(ErrorComponent) {
    return () => ErrorComponent;
  } else {
    return () => <GenericErrorScreen loggingMessage={false} />
  }
}

const DataFetcher = ({
  loadingMessage,
  ErrorComponent,
  children,
  spinnerScale
}: DataFetcherProps) => (
  <QueryErrorBoundary statuses={allErrorStatuses} fallback={renderErrorComponent(ErrorComponent)}>
    <Suspense fallback={<SpinLoader spinnerScale={spinnerScale} loadingMessage={loadingMessage} />}>
      {children}
    </Suspense>
  </QueryErrorBoundary>
);

export default DataFetcher;
