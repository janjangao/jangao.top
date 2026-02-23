import createMdxPathPage from "@/common/mdx-path-page";
import BlogWrapper from "./_components/BlogWrapper";

import { useMDXComponents as getMDXComponents } from '@/mdx-components'

const Wrapper = getMDXComponents().wrapper

const BASE = ["posts"];

export const { generateStaticParams, generateMetadata, Page } =
    createMdxPathPage(BASE, Wrapper);
export default Page;
