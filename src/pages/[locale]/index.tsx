import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import i18nextConfig from '../../../next-i18next.config'
import { getStaticPaths, makeStaticProps } from '@/lib/getStatic'
import { LanguageSwitchDropdown } from '@/components/languageSwitchDropdown'
import classnames from "classnames";
import styles from '@/styles/Home.module.scss'
import logo from '@/assets/logo.png'
import Image from 'next/image'
import { MainContent } from '@/components/mainContent'

export default function Home() {
  const router = useRouter()
  const { t } = useTranslation('common')
  const currentLocale =
    router.query.locale || i18nextConfig.i18n.defaultLocale

  return (
    <main className={styles.main}>
      <div className={styles.mainContainer}>
        <div className={styles.menu}>
          <div>
            <Image src={logo} alt='MicU logo' width={126} height={60} />
          </div>

          <div className={classnames(styles.leftContainer, 'xy-start')}>
            <div className={styles.about}>
              <div>
                {t('about-us')}
              </div>
            </div>
            <LanguageSwitchDropdown locales={i18nextConfig.i18n.locales} />
          </div>
        </div>

        <MainContent />

        <div style={{ height: '1000px' }}>
          <div>
            currentLocale: {currentLocale}
            <p>{t('description')} test</p>
          </div>
        </div>
      </div>
    </main>
  )
}

const getStaticProps = makeStaticProps(['common'])

export { getStaticPaths, getStaticProps }