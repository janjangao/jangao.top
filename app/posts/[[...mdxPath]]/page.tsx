import createMdxPathPage from "@/common/mdx-path-page";
import BlogWrapper from "./_components/BlogWrapper";

const BASE = ["posts"];

export const { generateStaticParams, generateMetadata, Page } =
    createMdxPathPage(BASE, BlogWrapper);
export default Page;
