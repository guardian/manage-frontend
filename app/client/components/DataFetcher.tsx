import { GenericErrorScreen } from "./genericErrorScreen";
import React, { Suspense } from "react";
import SpinLoader from "./SpinLoader";
import {QueryErrorBoundary} from "react-fetching-library";
import {allErrorStatuses} from "../fetchClient";

interface DataFetcherProps {
  loadingMessage: string;
  children: JSX.Element | JSX.Element[] | null;
}

const DataFetcher = ({
  loadingMessage,
  children
}: DataFetcherProps): JSX.Element => (
  <QueryErrorBoundary statuses={allErrorStatuses} fallback={() => <GenericErrorScreen loggingMessage={false} />}>
    <Suspense fallback={<SpinLoader loadingMessage={loadingMessage} />}>
      {children}
    </Suspense>
  </QueryErrorBoundary>
);

export default DataFetcher;
