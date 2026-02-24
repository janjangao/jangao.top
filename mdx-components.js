import { Image } from 'nextra/components'
import { useMDXComponents as useThemeComponents } from 'nextra-theme-docs'

const CDN_URL = process.env.NODE_ENV === 'production' ? 'https://gh-proxy.org/https://github.com/janjangao/jangao.top/blob/main/public' : ''

export function useMDXComponents(components) {
  return {
    ...useThemeComponents(components),
    img: props => {
      const customProps = {};
      if (props.src.startsWith('/')) {
        customProps.src = CDN_URL + props.src;
      }
      return <Image {...props} {...customProps} />
    }
  };
}