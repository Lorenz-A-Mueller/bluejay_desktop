import { useLazyQuery, useMutation } from '@apollo/client';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import ChooseDateBar from '../components/ChooseDateBar';
import Layout from '../components/Layout';
import TicketReport from '../components/TicketReport';
import Tile from '../components/Tile';
import extractTicketReportData from '../utils/extractTicketReportData';
import {
  deleteSessionMutation,
  employeeDataFetch,
  employeeSessionFetch,
  getAllTicketsQuery,
  getTicketInformationQuery,
} from '../utils/queries';
import { dataStyles } from '../utils/styles';
import { ReportData, Ticket } from '../utils/types';
import useWindowDimensions from '../utils/useWindowDimensions';

type DataProps = {
  employee: {
    first_name: string;
  };
  employeeId: string;
};

export default function Data(props: DataProps) {
  const screenWidth = useWindowDimensions().width;
  const router = useRouter();
  const [reportData, setReportData] = useState<ReportData | {}>({});

  const [getAllTickets, { data: getAllTicketsQueryData }] = useLazyQuery(
    getAllTicketsQuery,
    {
      onCompleted: () => {
        console.log('getAllTicketsQueryData: ', getAllTicketsQueryData);
        console.log(
          'extractTicketReportData: ',
          extractTicketReportData(getAllTicketsQueryData.tickets),
        );

        setReportData(extractTicketReportData(getAllTicketsQueryData.tickets));
      },
      fetchPolicy: 'network-only',
    },
  );

  // All Tickets is default value, -> useEffect

  useEffect(() => {
    getAllTickets();
  }, [getAllTickets]);

  const [logOut] = useMutation(deleteSessionMutation, {
    variables: { employee_id: props.employeeId },
    onCompleted: (deletedData) => {
      console.log(deletedData);
      router.push('/');
    },
    fetchPolicy: 'network-only',
  });

  const handleLogOutClick = () => {
    logOut();
  };

  const handleChooseAllClick = () => {
    getAllTickets();
  };

  return (
    <Layout>
      <main css={screenWidth && dataStyles(screenWidth)}>
        <div className="top-bar">
          <p style={{ color: 'white' }}>{props.employee.first_name}</p>
          <button onClick={handleLogOutClick}>
            <img src="logout-icon.png" alt="a stylized door with an arrow" />
          </button>
        </div>
        <div>
          <h1>Ticket Reports</h1>
          <ChooseDateBar handleChooseAllClick={handleChooseAllClick} />
          <TicketReport reportData={reportData} />
        </div>
      </main>
    </Layout>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const sessionToken = context.req.cookies.employeeSessionToken;
  const apiUrl = 'http://localhost:4000/graphql';
  const res = await employeeSessionFetch(sessionToken, apiUrl);
  const data = await res.json();
  if (!data.data.employeeSession) {
    return {
      redirect: {
        destination: '/?returnTo=/data',
        permanent: false,
      },
    };
  }
  console.log('data.data.employeeSession', data.data.employeeSession);
  const employeeId = data.data.employeeSession.employee_id;
  const res2 = await employeeDataFetch(employeeId, apiUrl);
  const data2 = await res2.json();
  console.log('data2', data2);

  return {
    props: {
      employee: data2.data.employee,
      employeeId,
    },
  };
};
