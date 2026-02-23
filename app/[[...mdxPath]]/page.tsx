import createMdxPathPage from "@/common/mdx-path-page";

import { useMDXComponents as getMDXComponents } from '@/mdx-components'

const Wrapper = getMDXComponents().wrapper

const BASE: string[] = [];

export const { generateStaticParams, generateMetadata, Page } = createMdxPathPage(BASE, Wrapper);
export default Page;