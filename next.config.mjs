import nextra from 'nextra'

const withNextra = nextra({
    staticImage: false,
    search: { codeblocks: false },
    defaultShowCopyCode: true,
    readingTime: true,
})

export default withNextra({
    output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
    images: {
        unoptimized: true
    },
    trailingSlash: true,

    turbopack: {
        resolveAlias: {
            // Path to your `mdx-components` file with extension
            'next-mdx-import-source-file': './mdx-components.js'
        }
    },
})

