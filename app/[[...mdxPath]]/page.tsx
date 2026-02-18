import createMdxPathPage from "@/common/mdx-path-page";

const BASE: string[] = [];

export const { generateStaticParams, generateMetadata, Page } = createMdxPathPage(BASE);
export default Page;