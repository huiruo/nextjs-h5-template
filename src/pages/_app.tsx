import Head from 'next/head'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { ClientOnly } from '@/lib/clientOnly'
import '@/styles/globals.css'

function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no,viewport-fit=cover"
      />
    </Head>
    <ClientOnly>
      <Component {...pageProps} />
    </ClientOnly>
  </>
}

export default appWithTranslation(App)