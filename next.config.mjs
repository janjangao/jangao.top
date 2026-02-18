import nextra from 'nextra'

// Set up Nextra with its configuration
const withNextra = nextra({
    staticImage: false,
    search: { codeblocks: false },
    defaultShowCopyCode: true,
    readingTime: true
})

// Export the final Next.js config with Nextra included
export default withNextra({
    output: 'export',
    turbopack: {
        resolveAlias: {
            // Path to your `mdx-components` file with extension
            'next-mdx-import-source-file': './mdx-components.js'
        }
    },
    reactStrictMode: true,
    cleanDistDir: true
})