import { useTranslation } from 'react-i18next'
import Box from '@mui/system/Box';
import { getWeekStar } from '@/services/api';
import { useEffect } from 'react';
import { tokenState, useAppSelector } from '@/store';

interface MainContentProps {
  currentLocale: string
}

export const MainContent = (props: MainContentProps) => {
  const { t } = useTranslation('common')
  const token = useAppSelector(tokenState)

  const getRoomInfoUtil = async () => {
    const res = await getWeekStar({ type: 1 })
    if (res?.success === true) {
      console.log('%c=request res:', 'color:red', res)
    } else {
      console.error('getToUpAc-error:', res)
    }
  }

  useEffect(() => {
    if (token) {
      getRoomInfoUtil()
    }
  }, [token])

  return <div className="flex">
    <Box sx={{ height: '100%' }}>
      <div>
        currentLocale: {props.currentLocale}
        <Box component={'p'} sx={{ color: '#111827', background: 'yellow' }}>{t('description')} test</Box>
      </div>
    </Box>
  </div>
}