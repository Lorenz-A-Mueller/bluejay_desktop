import { useLazyQuery, useMutation } from '@apollo/client';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import ChooseDateBar from '../components/ChooseDateBar';
import SideBar from '../components/SideBar';
import TicketReport from '../components/TicketReport';
import extractTicketReportData from '../utils/extractTicketReportData';
import {
  deleteSessionMutation,
  employeeDataFetch,
  employeeSessionFetch,
  getAllTicketsQuery,
} from '../utils/queries';
import { dataStyles } from '../utils/styles';
import { DataProps, ReportData } from '../utils/types';
import useWindowDimensions from '../utils/useWindowDimensions';

export default function Data(props: DataProps) {
  const screenWidth = useWindowDimensions().width;
  const router = useRouter();
  const [reportData, setReportData] = useState<ReportData | {}>({});

  const [getAllTickets, { data: getAllTicketsQueryData }] = useLazyQuery(
    getAllTicketsQuery,
    {
      onCompleted: async () => {
        setReportData(
          await extractTicketReportData(getAllTicketsQueryData.tickets),
        );
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
    onCompleted: () => {
      router.push('/');
    },
    fetchPolicy: 'network-only',
  });

  return (
    <SideBar setFilter={props.setFilter} filter={props.filter}>
      <main css={screenWidth && dataStyles(screenWidth)}>
        <div className="top-bar">
          <p style={{ color: 'white' }}>{props.employee.first_name}</p>
          <button onClick={() => logOut()}>
            <img src="logout-icon.png" alt="a stylized door with an arrow" />
          </button>
        </div>
        <div>
          <h1>Ticket Reports</h1>
          <ChooseDateBar handleChooseAllClick={() => getAllTickets()} />
          <TicketReport reportData={reportData} />
        </div>
      </main>
    </SideBar>
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

  const employeeId = data.data.employeeSession.employee_id;
  const res2 = await employeeDataFetch(employeeId, apiUrl);
  const data2 = await res2.json();

  return {
    props: {
      employee: data2.data.employee,
      employeeId,
    },
  };
};
