import 'styles/globals.css';
import type { AppProps } from 'next/app';

import { FilesProvider } from 'context/FilesContext';

import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';
import '@fontsource/manrope/800.css';
import { MessagesProvider } from 'context/MessagesContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MessagesProvider>
      <FilesProvider>
        <Component {...pageProps} />
      </FilesProvider>
    </MessagesProvider>
  );
}

export default MyApp;
