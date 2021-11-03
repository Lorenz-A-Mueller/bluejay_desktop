import { useMutation, useQuery } from '@apollo/client';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import Layout from '../components/Layout';
import MessagePanel from '../components/MessagePanel';
import SearchBar from '../components/SearchBar';
import SelectCategory from '../components/SelectCategory';
import Tile from '../components/Tile';
import {
  deleteSessionMutation,
  employeeDataFetch,
  employeeSessionFetch,
  getAllTicketsQuery,
} from '../utils/queries';
import { allTicketsStyles } from '../utils/styles';
import { Ticket } from '../utils/types';
import useWindowDimensions from '../utils/useWindowDimensions';

type AllTicketsProps = {
  employee: {
    first_name: string;
  };
  employeeId: string;
};

export default function AllTickets(props: AllTicketsProps) {
  const [showMessagePanel, setShowMessagePanel] = useState(false);
  const [openedTicket, setOpenedTicket] = useState('');
  const screenWidth = useWindowDimensions().width;
  const router = useRouter();

  const { data } = useQuery(getAllTicketsQuery, {
    fetchPolicy: 'network-only',
  }); // TODO error-handling / loading-handling

  const [logOut] = useMutation(deleteSessionMutation, {
    variables: { employee_id: props.employeeId },
    onCompleted: (deletedData) => {
      console.log(deletedData);
      router.push('/');
    },
    fetchPolicy: 'network-only',
  });

  const handleTileClick = (ticketId: string) => {
    setShowMessagePanel((previous) => !previous);
    setOpenedTicket(ticketId);
  };

  const handleLogOutClick = () => {
    logOut();
  };

  return (
    <Layout>
      <main css={screenWidth && allTicketsStyles(screenWidth)}>
        <div className="top-bar">
          <SelectCategory />
          <SearchBar />
          <p style={{ color: 'white' }}>{props.employee.first_name}</p>
          <button onClick={handleLogOutClick}>
            <img src="logout-icon.png" alt="a stylized door with an arrow" />
          </button>
        </div>
        <div className="tile-area">
          {data &&
            data.tickets.map((ticket: Ticket) => (
              <Tile
                key={`tile-key-${ticket.created}`}
                ticketId={ticket.id}
                status={ticket.status}
                ticketNumber={ticket.ticket_number}
                title={ticket.title}
                created={ticket.created}
                lastResponse={ticket.last_response}
                category={ticket.category}
                priority={ticket.priority}
                assigneeId={ticket.assignee_id}
                customerId={ticket.customer_id}
                handleTileClick={handleTileClick}
              />
            ))}
        </div>
      </main>
      {showMessagePanel && <MessagePanel openedTicket={openedTicket} />}
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
        destination: '/?returnTo=/allTickets',
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
