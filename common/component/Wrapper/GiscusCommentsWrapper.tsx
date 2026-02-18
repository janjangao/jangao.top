"use client";

import Giscus from "@giscus/react";

import type { GiscusProps } from "@giscus/react";
import type { WrapperProps } from "./Type";

export type ViewProps = {
    children: React.ReactNode;
    props: GiscusProps;
    enable?: boolean;
};

export type Props = WrapperProps<{
    enableComment?: boolean;
}>;

export function GiscusCommentsView(
    { children, props, enable }: ViewProps,
) {
    return (
        <>
            {children}
            {enable && <Giscus {...props} />}
        </>
    );
}

export function createGiscusCommentsWrapper(props: GiscusProps) {
    return (
        { children, metadata }: Props,
    ) => {
        return (
            <GiscusCommentsView props={props} enable={metadata?.enableComment}>
                {children}
            </GiscusCommentsView>
        );
    };
}
