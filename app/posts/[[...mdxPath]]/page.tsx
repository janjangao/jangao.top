import createMdxPathPage from "@/common/mdx-path-page";
import { useMDXComponents } from "@/mdx-components";

const Wrapper = useMDXComponents().wrapper;

export const { generateStaticParams, generateMetadata, Page } =
  createMdxPathPage("posts", "mdxPath", Wrapper);
export default Page;
