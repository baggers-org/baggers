import i18next from 'i18next';
import { renderToString } from 'react-dom/server';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { CacheProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import createEmotionServer from '@emotion/server/create-instance';

import {
  createEmotionCache,
  GlobalStyles,
  Mode,
  ThemeProvider,
} from '~/styles';
import { RemixServer } from '@remix-run/react';
import { EntryContext } from '@remix-run/server-runtime';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  await i18next.use(initReactI18next).init({
    supportedLngs: [`en`, `es`],
    defaultNS: `common`,
    fallbackLng: `en`,
    react: { useSuspense: false },
  });
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  const theme = request.headers
    .get(`cookie`)
    ?.match(/baggers_theme=(\w*)/)?.[1] as Mode;

  const MuiRemixServer = () => (
    <CacheProvider value={cache}>
      <ThemeProvider defaultMode={theme}>
        <GlobalStyles />
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <RemixServer context={remixContext} url={request.url} />
      </ThemeProvider>
    </CacheProvider>
  );

  // Render the component to a string.
  const html = renderToString(<MuiRemixServer />);

  // Grab the CSS from emotion
  const { styles } = extractCriticalToChunks(html);

  let stylesHTML = ``;

  styles.forEach(({ key, ids, css }) => {
    const emotionKey = `${key} ${ids.join(` `)}`;
    const newStyleTag = `<style data-emotion="${emotionKey}">${css}</style>`;
    stylesHTML = `${stylesHTML}${newStyleTag}`;
  });

  // Add the emotion style tags after the insertion point meta tag
  const markup = html.replace(
    /<meta(\s)*name="emotion-insertion-point"(\s)*content="emotion-insertion-point"(\s)*\/>/,
    `<meta name="emotion-insertion-point" content="emotion-insertion-point"/>${stylesHTML}`
  );

  responseHeaders.set(`Content-Type`, `text/html`);

  return new Response(`<!DOCTYPE html>${markup}`, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
