import nextra from 'nextra'

const isStatic = process.env.SERVER_ENV === 'static';
const staticConfig = {
    output: 'export',
    images: {
        unoptimized: true
    },
}
const ssrConfig = {
    async rewrites() {
        return [
            {
                source: '/:path*/index.html',
                destination: '/:path*',
            },
            {
                source: '/:path*/index.html',
                destination: '/:path*/',
            },
        ]
    },
}

const withNextra = nextra({
    staticImage: false,
    search: { codeblocks: false },
    defaultShowCopyCode: true,
    readingTime: true,
})

export default withNextra({
    ...(isStatic ? staticConfig : ssrConfig),
    trailingSlash: true,
    turbopack: {
        resolveAlias: {
            // Path to your `mdx-components` file with extension
            'next-mdx-import-source-file': './mdx-components.js'
        }
    },
})

