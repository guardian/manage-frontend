import React from "react";
import { Spinner } from "./spinner";
import { WithStandardTopMargin } from "./WithStandardTopMargin";

interface SpinLoaderProps {
  readonly loadingMessage: string;
  readonly inline?: true;
  readonly spinnerScale?: number;
}

export default function SpinLoader({
  loadingMessage,
  inline,
  spinnerScale
}: SpinLoaderProps) {
  return inline ? (
    <Spinner
      loadingMessage={loadingMessage}
      inline={inline}
      scale={spinnerScale}
    />
  ) : (
    <WithStandardTopMargin>
      <Spinner loadingMessage={loadingMessage} />
    </WithStandardTopMargin>
  );
}
