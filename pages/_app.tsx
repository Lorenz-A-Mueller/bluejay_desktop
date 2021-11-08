import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Global } from '@emotion/react';
import { createHttpLink } from 'apollo-link-http';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useState } from 'react';
import { globalStyles } from '../utils/styles';

const link = createHttpLink({
  // uri: 'https://api-bluejay.herokuapp.com/graphql',
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link as any,
});

function MyApp({ Component, pageProps }: AppProps) {
  const [filter, setFilter] = useState('');
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon-apple-touch.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <ApolloProvider client={client}>
        <Global styles={globalStyles} />
        <Component {...pageProps} filter={filter} setFilter={setFilter} />
      </ApolloProvider>
    </>
  );
}

export default MyApp;
