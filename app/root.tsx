import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';
import { Provider } from 'react-redux';
import stylesheet from '~/tailwind.css?url';
import Navbar from './components/Navbar';
import { store } from './store';
import { ThemeProvider } from './providers/ThemeProvider';
import { SearchProvider } from './providers/SearchProvider';
import ErrorBoundary from './components/ErrorBoundary';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: stylesheet }];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <ErrorBoundary>
        <Provider store={store}>
          <ThemeProvider>
            <SearchProvider>
              <body>
                <Navbar />
                {children}
                <ScrollRestoration />
                <Scripts />
              </body>
            </SearchProvider>
          </ThemeProvider>
        </Provider>
      </ErrorBoundary>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
