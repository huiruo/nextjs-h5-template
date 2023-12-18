import btnBack from '@/assets/btn_back.svg'
import classNames from 'classnames'
import styles from '@/styles/menu.module.css'
import Image from 'next/image'

interface MenuProps {
  title: string
  isShowBack?: false
}

export const Menu = (props: MenuProps) => {
  const { title, isShowBack = true } = props

  return <div className={styles.container}>
    <div className='flex1'>
      {isShowBack && <Image className={styles.btnBack} src={btnBack} alt='btnBack' />}
    </div>

    <div className={classNames('flex1',styles.title)}>
      {title}
    </div>

    <div className='flex1' />
  </div>
}