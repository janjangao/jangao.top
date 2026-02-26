export * from "./GiscusCommentsWrapper";

import type { $NextraMetadata, Heading } from "nextra";

export type WrapperProps = {
    children: React.ReactNode;
    metadata?: $NextraMetadata;
    toc?: Heading[];
    sourceCode?: string;
};

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
