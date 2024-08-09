import Layout from '@/components/layout/Layout';
import { SearchProvider } from '@/providers/SearchProvider';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SearchProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SearchProvider>
  );
}
