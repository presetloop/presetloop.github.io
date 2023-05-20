import {IsGuestProvider} from '@/helpers/IsGuestContext';
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return <>
    <IsGuestProvider>
      <Component {...pageProps} />
    </IsGuestProvider>
  </>
}
