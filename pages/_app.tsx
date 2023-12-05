import type { AppProps } from 'next/app'
import '../public/globals.css'

export default function App({ Component, pageProps }: AppProps) {
   return <Component {...pageProps} />
}
