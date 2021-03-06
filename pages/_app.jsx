import '../styles/globals.css'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>CSS quickdocs</title>
      </Head>
        <Nav />
        <main>
          <Component {...pageProps} />
        </main>
    </>
  )
}

export default MyApp
