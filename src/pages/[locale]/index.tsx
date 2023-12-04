import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import i18nextConfig from '../../../next-i18next.config'
import { getStaticPaths, makeStaticProps } from '@/lib/getStatic'
import { LanguageSwitchDropdown } from '@/components/languageSwitchDropdown'
import classnames from "classnames";
import styles from '@/styles/Home.module.scss'
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
          <div />
          <LanguageSwitchDropdown locales={i18nextConfig.i18n.locales} />
        </div>

        <MainContent currentLocale={currentLocale as string} />
      </div>
    </main>
  )
}

const getStaticProps = makeStaticProps(['common'])

export { getStaticPaths, getStaticProps }