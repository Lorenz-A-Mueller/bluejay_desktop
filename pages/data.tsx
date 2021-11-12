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
  roleNameFetch,
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
    <SideBar
      setFilter={props.setFilter}
      filter={props.filter}
      employee={props.employee}
      isAdmin={props.isAdmin}
    >
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
  // check whether sessionToken in cookies matches an existing valid token in db

  const sessionToken = context.req.cookies.employeeSessionToken;
  const apiUrl = 'http://localhost:4000/graphql';
  const employeeSessionFetchRes = await employeeSessionFetch(
    sessionToken,
    apiUrl,
  );
  const employeeSessionFetchData = await employeeSessionFetchRes.json();
  if (!employeeSessionFetchData.data.employeeSession) {
    return {
      redirect: {
        destination: '/?returnTo=/tickets',
        permanent: false,
      },
    };
  }

  // only if sessions exists in db: fetch data of employee with that session

  const employeeId = employeeSessionFetchData.data.employeeSession.employee_id;
  const employeeDataFetchRes = await employeeDataFetch(employeeId, apiUrl);
  const employeeDataFetchData = await employeeDataFetchRes.json();

  // after that, fetch the name of that employee's role

  const roleNameFetchRes = await roleNameFetch(
    employeeDataFetchData.data.employee.role,
    apiUrl,
  );
  const roleNameFetchData = await roleNameFetchRes.json();

  return {
    props: {
      employee: employeeDataFetchData.data.employee,
      isAdmin: roleNameFetchData.data.role.role_name === 'admin',
    },
  };
};
