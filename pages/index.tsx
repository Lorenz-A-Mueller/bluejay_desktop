import { useQuery } from '@apollo/client';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useState } from 'react';
import { employeeSessionFetch, logInValidationQuery } from '../utils/queries';
import { indexStyles } from '../utils/styles';

export default function Home() {
  const [employeeNumberInput, setEmployeeNumberInput] = useState('');
  const [employeePasswordInput, setEmployeePasswordInput] = useState('');
  const [wasClicked, setWasClicked] = useState(false);
  // const [accessDenied, setAccessDenied] = useState(false);         TODO: have animation no accessDenied (shake)
  const router = useRouter();

  useQuery(logInValidationQuery, {
    // TODO: set data (first_name of query) in the application interface
    variables: {
      employeeNumber: employeeNumberInput,
      employeePassword: employeePasswordInput,
    },
    onCompleted: () => {
      setWasClicked(false);
      setEmployeeNumberInput('');
      setEmployeePasswordInput('');
      // setAccessDenied(false);
      const destination =
        typeof router.query.returnTo === 'string' && router.query.returnTo
          ? router.query.returnTo
          : `/tickets`;

      router.push(destination);
    },
    onError: () => {
      setEmployeeNumberInput('');
      setEmployeePasswordInput('');
      // setAccessDenied(true);
      setWasClicked(false);
    },
    skip: !wasClicked,
  });

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
            <input
              id="employee_id"
              name="employee_id"
              onChange={(e) => setEmployeeNumberInput(e.currentTarget.value)}
              value={employeeNumberInput}
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              onChange={(e) => setEmployeePasswordInput(e.currentTarget.value)}
              value={employeePasswordInput}
            />
            <button onClick={() => setWasClicked(true)}>SIGN IN</button>
          </div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  // Redirect from HTTP to HTTPS on Heroku
  if (
    context.req.headers.host &&
    context.req.headers['x-forwarded-proto'] &&
    context.req.headers['x-forwarded-proto'] !== 'https'
  ) {
    return {
      redirect: {
        destination: `https://${context.req.headers.host}/`,
        permanent: true,
      },
    };
  }

  const sessionToken = context.req.cookies.employeeSessionToken;
  console.log(
    'context.req.cookies.employeeSessionToken: ',
    context.req.cookies.employeeSessionToken,
  );
  const apiUrl = 'http://localhost:4000/graphql';
  const res = await employeeSessionFetch(sessionToken, apiUrl);
  const data = await res.json();
  if (data.data.employeeSession) {
    return {
      redirect: {
        destination: '/allTickets',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
