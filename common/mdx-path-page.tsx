import { generateStaticParamsFor, importPage } from "nextra/pages";

import type { $NextraMetadata, Heading } from "nextra";

type PageParams = {
  [key: string]: string[];
};

type PageProps = {
  params: Promise<PageParams>;
};

const IGNORE_PATH_PREFIXES = ["."];

function isIgnoredPath(paths?: string[]) {
  return (
    paths &&
    IGNORE_PATH_PREFIXES.some((prefix) =>
      paths.some((path) => path.startsWith(prefix)),
    )
  );
}

function parseBase(base: string) {
  return base.split("/").filter(Boolean);
}

function withBase(bases: string[], paths?: string[]) {
  return [...bases, ...(paths ?? [])];
}

export function createGenerateStaticParams(
  bases: string[],
  segmentKey: string,
) {
  const gen = generateStaticParamsFor(segmentKey);
  return async () => {
    const all = await gen();
    return all
      .filter((p: any) => {
        const segs: string[] = p[segmentKey] ?? [];
        if (segs.length < bases.length) return false;
        return bases.every((s, i) => segs[i] === s);
      })
      .map((p: any) => ({
        [segmentKey]: (p[segmentKey] ?? []).slice(bases.length),
      }));
  };
}

export function createGenerateMetadata(bases: string[], segmentKey: string) {
  return async (props: PageProps) => {
    const params = await props.params;
    if (isIgnoredPath(params[segmentKey])) return null;

    const { metadata } = await importPage(withBase(bases, params[segmentKey]));
    return metadata;
  };
}

export type Wrapper = React.ComponentType<{
  children: React.ReactNode;
  toc?: Heading[];
  metadata?: $NextraMetadata;
  sourceCode?: string;
}>;

export function createPage(
  bases: string[],
  segmentKey: string,
  Wrapper?: Wrapper,
) {
  return async function Page(props: PageProps) {
    const params = await props.params;
    if (isIgnoredPath(params[segmentKey])) return null;

    const {
      default: MDXContent,
      toc,
      metadata,
      sourceCode,
    } = await importPage(withBase(bases, params[segmentKey]));

    return Wrapper ? (
      <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
        <MDXContent {...props} params={params} />
      </Wrapper>
    ) : (
      <MDXContent {...props} params={params} />
    );
  };
}

export default function createMdxPathPage(
  base: string,
  segmentKey: string,
  Wrapper?: Wrapper,
) {
  const bases = parseBase(base);
  const generateStaticParams = createGenerateStaticParams(bases, segmentKey);
  const generateMetadata = createGenerateMetadata(bases, segmentKey);
  const Page = createPage(bases, segmentKey, Wrapper);

  return {
    generateStaticParams,
    generateMetadata,
    Page,
  };
}
