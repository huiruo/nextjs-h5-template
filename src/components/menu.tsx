import btnBack from '@/assets/btn_back.svg'
import classNames from 'classnames'
import styles from '@/styles/menu.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { navigateBack } from '@/lib/native'

interface MenuProps {
  title: string
  isShowBack?: false
  isBackToNative?: boolean
  currentLocale: string
}

export const Menu = (props: MenuProps) => {
  const { title, isShowBack = true, isBackToNative = true, currentLocale } = props
  const router = useRouter();

  const onclick = () => {
    if (isBackToNative) {
      navigateBack()
    } else {
      router.back()
    }
  }

  return <div className={styles.container} dir={currentLocale === 'en' ? 'ltr' : 'rtl'}>
    <div className='flex1'>
      {isShowBack && <Image onClick={onclick} className={classNames(styles.btnBack, { [styles.arBtn]: currentLocale === 'ar' })} src={btnBack} alt='btnBack' />}
    </div>

    <div className={classNames('flex2', styles.title)}>
      {title}
    </div>

    <div className='flex1' />
  </div>
}