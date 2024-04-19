import { useTranslation } from 'react-i18next'
import Box from '@mui/system/Box';

interface MainContentProps {
  currentLocale: string
}

export const MainContent = (props: MainContentProps) => {
  const { t } = useTranslation('common')

  return <div className="flex">
    <Box sx={{ height: '100%' }}>
      <div>
        currentLocale: {props.currentLocale}
        <Box component={'p'} sx={{ color: '#111827', background: 'yellow' }}>{t('description')} test</Box>
      </div>
    </Box>
  </div>
}