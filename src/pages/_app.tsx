import React from 'react';

interface AppProps {
  Component: React.ComponentType;
  pageProps: object;
}
export default function App({ Component, pageProps } : AppProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
}
