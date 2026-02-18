"use client";

import React from "react";

import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { Button } from "nextra/components";
import { IconArrowBack, IconPoint } from "@tabler/icons-react";

import type { WrapperProps } from "./Type";

export type Props = WrapperProps<{
    author?: string;
    date?: string;
}>;

export function formatDate(date: string | Date) {
    if (!date) return "";
    const dateObj = typeof date === "string" ? new Date(date) : date;

    return dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export function GoBack({ children }: { children: React.ReactNode | string }) {
    const router = useTransitionRouter();

    return (
        <Button
            onClick={router.back}
            className="hover:underline no-underline flex items-center gap-1"
        >
            <IconArrowBack className="w-4" />
            {children}
        </Button>
    );
}

export default function PhucbmWrapper({ children, metadata }: Props) {
    const segments = usePathname().split("/");
    const hasGoBack = segments.length > 2;

    const metaComponents = [
        hasGoBack && <GoBack>Back to Previous</GoBack>,
        metadata?.author && <div>{metadata.author}</div>,
        metadata?.date && <div>{formatDate(metadata.date)}</div>,
        metadata?.date &&metadata?.readingTime && <div>{metadata.readingTime.text}</div>,
    ].filter(Boolean).flatMap((item, index) =>
        index === 0
            ? [<React.Fragment key={`item-${index}`}>{item}</React.Fragment>]
            : [
                <IconPoint key={`sep-${index}`} className="w-3" />,
                <React.Fragment key={`item-${index}`}>{item}</React.Fragment>,
            ]
    );
    return (
        <>
            {metadata?.title && <h1>{metadata.title}</h1>}
            {metaComponents.length > 0 && (
                <div className="flex items-center gap-4 text-sm mb-6">
                    {metaComponents}
                </div>
            )}
            {children}
        </>
    );
}
