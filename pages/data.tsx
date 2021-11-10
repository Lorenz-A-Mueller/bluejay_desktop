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
  getTicketsInTimeFrameQuery,
} from '../utils/queries';
import { dataStyles } from '../utils/styles';
import { transformTimestampIntoDatetime2 } from '../utils/transformTimestampIntoDatetime';
import { DataProps, ReportData } from '../utils/types';
import useWindowDimensions from '../utils/useWindowDimensions';

export default function Data(props: DataProps) {
  const screenWidth = useWindowDimensions().width;
  const router = useRouter();
  const [reportData, setReportData] = useState<ReportData | {}>({});
  // default: october 12, 2020, 00:00:00:000 GMT + 2
  const [startDate, setStartDate] = useState(1602453600000);
  const [endDate, setEndDate] = useState(Date.parse(new Date().toDateString()));

  const [logOut] = useMutation(deleteSessionMutation, {
    variables: { employee_id: props.employeeId },
    onCompleted: () => {
      router.push('/');
    },
    fetchPolicy: 'network-only',
  });

  //

  const [getTicketsInTimeFrame, { data: getTicketsInTimeFrameData }] =
    useLazyQuery(getTicketsInTimeFrameQuery, {
      variables: {
        intervalStart: transformTimestampIntoDatetime2(startDate.toString()),
        // include the entirety of the last Date in the interval
        intervalEnd: transformTimestampIntoDatetime2(
          (endDate + 23 * 60 * 60 * 1000).toString(),
        ),
      },
      onCompleted: async () => {
        setReportData(
          await extractTicketReportData(
            getTicketsInTimeFrameData.ticketsByTimeFrame,
            startDate,
            endDate,
          ),
        );
      },
      fetchPolicy: 'network-only',
    });

  useEffect(() => {
    if (startDate && endDate) {
      getTicketsInTimeFrame();
    }
  }, [startDate, endDate, getTicketsInTimeFrame]);

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
          <ChooseDateBar
            getTicketsInTimeFrame={getTicketsInTimeFrame}
            reportData={reportData}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
          <TicketReport
            reportData={reportData}
            startDate={startDate}
            endDate={endDate}
          />
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
