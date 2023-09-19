import '@/styles/globals.sass';
import type { AppProps } from 'next/app';
import Nav from '@/components/Nav';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <header><Nav /></header>
    <main><Component {...pageProps} /></main>
    <Toaster />
  </>;

}
