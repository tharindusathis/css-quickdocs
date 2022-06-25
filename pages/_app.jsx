// import { MDXProvider } from '@mdx-js/react'
import '../styles/globals.css'
import Nav from '../components/Nav'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>CSS quickbook</title>
      </Head>
      <div className="p-8">
        <Nav />
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  )
}

export default MyApp
