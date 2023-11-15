import styles from '@/styles/faq.module.css'

export default function Faq(props: any) {
  console.log('props:', props)

  return (
    <div className={styles.main} >
      hello Faq
    </div>
  );
}

export async function getStaticProps() {
  /*
    const res = await fetch('https://.../data') 
    const data = await res.json()
  */

  return { props: { data: { test: 123 } } }
}