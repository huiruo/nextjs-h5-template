import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import mainRightIcon from '@/assets/mainRight.png'
import styles from '@/styles/MainContent.module.scss'

export const MainContent = () => {
  const { t } = useTranslation('common')

  return <div className="flex">
    <div className={styles.mainLeft}>
      <div>
        {t('MicU')}
      </div>
      <div className={styles.textContainer}>
        <span className='font font-color'>{t('new')} </span>
        <span>{t('life')} </span>
        <span className='font-color'>{t('new2')} </span>
        <span>{t('friends')}</span>
      </div>
      <div className={styles.introduce}>
        {t('introduce')}
      </div>
    </div>
    <div className={styles.mainRight}>
      <Image src={mainRightIcon} alt='main' />
    </div>
  </div>
}