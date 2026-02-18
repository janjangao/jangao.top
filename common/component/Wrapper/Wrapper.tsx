export * from "./GiscusCommentsWrapper";
export { default as PhucbmWrapper } from "./PhucbmWrapper";

import { useMDXComponents as getThemeComponents } from "nextra-theme-blog";

import type { $NextraMetadata, Heading } from "nextra";

export type WrapperProps = {
    children: React.ReactNode;
    metadata?: $NextraMetadata;
    toc?: Heading[];
    sourceCode?: string;
};

export const NextraBlogWrapper: React.ComponentType<WrapperProps> =
    // @ts-ignore internal component
    getThemeComponents().wrapper;

export function combineWrapper(
    Wrapers: React.ComponentType<WrapperProps>[],
): React.ComponentType<WrapperProps> {
    return (props: WrapperProps) => {
        const { children, ...restProps } = props;
        return Wrapers.reduce((children, Wrapper) => {
            return <Wrapper {...restProps}>{children}</Wrapper>;
        }, children);
    };
}
