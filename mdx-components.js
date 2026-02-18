import { useMDXComponents as useCommonMDXComponents } from './common/mdx-components'

const CDN_URL = process.env.NODE_ENV === 'production' ? 'https://gh-proxy.org/https://github.com/janjangao/jangao.top/blob/main/public/' : ''

export function useMDXComponents(components) {
  return {
    ...useCommonMDXComponents(components),
    img: (props) => {
      return <img {...props} src={`${CDN_URL}${props.src}`} />
    },
  };
}