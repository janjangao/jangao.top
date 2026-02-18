import { Link } from "next-view-transitions";
import { IconArrowNarrowRight, IconTags } from "@tabler/icons-react";
import { getMeta } from "@/common/get-page-meta";

import type { Filter } from "@/common/get-page-meta";

type Props = {
    route: string;
    showViewAllButton?: boolean;
} & Filter;

export function formatDate(date?: string | Date) {
    if (!date) return "";
    const dateObj = typeof date === "string" ? new Date(date) : date;

    return dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export default async function Posts(
    { route, showViewAllButton, ...restFilter }: Props,
) {
    if (!route) return null;

    const items = await getMeta(route, restFilter);
    if (!items || items.length === 0) return null;

    return (
        <div className="space-y-6 not-prose">
            {items.map((post) => {
                return (
                    <div key={post.route} className="flex flex-wrap">
                        <div className="w-[calc(100%-100px)]">
                            <div className="font-bold">
                                <Link
                                    href={post.route}
                                    className="hover:underline"
                                >
                                    {post.title}
                                </Link>
                            </div>
                            <div className="flex gap-1 text-sm">
                                <IconTags className="w-4 min-w-4 -translate-y-0.5 text-[lab(48.496%_0_0)]" />
                                <div className="flex flex-wrap gap-x-1">
                                    {post.frontMatter?.tags?.map(
                                        (tagName: string, index: number) => {
                                            return (
                                                <Link
                                                    key={tagName}
                                                    href={`/tags/${tagName}`}
                                                    className="text-sm text-[lab(48.496%_0_0)] hover:underline"
                                                >
                                                    <span>
                                                        {tagName}
                                                        {index <
                                                                post.frontMatter
                                                                        .tags
                                                                        .length -
                                                                    1 && ", "}
                                                    </span>
                                                </Link>
                                            );
                                        },
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="w-[100px] text-right">
                            <div className="text-sm text-muted-foreground pt-1">
                                <div>
                                    {formatDate(post.frontMatter.date)}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

            {showViewAllButton === true &&
                (
                    <Link
                        href="/posts"
                        className="flex gap-1 items-center hover:underline"
                    >
                        View all posts <IconArrowNarrowRight className="w-4" />
                    </Link>
                )}
        </div>
    );
}
