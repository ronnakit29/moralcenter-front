import '../styles/globals.css'
import '../styles/index.css'
import 'animate.css'
import "quill/dist/quill.core.css"
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
