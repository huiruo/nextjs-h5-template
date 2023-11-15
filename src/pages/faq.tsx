export default function Faq(props: any) {
  return (
    <div>
      hello Faq
    </div>
  );
}

export async function getStaticProps() {
  /*
    // Fetch data from external API at build time
    const res = await fetch('https://.../data') 
    const data = await res.json()
  */
  // Will be passed to the page component as props
  return { props: { data: { test: 123 } } }
}