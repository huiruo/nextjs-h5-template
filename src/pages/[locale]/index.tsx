import { useEffect } from 'react'
import { getStaticPaths, makeStaticProps } from '@/lib/getStatic'
import { appSlice } from '@/store/appSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'

import { getUserInfo, navigateBack } from '@/lib/native'
import Image from 'next/image'
import classNames from 'classnames'
import { Box } from '@mui/system'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import i18nextConfig from '../../../next-i18next.config'
import styles from '@/styles/Home.module.scss'
import { MainContent } from '@/components/mainContent'
import backBtn from '@/assets/backbtn.webp'

export default function Home() {
  const router = useRouter()
  const currentLocale =
    router.query.locale || i18nextConfig.i18n.defaultLocale

  // TODO: test
  // const isShowNav = '1'
  const { isShowNav } = router.query;

  const dispatch: AppDispatch = useDispatch();

  const getUserInfoUtil = async () => {
    try {
      const appData = await getUserInfo()
      if (appData.token) {
        sessionStorage.setItem("UserInfo", JSON.stringify(appData));
        dispatch(appSlice.actions.addToken(appData.token))
      } else {
        alert('token null')
      }
    } catch (error) {
      console.log('%c=getUserInfoUtil', 'color:red', error)
      if (process.env.NODE_ENV === "development") {
        dispatch(appSlice.actions.addToken('test token'))
      }
    }
  }

  const onBack = () => {
    try {
      navigateBack()
    } catch (error) {
      router.back()
      console.log('router error', error)
    }
  }

  useEffect(() => {
    getUserInfoUtil()
  }, [])

  return (
    <main className={styles.mainContainer}>
      {/* <Menu title={t('main-title') as string} currentLocale={currentLocale as string} />
        <div className={styles.menu}>
          <div />
          <LanguageSwitchDropdown locales={i18nextConfig.i18n.locales} />
        </div> */}

      <Box sx={{ position: 'absolute', display: 'flex', justifyContent: 'space-between', top: '30px', width: '100%' }}>
        <div />
        {!isShowNav && <Box onClick={() => onBack()}>
          <Image className={classNames(styles.btnBack)} src={backBtn} alt='btnBack' />
        </Box>
        }
      </Box>

      <MainContent currentLocale={currentLocale as string} />
    </main>
  )
}

const getStaticProps = makeStaticProps(['common'])

export { getStaticPaths, getStaticProps }