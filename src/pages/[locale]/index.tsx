import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import i18nextConfig from '../../../next-i18next.config'
import styles from '@/styles/Home.module.css'
import { getStaticPaths, makeStaticProps } from '@/lib/getStatic'
import { LanguageSwitchDropdown } from '@/components/LanguageSwitchDropdown'

export default function Home() {
  const router = useRouter()
  const { t } = useTranslation('common')
  const currentLocale =
    router.query.locale || i18nextConfig.i18n.defaultLocale

  return (
    <main>
      <p>
        <span style={{ fontSize: 'small', lineHeight: '4.65em' }}>
          {t('change-locale')}
        </span>
        <LanguageSwitchDropdown locales={i18nextConfig.i18n.locales} />
      </p>
      <div className={`${styles.main}`}>
        <div>
          currentLocale: {currentLocale}
          <p>{t('description')} test</p>
        </div>
      </div>
    </main>
  )
}

const getStaticProps = makeStaticProps(['common'])

export { getStaticPaths, getStaticProps }