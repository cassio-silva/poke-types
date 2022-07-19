import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { Footer } from '../components/Footer';
import { LanguageProvider } from '../contexts/LanguageContext';
import GlobalStyles from '../styles/GlobalStyles';
import { theme } from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <LanguageProvider>
        <Component {...pageProps} />
        <GlobalStyles />
        <Footer />
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default MyApp
