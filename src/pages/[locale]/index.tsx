import { useEffect } from 'react'
import { getStaticPaths, makeStaticProps } from '@/lib/getStatic'
import { getRoomInfo } from '@/services/api'
import { navigateBack } from '@/lib/native'
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
  const { rid } = router.query;
  const { t } = useTranslation('common')
  const currentLocale =
    router.query.locale || i18nextConfig.i18n.defaultLocale

  // TODO: test
  // const { isShowNav } = router.query;
  const isShowNav = '1'

  const getRoomInfoUtil = async () => {
    const res = await getRoomInfo({ rid: rid as any })
    if (res?.success === true) {
      console.log('RoomInfo==>:', res.data)
    } else {
      console.error('getUser-error:', res)
    }
  }

  useEffect(() => {
    getRoomInfoUtil()
  }, [])

  const onBack = () => {
    try {
      navigateBack()
    } catch (error) {
      router.back()
      console.log('router error', error)
    }
  }

  return (
    <main className={styles.mainContainer}>
      {/* <Menu title={t('main-title') as string} currentLocale={currentLocale as string} />
        <div className={styles.menu}>
          <div />
          <LanguageSwitchDropdown locales={i18nextConfig.i18n.locales} />
        </div> */}

      <Box sx={{ position: 'absolute', display: 'flex', justifyContent: 'space-between', top: '30px', width: '100%' }}>
        <div />
        {isShowNav === '1' && <Image onClick={onBack} className={classNames(styles.btnBack)} src={backBtn} alt='btnBack' />}
      </Box>

      <MainContent currentLocale={currentLocale as string} />
    </main>
  )
}

const getStaticProps = makeStaticProps(['common'])

export { getStaticPaths, getStaticProps }