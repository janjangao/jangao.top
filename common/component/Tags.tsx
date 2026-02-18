import { Link } from "next-view-transitions";
import { getTagCountMap } from "@/common/get-page-meta";

type Props = {
    route: string;
};

export default async function Tags({ route }: Props) {
    if (!route) return null;

    const tagCountMap = await getTagCountMap(route);
    return (
        <div className="not-prose flex flex-wrap gap-1">
            {Object.entries(tagCountMap).map(([tag, count]) => (
                <Link
                    key={tag}
                    href={`/tags/${tag}`}
                    className="inline-flex items-center rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs text-zinc-900 transition-colors hover:bg-zinc-100 hover:border-zinc-400"
                >
                    {tag} <span className="opacity-50">({count})</span>
                </Link>
            ))}
        </div>
    );
}
