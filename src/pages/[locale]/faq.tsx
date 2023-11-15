import { useTranslation } from 'react-i18next';
import styles from '@/styles/faq.module.css'
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic'

export default function Faq(props: any) {
  // const { t } = useTranslation(['common', 'footer'])
  const { t } = useTranslation(['common'])
  console.log('props:', props)

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

/*
export async function getStaticProps() {
  const res = await fetch('https://.../data') 
  const data = await res.json()

  return { props: { data: { test: 123 } } }
}
*/

const getStaticProps = makeStaticProps(['common'])
export { getStaticPaths, getStaticProps }