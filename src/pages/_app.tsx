import { useEffect } from 'react'
import store from '@/store'
import { Provider } from 'react-redux'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { ClientOnly } from '@/lib/clientOnly'
import { setConsole } from '@/lib/utils'
import { initFetchData } from '@/lib/native'
import '@/styles/globals.css'

function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    initFetchData()
    setConsole()
  }, [])

  return <>
    <Head>
      <title>title</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no,viewport-fit=cover"
      />
      <link rel="icon" href="/repos/mainLogo.png" sizes="any" />
    </Head>
    <ClientOnly>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ClientOnly>
  </>
}

export default appWithTranslation(App)