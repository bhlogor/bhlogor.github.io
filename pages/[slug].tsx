import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Date from '@/components/date';

export default function Post({ data }: any) {
  return (
    <>
      {data.map((p: any) => 
      <article key={p.id} className='flex flex-col'>
      <Head>
      <title>{`${p.title} #${p.tag}`}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={p.desc}></meta>
      </Head>
      <header className='inline bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text font-display text-4xl tracking-tight text-transparent'>
        <h1>{p.title}</h1>
      </header>
      <div className='pt-6'><Image src={p.image} alt={p.title}  width={600} height={250} priority/></div>
      <div className='pt-6' dangerouslySetInnerHTML={{__html:p["content"]}}></div>
      <div className='pt-6'>
        <small className='font-mono italic'><Date dateString={p.date} /></small> · 
        <span className='font-bold capitalize'>
          <Link prefetch={false} href={'/tag/' + p.tag} legacyBehavior>
             <a>#{p.tag}</a>
          </Link>
        </span>
        </div>
      </article>
      )}
    </>
  )
}
export const getServerSideProps: GetServerSideProps = async ({ query }: any) =>  {
  const { slug } = query
  const res = await fetch(`https://kqprknumdqwifwdehnht.supabase.co/rest/v1/rpc/get_index?slug=eq.${slug}`, {
    headers: {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxcHJrbnVtZHF3aWZ3ZGVobmh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzUxNDY2NzIsImV4cCI6MTk5MDcyMjY3Mn0.YovbUTU4W1QxU0AYC3hHEcIQqkt1ot-d_UpUkau1WBQ',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxcHJrbnVtZHF3aWZ3ZGVobmh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzUxNDY2NzIsImV4cCI6MTk5MDcyMjY3Mn0.YovbUTU4W1QxU0AYC3hHEcIQqkt1ot-d_UpUkau1WBQ'
    }
  });
  const data = await res.json();
  if (!data.length) {
    return {
      notFound: true,
    }
  }
  
  return {
    props: {
      data, 
      
    },
  };
};

