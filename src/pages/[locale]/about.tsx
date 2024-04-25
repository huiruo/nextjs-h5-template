import styles from '@/styles/about.module.css'
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic'
import Box from '@mui/system/Box';
import Image from 'next/image'
import backBtn from '@/assets/backbtn.webp'
import { useRouter } from 'next/router';

export default function About(props: any) {
  const router = useRouter()

  return (
    <div className={styles.main} >
      <Box className={'xy-center'} sx={{
        height: '60px',
        fontSize: '26px',
        color: '#E2B60C',
      }}> تفاصيل </Box>

      <Box sx={{
        position: 'absolute',
        zIndex: 99,
        top: '10px',
        right: '0',
        bottom: '4px',
        width: '70px',
        height: '30px'
      }}
        onClick={() => { router.back() }}
      >
        <Box
          component={Image}
          src={backBtn}
          alt='back'
          sx={{
            width: '46px',
            height: '46px'
          }}
        />
      </Box>

      content
    </div>
  );
}

const getStaticProps = makeStaticProps(['common'])

export { getStaticPaths, getStaticProps }