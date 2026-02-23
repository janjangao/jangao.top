// import { useMDXComponents as getThemeComponents } from "nextra-theme-blog";
import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'
import Posts from "./component/Posts";
import Tags from "./component/Tags";

const themeComponents = getThemeComponents({
  Posts: Posts,
  Tags: Tags,
});

export function useMDXComponents(
  components?: Record<string, React.ComponentType<any>>,
) {
  return {
    ...themeComponents,
    ...components,
  };
}
