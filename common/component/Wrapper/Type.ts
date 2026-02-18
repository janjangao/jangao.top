import type { $NextraMetadata, Heading } from "nextra";

export type WrapperProps<MetaDataType = unknown> = {
    children: React.ReactNode;
    metadata?: $NextraMetadata & MetaDataType;
    toc?: Heading[];
    sourceCode?: string;
};