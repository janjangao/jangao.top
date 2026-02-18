import NextraBlogRootLayout from '@/common/component/NextraBlogRootLayout'

import './globals.css'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return <NextraBlogRootLayout>{children}</NextraBlogRootLayout>
}