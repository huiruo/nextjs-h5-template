import Head from 'next/head'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { ClientOnly } from '@/lib/clientOnly'
import { useEffect } from 'react'
import { setConsole } from '@/lib/utils'
import { getUserInfo, initFetchData } from '@/lib/native'
import { useTranslation } from 'react-i18next';
import '@/styles/globals.css'

function App({ Component, pageProps }: AppProps) {
  const { t } = useTranslation(['common'])

  const getWeekStarUtil = async () => {
    const appData = await getUserInfo()
    // alert(appData.token)
    if (appData.token) {
      sessionStorage.setItem("UserInfo", JSON.stringify(appData));
    } else {
      alert('token null')
    }
  }

  useEffect(() => {
    getWeekStarUtil()
    initFetchData()
    setConsole()
  }, [])

  return <>
    <Head>
      <title>{t('title')}</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no,viewport-fit=cover"
      />
      <link rel="icon" href="/repos/mainLogo.png" sizes="any" />
    </Head>
    <ClientOnly>
      <Component {...pageProps} />
    </ClientOnly>
  </>
}

export default appWithTranslation(App)