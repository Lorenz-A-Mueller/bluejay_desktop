import { css } from '@emotion/react';
import Head from 'next/head';
import { indexStyles } from '../utils/styles';

export default function Home() {
  return (
    <>
      <Head>
        <title>BlueJay Customer Support</title>
        <meta
          name="description"
          content="BlueJay - customer support software"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main css={indexStyles} className="cover-full-screen">
        <div>
          <img src="full_logo_transparent.png" alt="BlueJay logo" />
          <div>
            <h1>Customer Support</h1>
            <label htmlFor="employee_id">Employee ID</label>
            <input id="employee_id" name="employee_id" />
            <label htmlFor="password">Password</label>
            <input id="password" name="password" />
            <button>SIGN IN</button>
          </div>
        </div>
      </main>
    </>
  );
}
