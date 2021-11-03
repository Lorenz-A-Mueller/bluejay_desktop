import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useState } from 'react';
import { indexStyles } from '../utils/styles';

const logInValidationQuery = gql`
  query ($employeeNumber: String!, $employeePassword: String!) {
    employee(search: { number: [$employeeNumber, $employeePassword] }) {
      last_name
    }
  }
`;

export default function Home() {
  const [employeeNumberInput, setEmployeeNumberInput] = useState('');
  const [employeePasswordInput, setEmployeePasswordInput] = useState('');
  const [wasClicked, setWasClicked] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);
  const router = useRouter();

  const { loading, error, data } = useQuery(logInValidationQuery, {
    variables: {
      employeeNumber: employeeNumberInput,
      employeePassword: employeePasswordInput,
    },
    onCompleted: () => {
      console.log('data', data);
      setWasClicked(false);
      setEmployeeNumberInput('');
      setEmployeePasswordInput('');
      setAccessDenied(false);
      const destination =
        typeof router.query.returnTo === 'string' && router.query.returnTo
          ? router.query.returnTo
          : `/allTickets`;

      router.push(destination);
    },
    onError: () => {
      console.log('error: ', error);
      setEmployeeNumberInput('');
      setEmployeePasswordInput('');
      setAccessDenied(true);
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
        destination: `https://${context.req.headers.host}/login`,
        permanent: true,
      },
    };
  }

  const sessionToken = context.req.cookies.sessionToken;
  console.log('sessionToken in gSSP: ', sessionToken);
  const apiUrl = 'http://localhost:4000/graphql';
  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', cookie: sessionToken },
    body: JSON.stringify({
      query: `query {
        employeeSession {
          id
        }
      }`,
    }),
  });

  const data = await res.json();
  console.log('data in gssp!!!!!!!!!!', data);
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
