import { useTranslation } from 'react-i18next'

interface MainContentProps {
  currentLocale: string
}

export const MainContent = (props: MainContentProps) => {
  const { t } = useTranslation('common')

  return <div className="flex">
    <div style={{ height: '1000px' }}>
      <div>
        currentLocale: {props.currentLocale}
        <p>{t('description')} test</p>
      </div>
    </div>
  </div>
}