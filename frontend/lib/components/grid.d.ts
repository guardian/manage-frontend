/// <reference types="react" />
import React from 'react';
export interface ContainerProps {
    readonly children: ReadonlyArray<JSX.Element> | JSX.Element;
}
export declare const Container: React.SFC<ContainerProps>;
