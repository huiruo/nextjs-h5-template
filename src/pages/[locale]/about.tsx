import { useTranslation } from 'react-i18next';
import styles from '@/styles/about.module.css'
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic'

export default function About(props: any) {
  const { t } = useTranslation(['common'])
  console.log('About props:', props)

  return (
    <div className={styles.main} >
      hello Faq
      <div>
        {t('h1')}
      </div>

      <div>
        {t('title')}
      </div>
    </div>
  );
}

const getStaticProps = makeStaticProps(['common'])

export { getStaticPaths, getStaticProps }