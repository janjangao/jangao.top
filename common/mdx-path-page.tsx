import { generateStaticParamsFor, importPage } from "nextra/pages";

import type { $NextraMetadata, Heading } from "nextra";

type PageParams = {
  mdxPath?: string[]
}

type PageProps = {
  params: Promise<PageParams>
}

function withBase(baseSegments: string[], mdxPath?: string[]) {
  return [...baseSegments, ...(mdxPath ?? [])];
}

export function createGenerateStaticParams(baseSegments: string[]) {
  const gen = generateStaticParamsFor("mdxPath");
  return async () => {
    const all = await gen();

    return all
      .filter((p: any) => {
        const segs: string[] = p.mdxPath ?? [];
        if (segs.length < baseSegments.length) return false;
        return baseSegments.every((s, i) => segs[i] === s);
      })
      .map((p: any) => ({
        mdxPath: (p.mdxPath ?? []).slice(baseSegments.length)
      }));
  };
}

export function createGenerateMetadata(baseSegments: string[]) {
  return async (props: PageProps) => {
    const params = await props.params;

    if (baseSegments.length === 0 && params.mdxPath?.[0]?.startsWith('.')) return {}


    const { metadata } = await importPage(withBase(baseSegments, params.mdxPath));
    return metadata;
  };
}

export type Wrapper = React.ComponentType<{
  children: React.ReactNode;
  toc?: Heading[];
  metadata?: $NextraMetadata;
  sourceCode?: string;
}>

export function createPage(baseSegments: string[], Wrapper?: Wrapper) {
  return async function Page(props: PageProps) {
    const params = await props.params;

    if (baseSegments.length === 0 && params.mdxPath?.[0]?.startsWith('.')) return null;

    const { default: MDXContent, toc, metadata, sourceCode } = await importPage(
      withBase(baseSegments, params.mdxPath)
    );

    return Wrapper ? (
      <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
        <MDXContent {...props} params={params} />
      </Wrapper>
    ) : <MDXContent {...props} params={params} />;
  };
}

export default function createMdxPathPage(baseSegments: string[], Wrapper?: Wrapper) {
  const generateStaticParams = createGenerateStaticParams(baseSegments);
  const generateMetadata = createGenerateMetadata(baseSegments);
  const Page = createPage(baseSegments, Wrapper);

  return {
    generateStaticParams,
    generateMetadata,
    Page
  }
}
